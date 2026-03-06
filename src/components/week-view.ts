import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { baseStyles } from '../styles/index.js';
import type { CalendarEvent, CardConfig } from '../types/index.js';
import { dayjs, type Dayjs, getEventStart, getEventEnd, formatTime } from '../utils/index.js';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PositionedEvent {
  event: CalendarEvent;
  col: number;
  totalCols: number;
  topPct: number;
  heightPct: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const HOUR_HEIGHT_PX = 48; // matches CSS .week-hour-row height

// ─── Component ────────────────────────────────────────────────────────────────

@customElement('msc-week-view')
export class WeekView extends LitElement {
  static styles = [baseStyles];

  @property({ attribute: false }) events: CalendarEvent[] = [];
  @property({ attribute: false }) currentDate: Dayjs = dayjs();
  @property({ attribute: false }) config!: CardConfig;
  @property({ attribute: false }) hiddenCalendars: Set<string> = new Set();

  @state() private _nowMinutes = this._getCurrentMinutes();

  private _nowTimer?: ReturnType<typeof setInterval>;

  connectedCallback() {
    super.connectedCallback();
    this._nowTimer = setInterval(() => {
      this._nowMinutes = this._getCurrentMinutes();
    }, 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._nowTimer) clearInterval(this._nowTimer);
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  render() {
    const firstDow = this.config?.first_day_of_week ?? 1;
    const startHour = this.config?.week_start_hour ?? 0;
    const endHour = this.config?.week_end_hour ?? 24;
    const today = dayjs();

    // Build week days
    const weekStart = this._getWeekStart(this.currentDate, firstDow);
    const days: Dayjs[] = [];
    for (let i = 0; i < 7; i++) days.push(weekStart.add(i, 'day'));

    // Hours to render
    const hours: number[] = [];
    for (let h = startHour; h < endHour; h++) hours.push(h);
    const totalHours = endHour - startHour;
    const totalMinutes = totalHours * 60;

    // All-day events per column
    const allDayByDay = days.map(d => this._allDayEventsForDay(d));

    // Timed events per day, with layout
    const timedByDay = days.map(d => this._positionedTimedEvents(d, startHour, totalMinutes));

    // "Now" line position
    const nowDayIdx = days.findIndex(d => d.isSame(today, 'day'));
    const nowTopPct = Math.max(0, Math.min(100,
      ((this._nowMinutes - startHour * 60) / totalMinutes) * 100
    ));

    return html`
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden;">
        <!-- All-day row -->
        ${this._renderAllDayRow(days, allDayByDay)}

        <!-- Scrollable timed grid -->
        <div class="week-grid" style="--week-total-hours:${totalHours};">
          <!-- Time gutter -->
          <div class="week-time-gutter">
            <div style="height:0"></div>
            ${hours.map(h => html`
              <div class="week-time-label">${this._formatHour(h)}</div>
            `)}
          </div>

          <!-- Day columns -->
        ${days.map((day, idx) => html`
            <div class="week-day-column">
              <!-- Day header (sticky) -->
              <div class="week-day-header">
                <div class="week-day-name">${day.format('ddd')}</div>
                <div class="week-day-number ${day.isSame(today, 'day') ? 'today' : ''}">
                  ${day.date()}
                </div>
              </div>

              <!-- Hour rows (background grid) -->
              <div style="position:relative;height:${totalHours * HOUR_HEIGHT_PX}px;">
                ${hours.map(() => html`<div class="week-hour-row"></div>`)}

                <!-- "Now" line -->
                ${nowDayIdx === idx ? html`
                  <div class="now-line" style="top:${nowTopPct}%"></div>
                ` : nothing}

                <!-- Timed events -->
                ${repeat(
                  timedByDay[idx],
                  pe => `${pe.event.entityId}|${pe.event.uid}`,
                  pe => this._renderTimedEvent(pe)
                )}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _renderAllDayRow(days: Dayjs[], allDayByDay: CalendarEvent[][]) {
    const hasAny = allDayByDay.some(d => d.length > 0);
    if (!hasAny) return nothing;

    return html`
      <div style="
        display:grid;
        grid-template-columns:48px repeat(7,1fr);
        border-bottom:1px solid var(--msc-border);
        background:var(--msc-surface);
        flex-shrink:0;
      ">
        <div style="border-right:1px solid var(--msc-border);padding:4px 4px 4px 0;
          display:flex;align-items:flex-end;justify-content:flex-end;">
          <span style="font-size:9px;color:var(--msc-text-disabled);font-weight:700;padding-bottom:2px">all day</span>
        </div>
        ${days.map((_day, idx) => html`
          <div style="border-right:1px solid var(--msc-border);padding:3px 2px;min-height:28px;">
            ${allDayByDay[idx].map(ev => html`
              <div
                class="event-pill all-day"
                style="background:${ev.color};color:#000;margin-bottom:2px;font-size:10px;"
                title="${ev.summary}"
                @click=${() => this._onEventClick(ev)}
              >${ev.summary}</div>
            `)}
          </div>
        `)}
      </div>
    `;
  }

  private _renderTimedEvent(pe: PositionedEvent) {
    const { event: ev, col, totalCols, topPct, heightPct } = pe;
    const start = getEventStart(ev);
    const end = getEventEnd(ev);
    const colW = 100 / totalCols;

    return html`
      <div
        class="week-event"
        style=${styleMap({
          top: `${topPct}%`,
          height: `${Math.max(heightPct, 1.5)}%`,
          left: `${col * colW + 1}%`,
          width: `${colW - 2}%`,
          background: ev.color,
        })}
        title="${ev.summary}\n${formatTime(start)} – ${formatTime(end)}"
        @click=${() => this._onEventClick(ev)}
      >
        <div style="font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ev.summary}</div>
        <div style="font-size:9px;opacity:.7">${formatTime(start)} – ${formatTime(end)}</div>
      </div>
    `;
  }

  // ─── Layout helpers ────────────────────────────────────────────────────────

  private _positionedTimedEvents(day: Dayjs, startHour: number, totalMinutes: number): PositionedEvent[] {
    const timed = this.events.filter(ev => {
      if (ev.allDay) return false;
      if (this.hiddenCalendars.has(ev.entityId)) return false;
      return getEventStart(ev).isSame(day, 'day');
    });

    if (timed.length === 0) return [];

    // Sort by start
    timed.sort((a, b) => getEventStart(a).valueOf() - getEventStart(b).valueOf());

    // Simple column-overlap layout
    const columns: CalendarEvent[][] = [];

    const positioned: PositionedEvent[] = timed.map(ev => {
      const start = getEventStart(ev);
      const end = getEventEnd(ev);
      const startMin = start.hour() * 60 + start.minute();
      const endMin = end.hour() * 60 + end.minute();

      const topPct = ((startMin - startHour * 60) / totalMinutes) * 100;
      const heightPct = ((endMin - startMin) / totalMinutes) * 100;

      // Find a column where this event doesn't overlap
      let col = 0;
      while (columns[col]?.some(other => {
        const os = getEventStart(other);
        const oe = getEventEnd(other);
        return os.isBefore(end) && oe.isAfter(start);
      })) {
        col++;
      }
      if (!columns[col]) columns[col] = [];
      columns[col].push(ev);

      return { event: ev, col, totalCols: 1, topPct, heightPct };
    });

    // Second pass: set totalCols
    const maxCol = columns.length;
    positioned.forEach(pe => { pe.totalCols = maxCol; });

    return positioned;
  }

  private _allDayEventsForDay(day: Dayjs): CalendarEvent[] {
    return this.events.filter(ev => {
      if (!ev.allDay) return false;
      if (this.hiddenCalendars.has(ev.entityId)) return false;
      const start = getEventStart(ev);
      const end = getEventEnd(ev).subtract(1, 'day'); // end is exclusive
      return !day.isBefore(start, 'day') && !day.isAfter(end, 'day');
    });
  }

  private _getWeekStart(date: Dayjs, firstDow: number): Dayjs {
    const dow = date.day();
    const offset = (dow - firstDow + 7) % 7;
    return date.subtract(offset, 'day').startOf('day');
  }

  private _formatHour(h: number): string {
    if (h === 0) return '';
    if (h === 12) return '12 PM';
    return h < 12 ? `${h} AM` : `${h - 12} PM`;
  }

  private _getCurrentMinutes(): number {
    const now = dayjs();
    return now.hour() * 60 + now.minute();
  }

  // ─── Events ────────────────────────────────────────────────────────────────

  private _onEventClick(ev: CalendarEvent) {
    this.dispatchEvent(new CustomEvent('event-click', { detail: { event: ev }, bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'msc-week-view': WeekView;
  }
}
