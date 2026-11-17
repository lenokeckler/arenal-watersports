# Extra catalog (US-ADM-19)

## Acceptance criteria (verbatim)

- Por ejemplo parrilla, tubing, wake y tablas.
- Un extra que nunca se usó en una reserva se elimina. Uno que ya se usó se marca inactivo, para no romper el historial.

## Intent

The administration worker keeps the list of extras that reservations can add to a boat trip, without typing them by hand. An extra carries a name and at least one price, in dollars, colones or both.

## In scope

- List, create, edit (name and prices), delete-or-deactivate and reactivate extras, from administration.
- Set the dollar price (`price_usd`) and the colon price (`price_crc`) of an extra, and show them on its card.
- The `/administration/extras` screen is reached by URL only; there is no administration navigation yet.

## Out of scope

- Compatibility per boat (US-ADM-20), inventory occupation (US-ADM-21).
- Adding extras to a reservation and filtering the active ones there (US-RES-11).
- Real-time updates between devices.

## Rules

- Only the administration worker manages extras; every write goes through the session client, never the service role.
- Name: trimmed and required. There is no length limit.
- Prices: two text inputs, "Precio en dólares (USD)" and "Precio en colones (CRC)". At least one is required; an error under the fields asks for it when both are blank. An empty price is stored as null.
- A price present is a number from 0 up, with a point or a comma for the decimals, no sign, no thousands separator and at most 2 decimals. The integer part has up to 10 digits in dollars (`numeric(12,2)`) and 12 in colones (`numeric(14,2)`).
- The server action receives the price texts as `unknown`, re-validates them with the same functions as the form, and only then parses them to numbers; a non-string price is a format error.
- Editing an extra preloads its current prices; a null price is an empty field. Saving replaces both columns with what the form holds.
- The card shows the prices the extra has with the project money format (`formatMoney`), dollars first; a card with one price shows only that one.
- Unique name, case-insensitive: the database index `extras_name_normalized_key` rejects a duplicate with `23505`, mapped to a `nameError` result instead of a thrown error. There is no pre-check query.
- A used extra can be renamed, and an inactive extra can be renamed and reactivated.
- Deleting is decided by the database function `delete_or_deactivate_extra`, which returns `deleted` when the extra was never used in a reservation and `deactivated` when it was; any reference counts, including cancelled reservations.
- The function answers `42501` to a non-administrator and `P0002` to an unknown extra; both become friendly messages. Any other returned value is a defect and throws with the value as cause.
- The card offers "Eliminar" on an active extra, an inline confirmation after pressing it, and "Reactivar" on an inactive extra; the server, not the card, decides whether deleting deletes or deactivates.
- User-facing copy is Spanish addressed as usted.

## Parts

| Part  | Closes                                                           |
| ----- | ---------------------------------------------------------------- |
| 19.01 | Removal function and case-insensitive unique name index          |
| 19.02 | Constants, models, name and error rules, card state, route paths |
| 19.03 | Server reads and actions                                         |
| 19.04 | Extra list                                                       |
| 19.05 | Card removal and reactivation                                    |
| 19.06 | Extra form                                                       |
| 19.07 | Extra price                                                      |

## 19.02 Rules, models, constants and paths

| Requirement                                                                                         | Test                                  |
| --------------------------------------------------------------------------------------------------- | ------------------------------------- |
| The name is required after trimming, and has no length limit                                        | `validateExtraName.test.ts`           |
| A unique violation becomes a name error; `42501` and `P0002` become messages; anything else is null | `mapExtraWriteErrorToResult.test.ts`  |
| The removal outcome is `deleted` or `deactivated`; any other value throws with the value as cause   | `parseExtraRemovalOutcome.test.ts`    |
| Active shows remove, then confirm; inactive always shows reactivate                                 | `resolveExtraCardActionState.test.ts` |
| The edit route is the list path plus the encoded extra id                                           | `resolveExtraEditPath.test.ts`        |
| A database row maps to an `Extra`                                                                   | `mapExtraRowToExtra.test.ts`          |
| Every message and toast is non-empty Spanish addressed as usted                                     | `ExtraCatalogCopy.test.ts`            |

## 19.03 Server reads and actions

