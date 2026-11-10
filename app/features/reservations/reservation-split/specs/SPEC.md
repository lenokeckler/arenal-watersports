# Reservation split

## Intent

Let a reservations worker split a scheduled reservation into more departures instead of inventing a new reservation, saying which equipment and how many people go on each departure.

## In scope

- Unit: SDD contract, read model, typed input, pure validation, split service, and the server action with its error mapping.
- Read one reservation into the split model, with its movable items and the reason it cannot be split, if any.
- Validate the shape of every new departure on the server, with the same rules the form applies on the client.
- Persist the split through the `split_reservation` RPC and map its failures to copy.

## Out of scope

- The split form, the screen, the route and the calendar link (later pull requests of US-RES-19).
- Moving extras or guides, charges for a departure, and an availability warning for the new window (US-RES-16).
- Changing the date or the duration of a departure.

## Requirements

- A departure carries a whole number of people of at least 1, a time as HH:MM in Costa Rica, and at least one item.
- A unit item always carries quantity 1; a quantity item carries 1 up to its pieces.
- Only the new departures are sent. The original keeps the remainder, which the database derives.
- The reservation is split only while `scheduled`: fewer than 2 people or fewer than 2 pieces in total block it. A departure born from a split is not blocked.
- `expectedUpdatedAt` is the raw `updated_at` string of the read and is never parsed.
- The action checks calendar access, validates, calls the RPC once, revalidates the calendar path only, and never the split path.

## Edge cases & errors

- A malformed identifier reads as not found and makes no query.
- A reservation changed by someone else is reported as stale and is not revalidated.
- A reservation that is no longer scheduled, a missing reservation, a unit taken in the new window and an unavailable category each map to their own message.
- Any other database failure is rethrown for server logging.
- A malformed input returns the generic submit error before any access check.

## Constraints

- Database messages are matched byte for byte with the SQL of the RPC.
- User-facing copy is Spanish, addressed as usted, and lives in `*Copy.constants.ts`.
- Skills: code-standards, structure-standards, component-architecture, constants-standards, stack-rules, eslint-standards, prettier-standards, unit-testing-standards, pull-request-workflow.
