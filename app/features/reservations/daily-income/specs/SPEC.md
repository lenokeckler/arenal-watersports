# Daily income

## Intent

Let the person in Reservas close the day knowing how much money came in, in each currency, and through which payment method.

## In scope

- Read-only screen at `PATHS.RESERVATIONS.INCOME`, rendered on the server, for the current Costa Rica day.
- One card per currency, always dollars first and colones second: the currency name and code, the day's total of that currency only, and one bar per payment method, longest first.
- A bar's length is relative to the largest bar of the same currency; its value is printed as text beside it, never as a percentage.
- A currency without charges keeps its card and says no payments came in; a day without any charge shows a single empty block.
- Error state and loading state with Spanish copy.

## Out of scope

- Refunds, discounts and retained deposits (US-ADM-26), other days, a date picker, live updates, payment counts, a retry button.
- Any figure, percentage or chart that combines dollars and colones.
- The application shell and its `<main>` landmark.

## Requirements

### User story (US-RES-32)

Como la persona de reservas,
necesito consultar los ingresos del día y sus gráficos,
con la finalidad de cerrar la jornada sabiendo cuánto entró.

### Acceptance criteria (US-RES-32)

- Los montos van separados por moneda y no se suman en un solo total.
- Operaciones no ve esta información, porque no necesita ver plata para hacer su trabajo.

### Non-functional requirements

- RNF-035: Los montos en dólares y en colones se muestran separados y nunca se suman en un solo total.
- RNF-038: Operaciones no ve información de dinero de ninguna reserva: ni cobros, ni devoluciones, ni depósitos. Sí consulta el catálogo de precios, que es otra cosa.

## Edge cases & errors

- A failed read shows the error state and says the day must not be assumed empty; it is never rendered as an empty day.
- A blank payment method is shown as "Sin método".
- A tiny amount next to a large one still draws a visible bar.
- A worker that is neither in Reservas mode nor an administrator is redirected home before any read.

## Technical notes

- Reuse existing components / constants / store patterns: `Title`, `Section`, `Text`, `MaterialIcon`, `UnorderedList` (`PLAIN` variant), `formatMoney`, `fetchDailyIncome`, `isIncomeReaderSignedIn`.
- Bars are SVG drawn on the server; the width is an SVG attribute, so no class is interpolated and no client JavaScript is shipped.
- Skills that apply: component-architecture, component-standards, constants-standards, styles-standards, structure-standards.

## Acceptance criteria

- [ ] Each currency shows its own total and its own payment method bars, and no figure combines both currencies.
- [ ] A currency without charges today says so instead of showing zero.
- [ ] A worker without Reservas or Administración is redirected and receives no income data.
- [ ] A failed read is announced as an error and never looks like a day without income.
