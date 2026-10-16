# Reservation form

## Intent

Allow a reservations worker to record a rental reservation with its customer name, group size, Costa Rica date and time, duration, and category-based equipment quantity.

## In scope

- Unit 1: SDD contract, typed domain input, pure validation and conversion, and atomic server-side persistence.
- Unit 2: form screen, local form state, and interactive validation presentation.
- Persist only the customer name from customer identity/contact information.
- Persist the creator from the authenticated session.
- Persist one active, reservable, interchangeable equipment category with a positive quantity, regardless of tracking mode.
- Treat every initial reservation created by this form as `rental`, as authorized for this story.
- Interpret civil date and time in `America/Costa_Rica` regardless of server timezone.

## Out of scope

- Criterion 5 remains dependent on integrating open calendar PR #101. This work must not fabricate a local calendar or substitute visibility behavior.
- US-RES-07 unit assignment and unit availability semantics.
- US-RES-08 reservation editing.
- US-RES-15 availability and collision checking.
- US-RES-16 collision warnings.
- US-RES-17 equipment maintenance, damage, or retirement filtering.
- Tour, combo, customer email, or other contact fields.

## Requirements

- Validate a non-empty customer name, positive whole person count, valid civil date and time, positive duration convertible to whole minutes, selected category, and positive whole category quantity.
- Accept custom positive durations only when their value converts to a whole number of minutes; accepted custom precision beyond that constraint remains a product ambiguity.
- Convert duration hours to integer minutes without rounding.
- Persist reservation and its category/quantity item in one invoker-security database transaction.
- Derive `created_by` and `updated_by` from `auth.uid()` in the database function.
- Allow only categories whose status is active, are reservable, and have interchangeable units; tracking mode does not determine category eligibility.
- Leave existing row-level policies as the permission authority; add no unrelated policies or service-role access.

## Edge cases & errors

- Invalid dates, times, empty names, non-positive people/quantity/duration, and non-whole-minute durations are rejected before persistence.
- Inactive, non-reservable, missing, or non-interchangeable categories, including non-interchangeable `by_unit` categories such as lanchas, are rejected by the database function.
- Missing authenticated identity is rejected.
- A failure inserting either row rolls back the entire reservation.
- Database errors retain operation context and are surfaced to the caller.

## Constraints

- Category plus quantity is the minimum item record, including interchangeable `by_unit` categories. Concrete unit assignment and availability semantics belong to US-RES-07.
- Criterion 5 cannot be fulfilled until calendar PR #101 is integrated.
- No UI, route, ViewModel, styles, or Playwright artifacts are included in Unit 1.
- Skills: code-standards, structure-standards, component-architecture, constants-standards, stack-rules, eslint-standards, prettier-standards, unit-testing-standards, pull-request-workflow.

## Acceptance criteria

- [ ] Se registran el nombre a que va la reserva, la cantidad de personas, la fecha, la hora, la duración y el equipo que va a ocupar.
- [ ] La duración se escoge en horas, con botones de media hora, una hora, hora y media, dos y tres, y un campo numérico para cualquier otro valor.
- [ ] La fecha y la hora se interpretan y se muestran siempre en hora de Costa Rica, sin importar dónde corra el servidor.
- [ ] Del cliente se guarda solo eso, a propósito: el correo y los demás datos de contacto viven en FareHarbor.
- [ ] La reserva queda visible en el calendario.
- [ ] La reserva queda registrada a nombre de quien la creó.

## Unit ownership

- Unit 1 implements the data contract, validation/conversion, persistence, migration, database types, and automated tests. It covers the persistence and data-integrity portion of criteria 1, 3, 4, and 6.
- Unit 2 implements the reservation form interaction and visual duration choices, completing the input/presentation portion of criteria 1 and 2 and the Costa Rica display portion of criterion 3.
- Criterion 5 is pending integration of PR #101 and subsequent verification; it is not satisfied by either a local preview or a substitute calendar implementation in this change.
- Unit 2 must keep its route behind the existing reservations-area authorization contract; this service relies on database RLS for mutation authorization.
