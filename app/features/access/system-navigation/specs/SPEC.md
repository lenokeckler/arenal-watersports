# System navigation

## Intent

Give signed-in users a persistent, mobile-friendly way to reach the destinations available in
their active work area.

## Acceptance criteria

- “Da acceso al tablero, al calendario, al inventario y al historial.”
- “Las opciones que se muestran dependen del rol y del modo activo.”

## Scope of this increment

- Render a fixed bottom navigation for Operations and Reservations work modes.
- Link the board and active area's calendar using existing `PATHS` entries.
- Show Inventory in Operations and Income in Reservations as disabled until their routes are
  integrated. Show History as disabled until its route is integrated. Disabled destinations have
  no `href` and cannot navigate to a missing route.
- Provide a small Menu panel with existing Profile and work-mode selector destinations.
- Keep navigation visibility separate from authorization; server-side route checks remain
  authoritative.
- Reserve content clearance and the device safe area below the fixed navigation.

## Pending

- Enable Inventory after the inventory route stack is integrated.
- Enable History after the history route stack is integrated.
- Confirm route-level access for every destination before enabling links. This increment does not
  complete the acceptance criteria and is not ready for QA sign-off.
