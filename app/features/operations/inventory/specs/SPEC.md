# Inventory Consultation

## Intent

Operations workers can inspect the company's active inventory by category and see the current state of each item.

## In scope

- Show every active inventory category, including jet skis and boats.
- Open a category to inspect unit codes and statuses or quantity totals by status.
- Read inventory through authenticated server-side Supabase access and existing row-level security.
- Paginate category and unit lists on the server.
- Refresh the view when inventory categories, units, stock, dispatch assignments, or returns change.

## Out of scope

- Changing inventory status or quantity.
- Creating inventory counts or editing categories.
- Defining the active-work-mode flow owned by US-TAB-07.

## Requirements

- Categories tracked by unit show each non-decommissioned unit's code and status.
- Categories tracked by quantity show available, damaged, in-repair, and total quantities.
- Users without operations area access cannot read this screen; administrators retain their configured access.
- Empty results, invalid categories, and read failures have explicit outcomes.

## Edge cases and errors

- A category with no active units or stock remains visible with zero totals.
- Decommissioned units are excluded from the category detail.
- Unknown category identifiers return not found.
- Supabase read errors propagate to the route error boundary.

## Constraints

- Reuse the existing inventory summary view, equipment tables, Supabase server client, and design tokens.
- User-facing copy is Spanish and uses formal address.
- Keep route files as thin shells and keep presentation free of data access.
- Apply RNF-010, RNF-011, RNF-025, RNF-026, and RNF-027.

## Acceptance criteria

- El inventario cubre todo lo que la empresa tiene, incluidos los jet skis y las lanchas.
- Al entrar a una categoría identificada una por una se ven sus unidades con su código y su estado, por ejemplo los cuatro o cinco jet skis que haya.
- Al entrar a una categoría llevada por cantidad se ve cuántos hay y cuántos están disponibles, dañados o en reparación.
