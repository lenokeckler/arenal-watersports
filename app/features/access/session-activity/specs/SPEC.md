# Session activity

## Intent

Tell the server that the worker is still using the app, so the night inactivity limit of
US-ACC-10 counts from the last action on screen and a session already closed leaves the screen.

## In scope

- `SessionActivityTracker`: a client component with no markup, mounted once in
  `app/(system)/layout.tsx`.
- `useSessionActivityTracker`: listens to `pointerdown` and `keydown` on `window` (passive) and
  reports at most once per `SESSION_ACTIVITY.REPORT_INTERVAL_MS` (one minute).
- `reportSessionActivity`: calls `touch_current_session_activity` and returns the session state.
- `SESSION_END_PATH`: where each state sends the worker — `idle` to the login with the inactivity
  notice, `ended` to the login, `live` nowhere.

## Out of scope

- Deciding the time window or the limit: the database does it with its own clock
  (`session_idle_expired`), never the phone.
- Signing the session out: the proxy does it on the next request.
- Any warning before the session closes (US-ACC-10 asks for none).

## Requirements

- A failed or unreadable report never sends the worker anywhere: the server stays the authority
  and the proxy closes the session on the next request.
- Navigation uses `router.replace`, so Back never returns to a screen of a closed session.
- Listeners are removed on unmount.
