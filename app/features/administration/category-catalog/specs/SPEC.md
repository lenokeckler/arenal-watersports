# Category list screen

## Intent

Let the administration worker open `PATHS.ADMINISTRATION.CATEGORIES` and see every inventory category
the company has registered, each with its tracking mode and optional group, with a clear empty state
and a clear error state they can retry from.

## In scope

- `CategoryList`, a Server Component that reads the list through `listCategories` and hands it to
  `CategoryListView`.
- The header: title and purpose line.
- Three view states: ready, empty and error.
- One card per category: name, an inactive pill, the tracking-mode label and, when present, the
  group row.
- The Retry button of the error state.
- Spanish copy, read from `CATEGORY_CATALOG_COPY`.

## Out of scope / deferred

- Marking a category inactive and deleting it: carried by `feat/adm-02/us-12-03-mark-inactive-and-delete`
  (#18). On this branch the card action state is always `NONE`, so no action is rendered.
- Creating a category: carried by #35-#38.
- Board and booking grouping of categories that share a group.

## Requirements

- The list is read on the server with `createServerSupabaseClient`: `fetchCategories` orders the rows
  by name ascending and `fetchCategoryIdsWithRecords` collects the category ids that have units or
  stock rows. `mapCategoryRowToListItem` turns each row into a `CategoryListItem`.
- The view state is `error` when the read failed, `empty` when it succeeded with no categories, and
  `ready` otherwise.
- Each card shows the category name, the tracking-mode label from `resolveCategoryTrackingModeLabel`
  and, when `groupName` is set, a group row made of `GROUP_PREFIX_LABEL` and the group name.
- A category whose status is inactive shows the `STATUS_PILL_INACTIVE` pill and a distinct container
  class (`resolveCategoryCardContainerClassName`).
- Retry calls `router.refresh()`, which re-runs the server read.

## Edge cases & errors

| Case                    | Observable result                                                                                                  | Copy key                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| Ready, with groups      | One card per category; cards with a group show the group row, cards without one show none                          | `GROUP_PREFIX_LABEL`, `TRACKING_MODE_MICRO_LABEL_*` |
| Empty list              | Empty state with title and body, no cards                                                                          | `EMPTY_STATE_TITLE`, `EMPTY_STATE_BODY`             |
| Fetch failure           | `CategoryList` returns no categories and `fetchFailed: true`; the error state shows the message and a Retry button | `FETCH_ERROR_MESSAGE`, `RETRY_BUTTON`               |
| Retry, read succeeds    | The refresh re-renders the server component with the new list; the view state becomes ready or empty               | The keys of the resulting state                     |
| Retry, read fails again | The error state is shown again                                                                                     | `FETCH_ERROR_MESSAGE`, `RETRY_BUTTON`               |
| Inactive category       | The card shows the pill and the inactive container class; no action is offered                                     | `STATUS_PILL_INACTIVE`                              |

## Constraints

- Server entry `app/features/administration/category-catalog/CategoryList.tsx`; the data access is in
  `services/listCategories.ts`, which passes every Supabase error through `throwIfSupabaseError`.
  The failure is wrapped with `CATEGORY_LIST_DIAGNOSTICS.FETCH_FAILED` and the original error as its
  `cause`.
- View state and retry live in `hooks/useCategoryListViewModel.ts`, with the states in
  `constants/CategoryListViewState.constants.ts`; each card's action state comes from
  `utils/resolveCategoryCardActionState.ts` and its handlers from `hooks/useCategoryCardActions.ts`.
- The page file `app/(system)/administration/categories/page.tsx` renders `CategoryList`, reached through
  `PATHS.ADMINISTRATION.CATEGORIES`. The entry component redirects a worker who is not an administrator
  to `PATHS.HOME` before it reads any category, the same server check the other administration screens use.
- The list is paginated on the server (RNF-027): `listCategories(page)` reads one page of
  `CATEGORY_LIST_PAGINATION.PAGE_SIZE` rows with `.range()` after an exact head count (so a page past the last
  one reads no rows), and looks up records only for the ids of that page. The page comes from the `page` query parameter, which falls back to the first
  page when it is not a positive integer; a page past the last one redirects to the last page, which is
  also where a delete of the last card of a page lands after the refresh. `CategoryListPagination` renders
  the previous and next links and "Página X de Y" only when there is more than one page.
- Cross-device updates (RNF-025) are a staged dependency, not part of this screen: the project has no
  shared synchronization path yet (no realtime subscription in `app/`, and `equipment_categories` is not
  in the `supabase_realtime` publication). Until that path lands, the list reflects another device's
  change on the next navigation or refresh, and after this worker's own create, inactivate or delete.
- The create screen is `app/(system)/administration/categories/new/page.tsx`, reached through
  `PATHS.ADMINISTRATION.CATEGORIES_NEW`. `CategoryCreateForm` applies the same administrator redirect and
  renders `CategoryCreateFormView`; `createCategoryAction` validates the trimmed name again on the server.
- Skills that apply: `component-architecture`, `component-standards`, `constants-standards`,
  `styles-standards`, `structure-standards`, `unit-testing-standards`.

## Acceptance criteria

US-ADM-12, as written in `docs/proyecto/historias-de-usuario.md`:

- [ ] Aquí entra todo lo que la empresa tiene: jet skis, lanchas, cuadraciclos, kayaks, tablas, parrillas, remos, chalecos y extintores. — this branch lists every row of `equipment_categories`; which categories exist depends on the data and on the create screen (#35-#38).
- [ ] El equipo reservable no es un registro aparte: es la parte del inventario marcada como reservable. — not touched here; carried by the board stories.
- [ ] La lista no queda cerrada de antemano, porque cada temporada aparece algo nuevo que hace falta contar. Si mañana compran drybags, se crea la categoría y se define su comportamiento sin tocar nada más. — creating is carried by #35-#38; this branch only shows what exists.
- [ ] Una categoría que nunca tuvo unidades ni artículos se elimina. Una que ya tuvo se marca inactiva, para no romper el historial. — carried by #18; this branch reads `hasRecords` but renders no action.
- [ ] Una categoría puede llevar un grupo, opcional. Las que comparten grupo se muestran como una sola tarjeta en el tablero y como un solo bloque al reservar, pero se cuentan y se cobran por separado. Es el caso de los kayaks sencillos y los dobles, y el de los paddleboards cuando hay más de un tipo. — the list shows the optional group label per category; the shared card and block are carried by the board stories.
- [ ] No se agrupa una categoría que se lleva por unidad con una que se lleva por cantidad: la tarjeta no podría sumar sus propios números. — validation is carried by #35-#38.
- [x] Sin grupo, la categoría se muestra sola, que es el caso de la mayoría. — in the list, a category without a group renders as its own card with no group row.

# Category deposit rules (US-ADM-14)

## Intent

Let the administration worker set, change and clear the guarantee deposit of a category, in dollars and in colones, each currency on its own. A category with no deposit is a valid state.

## In scope

- Part 14.01 (this branch): the rules only. `findMoneyAmountIssue` and `parseMoneyAmount` in `app/utils/money`, `CATEGORY_DEPOSIT_LIMITS`, `CATEGORY_DEPOSIT_ERROR_COPY`, the form and input models, and `validateCategoryDepositFormValues`.
- Part 14.02: the form-to-input and deposit-to-form mappers, the data access and the administrator-only update action.
- Part 14.03: the form state and submit hooks.
- Part 14.04: the screen, its route and the card link.

## Out of scope / deferred

- Reading the deposit when a reservation is dispatched: carried by US-RES-29.
- Converting or adding amounts of different currencies (RNF-034, RNF-035).
- Tariffs (US-ADM-23 to US-ADM-25), which may use other limits with the same money-amount rules.

## Requirements

- Each field is judged on its own, after trimming its text.
- A blank field means no deposit for that currency: no error, and it is parsed as `null`.
- The text holds only digits with an optional single `.` followed by digits. A sign, a comma, a thousands separator, a symbol, an exponent, a leading dot or a trailing dot is a format issue.
- Leading zeros are not counted as integer digits.
- At most 10 integer digits in USD and 12 in CRC, and at most 2 decimals in both. Anything more is a precision issue.
- The value must be greater than zero: `0`, `000` and `0.00` are not-positive issues.
- The checks run in this order: format, precision, positive.
- The limits live only in `CATEGORY_DEPOSIT_LIMITS`; the precision message is built from them.

## Part 14.04 requirements (the screen)

| Requirement                                                                                                                                                       | Proved by                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Its own page at `/administration/categories/[categoryId]/deposit` with the heading and the hint, dollars field before colones field                               | `CategoryDepositForm.test.tsx` "renders the heading and the hint", "puts the dollars field before the colones field"; `resolveCategoryDepositPath.test.ts`                                                                                                                          |
| Both fields open the decimal keypad, show "Sin depósito" when empty and are described by the hint through `aria-describedby`; an error sits next to its own field | `CategoryDepositFormFields.test.tsx` "opens the decimal keypad on both fields", "shows the no-deposit placeholder on both cleared fields", "describes both fields with the hint"; `CategoryDepositFormSubmit.test.tsx` "shows the %s error under that field only and saves nothing" |
| No total, sum or converted amount is ever shown (RNF-035)                                                                                                         | `CategoryDepositFormFields.test.tsx` "never renders a total or a converted amount after both amounts are typed"                                                                                                                                                                     |
| Stored amounts prefill, typed amounts are sent as numbers, cleared fields as `null`                                                                               | `CategoryDepositForm.test.tsx` "prefills the %s field..."; `CategoryDepositFormSubmit.test.tsx` "sends both amounts as numbers...", "sends null for both amounts..."                                                                                                                |
| Fields and Cancelar are disabled while saving; Cancelar returns to the list                                                                                       | `CategoryDepositForm.test.tsx` "disables both fields and Cancelar...", "navigates back to the category list..."                                                                                                                                                                     |
| A visitor who is not administration goes to the home; an unknown category shows not found                                                                         | `CategoryDeposit.test.tsx`                                                                                                                                                                                                                                                          |
| Every category card, active or inactive, links to its deposit screen                                                                                              | `CategoryCardDepositLink.test.tsx`                                                                                                                                                                                                                                                  |

## Edge cases & errors

| Case                          | Observable result                           | Copy key                                             |
| ----------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| Both fields blank             | No errors; both values parse as `null`      | none                                                 |
| `1,5`, `100,000`, `-5`, `1e3` | Format error on that field only             | `CATEGORY_DEPOSIT_ERROR_COPY[currency].format`       |
| Too many digits or decimals   | Precision error with that currency's limits | `CATEGORY_DEPOSIT_ERROR_COPY[currency].precision`    |
| `0`, `0.00`                   | Not-positive error on that field only       | `CATEGORY_DEPOSIT_ERROR_COPY[currency].not_positive` |
| `00012`                       | Valid; read as 12                           | none                                                 |
| One currency invalid          | The other currency's field shows no error   | none                                                 |

## Constraints

- The money-amount rules are shared (`app/utils/money`) because tariffs and charges reuse them; only the limits are owned by the deposit.
- The feature depends on the shared utils, never the other way round.
- Skills that apply: `constants-standards`, `structure-standards`, `unit-testing-standards`, `code-standards`.

## Acceptance criteria

US-ADM-14, as written in `docs/proyecto/historias-de-usuario.md`:

- [ ] Se registra el monto en dólares y en colones. Por ejemplo doscientos dólares o cien mil colones para los jet skis. — the amount rules are closed by 14.01 (`validateCategoryDepositFormValues`); the mapping to the update input and saving are 14.02, and the screen is 14.04.
- [ ] El monto se puede modificar cuando la empresa lo decida. — `mapCategoryDepositToFormValues` prefills the stored amount and the update action saves it (14.02); the screen is 14.04.
- [ ] Hay categorías sin depósito. Administración decide a cuáles ponerles, por ejemplo agregárselo también a los cuadraciclos. — a blank field is valid and parses as `null` (14.01); mapping it to the update input and persisting `null` is 14.02.
- [ ] El monto que se le pide al cliente sale de la categoría del equipo que va a salir. — satisfied by the `deposit_usd` and `deposit_crc` columns of `equipment_categories`; the read at dispatch is left to US-RES-29.
