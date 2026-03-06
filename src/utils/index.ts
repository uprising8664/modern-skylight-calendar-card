import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);

export { dayjs };
export type { Dayjs };

// ─── Date helpers ─────────────────────────────────────────────────────────────

export function getEventStart(event: { start: { dateTime?: string; date?: string } }): Dayjs {
  const v = event.start.dateTime || event.start.date;
  return dayjs(v);
}

export function getEventEnd(event: { end: { dateTime?: string; date?: string } }): Dayjs {
  const v = event.end.dateTime || event.end.date;
  return dayjs(v);
}

export function isAllDay(event: { start: { dateTime?: string; date?: string } }): boolean {
  return !event.start.dateTime;
}

export function formatTime(dt: Dayjs, use24h = false): string {
  return dt.format(use24h ? 'HH:mm' : 'h:mm A');
}

export function formatDateRange(start: Dayjs, end: Dayjs): string {
  if (start.isSame(end, 'day')) {
    return start.format('MMM D');
  }
  if (start.isSame(end, 'month')) {
    return `${start.format('MMM D')}–${end.format('D')}`;
  }
  return `${start.format('MMM D')} – ${end.format('MMM D')}`;
}

export function chunkDateRange(start: Dayjs, end: Dayjs, chunkDays = 30): Array<{ start: Dayjs; end: Dayjs }> {
  const chunks: Array<{ start: Dayjs; end: Dayjs }> = [];
  let cursor = start;
  while (cursor.isBefore(end)) {
    const chunkEnd = cursor.add(chunkDays, 'day').isAfter(end) ? end : cursor.add(chunkDays, 'day');
    chunks.push({ start: cursor, end: chunkEnd });
    cursor = chunkEnd;
  }
  return chunks;
}

export function getFetchRange(currentDate: Dayjs, view: string): { start: Dayjs; end: Dayjs } {
  if (view === 'month') {
    return {
      start: currentDate.startOf('month').subtract(7, 'day'),
      end: currentDate.endOf('month').add(14, 'day'),
    };
  }
  if (view === 'week') {
    return {
      start: currentDate.startOf('week').subtract(1, 'day'),
      end: currentDate.endOf('week').add(1, 'day'),
    };
  }
  // list
  return {
    start: currentDate.subtract(1, 'day'),
    end: currentDate.add(90, 'day'),
  };
}

// ─── Color helpers ───────────────────────────────────────────────────────────

export const NEON_PALETTE = [
  '#00e5ff', // cyan
  '#ff4081', // pink
  '#c6ff00', // lime
  '#ff9100', // orange
  '#d500f9', // purple
  '#00e676', // green
  '#ffea00', // yellow
  '#2979ff', // blue
];

export function getDefaultColor(index: number): string {
  return NEON_PALETTE[index % NEON_PALETTE.length];
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ─── Event identity ──────────────────────────────────────────────────────────

export function getEventKey(entityId: string, event: {
  uid?: string;
  recurring_event_id?: string;
  recurrence_id?: string;
  summary?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}): string {
  const start = event.start.dateTime || event.start.date || '';
  const end = event.end.dateTime || event.end.date || '';
  return `${entityId}|${event.uid || ''}|${event.recurring_event_id || ''}|${start}|${end}|${event.summary || ''}`;
}

// ─── Storage helpers ─────────────────────────────────────────────────────────

export function loadPreference<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function savePreference(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full / blocked
  }
}
