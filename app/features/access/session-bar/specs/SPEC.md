# Session bar

## Intent

Let a signed-in worker close the session of this device from any screen, with a visible control
that asks for one confirming tap and tells the worker what is happening.

## In scope

- `LogoutButton`: the labelled, 48 px exit control, rendered from a phase.
- `LogoutStatus`: the always-mounted live region that announces the pending state.
- The phase vocabulary (`LOGOUT_PHASE`) and the Spanish copy, addressed as usted.

## Out of scope

- The two-tap state machine, the double-tap latch, the reset timeout and the sign-out call (view
  model, later rung).
- The error banner, the bar that holds the button and its mount in `(system)/layout.tsx` (later
  rungs).
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

## Acceptance

- Covered by `tests/` once the tests of this rung are written; the browser flow is covered by the
  end-to-end rungs of US-ACC-08.
