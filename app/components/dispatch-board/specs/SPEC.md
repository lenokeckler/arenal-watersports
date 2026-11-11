# Pending Dispatch Reservations

## Intent

Operations workers need to see today's reservations that still require a group to be dispatched, and to dispatch each category group from that same list without typing the reservation again.

## In scope

- Read and display today's pending reservations.
- Exclude cancelled and closed reservations.
- Exclude reservations whose committed categories have all been dispatched.
- Open a dispatch sheet from each reservation of the list.
- List the equipment committed in each category, with or without motor.
- Choose the concrete units that leave, among the free units of the category.
- Propose the real departure (now) and the return (departure plus duration), both adjustable.
- Dispatch one category group at a time, atomically and safe to retry.

## Out of scope

- Closing equipment groups.
- Partial dispatches within one category.
- Financial information.
- Changing the equipment of a reservation at the dock and recalculating its price.
- Opening the dispatch from the category card of the board.
- Fuel and engine-hour readings at dispatch (US-OPE-03).
- Adjusting the duration of a running reservation (US-OPE-06).

## Requirements

- Calculate today in `America/Costa_Rica`.
- Query the half-open interval from today's start through tomorrow's start.
- Include `scheduled` reservations.
- Include `dispatched` reservations only when a committed category has no matching dispatch.
- Treat any matching dispatch as dispatched even when `closed_at` is null.
- Preserve Supabase RLS and operations authorization.
- Dispatch through `dispatch_reservation_group`: it requires the operations area, locks the reservation and the chosen units, and creates the dispatch in the name of the worker who made it.
- Exactly as many units as committed must be chosen; units already assigned to the reservation stay in the dispatch.
- A category counted by quantity takes no units.
- A unit that is not `available`, belongs to another category or is out in an open dispatch cannot be chosen.
- A return earlier than or equal to the departure means the next day.
- Retrying a dispatch never commits a unit twice: a category already dispatched is refused.

## Edge cases & errors

- Reservations at today's start are included.
- Reservations at tomorrow's start are excluded.
- Unit commitments derive their category from the equipment unit.
- Quantity commitments use their category directly.
- Access and query errors display safe user-facing messages.
- A unit taken by another dispatch while the sheet is open shows a message and reloads the free units.
- When one category is dispatched and others remain, the reservation stays in the list.

## Constraints

- Use the authenticated server Supabase client and explicit non-financial columns.
- Keep the page and the board as Server Components; only the dispatch action and sheet are client components.
- Render the sheet in a portal so cards with filters do not trap its fixed position.
- Skills: route-structure, component-architecture, component-standards, styles-standards, constants-standards, structure-standards.

## Acceptance criteria

- [x] La lista se limita al día en curso.
- [x] Las reservas canceladas no aparecen.
- [x] La reserva ya existe y solo se selecciona: no se vuelven a escribir sus datos.
- [x] El despacho se abre desde la lista del día.
- [x] La hoja lista el equipo comprometido de la categoría, tenga motor o no.
- [x] Operaciones escoge las unidades concretas entre las libres de la categoría.
- [x] Cada categoría sale por su lado y la reserva sigue pendiente mientras falte un grupo.
- [x] Se propone la hora real de salida y se puede ajustar; el regreso se propone y se puede ajustar.
- [x] Una hora de regreso anterior a la de salida se entiende como del día siguiente.
- [x] Se escogen exactamente tantas unidades como las comprometidas.
- [x] El despacho queda registrado a nombre de quien lo hizo.
- [x] Si el despacho se reintenta, ninguna unidad queda comprometida dos veces.
