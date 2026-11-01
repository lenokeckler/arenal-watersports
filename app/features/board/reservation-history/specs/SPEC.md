# US-TAB-09 — Historial de reservas cerradas

## Criterio de aceptación

- Se muestra el nombre a que iba la reserva, la fecha, el equipo, el guía y quién la atendió.

## Evidencia de implementación

`/history` is a server-rendered list of closed and cancelled reservations,
newest first. Each row is a link showing the date, the customer name, the
equipment categories, the guides and the worker who attended it. A cancelled
row also carries the text "Cancelada". A missing guide or equipment reads
"Sin guía" or "Sin equipo". No money is shown.

Filters, pagination, loading and error states and the detail route belong to
later pull requests of the same story.

## Verification mapping

- `ReservationHistory.test.tsx` verifies the five fields in a row, the
  cancelled marker, the missing guide and equipment text, and the empty state.
