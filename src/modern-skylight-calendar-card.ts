/**
 * modern-skylight-calendar-card
 *
 * A modern, neon/Material Design 3, dark-mode-first Home Assistant Lovelace card
 * for displaying Google Calendar (and any HA calendar entity) data.
 *
 * Features:
 *  - Month / Week / List views
 *  - Flicker-free Lit reactive rendering (no full DOM teardown)
 *  - Surgical per-entity refresh via HA WebSocket event (gcal_webhook_fired)
 *  - Polling fallback with configurable interval
 *  - Calendar toggle badges persisted to localStorage
 *  - Add / Edit / Delete events (full dialog)
 *  - Highly configurable, backward-compatible with skylight-calendar-card YAML
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { baseStyles } from './styles/index.js';
import { CalendarStore } from './store.js';
import { dayjs, type Dayjs, loadPreference, savePreference } from './utils/index.js';

import type {
  HomeAssistant,
  CardConfig,
  CalendarEvent,
  ViewMode,
  EventDialogState,
  ResolvedEntityConfig,
} from './types/index.js';

// Side-effect imports — register custom elements
import './components/month-view.js';
import './components/week-view.js';
import './components/list-view.js';
import './components/event-dialog.js';

// ─── Card ─────────────────────────────────────────────────────────────────────

@customElement('modern-skylight-calendar-card')
export class ModernSkylightCalendarCard extends LitElement {
  static styles = [baseStyles];

  // ── HA-injected properties ────────────────────────────────────────────────

  @property({ attribute: false })
  set hass(hass: HomeAssistant) {
    const first = !this._hass;
    this._hass = hass;
    this._store.setHass(hass);
    if (first) this.requestUpdate();
  }
  get hass(): HomeAssistant { return this._hass!; }
  private _hass: HomeAssistant | null = null;

  // ── Internal state ────────────────────────────────────────────────────────

  @state() private _config: CardConfig | null = null;
  @state() private _currentDate: Dayjs = dayjs();
  @state() private _view: ViewMode = 'month';
  @state() private _events: CalendarEvent[] = [];
  @state() private _fetching = false;
  @state() private _hiddenCalendars: Set<string> = new Set();
  @state() private _dialog: EventDialogState = { open: false, mode: 'add' };

  private _store = new CalendarStore();
  private _storeListener = () => {
    this._events = [...this._store.events];
    this._fetching = this._store.fetching;
  };

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this._store.subscribe(this._storeListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._store.unsubscribe(this._storeListener);
    this._store.destroy();
  }

  // ── HA card API ───────────────────────────────────────────────────────────

  setConfig(config: CardConfig) {
    if (!config.entities || !Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error('[modern-skylight-calendar-card] "entities" array is required.');
    }
    this._config = config;
    this._view = (config.view as ViewMode) || 'month';
    this._store.setConfig(config);

    // Restore persisted preferences
    const storageKey = config.preference_storage_key || 'msc-prefs';
    const hidden = loadPreference<string[]>(`${storageKey}:hidden`, []);
    this._hiddenCalendars = new Set(hidden);
    const savedView = loadPreference<ViewMode | null>(`${storageKey}:view`, null);
    if (savedView && ['month', 'week', 'list'].includes(savedView)) {
      this._view = savedView;
    }
  }

  static getConfigElement() {
    // Visual config editor — not implemented; HA will fall back to raw YAML
    return null;
  }

  static getStubConfig() {
    return {
      entities: ['calendar.your_calendar'],
      view: 'month',
      title: 'Calendar',
      refresh_interval: 3600,
      ha_refresh_event: 'gcal_webhook_fired',
    };
  }

  getCardSize() {
    return this._config?.compact_height ? 4 : 7;
  }

  // ── Render ────────────────────────────────────────────────────────────────

  render() {
    if (!this._config) {
      return html`<div class="card"><div style="padding:16px;color:var(--msc-text-secondary)">No config.</div></div>`;
    }

    const entities = this._store.resolveEntities();
    const periodLabel = this._getPeriodLabel();

    return html`
      <div class="card">
        ${this._renderHeader(entities, periodLabel)}
        <div class="calendar-body">
          ${this._renderView()}
          ${this._fetching ? html`<div class="loading-overlay"><div class="spinner"></div></div>` : nothing}
        </div>
      </div>

      <msc-event-dialog
        .hass=${this._hass!}
        .entities=${entities}
        .state=${this._dialog}
        @close=${() => this._closeDialog()}
        @saved=${(e: CustomEvent) => this._onEventSaved(e.detail.entityId)}
      ></msc-event-dialog>
    `;
  }

  // ── Header ────────────────────────────────────────────────────────────────

  private _renderHeader(entities: ResolvedEntityConfig[], periodLabel: string) {
    const compact = this._config?.compact_header ?? false;
    const title = this._config?.title;
    const canManage = this._config?.enable_event_management ?? true;

    return html`
      <div class="header">
        <!-- Top row: title + period + nav + add button -->
        <div class="header-top">
          ${title ? html`<h1 class="header-title">${title}</h1>` : nothing}

          <span class="header-period"
            @click=${() => this._goToday()}
            title="Go to today"
          >${periodLabel}</span>

          <div class="header-actions">
            <div class="nav-group">
              <button class="nav-btn" @click=${() => this._navigate(-1)} title="Previous">‹</button>
              <button class="today-btn" @click=${() => this._goToday()}>Today</button>
              <button class="nav-btn" @click=${() => this._navigate(1)} title="Next">›</button>
            </div>

            ${canManage ? html`
              <button class="btn btn-primary icon-only" title="New event"
                @click=${() => this._openAddDialog()}>+</button>
            ` : nothing}
          </div>
        </div>

        ${!compact ? html`
          <!-- Bottom row: view switcher + calendar badges -->
          <div class="header-bottom">
            <div class="view-switcher">
              ${(['month', 'week', 'list'] as ViewMode[]).map(v => html`
                <button
                  class="btn ${this._view === v ? 'active' : ''}"
                  @click=${() => this._switchView(v)}
                >${this._viewLabel(v)}</button>
              `)}
            </div>

            <div class="calendar-badges">
              ${entities.map(ent => this._renderBadge(ent))}
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderBadge(ent: ResolvedEntityConfig) {
    const active = !this._hiddenCalendars.has(ent.entityId);
    return html`
      <span
        class="calendar-badge ${active ? 'active' : ''}"
        style="--badge-color:${ent.color}"
        @click=${() => this._toggleCalendar(ent.entityId)}
        title="${ent.name}"
      >
        <span class="dot"></span>
        ${ent.name}
      </span>
    `;
  }

  // ── View ──────────────────────────────────────────────────────────────────

  private _renderView() {
    if (!this._config) return nothing;

    switch (this._view) {
      case 'month':
        return html`
          <msc-month-view
            .events=${this._events}
            .currentDate=${this._currentDate}
            .config=${this._config}
            .hiddenCalendars=${this._hiddenCalendars}
            @event-click=${(e: CustomEvent) => this._onEventClick(e.detail.event)}
            @day-click=${(e: CustomEvent) => this._onDayClick(e.detail.date)}
          ></msc-month-view>
        `;

      case 'week':
        return html`
          <msc-week-view
            .events=${this._events}
            .currentDate=${this._currentDate}
            .config=${this._config}
            .hiddenCalendars=${this._hiddenCalendars}
            @event-click=${(e: CustomEvent) => this._onEventClick(e.detail.event)}
          ></msc-week-view>
        `;

      case 'list':
        return html`
          <msc-list-view
            .events=${this._events}
            .currentDate=${this._currentDate}
            .config=${this._config}
            .hiddenCalendars=${this._hiddenCalendars}
            @event-click=${(e: CustomEvent) => this._onEventClick(e.detail.event)}
          ></msc-list-view>
        `;

      default:
        return nothing;
    }
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  private _navigate(dir: -1 | 1) {
    const unit = this._view === 'month' ? 'month' : this._view === 'week' ? 'week' : 'day';
    const amount = this._view === 'list' ? 7 : 1;
    this._currentDate = this._currentDate.add(dir * amount, unit);
    this._store.navigate(this._currentDate);
    this.requestUpdate();
  }

  private _goToday() {
    this._currentDate = dayjs();
    this._store.navigate(this._currentDate);
    this.requestUpdate();
  }

  private _switchView(v: ViewMode) {
    this._view = v;
    this._store.setView(v, this._currentDate);
    const storageKey = this._config?.preference_storage_key || 'msc-prefs';
    savePreference(`${storageKey}:view`, v);
  }

  private _toggleCalendar(entityId: string) {
    const next = new Set(this._hiddenCalendars);
    if (next.has(entityId)) {
      next.delete(entityId);
    } else {
      next.add(entityId);
    }
    this._hiddenCalendars = next;
    const storageKey = this._config?.preference_storage_key || 'msc-prefs';
    savePreference(`${storageKey}:hidden`, Array.from(next));
  }

  // ── Period label ──────────────────────────────────────────────────────────

  private _getPeriodLabel(): string {
    const d = this._currentDate;
    switch (this._view) {
      case 'month': return d.format('MMMM YYYY');
      case 'week': {
        const firstDow = this._config?.first_day_of_week ?? 1;
        const dow = d.day();
        const offset = (dow - firstDow + 7) % 7;
        const weekStart = d.subtract(offset, 'day');
        const weekEnd = weekStart.add(6, 'day');
        if (weekStart.month() === weekEnd.month()) {
          return `${weekStart.format('MMM D')} – ${weekEnd.format('D, YYYY')}`;
        }
        return `${weekStart.format('MMM D')} – ${weekEnd.format('MMM D, YYYY')}`;
      }
      case 'list': return d.format('MMMM YYYY');
      default: return '';
    }
  }

  private _viewLabel(v: ViewMode): string {
    return { month: 'Month', week: 'Week', list: 'List' }[v];
  }

  // ── Dialog ────────────────────────────────────────────────────────────────

  private _openAddDialog(defaultDate?: Date) {
    const entities = this._store.resolveEntities();
    const writableEntities = entities.filter(e => !e.readonly);
    if (writableEntities.length === 0) return;

    this._dialog = {
      open: true,
      mode: 'add',
      defaultDate: defaultDate || this._currentDate.toDate(),
      defaultEntityId: writableEntities[0].entityId,
    };
  }

  private _openEditDialog(event: CalendarEvent) {
    const entities = this._store.resolveEntities();
    const ent = entities.find(e => e.entityId === event.entityId);
    if (ent?.readonly) return; // readonly — no edit

    this._dialog = {
      open: true,
      mode: 'edit',
      event,
    };
  }

  private _closeDialog() {
    this._dialog = { open: false, mode: 'add' };
  }

  private _onEventSaved(entityId: string) {
    // Surgical refresh — only the affected calendar entity
    this._store.refreshEntities([entityId]);
  }

  // ── Event handlers from child views ──────────────────────────────────────

  private _onEventClick(event: CalendarEvent) {
    if (!(this._config?.enable_event_management ?? true)) return;
    this._openEditDialog(event);
  }

  private _onDayClick(date: Date) {
    if (!(this._config?.enable_event_management ?? true)) return;
    this._openAddDialog(date);
  }
}

// ─── HACS / HA card registration ─────────────────────────────────────────────

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
  interface HTMLElementTagNameMap {
    'modern-skylight-calendar-card': ModernSkylightCalendarCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'modern-skylight-calendar-card',
  name: 'Modern Skylight Calendar Card',
  description:
    'A sleek, neon-themed, flicker-free calendar card for Home Assistant. ' +
    'Supports Month, Week, and List views with real-time Google Calendar updates.',
  preview: true,
  documentationURL: 'https://github.com/uprising8664/modern-skylight-calendar-card',
});
