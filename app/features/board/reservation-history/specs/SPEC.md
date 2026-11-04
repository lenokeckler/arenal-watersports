# US-TAB-09 — Historial de reservas cerradas

## Criterio de aceptación

- Se muestra el nombre a que iba la reserva, la fecha, el equipo, el guía y quién la atendió.
- El detalle de cada registro indica quién lo creó y quién lo modificó de último.

## Evidencia de implementación

`/history` is a server-rendered list of closed and cancelled reservations,
newest first. Each row is a link showing the date, the customer name, the
equipment categories, the guides and the worker who attended it. A cancelled
row also carries the text "Cancelada". A missing guide or equipment reads
"Sin guía" or "Sin equipo". No money is shown.

Filters, pagination and the loading and error states belong to other pull
requests of the same story. The E2E spec, its page object and
the captures arrive in the last pull request of the stack.

## Verification mapping

- `ReservationHistory.test.tsx` verifies the five fields in a row, the
  cancelled marker, the missing guide and equipment text, and the empty state.

## Detail

`/history/[reservationId]` shows the record, its cancellation reason and who
created and last modified it, each with Costa Rica date and time.

A scheduled, dispatched, unknown or malformed id calls `notFound()`; the read
streams behind `loading.tsx`, so that screen answers HTTP 200 with `noindex`.

- `ReservationHistoryDetail.test.tsx` verifies the signature and `notFound()`.
