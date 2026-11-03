# Category units

## Intent

Let any worker see the state of every unit of one category, and, for an occupied unit, when it returns, to which reservation it belongs and who carries it.

## In scope

- Read-only screen of ONE category at `/board/categories/<categoryId>` (`PATHS.BOARD_CATEGORIES` plus the id), mobile first, in the same wide centered container as the board.
- Header: a back link "Volver al tablero" to `PATHS.BOARD`, the category name as the only h1 and a one-line subtitle with the unit count.
- One row per unit, listed by code, paginated on the server: 20 per page, 1-based `?page=`, the same list pagination as the admin lists (RNF-027). Pagination shows only when there is more than one page.
- States: loading skeleton, empty ("Esta categoría todavía no tiene unidades"), error with a retry button, and a Spanish not found for a missing, invalid or non-board category.
- Per unit: code and status chip. Statuses: Disponible, Ocupada, En mantenimiento, Dañada and En reparación (its own label, maintenance color).
- Occupied unit: return time, the customer who carries it, and the reservation reference (code and time window).
- The return time is shown in Costa Rica time; the date is added when the return is not today.
- The status is never conveyed by color alone: the chip carries the Spanish word and the dot is decorative.
- Rows have no photo, no buttons and nothing interactive.

## Out of scope

- Dispatching from this screen: it belongs to Operations (US-OPE-02).
- Opening the reservation detail (pending, see below).
- The links from the board cards to this screen and the Playwright specs: the next pull request of this story.
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

## Screen behavior

- The category and its unit total come from `readBoardCategory`; the page of units from `readBoardCategoryUnits(categoryId, page)`. The page count is the total divided by the page size.
- A category that is missing, has an invalid id, is not on the board or is not visible to the worker answers `notFound()`: an empty list would claim the category has no units.
- A visible category with no units shows the empty state and reads no units.
- A page past the last one redirects to the last page; a page param that is not a positive integer is the first page.
- A failed read reaches `error.tsx` and its retry button; it never renders as an empty or free list.
- `page.tsx` awaits `ensureWorkModeChosen()` first, like the board.

## Technical notes

- Route: `app/(system)/board/categories/[categoryId]/` with `page.tsx`, `loading.tsx`, `error.tsx` and `not-found.tsx`; the URL comes from `resolveBoardCategoryPath` in `app/utils/board-paths`.
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
- [ ] The screen is reachable by URL, titled with the category name and states its unit count.
- [ ] The units are paginated on the server, 20 per page; pagination shows only with more than one page and a page past the end redirects to the last one.
- [ ] Loading, empty, error (with retry) and not found states are shown in Spanish; a read failure never shows an empty list.
- [ ] Reservas and Operaciones read the same screen and nothing on it dispatches.
- [ ] Pending in later pull requests: the board card links, the Playwright specs and the latest-return rule end to end.
