# Equipment board

## Intent

Let any worker see at a glance how much reservable equipment is free and how much is in use right now, as the entry screen of the application.

## In scope

- Read-only screen at the entry route `PATHS.HOME` and at `PATHS.BOARD`, rendered on the server.
- One card per active reservable category tracked by unit: its product image, a "Por unidad" chip, a "N / T libres" chip, its name and a bar with the free share.
- Categories that administration grouped appear as one card with the summed totals and no member lines: the individual categories are not rendered on the board.
- Two cards per row on a phone, three from `md`.
- A header with an icon tile, the title "Tablero" and the subtitle "Qué se puede alquilar en este momento.".
- Loading, empty and error states with Spanish copy and a retry button.
- Every card is a link to the units screen of its category (US-TAB-02), a design decision of the product owner: tapping Cuadraciclo opens `/board/categories/<id>`. A grouped card opens the units screen of its first member by name, and that screen lets the worker switch to the other members of the group.

## Out of scope

- Live updates (US-TAB-03), bottom navigation (US-TAB-04), visibility by role and work mode (US-TAB-07), per-device layout (US-TAB-12).
- Reservable categories tracked by quantity: they have no per-unit "en uso" and are not shown.
- Uploading or managing images: the image comes from the existing files in `public/images/equipment/`, picked by category name; a category with no known image shows a neutral placeholder.
- The "actualizado en tiempo real" claim in the subtitle: it arrives with US-TAB-03.
- Status chips on cards.
- Choosing equipment for a reservation from a card: the cards only open the units screen.
- Offline storage and synchronization after reconnecting.

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

## Design notes

- The whole card is the photo: a square image area, `object-cover`, full-bleed and clipped by the card's rounded corners. Floating over it, the "Por unidad" chip top-left (at every width; below `md` its text shortens to "Unidad" and the chip tightens so both chips stay on one row), the "N / T libres" chip top-right ("libre" when exactly one is free) on a dark translucent blurred backdrop, and the category name bottom-left over a dark gradient, with the free bar drawn under the name at the very bottom (teal fill is free / total, so a card with everything free is full). A grouped card looks and behaves like every other card: one photo, the same chips (with the summed totals), the group name and the free bar. It has no button, chevron or member lines.
- Both `/` and `/board` render the same guarded board entry. The root route renders the board directly to avoid a second navigation on startup; both routes pass through the session proxy and the work-mode gate.
- The card link is an empty `Link` stretched over the whole card (`absolute inset-0`), placed inside the list item after the media, with `aria-label` equal to the card label. The list item keeps its `listitem` semantics and its box, so the cards-per-row layout is unchanged, and the heading level 2 with the label stays. Keyboard: the link is focusable and shows a `ring-2` focus ring (inset, because the card clips overflow). Hover and press scale the card slightly (`scale-102`, `scale-98`); with reduced motion the scale and the transition are off.
- The "en uso" count was dropped from the cards on the product owner's request (Kendall and Leno's reference). The criterion "cuántas libres y cuántas en uso sobre el total" is carried by the free/total chip and the free-share bar: in use is the total minus the free.
- Every photo is square, and the photo grows to fill the row height, so neighbouring cards end flush.
- Grid: 2 columns on a phone, 3 from `md`, inside a `max-w-7xl` page.
- Colors come from the `@theme` tokens of `app/globals.css`; the image resolver is `resolveReservationEquipmentImage`.

## Edge cases & errors

- A dispatched unit is in use even when its return time has passed; it is never free.
- Free plus in use never exceeds the total; units in maintenance or damaged count only in the total.
- A group with a single visible member renders as a plain card with the category name and links to that member.
- A grouped card links to its first member by name (alphabetical, es-CR collation, ties broken by id), whatever order the rows arrive in; it is computed once in `buildBoardCard` as `targetCategoryId`.
- Grouped categories are shown as one card with summed totals. The individual categories are chosen later (reservation form, category units screen), so by decision of the product owner the member options are not rendered on the board; the card model still carries them for later use.
- Group names that differ only in casing merge into one card.
- A category with no units stays visible with zero counts and an empty bar.
- A category with no known image renders the same card with a neutral placeholder in the image area.
- A failed read shows the error state with a retry button and is never rendered as an empty board.

## Technical notes

- Counts come from the `board_category_summary` view with `security_invoker`, so row-level security decides what each worker reads.
- Reuse existing components / constants / store patterns: `Title`, `Text`, `Section`, `UnorderedList`, `Button`, `MaterialIcon`; no Redux.
- Skills that apply: component-architecture, component-standards, constants-standards, styles-standards, structure-standards.

## Acceptance criteria

- [ ] Each reservable category tracked by unit has one card with its free count over the total in a chip and a bar with the free share.
- [ ] A dispatched unit with an overdue return is counted in use and never as free; free plus in use never exceeds the total.
- [ ] A grouped category is one card with summed totals, with no member lines and no toggle.
- [ ] On a phone the cards sit two per row.
- [ ] Each card shows its image (or a placeholder), the "Por unidad" chip, the "N / T libres" chip, the name and the free-share bar.
- [ ] Vests, paddles and extinguishers do not appear on the board.
- [ ] Every card has exactly one link, named after the card label, that opens `/board/categories/<id>`; a plain card and a single-member group open their own category and a grouped card opens its first member by name.
- [ ] The card link is reachable with the keyboard, shows a visible focus ring, and hover and press give a subtle `motion-reduce`-safe state.
- [ ] Pending: choosing equipment for a reservation from the board (second half of the sixth criterion) needs the reservation creation flow and is not part of this story.
