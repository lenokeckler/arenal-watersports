# Board layout per device (US-TAB-12)

## Intent

A worker who always rents the same equipment arranges the board once, on the device they use: how many cards go in each row and which categories come first.

## In scope

- Choose two or three cards per row from the side panel.
- Reorder the categories from the side panel by dragging a handle with a finger or a mouse, or with the arrow keys.
- Reorder the categories on the board itself: hold a card (long press with a finger, or press and move with the mouse) and drag it to its new place.
- Keep the layout and the order on the device (`localStorage`), like the theme.
- Read the saved order as a hint: an id the board no longer has is ignored, a category the order does not mention goes to the end.

## Out of scope

- Saving the layout in the account or the database.
- Any other screen's layout.

## Requirements

- The panel section shows only while the board is mounted and has cards; the board publishes its cards to the `boardLayout` slice and withdraws them when it unmounts.
- Without a saved column count the board keeps its responsive default (two on a phone, three on a wide screen).
- A move rewrites the saved order with the ids the board shows, so ids that are gone are dropped from storage on the next move.
- Nothing is written when the board changes: a category added or removed by administration never asks the worker to save again.

## Edge cases and errors

- Storage unavailable, full, corrupt or foreign: read as the default layout, write failures ignored.
- A column count other than two or three is dropped; non-string ids of a saved order are dropped.
- A pointer that leaves the list is clamped to the first or last row; only the primary pointer button starts a drag.
- On the board a finger that moves before the long press ends is a scroll, not a drag; a tap after a drag never opens the category.

## Constraints

- Redux holds the transient cards and the current preference; storage helpers live in `app/utils/board-layout`.
- No drag-and-drop library: pointer events with pointer capture and `touch-action: none` on the handle cover finger and mouse; arrow keys cover the keyboard.
- Skills that apply: component-architecture, constants-standards, styles-standards, structure-standards, redux-store-architecture, unit-testing-standards.

## Acceptance criteria

- [x] Se escoge cuántas tarjetas van por fila, entre dos y tres.
- [x] Las categorías se reordenan arrastrándolas, con el dedo en el teléfono y con el mouse en la computadora.
- [x] La distribución y el orden se guardan en el dispositivo y no en la cuenta.
- [x] Una categoría que el orden guardado ya no reconoce se ignora, y una que el orden no menciona conserva su posición al final.
- [x] Nadie tiene que volver a guardar su orden porque administración agregó o quitó una categoría.
