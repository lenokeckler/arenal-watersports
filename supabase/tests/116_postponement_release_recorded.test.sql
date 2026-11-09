begin;
select plan(5);

insert into auth.users (id, email) values
  ('e3300000-0000-4000-8000-000000000001', 'res20-r-admin@arenal.local'),
  ('e3300000-0000-4000-8000-000000000002', 'res20-r-reservas@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e3300000-0000-4000-8000-000000000001', 'res20-r-admin', 'RES20 Admin', 'res20-r-admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('e3300000-0000-4000-8000-000000000002', 'res20-r-reservas', 'RES20 Reservas', 'reservas');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes,
   consumes_fuel, has_motor, usage_metric, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000101', 'RES20 Lancha', 'active', 'by_unit', true, false, 60, true, true, 'engine_hours',
   'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000102', 'RES20 Kayak', 'active', 'by_unit', true, false, 60, false, false, null,
   'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000103', 'RES20 Moto', 'active', 'by_unit', true, false, 60, true, true, 'kilometers',
   'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into equipment_units
  (id, category_id, code, status, fuel_max, fuel_level, usage_total, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000201', 'e3300000-0000-4000-8000-000000000101', 'RES20-R-LANCHA-1', 'available', 4, 4, 10,
   'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000202', 'e3300000-0000-4000-8000-000000000102', 'RES20-R-KAYAK-1', 'available', 4, null, 0,
   'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000203', 'e3300000-0000-4000-8000-000000000103', 'RES20-R-MOTO-1', 'available', 4, 3, 9,
   'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000301', 'RES20 Maria', 2, 'rental', '2035-04-12 15:00:00+00', 60, 'scheduled',
        'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into reservation_items
  (id, reservation_id, unit_id, fuel_out, usage_out, fuel_in, usage_in, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000501', 'e3300000-0000-4000-8000-000000000301', 'e3300000-0000-4000-8000-000000000201',
   4, 10, null, null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000502', 'e3300000-0000-4000-8000-000000000301', 'e3300000-0000-4000-8000-000000000202',
   null, null, null, null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000503', 'e3300000-0000-4000-8000-000000000301', 'e3300000-0000-4000-8000-000000000203',
   4, 5, 2, 9, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000601', 'e3300000-0000-4000-8000-000000000301', 'e3300000-0000-4000-8000-000000000101',
   '2035-04-12 15:00:00+00', 60, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000602', 'e3300000-0000-4000-8000-000000000301', 'e3300000-0000-4000-8000-000000000102',
   '2035-04-12 15:00:00+00', 60, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000603', 'e3300000-0000-4000-8000-000000000301', 'e3300000-0000-4000-8000-000000000103',
   '2035-04-12 15:00:00+00', 60, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000601' where id = 'e3300000-0000-4000-8000-000000000501';
update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000602' where id = 'e3300000-0000-4000-8000-000000000502';
update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000603' where id = 'e3300000-0000-4000-8000-000000000503';
update reservation_dispatches set closed_at = '2035-04-12 15:30:00+00' where id = 'e3300000-0000-4000-8000-000000000603';
update reservations set status = 'scheduled', dispatched_at = null where id = 'e3300000-0000-4000-8000-000000000301';

insert into reservation_postponements
  (id, reservation_id, cause, was_dispatched, previous_starts_at, new_starts_at, created_by)
values ('e3300000-0000-4000-8000-000000000401', 'e3300000-0000-4000-8000-000000000301', 'storm', true,
        '2035-04-12 15:00:00+00', '2035-04-13 15:00:00+00', 'e3300000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select lives_ok(
  $$ select private.record_postponement_readings('e3300000-0000-4000-8000-000000000301', 'e3300000-0000-4000-8000-000000000401',
       '[{"item_id":"e3300000-0000-4000-8000-000000000501","fuel_in":0,"usage_in":12.5},{"item_id":"e3300000-0000-4000-8000-000000000502","fuel_in":null,"usage_in":null}]'::jsonb) $$,
  'an empty tank is a valid reading'
);

select is(
  (select count(*) from reservation_postponement_readings where postponement_id = 'e3300000-0000-4000-8000-000000000401'),
  3::bigint,
  'one reading is stored for each dispatched unit'
);

select is(
  (select concat_ws('/', fuel_out, fuel_in, usage_out, usage_in)
     from reservation_postponement_readings where unit_id = 'e3300000-0000-4000-8000-000000000201'),
  '4/0/10.00/12.50',
  'the open item stores its dispatch and return readings'
);

select is(
  (select concat_ws('/', fuel_out, fuel_in, usage_out, usage_in)
     from reservation_postponement_readings where unit_id = 'e3300000-0000-4000-8000-000000000203'),
  '4/2/5.00/9.00',
  'the item of a closed group is copied as stored'
);

select is(
  (select concat_ws('/', fuel_level, usage_total) from equipment_units where id = 'e3300000-0000-4000-8000-000000000201')
  || ' ' ||
  (select concat_ws('/', fuel_level, usage_total) from equipment_units where id = 'e3300000-0000-4000-8000-000000000203'),
  '0/12.50 3/9.00',
  'the open unit receives the return reading and the closed one is untouched'
);

reset role;

select * from finish();
rollback;
