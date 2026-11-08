# System navigation

## Intent

Give signed-in users a persistent, mobile-friendly way to reach the destinations available in
their active work area.

## Acceptance criteria

- "Da acceso al tablero, al calendario, al inventario y al historial."
- "Las opciones que se muestran dependen del rol y del modo activo."

## Scope of this increment

- Render a fixed bottom navigation for Operations and Reservations work modes.
- Keep the navigation hidden in Administration mode.
- Link the board and active area's calendar using existing `PATHS` entries.
- Show Inventory in Operations and History in both supported work areas as active destinations.
- Provide a small Menu panel with existing Profile and work-mode selector destinations.
- Keep navigation visibility separate from authorization; server-side route checks remain
  authoritative.
- Reserve content clearance and the device safe area below the fixed navigation.

## Verification

- Inventory, History, calendar, and board routes are present in the current develop base.
- UI visibility reflects the server-provided granted areas and active mode. It does not authorize
  access; the destination routes remain responsible for server-side authorization.
