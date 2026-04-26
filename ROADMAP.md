# Roadmap

## Multi-User / Family Calendar Support

The card already supports multiple calendar entities simultaneously — different colors, names, and badge toggles. The next step is making the experience feel truly multi-user, similar to Skylight.

### What's already there
- Multiple calendar entities with per-entity color and name
- Badge toggles to show/hide individual calendars
- Calendar selector dropdown when creating events (if multiple writable calendars exist)

### What to add

**User profiles / personas**
- Group calendars under a named "person" (e.g. Daniel, Partner, Kids)
- Show a person avatar/chip in the header instead of raw calendar entity badges
- Tapping an avatar filters to that person's calendars

**Shared family calendar**
- Designate one calendar as "family" (visible to all, editable by all)
- Visual distinction (e.g. bold outline on event chips) for shared events

**Per-user write defaults**
- When adding an event, remember the last calendar used per session
- Optional: config-level `default_entity` per user/device

**"Who's busy" view**
- Side-by-side column layout in week view, one column per person
- Useful for shared kiosk display at a glance

---

## HA Multi-User (Longer Term)

If Home Assistant is set up with multiple user accounts (each with their own Google/calendar integration), the card could auto-detect the current HA user and pre-select their calendars. This requires:

- HA `hass.user.id` / `hass.user.name` (already available in the card context)
- A config map of `user_id → entity_ids` in `calendar_card.yaml`
- Filtering badge defaults and create-event defaults by the active user

This is a larger lift and requires HA multi-user setup, but the card scaffolding (preferences storage, entity resolution) is already in place to support it.

---

## Other Planned Improvements

| Feature | Priority | Notes |
|---|---|---|
| Recurrence editing (this / this & following / all) | High | UI dialog for recurring event save scope |
| Drag-to-reschedule in week view | Medium | Pointer events on event chips |
| Event color override per-event | Medium | Custom color field in create/edit dialog |
| iCal / read-only calendar support | Medium | Display only, no write |
| Notification badges (upcoming events) | Low | Count chip on avatar or header |
| Print / export view | Low | CSS print stylesheet for month view |

---

## CalDAV Integration

### Background

The card currently talks to HA's calendar platform exclusively via the HA WebSocket/service API. HA acts as a middleware — it fetches events from Google Calendar, caches them, and exposes them via `calendar.*` entities. The card never talks to Google directly.

**CalDAV** is the open standard protocol (RFC 4791) for syncing calendars over HTTP. It is supported natively by Google Calendar, Apple iCloud, Nextcloud, Fastmail, Proton Calendar, Radicale, and most other calendar backends.

---

### Current Architecture

```
Google Calendar API
       ↓
   HA google integration  ←→  HA WebSocket API
       ↓                              ↓
  calendar.* entities       modern-skylight-calendar-card
```

### CalDAV Architecture (Option A — via HA)

Add the [HA CalDAV integration](https://www.home-assistant.io/integrations/caldav/) alongside or instead of the Google integration. The card changes **nothing** — it still talks to `calendar.*` entities via the same HA API.

```
CalDAV server (Google / Nextcloud / iCloud)
       ↓
  HA caldav integration  ←→  HA WebSocket API
       ↓                              ↓
  calendar.* entities       modern-skylight-calendar-card (no changes)
```

### CalDAV Architecture (Option B — card as direct CalDAV client)

The card bypasses HA entirely for calendar data and talks directly to a CalDAV server. This is a significant rewrite.

```
CalDAV server
       ↓
modern-skylight-calendar-card (direct HTTP/fetch)
```

This requires:
- A CalDAV server reachable from the browser (CORS-friendly or proxied through HA)
- Auth token management in the card config
- Replacing all `hass.callWS` / `hass.connection.sendMessagePromise` calls with raw `REPORT`, `PUT`, `DELETE` HTTP requests using the CalDAV/iCalendar format
- Parsing iCalendar (`.ics`) format: `VEVENT`, `DTSTART`, `DTEND`, `RRULE`, etc.
- Writing iCalendar back on create/update/delete

**Option B is not recommended** — it's a large amount of protocol implementation work with no real benefit over Option A, since HA already ships a CalDAV integration.

---

### Changes Required (Option A — recommended)

**In HA (zero card changes):**

1. Add the CalDAV integration in HA UI → Settings → Integrations → CalDAV
2. Provide the CalDAV URL, username, and password (or app password)
3. HA will discover and create `calendar.*` entities automatically
4. Add those entity IDs to `calendar_card.yaml`

That's it. The card works with any `calendar.*` entity regardless of whether it came from Google, CalDAV, iCloud, or anything else.

**Example CalDAV URLs:**
| Provider | URL |
|---|---|
| Google Calendar | `https://www.google.com/calendar/dav/{email}/user` |
| iCloud | `https://caldav.icloud.com` |
| Nextcloud | `https://{your-server}/remote.php/dav/calendars/{user}/` |
| Fastmail | `https://caldav.fastmail.com/dav/principals/user/{email}/` |
| Proton Calendar | Not supported (no CalDAV write yet as of 2026) |
| Radicale (self-hosted) | `http://{server}:5232/{user}/` |

---

### Google CalDAV vs. Google HA Integration — Pros & Cons

#### Current Setup: HA Google Calendar Integration (OAuth)

| | |
|---|---|
| **Pro** | Full read/write support — create, update, delete, recurrence |
| **Pro** | Uses OAuth — no passwords stored, tokens refresh automatically |
| **Pro** | Supports Google-specific features (Meet links, attendees in future) |
| **Pro** | Already configured and working on this instance |
| **Pro** | Supports multiple Google accounts simultaneously |
| **Con** | Requires a Google Cloud project + OAuth credentials setup |
| **Con** | Google periodically revokes tokens, requiring re-auth |
| **Con** | Dependent on Google — if you move providers, requires reconfiguration |
| **Con** | Integration only supports the account used during OAuth setup |

#### Alternative: HA CalDAV Integration

| | |
|---|---|
| **Pro** | Provider-agnostic — works with any CalDAV server (Nextcloud, iCloud, Fastmail, self-hosted) |
| **Pro** | Simpler credential model — username + app password, no OAuth app registration |
| **Pro** | Easier to add a second user's calendars (just add another CalDAV integration with their credentials) |
| **Pro** | Self-hosting option (Radicale, Baikal) gives full data ownership |
| **Con** | HA CalDAV integration is **read-only** — no create/update/delete via HA service calls |
| **Con** | CalDAV write would require Option B (direct from card), which is complex |
| **Con** | Google's CalDAV support is less reliable than their native API |
| **Con** | No token refresh — app passwords can be revoked/expired |

### Recommendation

**Stay on the Google integration for now.** It's fully functional, supports write operations, and is already configured.

Consider CalDAV if/when:
- You want to add a **second user's iCloud or non-Google calendar** (iCloud CalDAV works well in HA)
- You want to move to a **self-hosted or privacy-first** calendar backend (Nextcloud + CalDAV is a clean migration path)
- Google OAuth becomes a recurring maintenance headache

For the multi-user family goal specifically: the simplest path is to **share your Google calendars with family members' Google accounts**, add those shared calendars to your Google account, and they'll appear automatically as additional `calendar.*` entities in HA with no additional integration work.
