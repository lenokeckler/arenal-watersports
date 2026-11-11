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