| Requirement                                                                                        | Test                                    |
| -------------------------------------------------------------------------------------------------- | --------------------------------------- |
| The list is paginated 20 per page, counted first, and a page past the end reads no rows            | `listExtras.test.ts`                    |
| A page is read ordered by name and then id; the count is an exact head count                       | `extraListQueries.test.ts`              |
| One extra is read by id; an unknown or malformed id gives null                                     | `getExtra.test.ts`                      |
| Create trims the name, rejects a blank or duplicate name as a name error, and refuses a non-admin  | `createExtraAction.test.ts`             |
| Rename trims the name, maps a duplicate to a name error, and reports an extra deleted meanwhile    | `updateExtraAction.test.ts`             |
| Reactivate touches only the inactive extra with the given id                                       | `reactivateExtraAction.test.ts`         |
| Removal calls the database function with the id, narrows its outcome and translates its two errors | `deleteOrDeactivateExtraAction.test.ts` |

## 19.07 Extra price

| Requirement                                                                                                   | Test                                                                                         |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| A price accepts 0, a point or comma decimal and the column precision; text, a sign or 3 decimals are rejected | `validateExtraPriceText.test.ts`                                                             |
| At least one price is required; a present invalid price does not also ask for one                             | `validateExtraPrices.test.ts`                                                                |
| Name and prices are validated together, and a failure becomes a mutation result                               | `validateExtraInput.test.ts`, `resolveExtraValidationResult.test.ts`                         |
| The input fields are read from an `unknown` value                                                             | `readExtraInputField.test.ts`                                                                |
| A price text becomes a number and a blank one becomes null                                                    | `mapExtraInputToPriceColumns.test.ts`                                                        |
| A row carries its prices, and the form preloads them as text with null as empty                               | `mapExtraRowToExtra.test.ts`, `mapExtraToFormValues.test.ts`                                 |
| Create and update validate on the server, write both price columns and refuse a non-string price              | `createExtraAction.test.ts`, `updateExtraAction.test.ts`                                     |
| The form blocks an invalid or missing price, locks the price fields while saving and sends the prices         | `useExtraFormViewModel.test.ts`, `useExtraFormSubmit.test.ts`, `ExtraFormView.test.tsx`      |
| Server price errors reach the price fields without a toast                                                    | `useExtraFormSubmitOutcomes.test.ts`                                                         |
| The card shows the formatted prices it has, dollars first                                                     | `buildExtraPriceLabels.test.ts`, `buildExtraCardViewModel.test.ts`, `ExtraListView.test.tsx` |
| Every price message is non-empty Spanish addressed as usted                                                   | `ExtraCatalogCopy.test.ts`                                                                   |
| Create with only dollars, with both, with none, with invalid text; edit preloads and changes a price          | `e2e/specs/extra-form.e2e.ts`                                                                |

### Acceptance criteria

- [x] The form has "Precio en dólares (USD)" and "Precio en colones (CRC)" inputs and requires at least one.
- [x] Each price is a number from 0 with at most 2 decimals within the column precision; empty is null.
- [x] The server re-validates exactly the same rules before writing.
- [x] Editing preloads the current prices and saves the changed ones.
- [x] The card lists the prices the extra has with the project money format.

## 20.01 Extra compatibility reads (US-ADM-20)

| Requirement                                                                                                                           | Test                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Every extra carries `compatibleUnitCount`, read with the `extra_compatibility(count)` embed; no aggregate row means 0                 | `readCompatibleUnitCount.test.ts`, `mapExtraRowToExtra.test.ts`, `getExtra.test.ts`    |
| The label says "Sin embarcaciones", "Aplica a 1 unidad" or "Aplica a N unidades"                                                      | `buildExtraCompatibilityLabel.test.ts`                                                 |
| `getExtraCompatibilityCategories(extraId)` returns the extra and the active by-unit categories with their unit count and linked count | `getExtraCompatibilityCategories.test.ts`, `buildExtraCompatibilityCategories.test.ts` |
| `getExtraCompatibilityUnits(extraId, categoryId)` returns the extra, the category and its units, each with `isLinked`                 | `getExtraCompatibilityUnits.test.ts`, `buildExtraCompatibilityUnits.test.ts`           |
| Decommissioned units are never counted or listed; a category left with no units is not offered                                        | `buildExtraCompatibilityCategories.test.ts`, `buildExtraCompatibilityUnits.test.ts`    |
| An unknown or malformed extra id, an unknown category or a by-quantity category gives `null`; any other read error throws             | `extraCompatibilityQueries.test.ts`, `getExtraCompatibilityUnits.test.ts`              |

## 20.02 Extra compatibility action (US-ADM-20)

