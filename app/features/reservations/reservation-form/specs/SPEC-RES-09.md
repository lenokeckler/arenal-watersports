# US-RES-09: Predefined reservation combos

## Scope

Reservations can load persisted, active combos authored by Administration. A combo is selectable only when its audience has one valid positive package price and every component points to an active, reservable equipment category with a positive integer quantity.

The returned application model contains the combo identity, audience, matching currency and stored package price, plus its equipment category names and quantities. Database rows remain inside the server boundary.

## Acceptance criteria

- “Son los paquetes que administración dejó armados porque se venden seguido.” The catalog reads existing `combos` and `combo_items` records. It does not create or substitute frontend packages.
- “El combo se cobra con su precio de paquete.” The catalog maps the stored price for the combo audience and its matching currency; it never derives a price from category tariffs.

## Boundaries

Administration combo CRUD, fabricated seed data, reservation form selection, client state and reservation persistence are outside this unit. Invalid, inactive, incomplete, or incorrectly priced records are omitted. Authorized reads reuse the reservation form server access check and Supabase row-level security.
