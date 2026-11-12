# Fuel Gauge

## Intent

Show and capture a unit's fuel the way the dock reads it: in lines of its own gauge, never as a percentage.

## In scope

- Draw a gauge with one line per line of the unit's gauge, and read it as "3 de 4".
- Make the lines tappable when a handler is given.
- Offer shortcuts for a quarter, a half, three quarters and full, scaled to the gauge.

## Out of scope

- The numeric field, the hours field and every rule about when a reading is required: they belong to the screen that uses the gauge.
- Reading the unit's fuel from the database.

## Requirements

- A level of `null` reads "Sin lectura" and draws every line empty; it is never the same as 0.
- Lines up to the level are filled; the color follows the tier of the level over the maximum.
- A shortcut is offered only when its level is within an eighth of its fraction, so a gauge of two lines never labels one line as a quarter.
- Full is always offered.
- Every control has an accessible name that includes the line and the maximum.

## Constraints

- No Tailwind class in the components: they live in `styles/FuelGauge.styles.ts`.
- Copy in Spanish, addressed as usted, in `FuelGaugeCopy.constants.ts`.
- Skills: component-architecture, component-standards, styles-standards, constants-standards, structure-standards.
