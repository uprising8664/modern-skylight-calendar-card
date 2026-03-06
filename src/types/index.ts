// ─── Home Assistant types ────────────────────────────────────────────────────

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale?: { language: string };
  connection: HassConnection;
  callWS<T>(params: object): Promise<T>;
  callApi<T>(method: string, path: string, parameters?: object): Promise<T>;
  callService(domain: string, service: string, data?: object, target?: object): Promise<void>;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HassConnection {
  subscribeEvents<T>(
    callback: (event: HassEvent<T>) => void,
    eventType: string
  ): Promise<() => void>;
  sendMessagePromise<T>(message: object): Promise<T>;
}

export interface HassEvent<T = unknown> {
  event_type: string;
  data: T;
  origin: string;
  time_fired: string;
}

// ─── Calendar types ──────────────────────────────────────────────────────────

export interface CalendarEventDateTime {
  dateTime?: string;
  date?: string;
}

export interface RawCalendarEvent {
  uid?: string;
  summary?: string;
  description?: string;
  location?: string;
  start: CalendarEventDateTime;
  end: CalendarEventDateTime;
  recurrence_id?: string;
  recurring_event_id?: string;
  rrule?: string;
}

export interface CalendarEvent {
  uid: string;
  summary: string;
  description?: string;
  location?: string;
  start: CalendarEventDateTime;
  end: CalendarEventDateTime;
  entityId: string;
  color: string;
  allDay: boolean;
  recurring: boolean;
  recurrenceId?: string;
  recurringEventId?: string;
}

export type ViewMode = 'month' | 'week' | 'list';

// ─── Card config ─────────────────────────────────────────────────────────────

export interface CalendarEntityConfig {
  entity: string;
  color?: string;
  name?: string;
}

export interface CardConfig {
  entities: Array<string | CalendarEntityConfig>;
  view?: ViewMode;
  title?: string;
  first_day_of_week?: number;       // 0 = Sunday, 1 = Monday
  refresh_interval?: number;        // seconds, polling fallback (default 3600)
  ha_refresh_event?: string;        // HA event to trigger instant refresh
  show_week_numbers?: boolean;
  week_start_hour?: number;
  week_end_hour?: number;
  enable_event_management?: boolean;
  readonly_calendars?: string[];
  colors?: Record<string, string>;  // entity_id → hex color
  calendar_names?: Record<string, string>;
  compact_header?: boolean;
  compact_height?: boolean;
  preference_storage_key?: string;
  // Advanced
  max_events?: number;
}

export interface ResolvedEntityConfig {
  entityId: string;
  color: string;
  name: string;
  readonly: boolean;
}

// ─── Internal state ──────────────────────────────────────────────────────────

export interface LoadedRange {
  startDate: Date;
  endDate: Date;
}

export interface EventDialogState {
  open: boolean;
  mode: 'add' | 'edit';
  event?: CalendarEvent;
  defaultDate?: Date;
  defaultEntityId?: string;
}
