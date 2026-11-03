# Category units

## Intent

Let any worker see the state of every unit of one category, and, for an occupied unit, when it returns, to which reservation it belongs and who carries it.

## In scope

- Read-only list of the units of a category, one row per unit, mobile first.
- Per unit: code and status chip. Statuses: Disponible, Ocupada, En mantenimiento, Dañada and En reparación (its own label, maintenance color).
- Occupied unit: return time, the customer who carries it, and the reservation reference (code and time window).
- The return time is shown in Costa Rica time; the date is added when the return is not today.
- The status is never conveyed by color alone: the chip carries the Spanish word and the dot is decorative.
- Rows have no photo, no buttons and nothing interactive.

## Out of scope

- Dispatching from this screen: it belongs to Operations (US-OPE-02).
- Opening the reservation detail (pending, see below).
- The screen itself (route, header, empty, loading and error states, pagination) and the links from the board: later pull requests of this story.
- Live refresh (US-TAB-03), overdue marker, a connection-lost notice.

## Requirements

### User story (US-TAB-02)

Como un trabajador de la empresa,
necesito ver el estado de cada unidad de una categoría,
con la finalidad de saber cuáles puedo ofrecer y cuándo vuelven las que están afuera.

### Acceptance criteria (US-TAB-02)

- Estado de cada unidad: disponible, ocupada, en mantenimiento o dañada.
- Cuando la unidad está ocupada se muestra la hora a la que regresa, a qué reserva pertenece y quién la lleva.
- Desde ahí se abre el detalle de la reserva.
- El estado ocupada lo calcula el sistema a partir de los despachos, no se digita.
- Reservas consulta esta pantalla para contestarle al cliente, pero no despacha desde aquí: despachar es de operaciones.
- Si una unidad figura en más de un grupo abierto, se muestra la hora y la reserva del que regresa de último.

## Edge cases & errors

- An unknown, null or decommissioned status throws; it is never rendered as Disponible.
- An occupied row missing any reservation column throws; it is never rendered as a free or partial unit.
- A non occupied row never shows a return time or reservation, even if the database kept one.
- A return after UTC midnight that is still evening in Costa Rica counts as today.
- A reservation window is shown as times only ("10:00 a 12:00") in Costa Rica time.

## Technical notes

- Rows come from the `board_category_units` view through `app/services/board`; the mapper guards every nullable column.
- The reservation id is kept in the model (`UnitOccupancy.reservationId`) for the pending link; the reference line is one `Text` in `CategoryUnitReservationReference`, the only place the link will touch.
- Reuse: `formatReservationCalendarTime`, `getCostaRicaDayRange` through `isSameCostaRicaDay`, `Title`, `Text`, `InlineText`.
- Skills that apply: component-architecture, component-standards, constants-standards, styles-standards, structure-standards.

## Acceptance criteria

- [ ] Each unit shows its status with a Spanish label: Disponible, Ocupada, En mantenimiento, Dañada, En reparación.
- [ ] An occupied unit shows the return time (and date when not today), the customer and the reservation reference.
- [ ] A unit that is not occupied shows no occupied detail.
- [ ] Rows contain no link, no button and nothing interactive.
- [ ] The status is readable as text, not only by color.
- [ ] Pending: "Desde ahí se abre el detalle de la reserva" needs the reservation detail route of US-RES-03; the later change is a `PATHS` entry, one link around the reference line and one E2E assertion.
- [ ] Pending in later pull requests: the screen with server pagination, and the latest-return rule end to end.
