# Pending Dispatch Reservations

## Intent

Operations workers need to see today's reservations that still require a group to be dispatched, and to dispatch each category group from that same list without typing the reservation again.

## In scope

- Read and display today's pending reservations.
- Exclude cancelled and closed reservations.
- Exclude reservations whose committed equipment has all been dispatched, and the pending rest of a reservation once its window ended.
- Show how much is left of a partly dispatched reservation (falta 1 de 2) and when the rest expires; mark first the reservations the office sent to the dock (Bajando).
- Open a dispatch sheet from each reservation of the list, or from the units tapped on the category screen of the board.
- List the equipment committed in each category, with or without motor.
- Choose the concrete units that leave, among the free units of the category.
- Choose how many of the pending units leave now; the rest stays pending on the same reservation without blocking any machine.
- Note the radio channel of the departure (optional).
- Propose the real departure (now) and the return (departure plus duration), both adjustable.
- Dispatch one category group at a time, atomically and safe to retry.
- Record the departure fuel of each chosen unit of a category that consumes fuel, marked on the gauge lines (US-OPE-03).

## Out of scope

- Closing equipment groups.
- Splitting a reservation in two (US-RES-19, in Reservas).
- Financial information.
- Changing the equipment of a reservation at the dock and recalculating its price.
- Adjusting the duration of a running reservation (US-OPE-06).

## Requirements

- Calculate today in `America/Costa_Rica`.
- Query the half-open interval from today's start through tomorrow's start.
- Include `scheduled` reservations.
- Include `dispatched` reservations only while some committed item has no dispatch (`dispatch_id is null`) and the reservation window has not ended.
- Treat any item with a dispatch as dispatched even when `closed_at` is null.
- Preserve Supabase RLS and operations authorization.
- Dispatch through `dispatch_reservation_group`: it requires the operations area, locks the reservation and the chosen units, and creates the dispatch in the name of the worker who made it.
- Between one and the pending number of units must be chosen; units already assigned to the reservation stay in the dispatch and are never split.
- The unchosen quantity stays on the reservation as a pending item, and a later dispatch of the same category is accepted even while the first group is still out.
- The pending rest expires with the reservation window: when every group came back and the window ended, the reservation closes (trigger on closing a group, and a five-minute sweep).
- A category counted by quantity takes no units.
- A unit that is not `available`, belongs to another category or is out in an open dispatch cannot be chosen.
- A return earlier than or equal to the departure means the next day.
- Retrying a dispatch never commits a unit twice: once nothing is pending in the category the dispatch is refused.
- A category takes a fuel reading when `consumes_fuel` is set; hours and kilometers are never asked at dispatch. A category counted by quantity takes none.
- Fuel is read in lines over the unit's own `fuel_max`, never as a percentage and never as text: the worker taps the gauge line, tapping the line of the current level lowers it by one, and the gauge starts at the last known level. A unit with no known level cannot leave until it is marked.
- The gauge colors the lines by the low fuel warning of the unit (its own, or the one of its category).
- The database validates every reading inside the dispatch: at most one per chosen unit, whole lines between 0 and `fuel_max`, and no reading for a category that takes none. A missing fuel reading uses the unit's current level.
- The dispatch writes `fuel_out` and `usage_out` (the unit's current total) on the reservation item and the new fuel level on the unit in the same transaction, together with the optional radio channel (1 to 99) of the dispatch.

## Edge cases & errors

- Reservations at today's start are included.
- Reservations at tomorrow's start are excluded.
- Unit commitments derive their category from the equipment unit.
- Quantity commitments use their category directly.
- Access and query errors display safe user-facing messages.
- A unit taken by another dispatch while the sheet is open shows a message and reloads the free units.
- When one category is dispatched and others remain, the reservation stays in the list.
- A unit without a previous reading shows a note and cannot leave until its level is marked.
- A radio channel outside 1 to 99 disables the dispatch button and says so.
- A refused reading leaves the reservation, the units and the dispatch untouched and shows a message.

## Constraints

- Use the authenticated server Supabase client and explicit non-financial columns.
- Keep the page and the board as Server Components; only the dispatch action and sheet are client components.
- Render the sheet in a portal so cards with filters do not trap its fixed position.
- Skills: route-structure, component-architecture, component-standards, styles-standards, constants-standards, structure-standards.

## Acceptance criteria

- [x] La lista se limita al día en curso.
- [x] Las reservas canceladas no aparecen.
- [x] La reserva ya existe y solo se selecciona: no se vuelven a escribir sus datos.
- [x] El despacho se abre desde la lista del día o desde la categoría en el tablero, sin dar la vuelta por otra pantalla.
- [x] La hoja lista el equipo comprometido de la categoría, tenga motor o no.
- [x] Operaciones escoge las unidades concretas entre las libres de la categoría.
- [x] Cada categoría sale por su lado y la reserva sigue pendiente mientras falte un grupo.
- [x] Se propone la hora real de salida y se puede ajustar; el regreso se propone y se puede ajustar.
- [x] Una hora de regreso anterior a la de salida se entiende como del día siguiente.
- [x] Pueden salir menos unidades de las comprometidas; el resto queda pendiente en la misma reserva y caduca con su franja.
- [x] Se puede anotar el canal del radio de la salida.
- [x] El despacho queda registrado a nombre de quien lo hizo.
- [x] Si el despacho se reintenta, ninguna unidad queda comprometida dos veces.
- [x] Aplica solo a las categorías que llevan motor.
- [x] La gasolina se registra en rayas sobre el máximo del medidor de esa unidad, nunca en porcentaje.
- [x] La gasolina se marca tocando las rayas del medidor, que arranca en el último nivel conocido; no hay fracciones ni campo numérico.
- [x] No se piden horas ni kilómetros al despachar.
- [x] El despacho escribe la gasolina en la unidad, no solo en la reserva.
