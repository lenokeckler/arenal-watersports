# US-ADM-29 — Reservas atendidas por trabajador

## Criterio de aceptación

- Sale de la firma que queda en cada reserva.

## Evidencia de implementación

The report selects the worker relationship through the reservation's
`created_by` foreign key and displays that worker beside each reservation.
Server pagination uses a deterministic order and includes cancelled records.

## Verification mapping

- `readReservationsByWorker.test.ts` verifies the creator relationship,
  administrator access, and server pagination.
- `reservations-by-worker.e2e.ts` verifies the creator's name is shown
  when `updated_by` belongs to a different worker.
