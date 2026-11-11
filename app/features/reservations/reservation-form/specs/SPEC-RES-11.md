# US-RES-11: Extras de una salida de lancha

## Intent

Reservations can offer active extras compatible with the concrete boat selected for the reservation.

## In scope

- Load active extras compatible with the selected concrete boat through `extra_compatibility`.
- Quote the boat's selected rental or tour hourly tariff multiplied by the reservation duration, plus each selected extra once.
- Calculate USD and CRC independently without currency conversion.
- Represent a missing boat tariff explicitly and return a null total when a required price is missing for that currency.
- Reuse the authorized reservation-form Supabase client and row-level security.

## Out of scope

- Persisting selected extras with a reservation.
- Inventory availability or commitments for extras that occupy equipment.
- Inventory changes for charge-only extras.
- Administration catalog and compatibility management.
- User interface and browser evidence.

## Requirements

- The server action accepts a valid equipment-unit UUID and returns its active compatible extras.
- The database filters by the selected unit and active extra status.
- The extras action receives only the equipment-unit identifier; selected extra prices, compatibility, and occupancy metadata are read from the database.
- The reservation total is the selected boat's applicable rental or tour hourly tariff multiplied by duration, plus each selected extra's price once per outing.
- USD and CRC totals are calculated independently from their catalog prices without currency conversion.
- A missing boat tariff is reported as unavailable rather than treated as zero; each currency total is null if any required component lacks that currency's price.
- Quote inputs contain only the selected unit, reservation type, duration, and extra identifiers; prices and compatibility are read from the database.
- The database quote helper can be reused by the later reservation persistence RPC.
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
- [ ] La tarifa de la lancha por duración y los precios únicos de extras se suman de forma independiente en USD y CRC. Implementado en .02; falta conectar el total a la reserva y su interfaz.
- [ ] Los extras que ocupan equipo real del inventario lo descuentan de la disponibilidad. Pendiente de unidad posterior que integre selección y disponibilidad de inventario.
- [ ] Los extras que son solamente un cobro adicional no tocan el inventario. Pendiente de unidad posterior que integre persistencia de extras.
