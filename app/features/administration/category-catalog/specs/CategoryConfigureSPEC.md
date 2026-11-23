# Category configure screen (US-ADM-12, US-ADM-13, US-ADM-14, US-ADM-15)

## Intent

Let the administration worker open one category and see everything about it on a single screen: its status, and one collapsible section per concern with a one-line summary, instead of six separate screens.

## In scope

- Part 2a (this branch): the route `/administration/categories/[categoryId]`, the administrator guard and not found, the status card, the six collapsible sections with their summaries, and the inventory section buttons to the existing stock and units screens.
- Part 2b: the Guardar bar, the save engine, the Reservas body and the Categoria activa switch.
- Part 2c: the Caracteristicas, Deposito and Avisos bodies.
- Part 2d: the Foto body, delete, and the unsaved-changes guard on Regresar.

## Out of scope

- Linking the category card to this screen and removing the card panel.
- The six existing screens (`behavior`, `deposit`, `alerts`, `image`, `stock`, `units`): they keep working untouched.
- Offline queueing.

## Requirements

- The first read happens on the server: one category row plus its current quantity.
- A visitor who is not administration goes to the home; an unknown or malformed id shows not found.
- The status card shows the status chips (on board, inventory only, inactive, plus guide only), the matching detail sentence, a "Falta:" note for missing stock, duration and photo, the Categoria activa switch (disabled in 2a) and the locked tracking mode.
- Six sections, in this order: Reservas, Existencias or Unidades, Foto para el tablero, Deposito de garantia, Avisos, Caracteristicas del equipo. Each shows a title and a one-line summary; Reservas starts open.
- A section header is a button with `aria-expanded` and `aria-controls`, at least 44 px high.
- The open sections live in the `categoryConfigure` Redux slice.
- The inventory section links to the existing stock screen (by quantity) or units screen (by unit).

## Edge cases & errors

- A category with no photo shows the Falta badge; the traits section always shows the Opcional badge.
- A non-reservable or inactive category never shows the duration in its Reservas summary.
- A failed read throws and reaches the route error boundary.

## Constraints

- Reuse existing components, summaries mappers and constants: `Link`, `Button`, `Title`, `Text`, `readCategoryRow`, `fetchCategoryQuantities`, the row mappers.
- Skills that apply: component-architecture, structure-standards, styles-standards, constants-standards, route-structure, redux-store-architecture, unit-testing-standards.

## Part 2a requirements

| Requirement                                                           | Test                                         |
| --------------------------------------------------------------------- | -------------------------------------------- |
| Administrator guard, not found and the view handed the configuration  | `CategoryConfigure.test.tsx`                 |
| One row plus its quantity read and mapped, null for unknown or bad id | `getCategoryConfiguration.test.ts`           |
| Summaries of the six sections                                         | `resolveCategoryConfigureSummaries.test.ts`  |
| Status chips, detail and missing note                                 | `resolveCategoryConfigureStatusCard.test.ts` |
| Sections in order with title, summary, badge and open state           | `resolveCategoryConfigureSections.test.ts`   |
| Toggling a section updates the slice                                  | `categoryConfigureSlice.test.ts`             |
| Header, status card and sections render; sections open and close      | `CategoryConfigureView.test.tsx`             |
| The route and the old routes keep loading                             | `category-configure.e2e.ts`                  |

## Acceptance criteria

US-ADM-12 to US-ADM-15 as written in `docs/proyecto/historias-de-usuario.md`; part 2a closes none of them on its own and lays the screen the next parts fill.

- [ ] One screen shows the category with its status and a summary per concern. — 2a.
- [ ] Every flag, deposit and alert is editable and saved together. — 2b and 2c.
- [ ] Photo, reactivation and delete. — 2b and 2d.

## Part 2b-1 requirements

| Requirement                                                                                       | Test                                           |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Switches Se puede reservar and Solo con guía, duration chips 30/60/90/120 and Otra with the field | `CategoryConfigureReservations.test.tsx`       |
| Otra, or a duration outside the presets, selects Otra and keeps the existing field validation     | `resolveCategoryDurationChipSelection.test.ts` |
| Duration and guide only are hidden while the category is not reservable                           | `CategoryConfigureReservations.test.tsx`       |
| The section summary follows the edited values; nothing is saved in this part                      | `category-configure.e2e.ts`                    |

## Part 2c requirements

| Requirement                                                                                                                                        | Test                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Depósito, Avisos and Características bodies reuse the previous fields and rules; nothing is saved                                                  | `CategoryConfigureDetails.test.tsx`, `category-configure.e2e.ts`                                                                                           |
| Summaries follow the edited values; text that is not a number never reaches them                                                                   | `CategoryConfigureDetails.test.tsx`                                                                                                                        |
| One behavior field instance feeds Reservas and Características                                                                                     | `CategoryConfigureReservations.test.tsx`                                                                                                                   |
| Avisos offers No avisar, Pocas existencias, Por vencimiento and Ambos; Ambos shows both number fields and a saved combined type selects only Ambos | `isCategoryAlertTypeChoiceSelected.test.ts`, `buildCategoryConfigureAlertsProps.test.ts`, `CategoryConfigureDetails.test.tsx`, `category-configure.e2e.ts` |

## Part 2d requirements

| Requirement                                                                                                                                                                                                                       | Test                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| The Foto body shows the preview or placeholder, the pick button and the help; picking only changes local state                                                                                                                    | `CategoryConfigurePhoto.test.tsx`, `category-configure.e2e.ts`                                      |
| A picked photo clears the Falta badge and sets the summary; an invalid file shows the existing validation message                                                                                                                 | `CategoryConfigurePhoto.test.tsx`, `resolveCategoryConfigureSummaries.test.ts`                      |
| Eliminar categoría asks for confirmation, deletes and returns to the list; it is hidden when the category has records; Desactivar en su lugar (hidden when the category is already inactive) and a refused delete are covered too | `CategoryConfigureDelete.test.tsx`, `getCategoryConfiguration.test.ts`, `category-configure.e2e.ts` |
