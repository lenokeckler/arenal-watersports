# Session bar

## Intent

Let a signed-in worker close the session of this device from any screen, with a visible control
that asks for one confirming tap and tells the worker what is happening.

## In scope

- `LogoutButton`: the labelled, 48 px exit control, rendered from a phase.
- `LogoutStatus`: the always-mounted live region that announces the pending state.
- `SessionBar`: the client container that calls `useLogoutViewModel`; `SessionBarView`: the
  presentational `<header>` that lays out the status, the button and the error banner.
- The mount in `app/(system)/layout.tsx`, before the children, inside `SystemScreen`.
- The phase vocabulary (`LOGOUT_PHASE`) and the Spanish copy, addressed as usted.

## Out of scope

- The two-tap state machine, the double-tap latch, the reset timeout and the sign-out call (owned
  by `useLogoutViewModel`).
- Any bottom navigation, theme toggle or confirmation dialog.

## Requirements

- Phases: `idle`, `confirming`, `pending`, `failed`. The button only renders them; it never
  changes phase.
- The button is `type="button"`, at least 48 px tall, with the word always visible. The visible
  text is the accessible name; there is no `aria-label`.
- Label by phase: `idle` and `failed` show "Cerrar sesión"; `confirming` shows "¿Confirmar cierre
  de sesión?"; `pending` shows "Cerrando sesión…".
- Icon by phase: `logout` in `idle`, `confirming` and `failed`; a spinning `progress_activity` in
  `pending` (static under reduced motion), through the feature's own `resolveLogoutIconClassName` (`shrink-0 text-lg`, plus the spin class only while pending), so the glyph survives a two-line label.
- `confirming` is emphasised with the `primary` border and a `primary/10` fill: calm, never red.
- `pending` sets `aria-disabled="true"` and never the `disabled` attribute, so focus is kept;
  every other phase leaves `aria-disabled` false.
- A press calls `onPress` once; ignoring presses while pending belongs to the view model.
- The status region is always mounted with `role="status"` and `sr-only`; it holds the message it
  is given and is empty when the message is empty.
- The bar is a `<header>` landmark, `sticky top-0` and in flow (never `fixed`), with no heading and
  no bottom padding added to the content.
- A right-aligned row holds the status region and the button; `LogoutButton` is its last item.
- `FormErrorBanner` shows `errorMessage` below the row, inside the sticky bar, only when there is
  one; it never navigates.
- `(system)/layout.tsx` stays a server component and renders
  `<SystemScreen><SessionBar />{children}</SystemScreen>`: home and every `/profile/*` screen show the bar, nothing under
  `app/access/` does. `system-screen` never imports `session-bar`.

## Acceptance

- Unit tests in `tests/` cover every button phase, the status region, the view model (two taps,
  single sign-out, failure and retry) and the bar (one banner, the button last, the error only on
  failure, no logout route handler). The browser flow is covered by the end-to-end specs of US-ACC-08.
