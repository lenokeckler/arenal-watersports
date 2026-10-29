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

- Server entry `app/components/category-catalog/CategoryList.tsx`; the data access is in
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
