# US-RES-11: Extras de una salida de lancha

## Intent

Reservations can offer active extras compatible with the concrete boat selected for the reservation.

## In scope

- Load active extras associated with the selected equipment unit through `extra_compatibility`.
- Return only the extra identity, name, and stored prices to the reservation form.
- Reuse the authorized reservation-form Supabase client and row-level security.

## Out of scope

- Persisting selected extras with a reservation.
- Inventory availability or commitments for extras that occupy equipment.
- Inventory changes for charge-only extras.
- Reservation total calculation.
- Administration catalog and compatibility management.
- User interface and browser evidence.

## Requirements

- The server action accepts a valid equipment-unit UUID and returns its active compatible extras.
- The database filters by the selected unit and active extra status.
- Client input contains only the equipment-unit identifier; prices and inventory metadata are read from the database.
- The reservation total is the selected boat's rental or tour hourly tariff multiplied by duration, plus each selected extra's price once per outing.
- USD and CRC totals are calculated independently from their catalog prices without currency conversion.
- This unit exposes the stored USD/CRC extra prices for the later pricing flow; total calculation and persistence are outside this unit.
- Supabase failures retain the operation context.

## Edge cases & errors

- Invalid unit identifiers return an empty list without accessing Supabase.
- Units without compatible active extras return an empty list.
- Supabase query errors are propagated through `throwIfSupabaseError`.

## Constraints

- Extend `app/features/reservations/reservation-form/`.
- Use the existing authorized reservation-form client.
- Do not trust client-provided extra compatibility, prices, or occupancy metadata.
- Inventory occupancy behavior remains a server/database responsibility for a later unit.

## Acceptance criteria

- [x] Solo se ofrecen los extras que aplican a esa embarcación.
- [ ] Los extras que ocupan equipo real del inventario lo descuentan de la disponibilidad. Pendiente de unidad posterior que integre selección y disponibilidad de inventario.
- [ ] Los extras que son solamente un cobro adicional no tocan el inventario. Pendiente de unidad posterior que integre persistencia de extras.
