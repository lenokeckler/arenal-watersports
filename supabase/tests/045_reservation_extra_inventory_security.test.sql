begin;
select plan(13);

insert into auth.users (id, email) values
  ('e3950000-0000-4000-8000-000000000001', 'res11-guard@arenal.local'),
  ('e3950000-0000-4000-8000-000000000002', 'res11-guard-operations@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e3950000-0000-4000-8000-000000000001', 'res11-guard', 'RES11 Guard', 'reservas'),
  ('e3950000-0000-4000-8000-000000000002', 'res11-guard-operations', 'RES11 Guard Operations', 'operaciones');
insert into worker_marks (worker_id, mark, granted_by)
values ('e3950000-0000-4000-8000-000000000002', 'guia', 'e3950000-0000-4000-8000-000000000001');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable,
   default_duration_minutes, created_by, updated_by)
values
  ('e3950000-0000-4000-8000-000000000101', 'RES11 guard boat', 'by_unit', true, false, 60,
   'e3950000-0000-4000-8000-000000000001', 'e3950000-0000-4000-8000-000000000001'),
  ('e3950000-0000-4000-8000-000000000102', 'RES11 guard inventory', 'by_quantity', false, false, null,
   'e3950000-0000-4000-8000-000000000001', 'e3950000-0000-4000-8000-000000000001'),
  ('e3950000-0000-4000-8000-000000000103', 'RES11 forged inventory', 'by_unit', false, false, null,
   'e3950000-0000-4000-8000-000000000001', 'e3950000-0000-4000-8000-000000000001');
insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('e3950000-0000-4000-8000-000000000201', 'e3950000-0000-4000-8000-000000000101', 'RES11-GUARD-BOAT',
  'e3950000-0000-4000-8000-000000000001', 'e3950000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e3950000-0000-4000-8000-000000000102', 3, 'e3950000-0000-4000-8000-000000000001');
insert into tariffs (category_id, type, amount_usd, amount_crc, created_by, updated_by)
values ('e3950000-0000-4000-8000-000000000101', 'rental', 20, 10000,
  'e3950000-0000-4000-8000-000000000001', 'e3950000-0000-4000-8000-000000000001'),
  ('e3950000-0000-4000-8000-000000000101', 'tour', 10, 5000,
  'e3950000-0000-4000-8000-000000000001', 'e3950000-0000-4000-8000-000000000001');
insert into extras (id, name, price_usd, price_crc, occupies_category_id,
  occupies_quantity, created_by, updated_by)
values
  ('e3950000-0000-4000-8000-000000000301', 'RES11 guard fee', 5, 2500, null, null,
   'e3950000-0000-4000-8000-000000000001', 'e3950000-0000-4000-8000-000000000001'),
  ('e3950000-0000-4000-8000-000000000302', 'RES11 guard physical', 3, 1500,
   'e3950000-0000-4000-8000-000000000102', 2,
   'e3950000-0000-4000-8000-000000000001', 'e3950000-0000-4000-8000-000000000001'),
  ('e3950000-0000-4000-8000-000000000303', 'RES11 guard incompatible', 2, 1000, null, null,
   'e3950000-0000-4000-8000-000000000001', 'e3950000-0000-4000-8000-000000000001'),
  ('e3950000-0000-4000-8000-000000000304', 'RES11 guard inactive', 2, 1000, null, null,
   'e3950000-0000-4000-8000-000000000001', 'e3950000-0000-4000-8000-000000000001');
update extras set status = 'inactive' where id = 'e3950000-0000-4000-8000-000000000304';
insert into extra_compatibility (extra_id, unit_id) values
  ('e3950000-0000-4000-8000-000000000301', 'e3950000-0000-4000-8000-000000000201'),
  ('e3950000-0000-4000-8000-000000000302', 'e3950000-0000-4000-8000-000000000201'),
  ('e3950000-0000-4000-8000-000000000304', 'e3950000-0000-4000-8000-000000000201');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3950000-0000-4000-8000-000000000001","role":"authenticated"}';
select ok(has_function_privilege('authenticated',
  'private.validate_reservation_extra_item(reservation_items)', 'EXECUTE'),
  'authenticated workers can reach the trigger validator');
