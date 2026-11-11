begin;
select plan(21);

insert into auth.users (id, email) values
  ('e3900000-0000-4000-8000-000000000001', 'res11-persistence@arenal.local'),
  ('e3900000-0000-4000-8000-000000000002', 'res11-operations@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e3900000-0000-4000-8000-000000000001', 'res11-persistence', 'RES11 Persistence', 'reservas'),
  ('e3900000-0000-4000-8000-000000000002', 'res11-operations', 'RES11 Operations', 'operaciones');
insert into worker_marks (worker_id, mark, granted_by) values
  ('e3900000-0000-4000-8000-000000000002', 'guia', 'e3900000-0000-4000-8000-000000000001');
insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes,
   created_by, updated_by)
values
  ('e3900000-0000-4000-8000-000000000101', 'RES11 persistence boat', 'active', 'by_unit', true, false, 60,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000102', 'RES11 physical stock', 'active', 'by_quantity', false, false, null,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000103', 'RES11 physical units', 'active', 'by_unit', false, false, null,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000104', 'RES11 unpriced boat', 'active', 'by_unit', true, false, 60,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000105', 'RES11 constrained inventory', 'active', 'by_quantity', false, false, null,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001');
insert into equipment_units (id, category_id, code, created_by, updated_by) values
  ('e3900000-0000-4000-8000-000000000201', 'e3900000-0000-4000-8000-000000000101', 'RES11-BOAT-01',
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000202', 'e3900000-0000-4000-8000-000000000103', 'RES11-BOARD-01',
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000203', 'e3900000-0000-4000-8000-000000000104', 'RES11-BOAT-02',
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values
  ('e3900000-0000-4000-8000-000000000102', 8, 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000105', 1, 'e3900000-0000-4000-8000-000000000001');
insert into tariffs (category_id, type, amount_usd, amount_crc, created_by, updated_by)
values ('e3900000-0000-4000-8000-000000000101', 'rental', 20, 10000,
  'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000101', 'tour', 10, 5000,
  'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001');
insert into extras
  (id, name, price_usd, price_crc, occupies_category_id, occupies_quantity, created_by, updated_by)
values
  ('e3900000-0000-4000-8000-000000000301', 'RES11 fee only', 5, 2500, null, null,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000302', 'RES11 physical stock extra', 3, 1500,
   'e3900000-0000-4000-8000-000000000102', 2,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000303', 'RES11 incompatible', 2, 1000, null, null,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000304', 'RES11 inactive', 2, 1000, null, null,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000305', 'RES11 missing currency', 4, null, null, null,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000306', 'RES11 physical units extra', 1, 500,
   'e3900000-0000-4000-8000-000000000103', 1,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000307', 'RES11 over capacity extra', 3, 1500,
   'e3900000-0000-4000-8000-000000000105', 2,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001');
update extras set status = 'inactive' where id = 'e3900000-0000-4000-8000-000000000304';
insert into extra_compatibility (extra_id, unit_id) values
  ('e3900000-0000-4000-8000-000000000301', 'e3900000-0000-4000-8000-000000000201'),
  ('e3900000-0000-4000-8000-000000000301', 'e3900000-0000-4000-8000-000000000203'),
  ('e3900000-0000-4000-8000-000000000302', 'e3900000-0000-4000-8000-000000000201'),
  ('e3900000-0000-4000-8000-000000000304', 'e3900000-0000-4000-8000-000000000201'),
  ('e3900000-0000-4000-8000-000000000305', 'e3900000-0000-4000-8000-000000000201'),
  ('e3900000-0000-4000-8000-000000000306', 'e3900000-0000-4000-8000-000000000201'),
  ('e3900000-0000-4000-8000-000000000307', 'e3900000-0000-4000-8000-000000000201');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3900000-0000-4000-8000-000000000001","role":"authenticated"}';
select ok(has_function_privilege('authenticated',
  'private.validate_reservation_extra_item(reservation_items)', 'EXECUTE'),
  'authenticated workers can reach the trigger-only validator');
select ok(not has_function_privilege('anon',
  'private.validate_reservation_extra_item(reservation_items)', 'EXECUTE'),
  'anonymous users cannot execute the extra validator');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 Legacy omitted extras', 'people_count', 1, 'date', '2040-11-01',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3900000-0000-4000-8000-000000000203')) $$,
  'omitting extras preserves legacy reservation creation without a tariff');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 Legacy null extras', 'people_count', 1, 'date', '2040-11-02',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3900000-0000-4000-8000-000000000203',
  'extra_ids', null)) $$, 'null extras preserve legacy reservation creation');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 Legacy empty extras', 'people_count', 1, 'date', '2040-11-03',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3900000-0000-4000-8000-000000000203',
  'extra_ids', '[]'::jsonb)) $$, 'an empty extra list preserves legacy reservation creation');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 Fee only reservation', 'people_count', 1, 'date', '2040-11-04',
  'time', '09:00', 'duration_minutes', 90, 'unit_id', 'e3900000-0000-4000-8000-000000000201',
  'extra_ids', array['e3900000-0000-4000-8000-000000000301'])) $$,
  'a compatible fee-only extra can be reserved');
