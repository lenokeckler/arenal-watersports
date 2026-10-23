# Reservation detail

## Intent

Let Reservations open one read-only view of an outing and see its reservation, committed equipment, extras, assigned guides, charge state, audit names, and dispatched groups.

## In scope

- Load one reservation and all related records required by US-RES-03.
- Derive a read-only base-tariff charge state from configured reservation pricing and tariff charges, keeping USD and CRC separate; display refunds separately by currency.
- Show each dispatch's actual departure, expected return, and actual arrival only when it has returned.
- Provide the read-only data contract used by the responsive reservation detail route.

## Out of scope

- Creating or changing reservations, equipment assignments, extras, guides, charges, refunds, or dispatches.
- Showing monetary information to Operations.
- Adding an active-area mode guard from US-ACC-11 or US-TAB-07.
- Claiming an actual return timestamp: the current schema stores `ends_at` as an expected return and `closed_at` as actual arrival.
- Inventing pricing when a reservation has no pricing row.

## Requirements

- Se muestra toda la información asociada a la salida.
- Incluye el equipo comprometido, los extras, los guías asignados y el estado del cobro.
- Indica quién creó la reserva y quién la modificó de último.
- Lista cada grupo despachado con su hora real de salida, su hora de regreso y, si ya volvió, su hora de llegada.
- Require an authenticated Reservations-area or administrator account using the existing server authorization pattern and Supabase RLS.
- Keep currency amounts separate; never convert currencies or include deposits in charge status.
- Calculate base-tariff status from `tariff` charges only; show `extra_time` charges and reservation-level refunds separately because refunds are not linked to a charge kind.
- Treat `reservation_dispatches.dispatched_at` as actual departure, `ends_at` as expected return, and `closed_at` as actual arrival.
- Render loading, missing-reservation, empty-related-data, and query-error states explicitly.
- Render mobile-first from the Stitch reservation-detail reference and use the existing design tokens and shared components.

## Charge state

- A missing configured amount is `unpriced`; do not infer that a reservation is paid or unpaid.
- A split child's base charge remains on the original reservation; identify that state instead of labeling the child unpriced.
- Show `extra_time` charges separately by currency. Reservation-level refunds are shown separately and are not attributed to a charge kind because the schema does not link them to a charge.
- Compare gross recorded `tariff` charges against the configured agreed amount, falling back to list amount only when no agreed amount exists for that currency.
- Compare each currency independently. The state is `pending` when no amount is recorded, `partial` when a positive balance remains after some payment, and `paid` only when every configured currency target is met.
- Do not use deposits or convert between currencies.

## Acceptance criteria

- [ ] Se muestra toda la información asociada a la salida.
- [ ] Incluye el equipo comprometido, los extras, los guías asignados y el estado del cobro.
- [ ] Indica quién creó la reserva y quién la modificó de último.
- [ ] Lista cada grupo despachado con su hora real de salida, su hora de regreso y, si ya volvió, su hora de llegada.
