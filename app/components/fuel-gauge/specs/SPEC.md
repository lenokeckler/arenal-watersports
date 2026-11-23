# Fuel Gauge

## Intent

Show and capture a unit's fuel the way the dock reads it: in lines of its own gauge, never as a percentage and never as text.

## In scope

- Draw a gauge with one line per line of the unit's gauge.
- Make the lines tappable when a handler is given.
- Color the filled lines by the unit's low fuel warning.

## Out of scope

- The numeric field, the hours field and every rule about when a reading is required: they belong to the screen that uses the gauge.
- Reading the unit's fuel or its warning from the database.

## Requirements

- A level of `null` draws every line empty and is announced as "Sin lectura"; it is never the same as 0.
- Lines up to the level are filled. A level equal to or below the warning of the unit draws them in the warning color; any other level uses the normal color.
- A level of 0 draws every line empty with a red border.
- Tapping a line sets the level to that line; tapping the line of the current level lowers the level by one, so an empty tank can be marked.
- Nothing is written on screen: the level is exposed only through the accessible name of the gauge and of each line.
- Every control has an accessible name that includes the line and the maximum.

## Constraints

- No Tailwind class in the components: they live in `styles/FuelGauge.styles.ts`.
- Copy in Spanish, addressed as usted, in `FuelGaugeCopy.constants.ts`.
- Skills: component-architecture, component-standards, styles-standards, constants-standards, structure-standards.
