# Reservation refund

US-RES-28 — Devolución de dinero al cliente (AWS-111).

Como la persona de reservas, necesito registrar la devolución de dinero al cliente cuando corresponda, con la finalidad de que la cuenta del día refleje lo que de verdad quedó.

## Acceptance criteria

- C1: reservas decide si corresponde devolver dinero y cuánto; puede ser por cancelar la salida, por una salida cortada a medias, u otro motivo.
- C2: se puede registrar en cualquier momento después de haberse cobrado algo, no solo al cancelar.
- C3: se indica el monto devuelto, la moneda y el motivo.
- C4: el monto no puede superar lo que de verdad quedó cobrado (neto) en esa moneda.
- C5: la cuenta del día refleja lo que de verdad entró.
- C6: la devolución se abre con un botón y muestra lo disponible para devolver en cada moneda.

## Net definition

- The net of a currency is every charge of the reservation in that currency, whatever its kind (tariff and extra time), minus every refund already recorded in that currency.
- The net is per reservation and per currency. Dollars and colones are never added, converted or compared (RNF-034, RNF-035).
- The same definition is applied in three places and must stay identical: `calculateReservationDetailRefundable` (detail button), `reservation_refundable_net` (refund screen) and `private.reservation_refundable_amount` (enforcement inside `record_reservation_refund`).
- `hasReservationRefundable` is the single rule "something to refund": true when any currency has a net above zero. The detail button and the refund screen both use it.
- A split child has no charges of its own, so its net is zero and it offers nothing to refund.

## Entry rules

- C2: the reservation status does not matter. Scheduled, dispatched, closed and cancelled reservations can be refunded while a net above zero remains.
- The detail shows "Registrar devolución" only while `hasReservationRefundable` is true, and it opens `/reservations/<id>/refund` (`resolveReservationRefundPath`).
- The refund screen of a reservation with nothing to refund shows "No hay nada por devolver" instead of the form.
- A stale button only ever leads to a refusal: the function recomputes the net before it writes.

## Form

- The screen lists "Disponible para devolver" for dollars and colones apart; a currency without net reads "Sin monto por devolver".
- The currency group is rendered only when more than one currency has net, and only currencies with net are offered. The first one in dollars-then-colones order is preselected.
- Amount is a text field with decimal input mode; its label names the selected currency and its helper states the maximum.
- Reason is one of "Salida cancelada", "Salida cortada a medias" or "Otro". "Otro" reveals a free text field that is required, trimmed and limited to 200 characters; the stored reason is that text. A preset reason is stored as its Spanish label.
- An amount above the net is refused on screen with "El monto no puede superar lo disponible para devolver: <max>." and again by the function (C4).
- Success shows the amount, the currency, the reason and "Registrado por <name>", takes focus on its `role=status` line and links back to the reservation. The form is replaced, never kept disabled, so a recorded refund cannot be submitted twice.

## Database

- `record_reservation_refund(p_payload jsonb)` requires access to reservas (`require_reservations_access`), validates currency, amount and reason, writes the row with `created_by = auth.uid()` and returns the recorded refund, what remains and the recorder name (RNF-022 to RNF-024).
- The function locks the reservation row (`select ... for update`) before it reads the net. Two refunds recorded at the same time on one reservation are serialised, so the second one sees the first and cannot take the sum above the net. Concurrency cannot be exercised in pgTAP (one transaction per file), so this rule is covered by this note and by review of the lock, not by a test.
- Operaciones never sees or writes money (RNF-038): `refunds` RLS and the function both restrict to reservas and administration.

## No approval inside the system

- Reservas records the refund and nobody authorises it in the application. How much to return is decided by the boss outside the system; the system only writes it down, never moves money (RNF-034).

## Unconfirmed result

- When the request fails after it may have reached the server, the outcome is "unconfirmed": the form shows "No pudimos confirmar la devolución. Revise las devoluciones de la reserva antes de volver a intentarlo." and stays locked (`mayBeRecorded`), so the same refund is not sent twice by mistake. The worker reviews the reservation's money movements, which list refunds, before trying again.
- Offline, nothing is sent: the form shows the offline message and can be submitted again with signal.

## Daily account (C5)

- Recording the refund row is what reflects it: `financial_movements`, `daily_revenue_report` and the administration income screen subtract refunds on the day they were created. Nothing extra is built for C5.
- The reservas screen `/reservations/income` lists what was collected per payment method; it does not subtract refunds. The E2E case for C5 therefore reads the net of today through the same summary the administration report uses, filtered to the rows of the reservation under test. The `daily_revenue_report` view itself is proven by pgTAP `148_record_reservation_refund.test.sql`; the E2E proves the administration income summary.

## Copy

- `RESERVATION_REFUND_UI_COPY`: `TITLE` "Registrar devolución", `AVAILABLE_HEADING` "Disponible para devolver", `AVAILABLE_NOTE`, `NOTHING_IN_CURRENCY` "Sin monto por devolver", `SUMMARY_HEADING`, `LABEL_CUSTOMER`, `LABEL_DATE_TIME`, `BACK_TO_RESERVATION`.
- `RESERVATION_REFUND_FORM_COPY`: `AMOUNT_LABEL` per currency, `AMOUNT_HELPER(max)`, `AMOUNT_PLACEHOLDER`, `CURRENCY_LEGEND`, `CURRENCY_OPTION_DESCRIPTION`, `REASON_LEGEND`, `OTHER_LABEL`, `OTHER_HELPER`, `SUBMIT`, `SUBMITTING`, `BACK`, `ACTIONS`, `SUCCESS(code)`, `RECORDED_BY(name)` and the receipt labels `LABEL_AMOUNT`, `LABEL_CURRENCY`, `LABEL_REASON`.
- `RESERVATION_REFUND_REASON_COPY`: "Salida cancelada", "Salida cortada a medias", "Otro".
- `RESERVATION_REFUND_VALIDATION_COPY`: amount issues, `AMOUNT_ABOVE_AVAILABLE(max)`, `AMOUNT_REQUIRED`, `AMOUNT_TOO_MANY_DECIMALS`, `CURRENCY_INVALID`, `OTHER_REQUIRED`, `REASON_REQUIRED`, `REASON_TOO_LONG`, `REASON_DISALLOWED_CHARACTERS`.
- `RESERVATION_REFUND_FEEDBACK_COPY`: `ABOVE_AVAILABLE`, `FORBIDDEN`, `GENERIC`, `NOT_FOUND`, `OFFLINE`, `REQUEST_REJECTED`, `UNCONFIRMED`.
- `RESERVATION_REFUND_UNAVAILABLE_COPY`: `TITLE` "No hay nada por devolver", `BODY`, `RULE`.
- `RESERVATION_DETAIL_CHARGES_COPY`: `RECORD_REFUND` "Registrar devolución" and `RECORD_REFUND_LABEL(code)` for the detail button.
