# US-RES-15 · AWS-98 — Interval equipment availability

## Source

The binding story is US-RES-15 in `docs/proyecto/historias-de-usuario.md`, under EP-RES-05. The user needs availability for a selected future interval, including the equipment already committed during that interval.

## Acceptance criterion

> La pregunta es por franja y no por el instante actual: el sistema tiene que saber si un kayak está libre el sábado de diez a doce.

## Calculation contract

- `category_availability` keeps its existing parameters and its integer `usable`, `committed`, and `free` result.
- `usable` retains the existing physical stock calculation: available stock for quantity-tracked categories, or recorded available units for unit-tracked categories.
- `committed` is the peak simultaneous equipment load within the requested half-open interval `[start, end)`, rather than the sum of every commitment that intersects it.
- Category quantity commitments use the reservation's scheduled interval. Concrete-unit commitments use the dispatch interval when present, falling back to the reservation's scheduled interval exactly as before.
- Quantity commitments and concrete-unit commitments contribute to the same peak. Commitment windows are clipped to the requested interval before generating their start and end events.
- Events at the same timestamp are combined before calculating the running load. Equipment released at an interval boundary can serve a commitment beginning at that boundary.
- Only scheduled and dispatched reservations contribute. The optional excluded reservation contributes nothing. Existing RLS visibility and invoker security remain in effect.
- An interval without commitments has zero committed equipment. `free` remains `usable - committed`, including negative results when existing commitments exceed usable capacity.

For capacity two, one quantity-one commitment from 10:00 to 11:00 and another from 11:00 to 12:00 leave one available item across 10:00 to 12:00. Their sequential use must not be summed into a two-item peak.

## Integration boundaries

US-RES-17 remains responsible for physical equipment eligibility. US-RES-07 remains responsible for category quantity commitments and the concrete Lancha exception. A concrete Lancha must itself be free for the whole requested interval; an aggregate category peak does not replace `unit_conflicts` or the concrete-unit query.

This change does not alter reservation persistence, dispatch/return windows, cancellation rules, overdue-dispatch policies, unit status, or inventory CRUD. US-RES-16 owns collision warnings and the decision to continue despite a collision; this story adds no quantity ceiling or submission block.

## Delivery units

- Data unit: interval peak calculation through the existing SQL function, with SQL regression coverage. This implements the database portion of the acceptance criterion.
- Query unit, pending: an authorized server query and reusable Costa Rica interval conversion, plus a client hook with incomplete, loading, success, and failure states.
- Form unit, pending: integration into the existing reservation form and ignored local preview, preserving the Stitch visual language, responsive layout, entered values, realtime invalidation, and retry behavior. Playwright coverage and mobile/desktop captures belong to that UI unit.

The acceptance criterion is complete only after the authorized query and existing form expose the selected interval's availability. A local fixture or preview alone does not complete it.
