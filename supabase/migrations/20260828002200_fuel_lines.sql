alter table equipment_units
  add column fuel_max integer not null default 4,
  add column fuel_level integer;

alter table equipment_units
  add constraint units_fuel_max_range check (fuel_max between 1 and 20),
  add constraint units_fuel_level_range
    check (fuel_level is null or (fuel_level >= 0 and fuel_level <= fuel_max));

update equipment_units
   set fuel_level = round(current_fuel * fuel_max / 100)::integer
 where current_fuel is not null;

alter table equipment_units drop constraint units_fuel_range;
alter table equipment_units drop column current_fuel;

update reservation_items ri
   set fuel_out = round(
         ri.fuel_out * coalesce(
           (select eu.fuel_max from equipment_units eu where eu.id = ri.unit_id),
           4
         ) / 100
       )
 where ri.fuel_out is not null;

update reservation_items ri
   set fuel_in = round(
         ri.fuel_in * coalesce(
           (select eu.fuel_max from equipment_units eu where eu.id = ri.unit_id),
           4
         ) / 100
       )
 where ri.fuel_in is not null;

alter table reservation_items
  alter column fuel_out type integer using round(fuel_out)::integer,
  alter column fuel_in type integer using round(fuel_in)::integer;
