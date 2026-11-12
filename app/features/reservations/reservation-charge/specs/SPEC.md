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

## Charge form and confirmation (UI slice)

- `ReservationChargeView` is the client view: summary and form while nothing is recorded, `ReservationChargeSuccess` once `recorded` is set. The form is replaced, never kept disabled, so a recorded charge cannot be submitted twice.
- Copy lives in `ReservationChargeFormCopy.constants.ts`: `AMOUNT_LABEL` per currency, `AMOUNT_HELPER_PROPOSED`, `AMOUNT_HELPER_MANUAL`, `AMOUNT_PLACEHOLDER`, `CURRENCY_LEGEND`, `LABEL_METHOD`, `METHOD_PLACEHOLDER`, `METHOD_HELPER`, `SUBMIT`, `SUBMITTING`, `BACK`, `ACTIONS`, `SUCCESS(code)`, `RECORDED_BY(name)` and the receipt labels `LABEL_AMOUNT`, `LABEL_CURRENCY`, `LABEL_METHOD`.
- Amount input is a text field with `inputMode` decimal; its label names the selected currency.
- The currency group (radio cards, each showing the catalog proposal or "Sin tarifa del catálogo") is rendered only when more than one currency is offered.
- Currency switch rule: the amount is replaced by the new currency's proposal only while it is empty or still the previous proposal; a typed amount is kept.
- States: default, pending (`aria-busy`, every field and the submit disabled, submit reads "Registrando cobro…"), field errors under the field with focus on the first invalid one, form error in a `role=alert` box that takes focus, success.
- Success shows the amount with `formatMoney`, the currency name, the payment method and "Registrado por <name>" (C5), takes focus on its `role=status` text and links back to the reservation.
- The action bar is sticky on mobile with the page bottom padding restored for it, and static on desktop.
