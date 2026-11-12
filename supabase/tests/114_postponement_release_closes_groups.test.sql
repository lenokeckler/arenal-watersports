begin;
select plan(11);

insert into auth.users (id, email) values
  ('e3400000-0000-4000-8000-000000000001', 'res20-c-admin@arenal.local'),
  ('e3400000-0000-4000-8000-000000000002', 'res20-c-reservas@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e3400000-0000-4000-8000-000000000001', 'res20-c-admin', 'RES20 Admin', 'res20-c-admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('e3400000-0000-4000-8000-000000000002', 'res20-c-reservas', 'RES20 Reservas', 'reservas');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes,
   consumes_fuel, has_motor, usage_metric, created_by, updated_by)
values
  ('e3400000-0000-4000-8000-000000000101', 'RES20 Lancha', 'active', 'by_unit', true, false, 60, true, true, 'engine_hours',
   'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001'),
  ('e3400000-0000-4000-8000-000000000103', 'RES20 Moto', 'active', 'by_unit', true, false, 60, true, true, 'kilometers',
   'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001'),
  ('e3400000-0000-4000-8000-000000000104', 'RES20 Chaleco', 'active', 'by_quantity', true, true, 60, false, false, null,
   'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001');

insert into equipment_units
  (id, category_id, code, status, fuel_max, fuel_level, usage_total, created_by, updated_by)
values
  ('e3400000-0000-4000-8000-000000000201', 'e3400000-0000-4000-8000-000000000101', 'RES20-C-LANCHA-1', 'available', 4, 4, 10,
   'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001'),
  ('e3400000-0000-4000-8000-000000000203', 'e3400000-0000-4000-8000-000000000103', 'RES20-C-MOTO-1', 'available', 4, 3, 9,
   'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e3400000-0000-4000-8000-000000000301', 'RES20 Maria', 2, 'rental', '2035-04-12 15:00:00+00', 60, 'scheduled',
        'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001');

insert into reservation_items
  (id, reservation_id, unit_id, category_id, quantity, fuel_out, usage_out, fuel_in, usage_in, created_by, updated_by)
values
  ('e3400000-0000-4000-8000-000000000501', 'e3400000-0000-4000-8000-000000000301', 'e3400000-0000-4000-8000-000000000201', null, null,
   4, 10, null, null, 'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001'),
  ('e3400000-0000-4000-8000-000000000503', 'e3400000-0000-4000-8000-000000000301', 'e3400000-0000-4000-8000-000000000203', null, null,
   4, 5, 2, 9, 'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001'),
  ('e3400000-0000-4000-8000-000000000504', 'e3400000-0000-4000-8000-000000000301', null, 'e3400000-0000-4000-8000-000000000104', 2,
   null, null, null, null, 'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values
  ('e3400000-0000-4000-8000-000000000601', 'e3400000-0000-4000-8000-000000000301', 'e3400000-0000-4000-8000-000000000101',
   '2026-01-10 15:00:00+00', 60, 'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001'),
  ('e3400000-0000-4000-8000-000000000603', 'e3400000-0000-4000-8000-000000000301', 'e3400000-0000-4000-8000-000000000103',
   '2026-01-10 15:00:00+00', 60, 'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001'),
  ('e3400000-0000-4000-8000-000000000604', 'e3400000-0000-4000-8000-000000000301', 'e3400000-0000-4000-8000-000000000104',
   '2026-01-10 15:00:00+00', 60, 'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001');

update reservation_items set dispatch_id = 'e3400000-0000-4000-8000-000000000601' where id = 'e3400000-0000-4000-8000-000000000501';
update reservation_items set dispatch_id = 'e3400000-0000-4000-8000-000000000603' where id = 'e3400000-0000-4000-8000-000000000503';
update reservation_items set dispatch_id = 'e3400000-0000-4000-8000-000000000604' where id = 'e3400000-0000-4000-8000-000000000504';
update reservation_dispatches set closed_at = '2026-01-10 15:30:00+00' where id = 'e3400000-0000-4000-8000-000000000603';
update reservations set status = 'scheduled', dispatched_at = null where id = 'e3400000-0000-4000-8000-000000000301';

insert into reservation_postponements
  (id, reservation_id, cause, was_dispatched, previous_starts_at, new_starts_at, created_by)
values ('e3400000-0000-4000-8000-000000000401', 'e3400000-0000-4000-8000-000000000301', 'storm', true,
        '2035-04-12 15:00:00+00', '2035-04-13 15:00:00+00', 'e3400000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3400000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select private.release_dispatched_reservation('e3400000-0000-4000-8000-000000000301', 'e3400000-0000-4000-8000-000000000401',
       '[{"item_id":"e3400000-0000-4000-8000-000000000501","fuel_in":9,"usage_in":12}]'::jsonb) $$,
  'P0001', 'Postponement fuel reading is invalid',
  'a bad reading refuses the release'
);

select is(
  (select (select count(*) from reservation_dispatches where closed_at is null)
       || '/' || (select count(*) from reservation_items where dispatch_id is not null)
       || '/' || (select count(*) from reservation_postponement_readings)),
  '2/3/0',
  'a refused release leaves groups, items and readings as they were'
);

select lives_ok(
  $$ select private.release_dispatched_reservation('e3400000-0000-4000-8000-000000000301', 'e3400000-0000-4000-8000-000000000401',
       '[{"item_id":"e3400000-0000-4000-8000-000000000501","fuel_in":0,"usage_in":12.5}]'::jsonb) $$,
  'a complete release succeeds'
);

select is(
  (select status::text from reservations where id = 'e3400000-0000-4000-8000-000000000301'),
  'scheduled',
  'the reservation stays scheduled after its groups close'
);

select ok(
  (select dispatched_at is null and closed_at is null from reservations where id = 'e3400000-0000-4000-8000-000000000301'),
  'dispatched_at and closed_at stay empty'
);

select is(
  (select count(*) from reservation_dispatches where closed_at is null),
  0::bigint,
  'every open group is closed'
);

select is(
  (select count(*) from reservation_items
    where dispatch_id is not null or fuel_out is not null or usage_out is not null
       or fuel_in is not null or usage_in is not null),
  0::bigint,
  'the items are cleared of dispatch and readings'
);

select ok(
  (select dispatch_id is null and quantity = 2 from reservation_items where id = 'e3400000-0000-4000-8000-000000000504'),
  'a by-quantity item only loses its dispatch'
);

select is(
  (select count(*) from reservation_postponement_readings where postponement_id = 'e3400000-0000-4000-8000-000000000401'),
  2::bigint,
  'one reading is stored for each dispatched unit'
);

select is(
  (select concat_ws('/', fuel_out, fuel_in, usage_out, usage_in)
     from reservation_postponement_readings where unit_id = 'e3400000-0000-4000-8000-000000000203'),
  '4/2/5.00/9.00',
  'the item of an already closed group is copied as stored'
);

reset role;

insert into reservation_dispatches
  (reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values ('e3400000-0000-4000-8000-000000000301', 'e3400000-0000-4000-8000-000000000101',
        '2026-01-11 16:00:00+00', 60, 'e3400000-0000-4000-8000-000000000001', 'e3400000-0000-4000-8000-000000000001');

select is(
  (select status::text || ' ' || dispatched_at::text from reservations where id = 'e3400000-0000-4000-8000-000000000301'),
  'dispatched 2026-01-11 16:00:00+00',
  'a new dispatch flips the reservation back with a fresh dispatched_at'
);

select * from finish();
rollback;
