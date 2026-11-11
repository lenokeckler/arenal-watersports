# Session activity

## Intent

Tell the server that the worker is still using the app, so the night inactivity limit of
US-ACC-10 counts from the last action on screen, warn two minutes before that limit, and make a
session already closed leave the screen.

## In scope

- `SessionActivityTracker`: a client component mounted once in `app/(system)/layout.tsx`; it
  renders nothing until the warning is due.
- `useSessionActivityTracker`: listens to `pointerdown` and `keydown` on `window` (passive) and
  reports at most once per `SESSION_ACTIVITY.REPORT_INTERVAL_MS` (one minute).
- `reportSessionActivity`: calls `touch_current_session_activity` and returns the session state.
- `SESSION_END_PATH`: where each state sends the worker — `idle` to the login with the inactivity
  notice, `ended` to the login, `live` nowhere.
- `useSessionIdleClock`: asks `current_session_seconds_left` when the screen opens, after every
  live report and when the phone shows the screen again, then schedules the warning
  `SESSION_ACTIVITY.WARNING_LEAD_SECONDS` (two minutes) before the limit. When the countdown ends
  it asks the server again: a few seconds more keep counting, anything else goes to the login.
- `SessionIdleWarning`: an alert dialog with the countdown, `Seguir trabajando` (reports an action
  and asks the clock again) and `Cerrar sesión` (signs this device out, as the session bar does).
  Taps inside it never count as activity, so `Cerrar sesión` cannot extend the session.

## Out of scope

- Deciding the time window, the limit or the seconds left: the database does it with its own
  clock (`session_idle_deadline`), never the phone. The phone only counts down the seconds the
  server gave it.
- Signing the session out: the proxy does it on the next request.

## Requirements

- A failed or unreadable report never sends the worker anywhere: the server stays the authority
  and the proxy closes the session on the next request.
- Navigation uses `router.replace`, so Back never returns to a screen of a closed session.
- Listeners are removed on unmount.
