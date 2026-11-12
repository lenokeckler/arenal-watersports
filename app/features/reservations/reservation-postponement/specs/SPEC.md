# Reservation postponement

## Intent

Let a reservations worker postpone a reservation to another date and time when the weather does not allow the departure, keeping what was charged and what was left as a deposit.

## Acceptance criteria

- Una reserva agendada se pospone por el motivo que sea.
- Una reserva que ya fue despachada solo se pospone por clima: lluvia muy fuerte o tormenta.
- Al posponer una despachada, el equipo se cierra y vuelve al tablero, registrando la gasolina y las horas o el kilometraje de lo que sí se usó.
- El cobro se conserva vivo para la fecha nueva: no se le vuelve a cobrar al cliente.
- El depósito de garantía se conserva hasta la salida nueva.
- La reserva vuelve al estado agendada con la fecha y la hora nuevas.
- El motivo de la posposición queda registrado junto con quién la hizo.

## In scope

- Unit: route `/reservations/[reservationId]/postpone`, the screen shell, the reservation summary and the explanation of why a reservation cannot be postponed.
- Check calendar access before reading anything.
- Show the customer, the current date and time and the equipment of a postponable reservation.
- Show a reason and a way back to the calendar when the reservation is cancelled or closed.

## Out of scope

- The postponement form, its action and its persistence (later pull requests of US-RES-20).
- The calendar entry point to this screen.

## Requirements

- The page is a shell: it reads the identifier and renders the screen.
- A reservation that is `scheduled` or `dispatched` is postponable; any other block shows the explanation instead of the summary.
- The date and time are shown in Costa Rica time, in Spanish.

## Edge cases & errors

- A malformed or unknown identifier renders not found.
- A reader without calendar access is redirected before any read.
- A reservation read failure is rethrown for the error boundary.

## Constraints

- User-facing copy is Spanish, addressed as usted, and lives in `*Copy.constants.ts`.
- Skills: code-standards, structure-standards, component-architecture, route-structure, styles-standards, constants-standards, stack-rules, eslint-standards, prettier-standards, unit-testing-standards, pull-request-workflow.
