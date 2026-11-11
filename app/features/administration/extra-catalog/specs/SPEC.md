# Extra catalog (US-ADM-19)

## Acceptance criteria (verbatim)

- Por ejemplo parrilla, tubing, wake y tablas.
- Un extra que nunca se usó en una reserva se elimina. Uno que ya se usó se marca inactivo, para no romper el historial.

## Intent

The administration worker keeps the list of extras that reservations can add to a boat trip, without typing them by hand. An extra carries only a name.

## In scope

- List, create, rename, delete-or-deactivate and reactivate extras, from administration.
- The `/administration/extras` screen is reached by URL only; there is no administration navigation yet.

## Out of scope

- Prices (columns stay null, no UI), compatibility per boat (US-ADM-20), inventory occupation (US-ADM-21).
- Adding extras to a reservation and filtering the active ones there (US-RES-11).
- Real-time updates between devices.

## Rules

- Only the administration worker manages extras; every write goes through the session client, never the service role.
- Name: trimmed and required. There is no length limit.
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
