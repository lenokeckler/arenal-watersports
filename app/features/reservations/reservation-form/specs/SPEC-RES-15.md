# US-RES-15 · AWS-98 — Interval equipment availability

## Source

The binding story is US-RES-15 in `docs/proyecto/historias-de-usuario.md`,
under EP-RES-05. The user needs availability for a selected future interval,
including the equipment already committed during that window.

## Acceptance criterion

> La pregunta es por franja y no por el instante actual: el sistema tiene que
> saber si un kayak está libre el sábado de diez a doce.

## Calculation contract

- `category_availability` keeps its existing parameters and its integer `usable`,
  `committed`, and `free` result.
- `usable` retains the existing physical stock calculation: available stock for
  quantity-tracked categories, or recorded available units for unit-tracked
  categories.
- `committed` is the peak simultaneous equipment load within the requested
  half-open interval `[start, end)`, rather than the sum of every commitment
  that intersects it.
- Category quantity commitments use the reservation's scheduled interval.
  Concrete-unit commitments use the dispatch interval when present, falling back
  to the reservation's scheduled interval example when a dispatch is absent.
- Quantity commitments and concrete-unit commitments contribute to the same
  peak. Commitment windows are clipped to the requested interval before
  generating their start and end events.
- Events at the same timestamp are combined before calculating the running load.
  Equipment released at an interval boundary can serve a commitment beginning at
  that boundary.
- Only scheduled and dispatched reservations contribute. The optional excluded
  reservation contributes nothing. Existing RLS visibility and invoker security
  remain in effect.
- An interval without commitments has zero committed equipment. `free` remains
  `usable - committed`, including negative results when existing commitments
  exceed usable capacity.

For capacity two, one quantity-one commitment from 10:00 to 11:00 and another
from 11:00 to 12:00 leave one available item across 10:00 to 12:00. Their
sequential use must not be summed into a two-item commitment.

## Integration boundaries

US-RES-17 remains responsible for physical equipment eligibility. US-RES-07
remains responsible for category quantity commitments and the concrete Lancha
exception. A concrete Lancha must itself be checked as a concrete unit by the
existing unit-eligibility flow.

This change does not alter reservation persistence, dispatch/return windows,
cancellation rules, overdue-dispatch policies, unit status, or inventory CRUD.
US-RES-16 owns collision warnings and the decision to continue despite a
collision; this story adds no quantity ceiling or submission block.

## Form behavior

- The existing reservation form displays the selected equipment category and the
  interval in Costa Rica time alongside the category's `free` count.
- The panel reports loading, query failure with retry, positive availability,
  zero availability, and negative availability without changing the returned
  count.
- A negative `free` value remains visible as a negative number and is described
  as overcommitted capacity.
- The category summary is informational. It does not replace concrete-unit
  availability, add a booking limit, or block reservation submission.
- Changing the selected interval re-queries availability. Existing equipment
  Realtime refreshes invalidate the category query.
- The panel is responsive and follows the reservation form's Stitch visual
  language on mobile and desktop.

## Delivery units

- Data unit: interval peak calculation through the existing SQL function, with
  SQL regression coverage. This implements the database portion of the
  acceptance criterion.
- Query unit: an authorized server query and reusable Costa Rica interval
  conversion, plus a client hook with incomplete, loading, success, and failure
  states. The existing equipment eligibility channel refreshes category
  availability when reservation, item, unit, stock, category, or dispatch
  records change.
- Form unit: integration into the existing reservation form, preserving the
  Stitch visual language, responsive layout, entered values, realtime
  invalidation, and retry behavior. Playwright coverage and mobile/desktop
  captures belong to that UI unit. The ignored local preview is not changed by
  this PR.

The query unit preserves the RPC's negative `free` result and does not treat
aggregate category availability as proof that a concrete unit is available. The
data, query, and form units expose category availability for the selected
interval. A local fixture or preview alone does not complete the acceptance
criterion.

- Form unit, pending: integration into the existing reservation form and
  ignored local preview, preserving the Stitch visual language, responsive
  layout, entered values, realtime invalidation, and retry behavior.
  Playwright coverage and mobile/desktop captures belong to that UI unit.

The query unit preserves the RPC's negative `free` result and does not treat
aggregate category availability as proof that a concrete unit is available. The
data and query units are complete; the acceptance criterion remains pending until
the form exposes the selected interval's availability. A local fixture or preview
alone does not complete it.
