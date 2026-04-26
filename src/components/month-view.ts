import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { safeCustomElement } from '../utils/safe-custom-element.js';
import { repeat } from 'lit/directives/repeat.js';
import { baseStyles } from '../styles/index.js';
import type { CalendarEvent, CardConfig } from '../types/index.js';
import { dayjs, type Dayjs, getEventStart, getEventEnd, formatTime } from '../utils/index.js';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DayCell {
  date: Dayjs;
  otherMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

// ─── Component ────────────────────────────────────────────────────────────────

@safeCustomElement('msc-month-view')
export class MonthView extends LitElement {
  static styles = [baseStyles];

  @property({ attribute: false }) events: CalendarEvent[] = [];
  @property({ attribute: false }) currentDate: Dayjs = dayjs();
  @property({ attribute: false }) config!: CardConfig;
  @property({ attribute: false }) hiddenCalendars: Set<string> = new Set();

  // Maximum pills to show per day before "+N more"
  private readonly MAX_PILLS = 3;

  // ─── Render ────────────────────────────────────────────────────────────────

  render() {
    const firstDow = this.config?.first_day_of_week ?? 1; // 1 = Monday default
    const today = dayjs();
    const monthStart = this.currentDate.startOf('month');
    const monthEnd = this.currentDate.endOf('month');

    // Leading days from previous month
    let gridStart = monthStart.startOf('week');
    // Adjust for first_day_of_week
    const dow = monthStart.day(); // 0=Sun
    const offset = (dow - firstDow + 7) % 7;
    gridStart = monthStart.subtract(offset, 'day');

    // Trailing days to complete last row
    let gridEnd = monthEnd.endOf('week');
    const endDow = monthEnd.day();
    const endOffset = (6 - endDow + firstDow) % 7;
    gridEnd = monthEnd.add(endOffset, 'day');

    // Build day cells
    const cells: DayCell[] = [];
    let cursor = gridStart;
    while (cursor.isSameOrBefore(gridEnd, 'day')) {
      const dateStr = cursor.format('YYYY-MM-DD');
      const dayEvents = this._eventsForDay(dateStr);
      cells.push({
        date: cursor,
        otherMonth: cursor.month() !== this.currentDate.month(),
        isToday: cursor.isSame(today, 'day'),
        events: dayEvents,
      });
      cursor = cursor.add(1, 'day');
    }

    // Day-of-week header labels
    const dayNames = this._buildDayNames(firstDow);
    const showWeekNumbers = this.config?.show_week_numbers ?? false;

    return html`
      <div class="month-view-wrapper" style="display:flex;flex-direction:column;height:100%;">
        <!-- Day-of-week headers -->
        <div class="day-headers" style="${showWeekNumbers ? 'grid-template-columns: 28px repeat(7,1fr)' : ''}">
          ${showWeekNumbers ? html`<div class="day-header-cell" style="color:var(--msc-text-disabled)">W</div>` : nothing}
          ${dayNames.map(n => html`<div class="day-header-cell">${n}</div>`)}
        </div>

        <!-- Month grid -->
        <div class="month-grid" style="${showWeekNumbers ? 'grid-template-columns: 28px repeat(7,1fr)' : ''}">
          ${this._renderRows(cells, showWeekNumbers)}
        </div>
      </div>
    `;
  }

  private _renderRows(cells: DayCell[], showWeekNumbers: boolean) {
    if (!showWeekNumbers) {
      // Simple flat list — Lit's repeat keyed by date string
      return repeat(
        cells,
        cell => cell.date.format('YYYY-MM-DD'),
        cell => this._renderDayCell(cell)
      );
    }

    // Insert week-number labels at the start of each row
    const rows: unknown[] = [];
    for (let i = 0; i < cells.length; i += 7) {
      const rowCells = cells.slice(i, i + 7);
      const weekNum = rowCells[0].date.week();
      rows.push(html`
        <div class="day-cell" style="background:var(--msc-surface);cursor:default;display:flex;align-items:flex-start;justify-content:center;padding-top:6px;">
          <span style="font-size:var(--msc-font-size-xs);color:var(--msc-text-disabled);font-weight:700">${weekNum}</span>
        </div>
        ${rowCells.map(cell => this._renderDayCell(cell))}
      `);
    }
    return rows;
  }

  private _renderDayCell(cell: DayCell) {
    const visible = cell.events.filter(e => !this.hiddenCalendars.has(e.entityId));
    const shown = visible.slice(0, this.MAX_PILLS);
    const overflow = visible.length - this.MAX_PILLS;

    return html`
      <div
        class="day-cell ${cell.otherMonth ? 'other-month' : ''} ${cell.isToday ? 'today' : ''}"
        @click=${() => this._onDayClick(cell.date)}
      >
        <span class="day-number">${cell.date.date()}</span>
        ${repeat(
          shown,
          ev => `${ev.entityId}|${ev.uid}`,
          ev => this._renderPill(ev)
        )}
        ${overflow > 0 ? html`
          <div class="more-events-label"
            @click=${(e: Event) => { e.stopPropagation(); this._onMoreClick(cell.date, visible); }}>
            +${overflow} more
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderPill(ev: CalendarEvent) {
    const start = getEventStart(ev);
    const bg = ev.color;
    const timeLabel = ev.allDay ? '' : formatTime(start, false);

    return html`
      <div
        class="event-pill ${ev.allDay ? 'all-day' : 'timed'}"
        style="background:${bg};color:#000"
        title="${ev.summary}${ev.location ? ` · ${ev.location}` : ''}"
        @click=${(e: Event) => { e.stopPropagation(); this._onEventClick(ev); }}
      >
        ${timeLabel ? html`<span style="opacity:.55;font-size:9px;flex-shrink:0">${timeLabel}</span>` : nothing}
        <span style="overflow:hidden;text-overflow:ellipsis">${ev.summary}</span>
      </div>
    `;
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private _eventsForDay(dateStr: string): CalendarEvent[] {
    const day = dayjs(dateStr);
    return this.events.filter(ev => {
      const start = getEventStart(ev);
      const end = getEventEnd(ev);
      if (ev.allDay) {
        // All-day end is exclusive in Google Calendar
        const inclusiveEnd = end.subtract(1, 'day');
        return !day.isBefore(start, 'day') && !day.isAfter(inclusiveEnd, 'day');
      }
      return start.isSame(day, 'day');
    }).sort((a, b) => {
      // All-day first, then by start time
      if (a.allDay && !b.allDay) return -1;
      if (!a.allDay && b.allDay) return 1;
      return getEventStart(a).valueOf() - getEventStart(b).valueOf();
    });
  }

  private _buildDayNames(firstDow: number): string[] {
    const names = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const rotated: string[] = [];
    for (let i = 0; i < 7; i++) {
      rotated.push(names[(firstDow + i) % 7]);
    }
    return rotated;
  }

  // ─── Events ────────────────────────────────────────────────────────────────

  private _onDayClick(date: Dayjs) {
    this.dispatchEvent(new CustomEvent('day-click', { detail: { date: date.toDate() }, bubbles: true, composed: true }));
  }

  private _onEventClick(ev: CalendarEvent) {
    this.dispatchEvent(new CustomEvent('event-click', { detail: { event: ev }, bubbles: true, composed: true }));
  }

  private _onMoreClick(date: Dayjs, events: CalendarEvent[]) {
    this.dispatchEvent(new CustomEvent('more-click', { detail: { date: date.toDate(), events }, bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'msc-month-view': MonthView;
  }
}
