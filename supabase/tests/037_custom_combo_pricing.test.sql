begin;
select plan(11);

insert into auth.users (id, email) values
  ('e3700000-0000-4000-8000-000000000001', 'res10-pricing@arenal.local'),
  ('e3700000-0000-4000-8000-000000000002', 'res10-no-reservations@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e3700000-0000-4000-8000-000000000001', 'res10-pricing', 'RES10 Pricing', 'reservas'),
  ('e3700000-0000-4000-8000-000000000002', 'res10-no-reservations', 'RES10 Operations', 'operaciones');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable,
   guide_only, default_duration_minutes, created_by, updated_by)
values
  ('e3700000-0000-4000-8000-000000000101', 'RES10 Rental', 'by_quantity', true, true,
   false, 60, 'e3700000-0000-4000-8000-000000000001', 'e3700000-0000-4000-8000-000000000001'),
  ('e3700000-0000-4000-8000-000000000102', 'RES10 Tour', 'by_quantity', true, true,
   true, 60, 'e3700000-0000-4000-8000-000000000001', 'e3700000-0000-4000-8000-000000000001'),
  ('e3700000-0000-4000-8000-000000000103', 'RES10 Partial currency', 'by_quantity', true, true,
   false, 60, 'e3700000-0000-4000-8000-000000000001', 'e3700000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values
  ('e3700000-0000-4000-8000-000000000101', 5, 'e3700000-0000-4000-8000-000000000001'),
  ('e3700000-0000-4000-8000-000000000102', 5, 'e3700000-0000-4000-8000-000000000001'),
  ('e3700000-0000-4000-8000-000000000103', 5, 'e3700000-0000-4000-8000-000000000001');
insert into tariffs (category_id, type, amount_usd, amount_crc, created_by, updated_by)
values
  ('e3700000-0000-4000-8000-000000000101', 'rental', 10, 5000,
   'e3700000-0000-4000-8000-000000000001', 'e3700000-0000-4000-8000-000000000001'),
  ('e3700000-0000-4000-8000-000000000102', 'tour', 4, 2000,
   'e3700000-0000-4000-8000-000000000001', 'e3700000-0000-4000-8000-000000000001'),
  ('e3700000-0000-4000-8000-000000000103', 'rental', 3, null,
   'e3700000-0000-4000-8000-000000000001', 'e3700000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{}';
select throws_ok($$ select custom_combo_price('[]'::jsonb, 60) $$,
  'P0001', 'Reservation access is required',
  'a request without a JWT identity cannot quote a custom combo');
set local request.jwt.claims to '{"sub":"e3700000-0000-4000-8000-000000000002","role":"authenticated"}';
select throws_ok($$ select custom_combo_price('[]'::jsonb, 60) $$,
  'P0001', 'Reservation access is required',
  'an authenticated worker without Reservations or admin access cannot quote');
set local request.jwt.claims to '{"sub":"e3700000-0000-4000-8000-000000000001","role":"authenticated"}';
select is((select list_amount_usd from custom_combo_price(jsonb_build_array(
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000101', 'quantity', 2),
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000102', 'quantity', 1)), 90)),
  36::numeric, 'the proposal sums category USD tariffs by quantity and duration');
select is((select list_amount_crc from custom_combo_price(jsonb_build_array(
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000101', 'quantity', 2),
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000102', 'quantity', 1)), 90)),
  18000::numeric, 'the proposal sums category CRC tariffs independently');
select is((select list_amount_crc from custom_combo_price(jsonb_build_array(
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000103', 'quantity', 1)), 60)),
  null::numeric, 'an incomplete currency proposal is unavailable instead of zero');
reset role;
delete from tariffs
where category_id = 'e3700000-0000-4000-8000-000000000103';
set local role authenticated;
select throws_ok($$ select custom_combo_price(jsonb_build_array(
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000103', 'quantity', 1)), 60) $$,
  'P0001', 'An individual tariff is missing for a custom combo category',
  'a category without its applicable tariff is rejected');
select throws_ok($$ select custom_combo_price(jsonb_build_array(
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000101', 'quantity', 1),
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000101', 'quantity', 2)), 60) $$,
  'P0001', 'Custom combo equipment categories cannot repeat',
  'duplicate category selections are rejected');
select throws_ok($$ select custom_combo_price(jsonb_build_array(
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000101', 'quantity', 1.5)), 60) $$,
  'P0001', 'Custom combo equipment selections are invalid',
  'fractional quantities are rejected');
select throws_ok($$ select custom_combo_price('[]'::jsonb, 60) $$,
  'P0001', 'A custom combo requires equipment selections',
  'empty equipment selections are rejected');
select throws_ok($$ select custom_combo_price(jsonb_build_array(
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000101', 'quantity', 1)), 0) $$,
  'P0001', 'Reservation duration must be positive',
  'a non-positive reservation duration is rejected');
reset role;
update tariffs set amount_usd = -1
where category_id = 'e3700000-0000-4000-8000-000000000101';
set local role authenticated;
select throws_ok($$ select custom_combo_price(jsonb_build_array(
  jsonb_build_object('category_id', 'e3700000-0000-4000-8000-000000000101', 'quantity', 1)), 60) $$,
  'P0001', 'Individual tariffs cannot be negative',
  'negative individual tariffs cannot produce a proposal');

select * from finish();
rollback;
