# Equipment board

## Intent

Let any worker see at a glance how much reservable equipment is free and how much is in use right now, as the entry screen of the application.

## In scope

- Read-only screen at `PATHS.BOARD`, rendered on the server, that becomes the entry screen.
- One card per active reservable category tracked by unit: its name, the free count, and "N en uso de T".
- Categories that administration grouped appear as one card with the summed totals and the member categories listed inside with their own counts.
- Two cards per row on a phone.
- Loading, empty and error states with Spanish copy and a retry button.

## Out of scope

- Per-unit screen (US-TAB-02), live updates (US-TAB-03), bottom navigation (US-TAB-04), visibility by role and work mode (US-TAB-07), per-device layout (US-TAB-12).
- Reservable categories tracked by quantity: they have no per-unit "en uso" and are not shown.
- Photos and status chips on cards.
- Cards as links or choosers: they are not interactive in this story.
- Redirecting login and work-mode choice to the board; they keep `PATHS.HOME`.

## Requirements

### User story (US-TAB-01)

Como un trabajador de la empresa,
necesito ver el tablero con el equipo y cuánto hay libre apenas entro,
con la finalidad de saber de un vistazo qué se puede alquilar en este momento.

### Acceptance criteria (US-TAB-01)

- Se muestra una tarjeta por cada categoría reservable del inventario.
- Cada tarjeta indica cuántas unidades hay libres y cuántas en uso sobre el total.
- Una unidad despachada nunca cuenta como libre, aunque la hora real de regreso de su salida ya haya vencido. Libres más en uso nunca supera el total.
- Las categorías que administración agrupó se muestran como una sola tarjeta, con los totales sumados y sin fusionarse por dentro.
- En pantalla de celular las tarjetas van de dos en dos, para no obligar a bajar media pantalla por categoría.
- Es la vista que responde de un vistazo qué hay disponible en este momento, y desde donde se escoge el equipo para una reserva.
- Los chalecos, los remos y los extintores no salen aquí: viven en el inventario, que es otra pantalla y sirve para contar, no para agendar.

### Non-functional requirements

- RNF-010, RNF-011, RNF-025, RNF-026 and RNF-027 apply as in the other screens.

## Edge cases & errors

- A dispatched unit is in use even when its return time has passed; it is never free.
- Free plus in use never exceeds the total; units in maintenance or damaged count only in the total.
- A group with a single visible member renders as a plain card with the category name.
- Group names that differ only in casing merge into one card.
- A category with no units stays visible with zero counts.
- A failed read shows the error state with a retry button and is never rendered as an empty board.

## Technical notes

- Counts come from the `board_category_summary` view with `security_invoker`, so row-level security decides what each worker reads.
- Reuse existing components / constants / store patterns: `Title`, `Text`, `Section`, `UnorderedList`, `Button`, `MaterialIcon`; no Redux.
- Skills that apply: component-architecture, component-standards, constants-standards, styles-standards, structure-standards.

## Acceptance criteria

- [ ] Each reservable category tracked by unit has one card with its free count and "N en uso de T".
- [ ] A dispatched unit with an overdue return is counted in use and never as free; free plus in use never exceeds the total.
- [ ] A grouped category is one card with summed totals and its members listed with their own counts.
- [ ] On a phone the cards sit two per row.
- [ ] Vests, paddles and extinguishers do not appear on the board.
- [ ] Pending: choosing equipment for a reservation from the board (second half of the sixth criterion) needs the reservation creation flow and is not part of this story.
