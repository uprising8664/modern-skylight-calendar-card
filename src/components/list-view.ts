import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { safeCustomElement } from '../utils/safe-custom-element.js';
import { repeat } from 'lit/directives/repeat.js';
import { baseStyles } from '../styles/index.js';
import type { CalendarEvent, CardConfig } from '../types/index.js';
import { dayjs, type Dayjs, getEventStart, getEventEnd, formatTime, formatDateRange } from '../utils/index.js';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DayGroup {
  date: Dayjs;
  isToday: boolean;
  events: CalendarEvent[];
}

// ─── Component ────────────────────────────────────────────────────────────────

@safeCustomElement('msc-list-view')
export class ListView extends LitElement {
  static styles = [baseStyles];

  @property({ attribute: false }) events: CalendarEvent[] = [];
  @property({ attribute: false }) currentDate: Dayjs = dayjs();
  @property({ attribute: false }) config!: CardConfig;
  @property({ attribute: false }) hiddenCalendars: Set<string> = new Set();

  // ─── Render ────────────────────────────────────────────────────────────────

  render() {
    const groups = this._buildGroups();

    if (groups.length === 0) {
      return html`
        <div class="list-view">
          <div class="list-empty">No upcoming events</div>
        </div>
      `;
    }

    return html`
      <div class="list-view">
        ${repeat(
          groups,
          g => g.date.format('YYYY-MM-DD'),
          g => this._renderGroup(g)
        )}
      </div>
    `;
  }

  private _renderGroup(group: DayGroup) {
    return html`
      <div class="list-date-group">
        <div class="list-date-heading ${group.isToday ? 'today' : ''}">
          <span class="date-num">${group.date.date()}</span>
          <div class="date-meta">
            <span class="date-weekday">${group.date.format('ddd')}</span>
            <span class="date-month">${group.date.format('MMM YYYY')}</span>
          </div>
        </div>

        ${repeat(
          group.events,
          ev => `${ev.entityId}|${ev.uid}`,
          ev => this._renderEvent(ev)
        )}
      </div>
    `;
  }

  private _renderEvent(ev: CalendarEvent) {
    const start = getEventStart(ev);
    const end = getEventEnd(ev);

    let timeMeta: string;
    if (ev.allDay) {
      // Multi-day all-day events: show date range
      const inclusiveEnd = end.subtract(1, 'day');
      timeMeta = start.isSame(inclusiveEnd, 'day')
        ? 'All day'
        : `All day · ${formatDateRange(start, inclusiveEnd)}`;
    } else {
      timeMeta = `${formatTime(start)} – ${formatTime(end)}`;
    }

    return html`
      <div
        class="list-event"
        @click=${() => this._onEventClick(ev)}
      >
        <div class="list-event-color-bar" style="background:${ev.color}"></div>
        <div class="list-event-content">
          <div class="list-event-title">${ev.summary}</div>
          <div class="list-event-meta">
            ${timeMeta}
            ${ev.location ? html` · <span title="${ev.location}">${ev.location}</span>` : nothing}
          </div>
        </div>
        ${ev.recurring ? html`
          <span style="font-size:10px;color:var(--msc-text-disabled);flex-shrink:0;align-self:center;" title="Recurring">↻</span>
        ` : nothing}
      </div>
    `;
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private _buildGroups(): DayGroup[] {
    const today = dayjs();

    // Filter hidden calendars
    const visible = this.events.filter(ev => !this.hiddenCalendars.has(ev.entityId));

    // For the list view, show events from currentDate onwards
    const startOfView = this.currentDate.startOf('day');

    // Collect all days each event touches (for multi-day all-day events)
    const dayMap = new Map<string, CalendarEvent[]>();

    for (const ev of visible) {
      const evStart = getEventStart(ev);
      const evEnd = getEventEnd(ev);

      if (ev.allDay) {
        // Expand multi-day all-day events across each day they span
        let cursor = evStart.startOf('day');
        const inclusiveEnd = evEnd.subtract(1, 'day').startOf('day');
        while (!cursor.isAfter(inclusiveEnd)) {
          if (!cursor.isBefore(startOfView)) {
            const key = cursor.format('YYYY-MM-DD');
            if (!dayMap.has(key)) dayMap.set(key, []);
            dayMap.get(key)!.push(ev);
          }
          cursor = cursor.add(1, 'day');
        }
      } else {
        const key = evStart.format('YYYY-MM-DD');
        if (!evStart.isBefore(startOfView, 'day')) {
          if (!dayMap.has(key)) dayMap.set(key, []);
          dayMap.get(key)!.push(ev);
        }
      }
    }

    // Sort days
    const sortedKeys = Array.from(dayMap.keys()).sort();

    return sortedKeys.map(key => {
      const date = dayjs(key);
      const dayEvents = dayMap.get(key)!.sort((a, b) => {
        if (a.allDay && !b.allDay) return -1;
        if (!a.allDay && b.allDay) return 1;
        return getEventStart(a).valueOf() - getEventStart(b).valueOf();
      });

      return {
        date,
        isToday: date.isSame(today, 'day'),
        events: dayEvents,
      };
    });
  }

  // ─── Events ────────────────────────────────────────────────────────────────

  private _onEventClick(ev: CalendarEvent) {
    this.dispatchEvent(new CustomEvent('event-click', { detail: { event: ev }, bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'msc-list-view': ListView;
  }
}
