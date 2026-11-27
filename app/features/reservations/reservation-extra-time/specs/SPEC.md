# Reservation extra time

US-RES-31 — Cobro del tiempo adicional (AWS-114).

Como la persona de reservas, necesito cobrar el tiempo adicional de una salida que se pasó de su hora, con la finalidad de que ese dinero quede registrado y no se pierda en el cambio de turno.

## Acceptance criteria

- C1: se registra dentro del cobro de la reserva como tiempo adicional, aparte de la tarifa.
- C2: por ejemplo el cliente que se queda treinta minutos de más.
- C3: sale de dos lados: de las reservas que se pasaron de su hora sin avisar, y de las que operaciones extendió sobre la marcha.
- C4: reservas decide si el tiempo de más se cobra o si va de cortesía.
- C5: reservas registra el monto acordado por ese tiempo.
- C6: el tiempo adicional se calcula por grupo, contra la hora real de llegada de cada uno, y se suma para la reserva.
- C7: si la reserva se pospuso después de despachada, solo cuenta la salida nueva; el viaje interrumpido no genera tiempo adicional.

## Database contract

- `reservation_extra_time_groups(p_reservation_id)` returns one row per group (category and departure) with the planned return, the real arrival, the extended minutes and the extra minutes (C3, C6, C7).
- `record_reservation_extra_time(p_payload)` records the decision once, for a closed reservation with extra time: `charged` inserts a `reservation_charges` row of kind `extra_time` (C1, C5), `courtesy` records no money (C4).
- `reservation_extra_time_resolutions` keeps the decision, the minutes, the charge and who made it.

## Constants and models

- Outcomes: `RESERVATION_EXTRA_TIME_OUTCOME` (`charged`, `courtesy`) in `RESERVATION_EXTRA_TIME_OUTCOME_ORDER`.
- Group source: `extended` when Operaciones extended the group and it still went over its planned return, `overdue` when it went over without an extension, `on_time` otherwise.
- Unavailable reasons: `cancelled`, `groups_out` (the reservation is not closed), `no_extra_time`, `resolved`.
- The payment choices (`PAYMENT_CHOICE`, `PAYMENT_CHOICE_ORDER`, `PAYMENT_CHOICE_COPY`), the amount limits (`CHARGE_LIMITS`) and the payment method patterns (`PAYMENT_METHOD_TEXT`) are shared money constants, read by this screen and by the tariff charge.
- Database messages and operations live in `RESERVATION_EXTRA_TIME_ERROR`; copy lives in the `*Copy.constants.ts` files.
