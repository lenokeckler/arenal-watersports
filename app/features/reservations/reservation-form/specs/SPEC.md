# Reservation form

## Intent

Allow a reservations worker to record a rental reservation with its customer name, group size, Costa Rica date and time, duration, and one valid equipment commitment.

## In scope

- Unit 1: SDD contract, typed domain input, pure validation and conversion, and atomic server-side persistence.
- Unit 2: form screen, local form state, equipment commitment selection, and interactive validation presentation.
- Persist only the customer name from customer identity/contact information.
- Persist the creator from the authenticated session.
- Persist one of two equipment commitments: an active, reservable, interchangeable category with positive quantity, or one concrete unit from an active, reservable, non-interchangeable category.
- Treat every initial reservation created by this form as `rental`, as authorized for this story.
- Interpret civil date and time in `America/Costa_Rica` regardless of server timezone.

## Out of scope

- Criterion 5 remains dependent on integrating open calendar PR #101. This work must not fabricate a local calendar or substitute visibility behavior.
- US-RES-15 availability and collision checking.
- US-RES-16 collision warnings.
- US-RES-17 equipment maintenance, damage, or retirement filtering.
- Tour, combo, customer email, or other contact fields.

## Requirements

- Validate a non-empty customer name, positive whole person count, valid civil date and time, positive duration convertible to whole minutes, selected category, and positive whole category quantity.
- Accept custom positive durations only when their value converts to a whole number of minutes; accepted custom precision beyond that constraint remains a product ambiguity.
- Convert duration hours to integer minutes without rounding.
- Persist the reservation and exactly one valid equipment commitment in one invoker-security database transaction.
- Derive `created_by` and `updated_by` from `auth.uid()` in the database function.
- For category commitments, allow only active, reservable categories whose units are interchangeable; tracking mode does not determine category eligibility.
- Show active, reservable interchangeable categories with a positive quantity field; do not ask Reservations to select an exact machine for these categories.
- Show active, reservable non-interchangeable categories with a concrete-unit selector containing units recorded as available.
- Require one available concrete unit for non-interchangeable categories and submit it through the existing validated server action and RPC.
- For unit commitments, allow only a concrete unit with available status from an active, reservable, non-interchangeable category, and reject overlapping commitments for the reservation's Costa Rica time interval.
- Lock a specifically committed unit while checking conflicts and creating the reservation so concurrent booking attempts cannot commit the same unit.
- Keep a committed unit's recorded status unchanged and create no dispatch records; the reservation item itself reduces its availability for the committed interval.
- Leave existing row-level policies as the permission authority; add no unrelated policies or service-role access.

## Edge cases & errors

- Invalid dates, times, empty names, non-positive people/quantity/duration, and non-whole-minute durations are rejected before persistence.
- Inactive, non-reservable, missing, or non-interchangeable categories are rejected for category commitments.
- Missing, unavailable, or interchangeable-category units are rejected for unit commitments; category/quantity fields cannot be combined with a concrete unit.
- A non-interchangeable category without an available unit cannot be submitted from the form.
- A concrete unit with an overlapping scheduled or dispatched reservation is rejected.
- Missing authenticated identity is rejected.
- A failure inserting either row rolls back the entire reservation.
- Database errors retain operation context and are surfaced to the caller.

## Constraints

- Each reservation created by this form has either a category plus quantity item or one concrete unit item, never both.
- The Lancha exception is a unit commitment at reservation time; interchangeable equipment remains quantity-committed for Operations to select during dispatch.
- Criterion 5 cannot be fulfilled until calendar PR #101 is integrated.
- The Unit 2 equipment selection stays within this form and follows existing Stitch styling and responsive form conventions.
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
- Unit 2 implements the reservation form interaction and visual duration choices, completing the input/presentation portion of criteria 1 and 2 and the Costa Rica display portion of criterion 3. It presents interchangeable categories by quantity and requires an available concrete unit for non-interchangeable categories.
- Criterion 5 is pending integration of PR #101 and subsequent verification; it is not satisfied by either a local preview or a substitute calendar implementation in this change.
- Unit 2 must keep its route behind the existing reservations-area authorization contract; this service relies on database RLS for mutation authorization.

## US-RES-07 equipment commitment

The reservation form and mutation accept exactly one of these forms: an interchangeable category and positive quantity, or one concrete unit from a non-interchangeable category. The form lists available concrete units for the latter. The concrete unit must be active, reservable through its category, recorded as available, and conflict-free for the reservation's Costa Rica interval. The database locks that unit during validation and insertion, stores its id on `reservation_items`, and leaves its status unchanged. No dispatch record is created.

### Acceptance criteria

- “Cada equipo comprometido baja de la disponibilidad para esa franja horaria.”
- “El equipo que se cuenta por cantidad (jet skis, cuadraciclos, kayaks, paddleboards) se compromete por cantidad, no por unidad concreta: cuál máquina sale lo decide operaciones al despachar.”
- “La lancha, que no es intercambiable, se compromete por unidad concreta desde que Reservas agenda.”
- “Comprometer el equipo no es despacharlo: la unidad sigue en tierra hasta que operaciones la saque.”

Unit 1 implements the atomic persistence and data-integrity boundary for both commitment shapes. Unit 2 exposes both commitment shapes within the reservation form: interchangeable equipment uses category plus quantity, and the Lancha uses an available concrete unit.

## US-RES-18 reservation editing

A Reservations worker changes the people count, time, duration or equipment of a `scheduled` reservation from `/reservations/<id>/edit`. The customer name, the date, pricing and charges do not change here; the date belongs to US-RES-20. One `update_reservation` database transaction persists the change, and `reservations.updated_by` and `updated_at` record who made it.

### Rules

- Only a `scheduled` reservation can be modified.
- The form sends the `updated_at` it loaded as an opaque string. A different or missing value refuses the save, so a colleague's change is never overwritten.
- The date stays the reservation's current Costa Rica date.
- A save that changes nothing writes nothing and keeps the last editor.
- Equipment targets are the items with no extra and no dispatch. A change updates the same item row.
- A combo's equipment cannot change, and neither can the equipment of a reservation with several targets. A people or schedule change on them is accepted when the payload carries a current target unchanged.
- Changed equipment passes the same commitment validation as create, except a quantity decrease on the same category with no unit, which is accepted even with no stock left.
- Changed equipment or a changed window re-checks every unit of the reservation: it must be reservable and free for the new window, ignoring the reservation itself. A people change alone does not, so a unit that went to maintenance after the booking keeps its reservation.

### Acceptance criteria

- “Se actualiza la información cuando cambian las condiciones del cliente.”
- “El cambio queda registrado a nombre de quien lo hizo.”
- “El equipo de un combo no se cambia al modificar la reserva: si el paquete cambió, se cancela y se crea una reserva nueva.”

The data unit closes the first two criteria at database level and enforces the third. The screens close them for the user.
