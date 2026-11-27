# Price lookup

## Intent

Let a person from operations on the dock answer how much an outing costs without going up to the office: a read-only screen over the catalog of tariffs, extras and combos that administration maintains (US-TAB-10).

## In scope

- Tariffs per category and per outing type (rental and tour), each currency on its own line.
- Extra prices, filed in the section of their audience: nationals in colones, foreigners in dollars.
- Package prices of the combos, filed in the section of the audience the combo was built for.
- Only active categories, extras and combos.
- Loading, empty, error and no-access states.

## Out of scope

- Editing any tariff, extra or combo; that stays in administration (US-ADM-19, US-ADM-22 to US-ADM-25).
- Any money movement of a reservation: charges, refunds and deposits are never read.
- Converting or adding amounts across currencies.

## Requirements

- The data is read on the server, through the operations access check, with the signed-in worker's own client so Row Level Security applies.
- A tariff row shows every currency it has, dollars first, and says so when a type has no tariff.
- An extra appears in the nationals section only if it has a colones price and in the foreigners section only if it has a dollars price.
- A combo with no package price is not listed.

## Edge cases & errors

- A worker without the operations area gets the no-access message.
- Any read failure shows one retry-friendly message that mentions the signal.
- Nothing active at all shows the empty message.

## Constraints

- Reads only `equipment_categories` with `tariffs`, `extras`, `combos` and `combo_items`, which every active worker may select; no migration is needed.
- Skills that apply: route-structure, component-architecture, styles-standards, constants-standards, structure-standards.

## Acceptance criteria

- [ ] Lists the tariffs per category and per outing type.
- [ ] Lists the extra prices and the combo package prices, each in the section of its audience.
- [ ] Shows the amounts separated by currency and never adds them.
- [ ] Is read-only.
- [ ] Shows no charges, refunds or deposits.
- [ ] Shows only active tariffs, extras and combos.
