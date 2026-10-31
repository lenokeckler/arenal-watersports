# Deposits report

## Intent

Let the person in Administración see every pending deposit and every retained deposit in one screen, so no customer money is left unresolved and no retained money goes without a stated reason.

## In scope

- Read-only screen at `PATHS.ADMINISTRATION.DEPOSITS`, rendered on the server, restricted to administrators.
- Section "Depósitos pendientes": one row per deposit with status `held`, oldest first. Each row shows the customer name, the reservation code, the amount in its own currency and the currency name.
- Section "Depósitos retenidos": one row per deposit with status `retained` or `partially_retained`, newest resolved first. Each row shows the customer name, the reservation code, the retained amount in its own currency, the currency name and the retention reason.
- A retained deposit whose reason is blank shows "Sin motivo registrado".
- Loading state, one error state for the whole screen, and an empty state per section, all with Spanish copy.

## Out of scope

- Totals or sums of any kind, filters, pagination, dates, actions on a deposit, charts.
- A navigation entry to the screen.
- Retained money inside the income screen: it needs the ADM-26 stack and US-RES-30.
- The remainder of a partially retained deposit.
- The application shell and its `<main>` landmark.

## Requirements

### User story (US-ADM-31)

Como la persona de administración,
necesito consultar los depósitos pendientes y los retenidos,
con la finalidad de que no quede plata de un cliente sin resolver ni dinero retenido sin justificar.

Los depósitos pendientes son plata de otra persona que la empresa tiene en la mano, así que no pueden quedar en el aire. Los retenidos son dinero que la empresa se quedó por un daño y entran al reporte de ingresos con su motivo.

### Acceptance criteria (US-ADM-31)

- La finalidad de este epic es que la administración mire el negocio con números y no de memoria.

### Non-functional requirements

- RNF-035: Los montos en dólares y en colones se muestran separados y nunca se suman en un solo total.

## Edge cases & errors

- A failed or truncated read shows one error block in place of both sections and says an empty list must not be assumed; it is never rendered as an empty list.
- Zero held deposits shows the pending empty state; zero retained deposits shows the retained empty state.
- A retained reason that is empty or only whitespace shows "Sin motivo registrado"; a real reason is shown unchanged, with its line breaks.
- USD and CRC deposits sit in the same list, each printed in its own currency; no figure combines them.
- A worker who is not an administrator is redirected before any read runs.

## Technical notes

- Reuse the shared `deposit-ledger` pieces for the deposit line, the empty and error notices and the skeleton line; reads come from `fetchPendingDeposits` and `fetchRetainedDeposits`.
- The blank-reason fallback is presentation copy, so it lives in `utils/resolveRetentionReason`, not in the service.
- Skills that apply: component-architecture, component-standards, constants-standards, styles-standards, structure-standards, route-structure.

## Acceptance criteria

- [ ] Every deposit with status `held` appears with its amount and its reservation code.
- [ ] Every retained or partially retained deposit appears with the retained amount, its reservation code and its reason.
- [ ] A retained deposit without a written reason says "Sin motivo registrado".
- [ ] Each amount is shown in its own currency and no total or sum is shown.
- [ ] A worker who is not an administrator is redirected and receives no deposit data.
- [ ] A failed or truncated read is announced as an error and never looks like an empty list.
