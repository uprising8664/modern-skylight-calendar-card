# Modern Skylight Calendar Card

A sleek, neon-themed, flicker-free Home Assistant Lovelace calendar card.

## Features

- **Month, Week, and List** views
- **Neon / Material Design 3** dark theme
- **Flicker-free** — Lit reactive rendering, no full DOM teardown
- **Real-time updates** via HA WebSocket event (`gcal_webhook_fired`)
- **Polling fallback** with configurable interval
- **Calendar toggle badges** persisted to `localStorage`
- **Add / Edit / Delete** events (full dialog UI)
- HACS-compatible

## Installation via HACS

1. HACS → Frontend → ⋮ → Custom repositories
2. URL: `https://github.com/uprising8664/modern-skylight-calendar-card`
3. Category: **Dashboard**
4. Install and restart Home Assistant

## Configuration

```yaml
type: custom:modern-skylight-calendar-card
entities:
  - calendar.my_calendar
title: Calendar
view: month                  # month | week | list
refresh_interval: 3600       # seconds, polling fallback
ha_refresh_event: gcal_webhook_fired
first_day_of_week: 1         # 0 = Sunday, 1 = Monday
enable_event_management: true
```

## Full config reference

| Key | Default | Description |
|-----|---------|-------------|
| `entities` | required | List of calendar entity IDs |
| `view` | `month` | Default view: `month`, `week`, `list` |
| `title` | — | Card title |
| `refresh_interval` | `3600` | Polling interval in seconds |
| `ha_refresh_event` | — | HA event name for instant refresh |
| `first_day_of_week` | `1` | `0` = Sunday, `1` = Monday |
| `show_week_numbers` | `false` | Show ISO week numbers in month view |
| `week_start_hour` | `0` | First hour shown in week view |
| `week_end_hour` | `24` | Last hour shown in week view |
| `enable_event_management` | `true` | Enable add/edit/delete |
| `readonly_calendars` | `[]` | Entity IDs that cannot be edited |
| `compact_header` | `false` | Hide view switcher and badge row |
| `compact_height` | `false` | Smaller card height hint |
| `max_events` | `0` | Cap total events (0 = unlimited) |
| `preference_storage_key` | `msc-prefs` | localStorage key prefix |
