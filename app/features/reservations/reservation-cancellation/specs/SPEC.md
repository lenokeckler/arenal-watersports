# Reservation cancellation

US-RES-21 — Cancelación de una reserva (AWS-104).

Como la persona de reservas, necesito cancelar una reserva registrando el motivo, con la finalidad de poder revisar después por qué se cae la gente.

## Acceptance criteria

- El motivo es obligatorio, porque sirve para revisar después por qué se cae la gente.
- La reserva queda como cancelada y deja de mostrarse en la aplicación de operaciones.
- El equipo no se libera solo ni se bloquea nada.

## Scope

- Route `/reservations/<id>/cancel`, reached from the calendar block of a scheduled reservation.
- Only a scheduled reservation is cancelled here; a dispatched one is US-RES-22.
- The database function `cancel_reservation` sets the status and the trimmed reason (1 to 300 characters) and refuses a stale form.
- Equipment lines, units, charges and deposits are left untouched; the units stop counting as busy because a cancelled reservation is not active.
