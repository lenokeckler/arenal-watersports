# Deposit resolution

US-RES-30 — Resolución del depósito de garantía (AWS-113).

Como la persona de reservas, necesito registrar cuánto se le devuelve al cliente del depósito de garantía, con la finalidad de cerrar la plata que la empresa tiene del cliente.

## Acceptance criteria

- C1: resuelve los depósitos que quedaron pendientes después de que operaciones cerró la salida.
- C2: reservas indica cuánto se le devuelve al cliente: todo el depósito, o un monto puntual cuando hubo daño.
- C3: el sistema calcula lo que se queda la empresa restando lo devuelto del depósito.
- C4: lo que se queda la empresa entra al reporte de ingresos.
- C5: el motivo del daño se pide solo cuando no se devuelve todo, queda anotado y se ve en el reporte.
- C6: al resolverlo, el depósito sale de la lista de pendientes.

## Entry

- Each row of `/reservations/deposits` links to `/reservations/deposits/<depositId>/resolve` (`resolveDepositResolutionPath`).
- The screen resolves one held deposit of a closed or cancelled reservation. A cancelled trip can still hold a deposit that has to go back, so it is allowed with the closed one.
- A deposit already resolved, or one whose trip is still scheduled or dispatched, shows a message instead of the form (`resolveDepositResolutionUnavailableReason`). The function refuses both again.

## Form

- "Se devuelve todo" (default) sends the whole deposit and no reason; the deposit becomes `returned`.
- "Se devuelve un monto" asks for the amount that goes back: from 0 to the deposit, two decimals at most. "La empresa se queda" shows the difference live, computed in cents (C3).
- The damage reason is asked only when the company keeps something. It is trimmed, has no control characters and at most 200 characters (C5).
- Part back: `partially_retained`. Nothing back: `retained`. Both store `retained_amount` (what is kept) and `retention_reason`.
- Success shows what went back, what is kept, the reason and "Resuelto por <name>", and links back to the pending list.

## Database

- `resolve_reservation_deposit(p_payload jsonb)` requires reservations access, locks the deposit row (`for update`) and refuses a second resolution, so two resolutions at the same time cannot both pass. Concurrency cannot be exercised in pgTAP (one transaction per file).
- Operaciones neither sees nor resolves deposits (RNF-038): `deposits` RLS and the function restrict to Reservas and administration.

## Reports (C4, C5) and pending list (C6)

- `financial_movements` and `daily_revenue_report` already add `retained_amount` of `retained` and `partially_retained` deposits on the day they were resolved; nothing new was built for C4. Dollars and colones stay apart (RNF-035).
- The administration deposits report already lists retained deposits with their reason (C5).
- The pending list reads `status = 'held'`, so a resolved deposit leaves it (C6). The action refreshes the pending list and both administration reports.

## Unconfirmed result

- When the request fails after it may have reached the server, the form shows "No pudimos confirmar la resolución. Revise la lista de pendientes antes de volver a intentarlo." and stays locked. Offline, nothing is sent.
