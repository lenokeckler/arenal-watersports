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
- Rows have no photo and no buttons. For a worker with the operations area, the rows of the available units are tappable to dispatch (see Dispatch from the category); for everyone else nothing is interactive.
- Reached from the board: every card links here (a grouped card opens its first member by name).
- Group switch, a design decision of the product owner: when the category belongs to a group with more than one visible member, a `nav` under the header ("Categorías del mismo grupo") shows one pill link per member, by name, the current one with `aria-current="page"`, each linking to that member's units screen. A category without a group, or alone in it, shows nothing.

## Out of scope

- Opening the reservation detail (pending, see below).
- Live refresh (US-TAB-03), which will also refresh the overdue marker; a connection-lost notice.

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

## Dispatch from the category (US-OPE-02)

- Only a worker with the operations area sees the rows of the available units as tappable; the page asks `has_area('operaciones')` and a failed answer reaches `error.tsx`, never a silently read-only board.
- Tapping a unit marks it and shows a bar above the navigation with the count ("2 unidades seleccionadas"), "Cancelar" and "Despachar". An occupied, damaged or in-maintenance unit cannot be tapped.
- "Despachar" opens a sheet with the reservations of today in Costa Rica that still have this category pending, by time, each with its committed count. A combo is never listed: it is dispatched from the list of the day.
- A reservation that commits fewer units than were tapped says how many fit.
- Choosing a reservation opens the dispatch sheet on this category with the tapped units already marked; the worker completes or unchecks them there, and confirming goes through `dispatch_reservation_group`.
- Closing the sheet clears the selection and refreshes the board, so the units show as occupied.
- Closing the picker keeps the selection.

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
- The members of the group come from `readBoardCategoryGroup(categoryId)`: it reads the board summary, finds the category and keeps the rows whose lower-cased, non-blank `group_name` matches (the same key as the board cards), ordered like the card target. An invalid id returns no members without querying; a failed read reaches `error.tsx`.
- A page past the last one redirects to the last page; a page param that is not a positive integer is the first page.
- A failed read reaches `error.tsx` and its retry button; it never renders as an empty or free list.
- `page.tsx` awaits `ensureWorkModeChosen()` first, like the board.

## Design notes

- Occupied card: the unit code is the card title (semibold) with the status chip beside it. Under the divider the return time is the first and strongest line (`text-body-base`, bold, tertiary tone, never larger than the code); the customer and the reservation reference are secondary (`text-sm`, `on-surface-variant`).
- A unit without extra info (available, maintenance, repair, damaged) is one compact row, code and chip only, with `min-h-14`; the grid uses `gap-2` and `items-start`, so occupied cards grow with their data without stretching the rest. One column on a phone, two from `md`. The order stays by unit code.
- Group switch: on a phone the pills share the full width equally as a segmented control (`flex-1`, `min-h-11`), the current one with a solid `primary` fill and `on-primary` text, the others on the dark surface; from `md` they are only as wide as their content. They stay `nav` links with `aria-current="page"`.
- Pagination of this screen is its own component (`CategoryUnitsPagination`): "Anterior", "{page} de {total}" and "Siguiente", previous and next at least 44 px (`min-h-11 min-w-11`), the text centered. The shared `ListPagination` of the admin lists is unchanged.
- Loading skeleton: rows share the row class (same `min-h-14`, padding and header), and the first two carry placeholder detail lines so the page does not jump when the content arrives.

## Overdue return

- An occupied unit whose `returns_at` is strictly before the render time is overdue. The server decides it in `buildUnitOccupancy(row, now)` (`UnitOccupancy.isOverdue`), with `now` injected; there is no client timer and no polling. A return exactly at `now` is not overdue.
- The status stays "Ocupada" (computed from the dispatches); an overdue unit never counts as free.
- The row gets a soft amber treatment, not red: `border-warning/40 bg-linear-to-r from-warning/15 to-card-tint-neutral-bg`; the return line reads "Debía regresar a las 10:00" or "Debía regresar el 1 nov a las 15:30" in `text-warning`, and a "Retrasada" chip (`border-warning/40 text-warning`) sits next to the status chip. Both `warning` values (dark `#fb923c`, light `#c2410c`) are read on the card tint in either theme. "Dañada" keeps its red chip.

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
- [ ] The board cards link to this screen.
- [ ] A category in a group of two or more shows the switch links with the current one marked; others show none.
- [ ] An occupied unit whose return time has passed shows the late return line, the "Retrasada" chip and the amber row, and keeps the status Ocupada.
- [ ] Pending in later pull requests: the latest-return rule end to end.
