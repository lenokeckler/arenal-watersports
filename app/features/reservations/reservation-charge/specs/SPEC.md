# Reservation charge

US-RES-23 — Cobro de una reserva (AWS-106).

Como la persona de reservas, necesito registrar un cobro sobre una reserva con el monto propuesto por el catálogo, con la finalidad de que quede a nombre de quien lo hizo.

## Acceptance criteria

- C1: la tarifa sale del catálogo de administración.
- C2: el sistema propone tarifa por duración y reservas la ajusta si el precio acordado fue otro.
- C3: el cobro es por reserva, no por persona.
- C4: se puede registrar desde que la reserva está agendada hasta que se cierra.
- C5: el cobro queda registrado a nombre de quien lo hizo.

## Scope of this slice (read side)

- Entry rule shared through `app/utils/reservations`: `isReservationChargeable` is true for a scheduled, dispatched or closed reservation that is not a split child; the statuses live in `RESERVATION_CHARGEABLE_STATUS`.
- Route helper `resolveReservationChargePath` builds `/reservations/<id>/charge` from `PATHS.RESERVATIONS.CHARGE_SEGMENT`.
- `getReservationCharge` reads the reservation row and, only when it is chargeable, the `reservation_charge_proposal` function; a malformed id or a missing row returns null.
- A cancelled reservation or a split child gets no proposal (both currencies null).
- The proposal holds one nullable amount per currency; the two currencies can come from different sources (a pricing row for one, the catalog for the other), so neither is assumed when the other is null.

## Error cases

- Read failures are thrown through `throwIfSupabaseError` with the operations in `RESERVATION_CHARGE_ERROR`.

## Rules carried by later slices

- The proposal is never multiplied by the number of people.
- The agreed amount is stored only on the first tariff charge in a currency.
- A currency without a proposal offers an empty amount; if none has one, both currencies are offered.