| Requirement                                                                                                        | Test                                                                                |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| The action refuses a non-admin before any read and validates its `unknown` input (three uuids and a list of uuids) | `setExtraCompatibilityAction.test.ts`, `parseSetExtraCompatibilityInput.test.ts`    |
| Saving one category replaces its links and keeps the links the extra has in other categories                       | `resolveExtraCompatibilityUnitIds.test.ts`, `setExtraCompatibilityAction.test.ts`   |
| A selected unit from another category or decommissioned is a validation error and nothing is written               | `resolveExtraCompatibilityUnitIds.test.ts`, `setExtraCompatibilityAction.test.ts`   |
| The database errors 42501, P0002 and 22023 become Spanish results; any other error throws                          | `mapExtraCompatibilityErrorToResult.test.ts`, `setExtraCompatibilityAction.test.ts` |

## 20.03 Extra compatibility categories screen (US-ADM-20)

| Requirement                                                                                                                                         | Test                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| The compatibility routes are the extra path plus the `compatibility` segment and the encoded category id                                            | `resolveExtraCompatibilityPath.test.ts`, `resolveExtraCompatibilityCategoryPath.test.ts`                                                      |
| Every extra card has an "Embarcaciones" link to its compatibility screen and says "Sin embarcaciones", "Aplica a 1 unidad" or "Aplica a N unidades" | `buildExtraCardViewModel.test.ts`, `ExtraListView.test.tsx`                                                                                   |
| The screen is for administration only and shows not found for an unknown extra                                                                      | `ExtraCompatibilityCategoryList.test.tsx`                                                                                                     |
| The screen names the extra and lists each by-unit category as a tappable card with "N de M unidades" linking to its units screen                    | `buildExtraCompatibilityCategoryCards.test.ts`, `buildExtraCompatibilityProgressLabel.test.ts`, `ExtraCompatibilityCategoryListView.test.tsx` |
| A category with one unit says "de 1 unidad"; the empty state shows when no category has units; "Volver a extras" returns to the list                | `buildExtraCompatibilityProgressLabel.test.ts`, `ExtraCompatibilityCategoryListView.test.tsx`                                                 |
| The new dynamic route is classified for the session bar scan                                                                                        | `pageRouteClassification.test.ts`                                                                                                             |

### Acceptance criteria

- [x] Each extra card has an "Embarcaciones" button and shows how many units the extra applies to.
- [x] The compatibility screen lists the extra name and the by-unit categories with their linked count.
- [x] Each category row is at least 44 px tall and opens the units screen of that category.
- [ ] Choosing the units of a category is carried by US-ADM-20 PR 20.05.

## 20.04 Extra compatibility units logic and screen (US-ADM-20)

| Requirement                                                                                                        | Test                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| A unit is toggled without mutating the selection; the saved and the selected units are compared as sets            | `toggleExtraCompatibilityUnitId.test.ts`, `hasExtraCompatibilityChanges.test.ts`, `listExtraCompatibilityUnitIds.test.ts` |
| Every unit row shows its code, its status word and whether it is checked                                           | `buildExtraCompatibilityUnitOptions.test.ts`, `ExtraCompatibilityUnitsFormView.test.tsx`                                  |
| Marcar todas checks every unit, Quitar todas clears them and Guardar stays disabled until the selection changes    | `useExtraCompatibilityUnitsFormViewModel.test.ts`, `ExtraCompatibilityUnitsFormView.test.tsx`                             |
| Saving sends the extra, the category and the checked ids, toasts, goes back to the categories screen and refreshes | `useExtraCompatibilityUnitsFormViewModel.test.ts`, `submitExtraCompatibility.test.ts`                                     |
| Nothing is submitted when nothing changed, and a second submit is blocked while the first is in flight             | `useExtraCompatibilityUnitsFormViewModel.test.ts`                                                                         |
| Offline, a failed result and a broken request each give a clear Spanish toast and keep the worker on the screen    | `submitExtraCompatibility.test.ts`                                                                                        |
| The screen is for administration only and shows not found for an unknown extra or category                         | `ExtraCompatibilityUnitsForm.test.tsx`                                                                                    |
| The new dynamic route is classified for the session bar scan                                                       | `pageRouteClassification.test.ts`                                                                                         |

### Acceptance criteria

- [x] The units screen lists all active units of the category as a checklist with code and status word; linked units are checked.
- [x] Marcar todas, Quitar todas, Guardar and Regresar work; Guardar saves only the units of that category.
- [x] On success the worker sees a toast and returns to the categories screen with the counts refreshed.
- [x] Offline or failed saves show a clear Spanish message and keep the selection.
- [ ] Offering only the matching extras when building a reservation is carried by a later US-ADM-20 PR.
