import type {
  HomeAssistant,
  CardConfig,
  CalendarEntityConfig,
  CalendarEvent,
  RawCalendarEvent,
  ResolvedEntityConfig,
  LoadedRange,
} from './types/index.js';
import {
  dayjs,
  getDefaultColor,
  getEventKey,
  chunkDateRange,
  getFetchRange,
  isAllDay,
} from './utils/index.js';

export type StoreListener = () => void;

/**
 * CalendarStore
 *
 * Manages all event data. Completely decoupled from rendering.
 * Supports:
 *  - Full range fetch (on init / view change)
 *  - Surgical per-entity refresh (on webhook event) — only touches affected
 *    entities, retains all others, animates additions/removals individually.
 *  - Polling fallback timer
 *  - HA WebSocket event subscription for instant push updates
 */
export class CalendarStore {
  private _hass: HomeAssistant | null = null;
  private _config: CardConfig | null = null;
  private _events: CalendarEvent[] = [];
  private _loadedRange: LoadedRange | null = null;
  private _fetching = false;
  private _pollTimer: ReturnType<typeof setInterval> | null = null;
  private _haEventUnsub: (() => void) | null = null;
  private _listeners: Set<StoreListener> = new Set();
  private _currentDate = dayjs();
  private _view = 'month';

  // ── Public API ────────────────────────────────────────────────────────────

  get events(): CalendarEvent[] { return this._events; }
  get fetching(): boolean { return this._fetching; }

  setHass(hass: HomeAssistant) {
    const first = !this._hass;
    this._hass = hass;
    if (first && this._config) {
      this._subscribeHaEvent();
      this._startPolling();
      this.fetchFull();
    }
  }

  setConfig(config: CardConfig) {
    this._config = config;
    this._view = config.view || 'month';
    // Reset loaded range so next navigation triggers fresh fetch
    this._loadedRange = null;
  }

  setView(view: string, currentDate: ReturnType<typeof dayjs>) {
    this._view = view;
    this._currentDate = currentDate;
    this._loadedRange = null;
    this.fetchFull();
  }

  navigate(currentDate: ReturnType<typeof dayjs>) {
    this._currentDate = currentDate;
    const range = getFetchRange(currentDate, this._view);
    const needed = !this._loadedRange ||
      range.start.isBefore(this._loadedRange.startDate) ||
      range.end.isAfter(this._loadedRange.endDate);
    if (needed) this.fetchFull();
  }

  subscribe(fn: StoreListener) { this._listeners.add(fn); }
  unsubscribe(fn: StoreListener) { this._listeners.delete(fn); }

  destroy() {
    this._stopPolling();
    this._unsubscribeHaEvent();
    this._listeners.clear();
  }

  // ── Fetch: full range ─────────────────────────────────────────────────────

  async fetchFull() {
    if (!this._hass || !this._config || this._fetching) return;
    const range = getFetchRange(this._currentDate, this._view);
    this._fetching = true;
    this._notify();

    try {
      const entities = this._resolveEntities();
      const fresh = await this._fetchEntities(entities, range.start.toDate(), range.end.toDate());
      fresh.sort((a, b) => this._sortKey(a) - this._sortKey(b));
      this._events = this._limit(fresh);
      this._loadedRange = { startDate: range.start.toDate(), endDate: range.end.toDate() };
    } catch (e) {
      console.error('[modern-skylight-calendar-card] fetchFull error:', e);
    } finally {
      this._fetching = false;
      this._notify();
    }
  }

  // ── Fetch: surgical per-entity (webhook / event-driven) ───────────────────
  // Only re-fetches the named entities, splices them into _events in-place.
  // Other entities untouched → their event elements keep their DOM nodes.

  async refreshEntities(entityIds?: string[]) {
    if (!this._hass || !this._config) return;
    if (!this._loadedRange) { return this.fetchFull(); }
    if (this._fetching) return;

    const range = this._loadedRange;
    const allEntities = this._resolveEntities();
    const targets = entityIds
      ? allEntities.filter(e => entityIds.includes(e.entityId))
      : allEntities;

    this._fetching = true;
    this._notify();

    try {
      const fresh = await this._fetchEntities(targets, range.startDate, range.endDate);
      const targetSet = new Set(targets.map(e => e.entityId));

      // Keep events from non-refreshed entities
      const retained = this._events.filter(e => !targetSet.has(e.entityId));
      const merged = [...retained, ...fresh];
      merged.sort((a, b) => this._sortKey(a) - this._sortKey(b));
      this._events = this._limit(merged);
    } catch (e) {
      console.error('[modern-skylight-calendar-card] refreshEntities error:', e);
    } finally {
      this._fetching = false;
      this._notify();
    }
  }

  // ── Internal: entity resolution ───────────────────────────────────────────