select is((select list_amount_usd from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES11 Fee only reservation'), 35::numeric,
  'the saved USD total uses hourly tariff times duration plus the fee');
select is((select list_amount_crc from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES11 Fee only reservation'), 17500::numeric,
  'the saved CRC total is calculated independently');
select is((select count(*)::integer from reservation_items as item
  join reservations as reservation on reservation.id = item.reservation_id
  where reservation.customer_name = 'RES11 Fee only reservation'
    and item.extra_id = 'e3900000-0000-4000-8000-000000000301'
    and item.category_id is null and item.quantity is null), 1,
  'fee-only extras persist without an inventory commitment');
select is((select free from category_availability('e3900000-0000-4000-8000-000000000102',
  '2040-11-04 15:00:00+00', '2040-11-04 16:00:00+00', null)), 8,
  'fee-only extras do not reduce inventory availability');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 Physical stock reservation', 'people_count', 1, 'date', '2040-11-05',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3900000-0000-4000-8000-000000000201',
  'extra_ids', array['e3900000-0000-4000-8000-000000000302'])) $$,
  'physical extras can use an active non-reservable stock category');
select is((select category_id::text || ':' || quantity::text from reservation_items as item
  join reservations as reservation on reservation.id = item.reservation_id
  where reservation.customer_name = 'RES11 Physical stock reservation'
    and item.extra_id = 'e3900000-0000-4000-8000-000000000302'),
  'e3900000-0000-4000-8000-000000000102:2',
  'physical inventory metadata comes from the extra catalog');
select is((select free from category_availability('e3900000-0000-4000-8000-000000000102',
  '2040-11-05 15:00:00+00', '2040-11-05 16:00:00+00', null)), 6,
  'physical extra quantity reduces category availability');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 Physical unit reservation', 'people_count', 1, 'date', '2040-11-06',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3900000-0000-4000-8000-000000000201',
  'extra_ids', array['e3900000-0000-4000-8000-000000000306'])) $$,
  'physical extras can lock active unit-tracked inventory');
select is((select free from category_availability('e3900000-0000-4000-8000-000000000103',
  '2040-11-06 15:00:00+00', '2040-11-06 16:00:00+00', null)), 0,
  'unit-tracked physical extras reduce availability by their catalog quantity');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 extra over capacity', 'people_count', 1, 'date', '2040-11-09',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3900000-0000-4000-8000-000000000201',
  'extra_ids', array['e3900000-0000-4000-8000-000000000307'])) $$,
  'P0001', 'Reservation extra exceeds available inventory capacity',
  'an inventory extra cannot reserve two units when only one is available');
select is((select free from category_availability('e3900000-0000-4000-8000-000000000105',
  '2040-11-09 15:00:00+00', '2040-11-09 16:00:00+00', null)), 1,
  'a rejected over-capacity extra leaves inventory available');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 Missing currency reservation', 'people_count', 1, 'date', '2040-11-07',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3900000-0000-4000-8000-000000000201',
  'extra_ids', array['e3900000-0000-4000-8000-000000000305'])) $$,
  'a missing price in one currency does not prevent creation');
select is((select list_amount_crc from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES11 Missing currency reservation'), null::numeric,
  'a missing currency price persists as a null total');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES11 Missing tariff reservation', 'people_count', 1, 'date', '2040-11-08',
  'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e3900000-0000-4000-8000-000000000203',
  'extra_ids', array['e3900000-0000-4000-8000-000000000301'])) $$,
  'P0001', 'A boat tariff is required to create a reservation with extras',
  'a missing boat tariff rejects an extras reservation');
select is((select count(*)::integer from reservations
  where customer_name = 'RES11 Missing tariff reservation'), 0,
  'a missing tariff failure rolls back the reservation');
reset role;
select * from finish();
rollback;
