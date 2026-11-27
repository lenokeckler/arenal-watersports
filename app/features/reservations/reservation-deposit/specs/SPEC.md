# Reservation deposit

US-RES-29 — Registro del depósito recibido (AWS-112).

Como la persona de reservas, necesito registrar el depósito de garantía que recibí del cliente, con la finalidad de dejar constancia de una plata que es de él y que la empresa solo está guardando.

## Acceptance criteria

- C1: el depósito lo recibe la oficina cuando el cliente pasa a pagar, así que lo registra reservas. Operaciones no lo ve ni lo cobra.
- C2: el sistema propone el monto a partir de la categoría del equipo que va a salir.
- C3: reservas indica si en esa salida hubo depósito o no, porque no todas lo llevan.
- C4: se registra el monto y la moneda en que se recibió.
- C5: desde ese momento el depósito aparece en la lista de pendientes de resolver.

## One decision per reservation

- "Sí, se recibió depósito" inserts one `deposits` row in status `held` with the amount and currency.
- "No hubo depósito" inserts one `deposit_declinations` row (primary key `reservation_id`) with its author. It is stored so the detail stops offering the action and shows "Sin depósito".
- `resolveReservationDepositDecision` (`app/utils/reservations`) is the single rule that reads both into received, declined or undecided. A received deposit wins over a declination.
- A second decision is refused by `record_reservation_deposit`, which locks the reservation row (`select ... for update`) before checking. Two decisions sent at the same time are serialised; this cannot be exercised in pgTAP (one transaction per file), so it is covered by this note and by review of the lock.
- No editing or deleting a decision. Resolving the deposit is US-RES-30.

## Entry rules

- The decision is recorded while the reservation is scheduled or dispatched (`RESERVATION_DEPOSITABLE_STATUS`), on the original reservation only: a split child keeps its deposit on the original.
- The screen `/reservations/<id>/deposit` shows a message instead of the form when the reservation is a split child, already has a decision, or is closed or cancelled (`resolveReservationDepositUnavailableReason`, in that order).

## Proposal (C2)

- `reservation_deposit_proposal(p_reservation_id)` is the only implementation: per currency, the category deposit of every equipment item, a unit item once and a category item times its quantity. Extras and categories without an amount add 0. The app never recomputes it.
- The form opens on "Sí" with the dollar proposal, or the colones one when only colones have an amount, or on "No hubo depósito" when nothing is proposed.
- Changing the currency puts that currency's proposal in the amount (empty when it has none). A typed number never carries over into the other currency (RNF-034).
- The amount stays editable: what was really received is stored, even when it differs from the proposal.

## Validation

- Amount on a "Sí": required, numbers only, above zero, two decimals at most, 10 integer digits in dollars and 12 in colones. The same rules run on screen, in the server action and in the database (`private.parse_reservation_charge_amount`).
- A "No" sends neither amount nor currency, and the database ignores them.

## Access (C1, RNF-038)

- The screen asserts the Reservas mode before reading (`assertReservationCalendarAccess`); the action asserts it again before recording.
- `record_reservation_deposit` and `reservation_deposit_proposal` require reservations access; `deposits` and `deposit_declinations` RLS restrict reading and writing to Reservas and administration.

## Pending list (C5)

- The pending list `/reservations/deposits` already lists `held` deposits. The action revalidates it and the reservation detail after recording.

## Unconfirmed result

- When the request fails after it may have reached the server, the form shows "No pudimos confirmar el depósito. Revise la reserva antes de volver a intentarlo." and stays locked, so the same deposit is not recorded twice. Offline, nothing is sent and the form can be sent again with signal.
