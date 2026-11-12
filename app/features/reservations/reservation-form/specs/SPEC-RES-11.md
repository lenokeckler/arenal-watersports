# US-RES-11: Extras de una salida de lancha

## Intent

Reservations can offer active extras compatible with the concrete boat selected for the reservation.

## In scope

- Load active extras compatible with the selected concrete boat through `extra_compatibility`.
- Quote the boat's selected rental or tour hourly tariff multiplied by the reservation duration, plus each selected extra once.
- Calculate USD and CRC independently without currency conversion.
- Represent a missing boat tariff explicitly and return a null total when a required price is missing for that currency.
- Reuse the authorized reservation-form Supabase client and row-level security.
- Let Reservations select compatible extras in the existing reservation form and review the server quote before submitting.

## Out of scope

- Administration catalog and compatibility management.
- Browser evidence upload; the story owner supplies PR evidence.

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
- Inventory occupancy remains a server/database responsibility; selection metadata is informational only.

## Acceptance criteria

- [x] Solo se ofrecen los extras que aplican a esa embarcación. La consulta de .01 filtra extras activos compatibles por unidad; .04 muestra sus opciones y permite seleccionarlas.
- [x] Los extras que ocupan equipo real del inventario lo descuentan de la disponibilidad. .03 persiste categoría y cantidad del catálogo; `category_availability` los cuenta y la prueba 044 verifica la reducción.
- [x] Los extras que son solamente un cobro adicional no tocan el inventario. .03 persiste el extra con categoría y cantidad nulas; la prueba 044 confirma que la disponibilidad no disminuye.
