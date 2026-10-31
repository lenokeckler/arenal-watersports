# Unit catalog (US-ADM-16)

## Acceptance criteria (verbatim)

- Cada unidad lleva su código propio, único dentro de la empresa, por ejemplo la placa del jet ski.
- Estado de la unidad: disponible, ocupado, en mantenimiento, dañado, en reparación o dado de baja.
- Se lleva la gasolina actual, las horas o el kilometraje acumulado, y el valor al que toca el próximo cambio de aceite.
- Cada unidad declara cuántas rayas tiene su medidor de gasolina, porque no toda la flota trae el mismo tablero: los cuadraciclos marcan seis y los jet skis y las lanchas cuatro. La lectura del día se guarda sobre ese máximo.
- Una unidad sin lectura de gasolina todavía no es lo mismo que una unidad en cero.
- Crear, consultar y modificar. Para sacarla del inventario se da de baja, no se elimina.

## Rules

- Only the administration worker manages units; every action calls `assertIsAdminWorker` and uses the session client, never the service role.
- Code: trimmed, required, at most 40 characters, case-sensitive. A duplicate (`23505`) returns a `codeError` result instead of throwing.
- Status written by the form: `available`, `in_maintenance`, `damaged`, `in_repair`. `occupied` is derived from `unit_current_state.effective_status` and is never written. `decommissioned` is written only by the decommission action.
- Gauge bars (`fuel_max`): integer 1 to 20, default 4, editable. Fuel level: empty is `null` (no reading) and differs from `0`; otherwise an integer from 0 to `fuel_max`. Lowering `fuel_max` below the level puts the error on the level field.
- Usage and next oil change: at least 0, at most 2 decimals, at most 10 integer digits. Empty usage is 0, empty oil change is `null`.
- Fuel, usage and oil change are validated and stored only when the category has a motor; otherwise the defaults are stored.
- A category that is not `by_unit` is refused by the database trigger `units_check_category_mode` (`P0001`), mapped to a friendly message.
- Decommission: required reason (trimmed, at most 300 characters); sets status, `decommissioned_at` and the reason together; refused while the unit is occupied; a decommissioned unit is never edited or reactivated.

## Parts

| Part  | Closes                                                         |
| ----- | -------------------------------------------------------------- |
| 16.01 | Shared form submit and list pagination pieces                  |
| 16.02 | Rules, models, constants, paths and server actions (this part) |
| 16.03 | Unit list and the link from the category card                  |
| 16.04 | Create form                                                    |
| 16.05 | Edit and decommission                                          |
| 16.06 | End-to-end tests                                               |

## 16.05 Unit list

| Requirement                                                                                                 | Test                                                |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Only an administrator opens the list; an unknown or by-quantity category is a 404                           | `UnitList.test.tsx`                                 |
| Units of one category, ordered by code, one page at a time, counted before the page is read                 | `listUnits.test.ts`, `unitListQueries.test.ts`      |
| A page past the end redirects to the last page                                                              | `UnitList.test.tsx`, `listUnits.test.ts`            |
| Effective status read from `unit_current_state` for the ids of the page only; `occupied` shown as "Ocupada" | `listUnits.test.ts`, `UnitListView.test.tsx`        |
| Fuel, usage and next oil change appear only for motorized categories; no fuel reading says "Sin lectura"    | `UnitListView.test.tsx`                             |
| A decommissioned unit is dimmed and has no edit link                                                        | `UnitListView.test.tsx`                             |
| Empty, error and pagination states                                                                          | `UnitListView.test.tsx`                             |
| By-unit category cards, active or inactive, link to their units; by-quantity cards do not                   | `CategoryCardUnitsLink.test.tsx` (category-catalog) |

## 16.09 Unit form screen and create route

| Requirement                                                                                                                  | Test                                   |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `UnitFormView` is shared by create and edit; the heading and the submit label follow the mode                                | 16.11                                  |
| Fields: code, status (editable statuses only), gauge bars; fuel level, usage and next oil change only with a motor           | 16.11                                  |
| An empty fuel level reads as no reading; the usage label follows the metric (Horas, Kilómetros)                              | 16.11                                  |
| Only an administrator opens `/administration/categories/[categoryId]/units/new`; an unknown or by-quantity category is a 404 | 16.11                                  |
| The unit list links to the create route with "Agregar unidad"                                                                | `UnitListView.test.tsx` (if it breaks) |

Component tests come in 16.11; the edit route in the next part.
