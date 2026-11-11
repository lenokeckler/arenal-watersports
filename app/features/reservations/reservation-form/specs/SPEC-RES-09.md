# US-RES-09: Predefined reservation combos

## Scope

Reservations can load persisted, active combos authored by Administration. A combo is selectable only when its audience has one valid positive package price and every component points to an active, reservable equipment category with a positive integer quantity.

The returned application model contains the combo identity, audience, matching currency and stored package price, plus its equipment category names and quantities. Database rows remain inside the server boundary.

## Acceptance criteria

- “Son los paquetes que administración dejó armados porque se venden seguido.” The catalog reads existing `combos` and `combo_items` records. It does not create or substitute frontend packages.
- “El combo se cobra con su precio de paquete.” The catalog maps the stored price for the combo audience and its matching currency; it never derives a price from category tariffs.

## Boundaries

Administration combo CRUD, fabricated seed data, reservation form selection and client state are outside this unit. Invalid, inactive, incomplete, or incorrectly priced records are omitted. Authorized reads reuse the reservation form server access check and Supabase row-level security.

## Reservation persistence mapping

The reservation mutation accepts only a persisted combo identifier and reservation details. One SQL statement reads the active combo, its audience-specific package price, and component categories from the same database snapshot. The server validates component eligibility using the existing active/reservable category checks and positive-stock guard, then atomically stores the combo identity, the component snapshot, and the fixed package price. These checks do not guarantee sufficient quantity for the requested reservation or a conflict-free time window. Client-provided item lists and prices are not accepted. Guide assignment is permitted only when the snapshot includes a guide-only component.

The read does not lock the combo row. Reservations can select combo rows under the current RLS policy, while only Administration can update them, so a Reservas transaction cannot acquire a row update lock without a privileged function. If Administration changes a combo after the read snapshot, the reservation persists the definition it read; it does not guarantee the combo remains active at commit time. The category eligibility and positive-stock checks are evaluated independently during the transaction; quantity sufficiency and time-window conflicts remain outside this unit.
