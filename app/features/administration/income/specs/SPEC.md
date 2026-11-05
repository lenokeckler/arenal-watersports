# Daily income report

## Intent

Let Administración know how much money really stayed today, in each currency: what was charged minus what was refunded.

## In scope

- Read-only screen at `PATHS.ADMINISTRATION.INCOME`, rendered on the server, for the current Costa Rica day.
- One card per currency, always dollars first and colones second: Cobrado, Devuelto and Neto (cobrado menos devuelto) of that currency only.
- A negative Neto shows a minus sign, the error colour, a spoken "menos" and a note; never colour alone.
- A currency without charges or refunds keeps its card and says there was no movement; a day without any movement shows a single empty block.
- Error state, never confused with an empty day, and a loading state, both with Spanish copy.

## Out of scope

- Other days, a date picker, live updates, retained deposits, discounts as their own figure (already inside the charged amount), charts, a retry button, a navigation entry.
- Any figure, percentage or conversion that combines dollars and colones.

## Requirements

### User story (US-ADM-26)

Como la persona de administración,
necesito consultar los ingresos del día con sus descuentos y devoluciones,
con la finalidad de saber cuánto entró de verdad y no cuánto se facturó de lista.

### Acceptance criteria (US-ADM-26)

- Los montos se muestran separados por moneda y no se suman en un solo total.

### Non-functional requirements

- RNF-034: El sistema lleva el control del dinero pero no lo mueve: no procesa pagos, no valida tarjetas y no convierte monedas.
- RNF-035: Los montos en dólares y en colones se muestran separados y nunca se suman en un solo total.
- RNF-038: Operaciones no ve información de dinero de ninguna reserva: ni cobros, ni devoluciones, ni depósitos.
- RNF-050 / RNF-051: El hoy de los reportes se arma con la hora de Costa Rica.

## Edge cases & errors

- A failed or truncated read shows the error state and says the day must not be assumed empty.
- Charged equal to refunded, with movement, shows a Neto of zero without sign or note.
- A worker who is not an administrator is redirected home before any read.

## Technical notes

- Reuse: `Title`, `Section`, `Text`, `MaterialIcon`, `formatMoney`, `readIncomeReport`, `getCostaRicaDayRange`, `isAdministratorSignedIn`.
- `formatMoney` only receives magnitudes; the sign is a separate `aria-hidden` glyph.
- The screen sits outside the `(forms)` route group so it is not wrapped in the form card shell.
- Skills that apply: component-architecture, component-standards, constants-standards, styles-standards, structure-standards, route-structure.

## Acceptance criteria

- [ ] Each currency shows its own Cobrado, Devuelto and Neto, and no figure combines both currencies.
- [ ] A currency without movement says so instead of showing zero.
- [ ] A worker who is not an administrator is redirected and receives no income data.
- [ ] A failed read is announced as an error and never looks like a day without income.
