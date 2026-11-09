begin;
select plan(7);

insert into auth.users (id, email) values
  ('e3200000-0000-4000-8000-000000000001', 'res20-g-admin@arenal.local'),
  ('e3200000-0000-4000-8000-000000000002', 'res20-g-reservas@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e3200000-0000-4000-8000-000000000001', 'res20-g-admin', 'RES20 Admin', 'res20-g-admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('e3200000-0000-4000-8000-000000000002', 'res20-g-reservas', 'RES20 Reservas', 'reservas');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes,
   consumes_fuel, created_by, updated_by)
values
  ('e3200000-0000-4000-8000-000000000101', 'RES20 Lancha', 'active', 'by_unit', true, false, 60,
   true, 'e3200000-0000-4000-8000-000000000001', 'e3200000-0000-4000-8000-000000000001'),
  ('e3200000-0000-4000-8000-000000000102', 'RES20 Kayak', 'active', 'by_unit', true, false, 60,
   false, 'e3200000-0000-4000-8000-000000000001', 'e3200000-0000-4000-8000-000000000001');

insert into equipment_units (id, category_id, code, status, fuel_max, created_by, updated_by)
values
  ('e3200000-0000-4000-8000-000000000201', 'e3200000-0000-4000-8000-000000000101', 'RES20-G-LANCHA-1', 'available', 4,
   'e3200000-0000-4000-8000-000000000001', 'e3200000-0000-4000-8000-000000000001'),
  ('e3200000-0000-4000-8000-000000000202', 'e3200000-0000-4000-8000-000000000101', 'RES20-G-LANCHA-2', 'available', 4,
   'e3200000-0000-4000-8000-000000000001', 'e3200000-0000-4000-8000-000000000001'),
  ('e3200000-0000-4000-8000-000000000203', 'e3200000-0000-4000-8000-000000000102', 'RES20-G-KAYAK-1', 'available', 4,
   'e3200000-0000-4000-8000-000000000001', 'e3200000-0000-4000-8000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e3200000-0000-4000-8000-000000000301', 'RES20 Maria', 2, 'rental',
        '2035-04-12 15:00:00+00', 60, 'scheduled',
        'e3200000-0000-4000-8000-000000000001', 'e3200000-0000-4000-8000-000000000001');

insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('e3200000-0000-4000-8000-000000000301', 'e3200000-0000-4000-8000-000000000201',
        'e3200000-0000-4000-8000-000000000001', 'e3200000-0000-4000-8000-000000000001');

insert into reservation_postponements
  (id, reservation_id, cause, was_dispatched, previous_starts_at, new_starts_at, created_by)
values ('e3200000-0000-4000-8000-000000000401', 'e3200000-0000-4000-8000-000000000301', 'storm', false,
        '2035-04-12 15:00:00+00', '2035-04-13 15:00:00+00', 'e3200000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3200000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ insert into reservation_postponement_readings (postponement_id, unit_id)
     values ('e3200000-0000-4000-8000-000000000401', 'e3200000-0000-4000-8000-000000000202') $$,
  'P0001', 'Postponement reading unit is not on the reservation',
  'a reading needs a unit of the postponed reservation'
);

select throws_ok(
  $$ insert into reservation_postponement_readings (postponement_id, unit_id, fuel_in)
     values ('e3200000-0000-4000-8000-000000000401', 'e3200000-0000-4000-8000-000000000201', 5) $$,
  'P0001', 'Postponement fuel reading is out of range',
  'a fuel in reading above the unit maximum is refused'
);

select throws_ok(
  $$ insert into reservation_postponement_readings (postponement_id, unit_id, fuel_out)
     values ('e3200000-0000-4000-8000-000000000401', 'e3200000-0000-4000-8000-000000000201', 5) $$,
  'P0001', 'Postponement fuel reading is out of range',
  'a fuel out reading above the unit maximum is refused'
);

select lives_ok(
  $$ insert into reservation_postponement_readings (postponement_id, unit_id, fuel_out, fuel_in)
     values ('e3200000-0000-4000-8000-000000000401', 'e3200000-0000-4000-8000-000000000201', 4, 4) $$,
  'readings at the unit maximum are saved'
);

select lives_ok(
  $$ select private.record_unit_return_reading('e3200000-0000-4000-8000-000000000201', 2, null) $$,
  'a fuel unit accepts a fuel reading'
);

select throws_ok(
  $$ select private.record_unit_return_reading('e3200000-0000-4000-8000-000000000203', 1, null) $$,
  'P0001', 'Equipment unit does not consume fuel',
  'a unit that does not consume fuel refuses a fuel reading'
);

select lives_ok(
  $$ select private.record_unit_return_reading('e3200000-0000-4000-8000-000000000203', null, 5) $$,
  'a unit that does not consume fuel accepts a usage reading'
);

reset role;

select * from finish();
rollback;
