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