select ok(not has_function_privilege('anon',
  'private.validate_reservation_extra_item(reservation_items)', 'EXECUTE'),
  'anonymous users cannot execute the extra validator');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 guard fee reservation', 'people_count', 1, 'date', '2041-11-01',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3950000-0000-4000-8000-000000000201',
  'extra_ids', array['e3950000-0000-4000-8000-000000000301'])) $$,
  'a valid extra reservation can be created before direct-write checks');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 guard incompatible', 'people_count', 1, 'date', '2041-11-02',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3950000-0000-4000-8000-000000000201',
  'extra_ids', array['e3950000-0000-4000-8000-000000000303'])) $$,
  'P0001', 'Every selected extra must be active and compatible',
  'an incompatible extra is rejected');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 guard inactive', 'people_count', 1, 'date', '2041-11-03',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3950000-0000-4000-8000-000000000201',
  'extra_ids', array['e3950000-0000-4000-8000-000000000304'])) $$,
  'P0001', 'Every selected extra must be active and compatible', 'an inactive extra is rejected');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 guard duplicate', 'people_count', 1, 'date', '2041-11-04',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3950000-0000-4000-8000-000000000201',
  'extra_ids', array['e3950000-0000-4000-8000-000000000301',
                     'e3950000-0000-4000-8000-000000000301'])) $$,
  'P0001', 'Reservation extras cannot repeat', 'duplicate extra identifiers are rejected');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 guard malformed', 'people_count', 1, 'date', '2041-11-05',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3950000-0000-4000-8000-000000000201',
  'extra_ids', jsonb_build_array(12))) $$,
  'P0001', 'Reservation extra identifiers must be UUID values',
  'non-string identifiers are rejected');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 guard no boat', 'people_count', 1, 'date', '2041-11-06',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3950000-0000-4000-8000-000000000101',
  'quantity', 1, 'extra_ids', array['e3950000-0000-4000-8000-000000000301'])) $$,
  'P0001', 'A boat unit is required when selecting reservation extras',
  'extras cannot use category-only reservations');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 guard tour', 'people_count', 1, 'date', '2041-11-07',
  'time', '09:00', 'duration_minutes', 60, 'reservation_type', 'tour',
  'unit_id', 'e3950000-0000-4000-8000-000000000201',
  'guide_ids', array['e3950000-0000-4000-8000-000000000002'],
  'extra_ids', array['e3950000-0000-4000-8000-000000000301'])) $$,
  'extras preserve tour guide assignment');
select is((select count(*)::integer from reservation_guides as guide
  join reservations as reservation on reservation.id = guide.reservation_id
  where reservation.customer_name = 'RES11 guard tour'), 1,
  'tour guide assignment remains persisted');
reset role;
set local request.jwt.claims to '{"sub":"e3950000-0000-4000-8000-000000000002","role":"authenticated"}';
set local role authenticated;
select throws_ok($$ insert into reservation_items
  (reservation_id, category_id, quantity, extra_id, created_by, updated_by)
  select reservation.id, 'e3950000-0000-4000-8000-000000000102', 2,
    'e3950000-0000-4000-8000-000000000302', auth.uid(), auth.uid()
  from reservations as reservation where reservation.customer_name = 'RES11 guard fee reservation' $$,
  'P0001', 'Reservation access is required', 'Operations cannot create extra inventory rows');
reset role;
set local request.jwt.claims to '{"sub":"e3950000-0000-4000-8000-000000000001","role":"authenticated"}';
set local role authenticated;
select throws_ok($$ insert into reservation_items
  (reservation_id, category_id, quantity, extra_id, created_by, updated_by)
  select reservation.id, 'e3950000-0000-4000-8000-000000000103', 9,
    'e3950000-0000-4000-8000-000000000302', auth.uid(), auth.uid()
  from reservations as reservation where reservation.customer_name = 'RES11 guard fee reservation' $$,
  'P0001', 'Reservation extra inventory does not match its catalog',
  'forged inventory category and quantity are rejected');
select throws_ok($$ update reservation_items set extra_id = 'e3950000-0000-4000-8000-000000000303'
  where reservation_id = (select id from reservations where customer_name = 'RES11 guard fee reservation')
    and extra_id = 'e3950000-0000-4000-8000-000000000301' $$,
  'P0001', 'Reservation extra is incompatible with the selected boat',
  'changing an extra id revalidates its compatibility');

select * from finish();
rollback;
