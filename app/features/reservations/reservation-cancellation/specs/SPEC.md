# Reservation cancellation

US-RES-21 — Cancelación de una reserva (AWS-104).

Como la persona de reservas, necesito cancelar una reserva registrando el motivo, con la finalidad de poder revisar después por qué se cae la gente.

## Acceptance criteria

- El motivo es obligatorio, porque sirve para revisar después por qué se cae la gente.
- La reserva queda como cancelada y deja de mostrarse en la aplicación de operaciones.
- El equipo no se libera solo ni se bloquea nada.

## Scope

- Route `/reservations/<id>/cancel`, reached from the calendar block of a reservation.
- A scheduled or dispatched reservation is cancelled here; a closed or cancelled one shows the unavailable state.
- The database function `cancel_reservation` sets the status and the trimmed reason (1 to 300 characters) and refuses a stale form.
- Equipment lines, units, charges and deposits are left untouched; the units stop counting as busy because a cancelled reservation is not active.

## US-RES-22 — Cancelación de una salida en curso (AWS-105)

- A dispatched reservation shows a required cause, two radio cards (`weather`, `trip_problem`), before the reason. Nothing is preselected; the cause is validated first, then the reason, and focus goes to the first radio when the cause is missing.
- The note and the reason helper change for a dispatched reservation: the equipment stays out until operations records the return, and the deposit is resolved like a normal close.
- A scheduled cancellation shows no cause field and sends `cause: null`.
- The success message says operations still has to record how the equipment came back.
- Untouched: the open dispatch groups, the return readings (operations closes the group in out-on-water), charges and deposits.
