begin;
select plan(20);

insert into auth.users (id, email) values
  ('e3900000-0000-4000-8000-000000000001', 'res10-override@arenal.local'),
  ('e3900000-0000-4000-8000-000000000002', 'res10-no-access@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e3900000-0000-4000-8000-000000000001', 'res10-override', 'RES10 Override', 'reservas'),
  ('e3900000-0000-4000-8000-000000000002', 'res10-no-access', 'RES10 No Access', 'operaciones');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable,
   guide_only, default_duration_minutes, created_by, updated_by)
values
  ('e3900000-0000-4000-8000-000000000101', 'RES10 USD override', 'by_quantity', true, true,
   false, 60, 'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000102', 'RES10 CRC override', 'by_quantity', true, true,
   false, 60, 'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values
  ('e3900000-0000-4000-8000-000000000101', 5, 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000102', 5, 'e3900000-0000-4000-8000-000000000001');
insert into tariffs (category_id, type, amount_usd, amount_crc, created_by, updated_by)
values
  ('e3900000-0000-4000-8000-000000000101', 'rental', null, 5000,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001'),
  ('e3900000-0000-4000-8000-000000000102', 'rental', 10, null,
   'e3900000-0000-4000-8000-000000000001', 'e3900000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{}';
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Anonymous request', 'people_count', 1,
  'date', '2035-10-01', 'time', '09:00', 'duration_minutes', 60,
  'items', '[]'::jsonb)) $$,
  'P0001', 'Authenticated worker is required',
  'the persistence RPC rejects a request without a JWT identity');
set local request.jwt.claims to '{"sub":"e3900000-0000-4000-8000-000000000002","role":"authenticated"}';
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Unauthorized request', 'people_count', 1,
  'date', '2035-10-01', 'time', '09:00', 'duration_minutes', 60,
  'items', '[]'::jsonb)) $$,
  'P0001', 'Reservation access is required',
  'the persistence RPC rejects a worker without Reservations or admin access');
set local request.jwt.claims to '{"sub":"e3900000-0000-4000-8000-000000000001","role":"authenticated"}';
select lives_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 USD override', 'people_count', 1, 'date', '2035-10-01',
  'time', '09:00', 'duration_minutes', 60, 'agreed_amount_usd', 80,
  'items', jsonb_build_array(jsonb_build_object(
    'category_id', 'e3900000-0000-4000-8000-000000000101', 'quantity', 2)))) $$,
  'the USD agreement may override a missing USD proposal');
select results_eq($$ select usable, committed, free from category_availability(
  'e3900000-0000-4000-8000-000000000101',
  '2035-10-01 09:00:00'::timestamp at time zone 'America/Costa_Rica',
  '2035-10-01 10:00:00'::timestamp at time zone 'America/Costa_Rica') $$,
  $$ values (5, 2, 3) $$,
  'persisted combo equipment reduces interval availability like a separate reservation');
select results_eq($$ select usable, committed, free from category_availability(
  'e3900000-0000-4000-8000-000000000102',
  '2035-10-01 09:00:00'::timestamp at time zone 'America/Costa_Rica',
  '2035-10-01 10:00:00'::timestamp at time zone 'America/Costa_Rica') $$,
  $$ values (5, 0, 5) $$,
  'an unselected category remains available during the combo interval');
select results_eq($$ select usable, committed, free from category_availability(
  'e3900000-0000-4000-8000-000000000102',
  '2035-10-01 10:00:00'::timestamp at time zone 'America/Costa_Rica',
  '2035-10-01 11:00:00'::timestamp at time zone 'America/Costa_Rica') $$,
  $$ values (5, 0, 5) $$,
  'a combo does not reduce availability outside its half-open interval');
select lives_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Multi-category availability', 'people_count', 1,
  'date', '2035-10-03', 'time', '09:00', 'duration_minutes', 60,
  'agreed_amount_usd', 15,
  'items', jsonb_build_array(
    jsonb_build_object('category_id', 'e3900000-0000-4000-8000-000000000101', 'quantity', 2),
    jsonb_build_object('category_id', 'e3900000-0000-4000-8000-000000000102', 'quantity', 1)))) $$,
  'a multi-category combo persists every category commitment');
select results_eq($$ select usable, committed, free from category_availability(
  'e3900000-0000-4000-8000-000000000101',
  '2035-10-03 09:00:00'::timestamp at time zone 'America/Costa_Rica',
  '2035-10-03 10:00:00'::timestamp at time zone 'America/Costa_Rica') $$,
  $$ values (5, 2, 3) $$,
  'a multi-category combo reduces the first category by its selected quantity');
select results_eq($$ select usable, committed, free from category_availability(
  'e3900000-0000-4000-8000-000000000102',
  '2035-10-03 09:00:00'::timestamp at time zone 'America/Costa_Rica',
  '2035-10-03 10:00:00'::timestamp at time zone 'America/Costa_Rica') $$,
  $$ values (5, 1, 4) $$,
  'a multi-category combo reduces the second category by its selected quantity');
select is((select list_amount_usd from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 USD override'), null::numeric,
  'a missing USD tariff proposal remains null');
select is((select list_amount_crc from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 USD override'), 10000::numeric,
  'the CRC proposal remains independently calculated');
select is((select agreed_amount_usd from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 USD override'), 80::numeric,
  'the agreed USD amount is stored without a USD proposal');
select is((select agreed_amount_crc from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 USD override'), null::numeric,
  'the absent CRC agreement remains null');
select lives_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 CRC override', 'people_count', 1, 'date', '2035-10-02',
  'time', '09:00', 'duration_minutes', 60, 'agreed_amount_crc', 12000,
  'items', jsonb_build_array(jsonb_build_object(
    'category_id', 'e3900000-0000-4000-8000-000000000102', 'quantity', 1)))) $$,
  'the CRC agreement may override a missing CRC proposal');
select is((select list_amount_usd from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 CRC override'), 10::numeric,
  'the USD proposal remains independently calculated');
select is((select list_amount_crc from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 CRC override'), null::numeric,
  'a missing CRC tariff proposal remains null');
select is((select agreed_amount_usd from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 CRC override'), null::numeric,
  'the absent USD agreement remains null');
select is((select agreed_amount_crc from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 CRC override'), 12000::numeric,
  'the agreed CRC amount is stored without a CRC proposal');
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Negative USD override', 'people_count', 1,
  'date', '2035-10-03', 'time', '09:00', 'duration_minutes', 60,
  'agreed_amount_usd', -1, 'items', jsonb_build_array(jsonb_build_object(
    'category_id', 'e3900000-0000-4000-8000-000000000101', 'quantity', 1)))) $$,
  'P0001', 'Agreed USD amount is invalid for the available tariff',
  'a negative USD override is rejected even when the USD proposal is missing');
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Negative CRC override', 'people_count', 1,
  'date', '2035-10-04', 'time', '09:00', 'duration_minutes', 60,
  'agreed_amount_crc', -1, 'items', jsonb_build_array(jsonb_build_object(
    'category_id', 'e3900000-0000-4000-8000-000000000102', 'quantity', 1)))) $$,
  'P0001', 'Agreed CRC amount is invalid for the available tariff',
  'a negative CRC override is rejected even when the CRC proposal is missing');

select * from finish();
rollback;
