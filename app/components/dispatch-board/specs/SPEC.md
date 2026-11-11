# Pending Dispatch Reservations

## Intent

Operations workers need to see today's reservations that still require a group to be dispatched.

## In scope

- Read and display today's pending reservations.
- Exclude cancelled and closed reservations.
- Exclude reservations whose committed categories have all been dispatched.

## Out of scope

- Dispatching or closing equipment groups.
- Partial dispatches within one category.
- Financial information.
- Features from US-OPE-02 through US-OPE-06.

## Requirements

- Calculate today in `America/Costa_Rica`.
- Query the half-open interval from today's start through tomorrow's start.
- Include `scheduled` reservations.
- Include `dispatched` reservations only when a committed category has no matching dispatch.
- Treat any matching dispatch as dispatched even when `closed_at` is null.
- Preserve Supabase RLS and operations authorization.

## Edge cases & errors

- Reservations at today's start are included.
- Reservations at tomorrow's start are excluded.
- Unit commitments derive their category from the equipment unit.
- Quantity commitments use their category directly.
- Access and query errors display safe user-facing messages.

## Constraints

- Use the authenticated server Supabase client and explicit non-financial columns.
- Keep the page and feature as Server Components.
- Skills: route-structure, component-architecture, component-standards, styles-standards, constants-standards, structure-standards.

## Acceptance criteria

- [ ] La lista se limita al día en curso.
- [ ] Las reservas canceladas no aparecen.
