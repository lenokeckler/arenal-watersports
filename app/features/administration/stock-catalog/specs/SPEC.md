# Stock count (US-ADM-17)

## Acceptance criteria (verbatim)

- Se registra cuántos hay en total.
- Se separan por estado: disponibles, dañados y en reparación.
- Cuando se bota o se pierde uno, se baja la cantidad. No hay nada que dar de baja porque no hay ficha por unidad, y el historial de conteos deja ver de cuánto a cuánto bajó y en qué fecha.
- En las categorías con aviso por vencimiento se registra la fecha de vencimiento.

## Rules

- Only the administration worker counts stock; the screen redirects anyone else home, `adjustStockAction` calls `assertIsAdminWorker`, and the database function is the real guard.
- Only a `by_quantity` category has a count; an unknown category or a `by_unit` one is a 404.
- The total is the sum of the three counts and is never typed.
- The reason is one of `initial_count` ("Conteo inicial"), `discarded` ("Botado"), `lost` ("Perdido") and `count_correction` ("Corrección de conteo"). A category with no history preselects the initial count; one with history preselects a correction; after a save the reason goes back to a correction.
- The expiry date field exists only when the category has an expiry alert.
- Each save writes one history row with the state counts before and after; the history is read newest first, one page at a time.

## Parts

| Part  | Closes                                                      |
| ----- | ----------------------------------------------------------- |
| 17.01 | Admin-only stock writes and the transactional adjustment    |
| 17.02 | Stock readers, history and the adjustment action            |
| 17.03 | Stock count screen and the Conteo link on the category card |

## 17.03 Stock count screen

| Requirement                                                                                                      | Test                                                               |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Only an administrator opens the screen; an unknown or by-unit category is a 404                                  | `StockCount.test.tsx`, `e2e/specs/stock-count.e2e.ts`              |
| Disponibles, dañados and en reparación are editable fields and the total is their sum                            | `StockCountView.test.tsx`, `stockFormMappers.test.ts`              |
| The four reasons are offered in Spanish and the default follows the history                                      | `StockCountView.test.tsx`, `StockCountViewSubmit.test.tsx`         |
| The expiry date field appears only for a category with an expiry alert                                           | `StockCountView.test.tsx`                                          |
| Guardar calls `adjustStockAction`, toasts the success or the Spanish error of the result, and refreshes the page | `StockCountViewSubmit.test.tsx`                                    |
| A quantity that is not a whole number and an unchanged count are refused before the request                      | `StockCountViewSubmit.test.tsx`, `validateStockFormValues.test.ts` |
| The form and its fields are disabled while the request is in flight                                              | `StockCountViewSubmit.test.tsx`                                    |
| A failed read shows an error with a retry instead of the form                                                    | `StockCount.test.tsx`, `StockCountView.test.tsx`                   |
| The history shows the date, the reason and the from to values per state and for the total, with its empty state  | `buildStockMovementCard.test.ts`, `StockCountView.test.tsx`        |
| The history is paginated on the server and a page past the end redirects to the last one                         | `StockCount.test.tsx`, `StockCountView.test.tsx`                   |
| By-quantity category cards, active or inactive, link to the stock count; by-unit cards do not                    | `CategoryCardStockLink.test.tsx` (category-catalog)                |
| A count and a discard are registered and appear in the history with their from to values                         | `e2e/specs/stock-count.e2e.ts`                                     |
