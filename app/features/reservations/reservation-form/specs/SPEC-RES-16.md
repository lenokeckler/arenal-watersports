# US-RES-16 · AWS-99 — Availability conflict warning

## Intent

Give Reservations workers the details of active reservations that overlap the selected equipment category and interval, while keeping the warning informational so the worker decides whether to continue.

## Source

The binding story is US-RES-16 in `docs/proyecto/historias-de-usuario.md`, under EP-RES-05.

## Acceptance criteria

> El sistema avisa pero deja seguir. No bloquea.

> Hay días en que la operación se acomoda sobre la marcha y un bloqueo estorbaría más de lo que ayuda.

> La advertencia indica con cuál reserva choca.

## In scope

- Provide an invoker-security database function that returns only the reservation id, code, customer name, scheduled start, and scheduled end for overlapping commitments in a selected category.
- Match both category quantity commitments and concrete-unit commitments through the unit's category. The warning is category-level, including when a concrete unit has been selected; it does not claim that every listed reservation committed that exact unit.
- Include scheduled and dispatched reservations. Exclude cancelled and closed reservations.
- Treat reservation and requested intervals as half-open `[start, end)`, so touching boundaries do not overlap.
- Order conflicts deterministically by scheduled start and reservation id.
- Preserve existing row-level security visibility. Grant execution only to authenticated callers; do not use service-role access.
- Display the warning inline in the existing reservation form in later UI units. It is informational and never blocks submission or asks for confirmation.

## Out of scope

- Changing reservation creation, equipment commitment, unit eligibility, availability calculation, or dispatch behavior.
- Changing the existing RES-07/RES-17 concrete-unit availability rules. A specifically selected unit that is unavailable remains ineligible under those rules.
- Adding a submission block, confirmation dialog, or modal.
- Returning every category commitment as evidence that a concrete selected unit is occupied.
- Implementing the server query, client state, inline UI, or Playwright coverage in the database unit.

## Overlap behavior

- Category quantity commitments use their reservation's scheduled interval.
- Concrete-unit commitments use their dispatch interval when present, falling back to their reservation's scheduled interval, matching the interval availability contract.
- Caller RLS determines which reservation details are visible. Unauthorized authenticated callers see no conflict rows; anonymous callers cannot execute the function.

## Delivery units

- Database unit: add the RLS-preserving category conflict function, this specification, and pgTAP coverage for commitment matching, active statuses, half-open boundaries, ordering, grants, and caller visibility.
- Query and UI units: query the function from the reservation form, display matching reservation details inline, and cover responsive behavior with Playwright tests and screenshots.

The database unit does not complete the user story by itself; the UI unit must make the warning visible while preserving the ability to continue.
