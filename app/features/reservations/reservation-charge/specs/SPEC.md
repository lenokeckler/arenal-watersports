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

## Charge form and confirmation (UI slice)

- `ReservationChargeView` is the client view: summary and form while nothing is recorded, `ReservationChargeSuccess` once `recorded` is set. The form is replaced, never kept disabled, so a recorded charge cannot be submitted twice.
- Copy lives in `ReservationChargeFormCopy.constants.ts`: `AMOUNT_LABEL` per currency, `AMOUNT_HELPER_PROPOSED`, `AMOUNT_HELPER_MANUAL`, `AMOUNT_PLACEHOLDER`, `CURRENCY_LEGEND`, `LABEL_METHOD`, `METHOD_PLACEHOLDER`, `METHOD_HELPER`, `SUBMIT`, `SUBMITTING`, `BACK`, `ACTIONS`, `SUCCESS(code)`, `RECORDED_BY(name)` and the receipt labels `LABEL_AMOUNT`, `LABEL_CURRENCY`, `LABEL_METHOD`.
- The price is edited inside the summary section (`ReservationChargePrice`), not in a section of its own: the currency group and the amount field sit under the reservation details, and the form below keeps the payment method, the alert and the actions.
- Amount input is a text field with `inputMode` decimal; its label names the agreed amount in the selected currency (`Monto acordado en <moneda>`), and its helper names the catalog proposal and invites adjusting it freely when the agreed price was another.
- Currency switch rule: the amount is replaced by the new currency's proposal only while it is empty or still the previous proposal; a typed amount is kept.
- States: default, pending (`aria-busy`, every field and the submit disabled, submit reads "Registrando cobro…"), field errors under the field with focus on the first invalid one, form error in a `role=alert` box that takes focus, success.
- Success shows the amount with `formatMoney`, the currency name, the payment method and "Registrado por <name>" (C5), takes focus on its `role=status` text and links back to the reservation.
- The action bar is sticky on mobile with the page bottom padding restored for it, and static on desktop.

### Mixed charge input (US-RES-24)

- `ReservationChargeValues` carries `secondAmountText`: `null` is single mode, a string (possibly empty) is mixed mode and holds the amount of the other currency, resolved by `resolveReservationChargeSecondCurrency`.
- `resolveReservationChargeErrors` validates the second amount with the second currency's limits and reports it as `secondAmount`; there is no business cap on either amount.
- `ReservationChargeCommand` carries `parts` (one or two `{ amount, currency }`) plus the shared method; the service always sends `parts` to `record_reservation_charge`, which still accepts the legacy single shape.
- `Charge parts are invalid` maps to the generic form error: it is reachable only by a forged payload.

### Mixed charge receipt (US-RES-24)

- `ReservationChargeRecorded` carries `parts` (one `{ amount, chargeId, currency }` per returned row), the shared `paymentMethod` and `recordedByName`; `recordReservationCharge` maps every row and throws `MISSING_CHARGE` when none returns.
- A one-part receipt keeps the `Monto`, `Moneda` and `M�todo de pago` rows; a two-part receipt shows `Monto en d�lares` and `Monto en colones` in `RESERVATION_CHARGE_CURRENCY_ORDER`, then one `M�todo de pago` row and `Registrado por <name>`.

### Mixed charge form state (US-RES-24)

- `useReservationChargeValues` exposes `setSecondAmountText` and `toggleSecondAmount`: the toggle turns `null` into an empty string (first amount untouched) and any string back into `null`. It works for either currency, whether or not the catalog proposes the other one.
- `useReservationChargeViewModel` adds `isMixed` and `secondCurrency` (the currency not selected) and wraps both new setters in the shared edit guard: ignored while pending, errors cleared.
- `useReservationChargeErrorFocus` focuses `RESERVATION_CHARGE_FIELD_ID.SECOND_AMOUNT` after the first amount and before the payment method. `ADD_CURRENCY` and `SECOND_AMOUNT_HELPER` ids are reserved for the UI slice.

### Second currency field (US-RES-24)

- `ReservationChargeSecondAmountToggle` is always rendered under the price fields, disabled while pending, and names the other currency of the selected one: `Agregar monto en <moneda>` in single mode, `Quitar monto en <moneda>` in mixed mode. It carries `aria-expanded` and `aria-controls` pointing at the price group (`PRICE_BLOCK`).
- Mixed mode shows a second `ReservationChargeAmountField` (empty on entry, own error, helper plus the `MIXED_SECOND_HELPER` note in `aria-describedby`) in the same group; the fields stack below `sm` and sit side by side from `sm`. The currency radio group is hidden while mixed.
- `useReservationChargeSecondAmountFocus` moves focus to the second input when mixed mode starts and back to the toggle when it ends, and does nothing on first render.

### Charge in either currency (US-RES-25)

- Dollars and colones are always both offered in single mode: `ReservationChargeCurrencyField` renders `RESERVATION_CHARGE_CURRENCY_ORDER` whenever the form is not mixed, each card showing the catalog proposal or "Sin tarifa del catálogo". A currency without a proposal starts with an empty amount.
- `resolveReservationChargeInitialCurrency` picks the first currency of the order that has a proposal, else the first of the order; the viewmodel and the values state no longer expose `currencyOptions`.
- Nothing converts one currency into the other and no exchange rate is read or stored; the amount is recorded in the currency it was entered in.
- Amounts accumulate per currency in the reservation detail and are never summed across currencies (C3, RNF-035).

### Payment method (US-RES-27)

- The method is a single-choice chip group, in this order: Efectivo, Tarjeta, PayPal, SINPE, Otro. Nothing is chosen at first. One method covers both parts of a mixed charge.
- The stored value is text: the chip label for the first four, and for Otro the trimmed text typed under "¿Cuál método?", never the word "Otro". The existing rules apply to that text: required, at most 60 characters, no control characters.
- Choosing Otro mounts the text field; leaving Otro unmounts it and keeps the typed text in state, so choosing Otro again restores it.
- Submitting with no choice shows "Elija cómo pagó el cliente." under the group and focuses the first chip. Otro with empty text shows "Escriba cuál fue el método de pago." under its field and focuses it.
- C2: the helper "Solo queda anotado: el sistema no cobra ni valida tarjetas." is always visible and linked to the group with `aria-describedby`. No card number, processor or payment link exists anywhere.
- Pending disables every chip and the Otro field.
- The database is unchanged: `payment_method` stays free text, so old rows stay valid. `147_charge_payment_method.test.sql` proves each label and a free text are stored verbatim and that no card, processor or token column exists.