  _resolveEntities(): ResolvedEntityConfig[] {
    if (!this._config) return [];
    const { entities, colors = {}, calendar_names = {}, readonly_calendars = [] } = this._config;
    return entities.map((e: string | CalendarEntityConfig, i: number) => {
      const entityId = typeof e === 'string' ? e : e.entity;
      const customColor = typeof e === 'object' ? e.color : undefined;
      const customName = typeof e === 'object' ? e.name : undefined;
      return {
        entityId,
        color: customColor || colors[entityId] || getDefaultColor(i),
        name: customName || calendar_names[entityId] || entityId.split('.')[1]?.replace(/_/g, ' ') || entityId,
        readonly: readonly_calendars.includes(entityId),
      };
    });
  }

  resolveEntities(): ResolvedEntityConfig[] {
    return this._resolveEntities();
  }

  // ── Internal: fetch logic ─────────────────────────────────────────────────

  private async _fetchEntities(
    entities: ResolvedEntityConfig[],
    start: Date,
    end: Date
  ): Promise<CalendarEvent[]> {
    const chunks = chunkDateRange(dayjs(start), dayjs(end), 30);
    const results = await Promise.all(
      entities.map(entity => this._fetchEntity(entity, chunks))
    );
    return results.flat();
  }

  private async _fetchEntity(
    entity: ResolvedEntityConfig,
    chunks: Array<{ start: ReturnType<typeof dayjs>; end: ReturnType<typeof dayjs> }>
  ): Promise<CalendarEvent[]> {
    const seen = new Set<string>();
    const allEvents: CalendarEvent[] = [];

    const chunkResults = await Promise.all(
      chunks.map(chunk => this._fetchChunk(entity.entityId, chunk.start, chunk.end))
    );

    for (const events of chunkResults) {
      for (const raw of events) {
        const key = getEventKey(entity.entityId, raw);
        if (seen.has(key)) continue;
        seen.add(key);
        allEvents.push(this._normalizeEvent(raw, entity));
      }
    }

    return allEvents;
  }

  private async _fetchChunk(
    entityId: string,
    start: ReturnType<typeof dayjs>,
    end: ReturnType<typeof dayjs>
  ): Promise<RawCalendarEvent[]> {
    if (!this._hass) return [];
    try {
      return await this._hass.callWS<RawCalendarEvent[]>({
        type: 'calendar/event/list',
        entity_id: entityId,
        start_date_time: start.toISOString(),
        end_date_time: end.toISOString(),
      });
    } catch {
      // Fallback to REST
      try {
        return await this._hass.callApi<RawCalendarEvent[]>(
          'GET',
          `calendars/${entityId}?start=${start.format('YYYY-MM-DD')}T00:00:00Z&end=${end.format('YYYY-MM-DD')}T23:59:59Z`
        );
      } catch (e2) {
        console.error(`[modern-skylight-calendar-card] fetch failed for ${entityId}:`, e2);
        return [];
      }
    }
  }

  private _normalizeEvent(raw: RawCalendarEvent, entity: ResolvedEntityConfig): CalendarEvent {
    return {
      uid: raw.uid || `${entity.entityId}-${raw.start?.dateTime || raw.start?.date}-${raw.summary}`,
      summary: raw.summary || 'Untitled',
      description: raw.description,
      location: raw.location,
      start: raw.start,
      end: raw.end,
      entityId: entity.entityId,
      color: entity.color,
      allDay: isAllDay(raw),
      recurring: !!raw.rrule || !!raw.recurring_event_id,
      recurrenceId: raw.recurrence_id,
      recurringEventId: raw.recurring_event_id,
    };
  }

  // ── Internal: polling ─────────────────────────────────────────────────────

  private _startPolling() {
    this._stopPolling();
    const intervalSec = this._config?.refresh_interval ?? 3600;
    if (intervalSec <= 0) return;
    this._pollTimer = setInterval(() => {
      this.fetchFull();
    }, intervalSec * 1000);
  }

  private _stopPolling() {
    if (this._pollTimer) {
      clearInterval(this._pollTimer);
      this._pollTimer = null;
    }
  }

  // ── Internal: HA event subscription ──────────────────────────────────────

  private _subscribeHaEvent() {
    const eventName = this._config?.ha_refresh_event;
    if (!eventName || !this._hass?.connection) return;
    if (this._haEventUnsub) return;

    this._hass.connection
      .subscribeEvents(() => {
        this.refreshEntities();
      }, eventName)
      .then((unsub: () => void) => {
        this._haEventUnsub = unsub;
      })
      .catch((err: unknown) => {
        console.warn('[modern-skylight-calendar-card] Failed to subscribe to HA event:', eventName, err);
      });
  }

  private _unsubscribeHaEvent() {
    if (this._haEventUnsub) {
      this._haEventUnsub();
      this._haEventUnsub = null;
    }
  }

  // ── Internal: helpers ─────────────────────────────────────────────────────

  private _sortKey(e: CalendarEvent): number {
    const v = e.start.dateTime || e.start.date;
    return v ? new Date(v).getTime() : 0;
  }

  private _limit(events: CalendarEvent[]): CalendarEvent[] {
    const max = this._config?.max_events ?? 0;
    return max > 0 ? events.slice(0, max) : events;
  }

  private _notify() {
    this._listeners.forEach(fn => fn());
  }
}
