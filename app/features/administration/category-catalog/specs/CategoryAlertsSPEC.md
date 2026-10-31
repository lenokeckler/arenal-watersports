# Category inventory alerts (US-ADM-15)

## Intent

Let the administration worker choose, per category, whether the inventory alert fires by quantity, by expiry date, by both or by none, and with which threshold.

## In scope

- Part 15.01 (this branch): the rules only. `CATEGORY_ALERT_TYPE`, `CATEGORY_ALERT_LIMITS`, `CATEGORY_ALERT_ERROR_COPY`, the form models, `deriveCategoryAlertType`, `validateCategoryAlertFormValues` and the form-to-input and stored-to-form mappers.
- Part 15.02: the row mappers, the data access, the administrator-only update action and its pgTAP.
- Part 15.03: the form state and submit hooks.
- Part 15.04: the screen at `/administration/categories/[categoryId]/alerts`, the card link and the redirect to it after a category is created.
- Part 15.05: the E2E.

## Requirements

- There is no type column: the type is derived from `alert_min_quantity` and `alert_expiry_days` (both null is none, only the first is quantity, only the second is expiry, both is both).
- The quantity field is judged only when the type includes quantity, the days field only when it includes expiry; a field that does not apply never produces an error and is sent as `null`.
- An applicable field is required and must be an integer from 1 to 2147483647 (`int4`), after trimming. Checks run in order: required, integer, positive, not too large.
- `0`, negatives, decimals such as `1.5`, text and whitespace-only are rejected on that field only.
- The database keeps each column null or greater than zero (`categories_alert_quantity_positive`, `categories_alert_expiry_positive`), proved by `070_category_alerts.test.sql`.

## Acceptance criteria

US-ADM-15, as written in `docs/proyecto/historias-de-usuario.md`:

- [ ] El aviso puede ser por cantidad, por fecha de vencimiento, por ambas cosas o por ninguna. — derived type and per-type validation and mapping (15.01); saving is 15.02; the type selector is 15.04.
- [ ] Por cantidad se define la cantidad mínima a partir de la cual salta el aviso. Es el caso de los chalecos. — `alert_min_quantity` rules (15.01) and saving (15.02); the field is 15.04.
- [ ] Por vencimiento se define con cuánta anticipación avisar. Es el caso de los extintores y del contenido de los botiquines. — `alert_expiry_days` rules (15.01) and saving (15.02); the field is 15.04.
- [ ] Cada vez que se agrega una categoría nueva, administración decide qué aviso le corresponde o si no lleva ninguno. — the redirect after creating a category is 15.04; E2E is 15.05.
- [ ] Los botiquines solo salen en los tours y no en las rentas, así que no se pierden: su contenido se gasta cuando se usa y además se vence. — satisfied by a category carrying both thresholds (15.01); no further code.
