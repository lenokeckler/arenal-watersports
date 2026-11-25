begin;
select plan(11);

insert into auth.users(id, email) values
  ('e6100000-0000-4000-8000-000000000001', 'res-price-booking@arenal.local');
insert into workers(id, username, full_name, base_role)
values ('e6100000-0000-4000-8000-000000000001', 'res-price-booking', 'Price At Booking', 'reservas');
insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, guide_only,
   default_duration_minutes, created_by, updated_by)
values
  ('e6100000-0000-4000-8000-000000000101', 'PAB Kayak', 'active', 'by_unit', true, false, false,
   60, 'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001'),
  ('e6100000-0000-4000-8000-000000000102', 'PAB Tour Boat', 'active', 'by_unit', true, false, true,
   60, 'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001'),
  ('e6100000-0000-4000-8000-000000000103', 'PAB No Tariff', 'active', 'by_unit', true, false, false,
   60, 'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001'),
  ('e6100000-0000-4000-8000-000000000104', 'PAB Extra Inventory', 'active', 'by_quantity', false, false, false,
   null, 'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001');
insert into equipment_units(id, category_id, code, status, created_by, updated_by)
values
  ('e6100000-0000-4000-8000-000000000201', 'e6100000-0000-4000-8000-000000000101', 'PAB-KAYAK-1', 'available',
   'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001'),
  ('e6100000-0000-4000-8000-000000000202', 'e6100000-0000-4000-8000-000000000102', 'PAB-TOUR-1', 'available',
   'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001'),
  ('e6100000-0000-4000-8000-000000000203', 'e6100000-0000-4000-8000-000000000103', 'PAB-NONE-1', 'available',
   'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001'),
  ('e6100000-0000-4000-8000-000000000204', 'e6100000-0000-4000-8000-000000000101', 'PAB-KAYAK-2', 'available',
   'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001');
insert into equipment_stock(category_id, quantity_available, updated_by)
values ('e6100000-0000-4000-8000-000000000104', 4, 'e6100000-0000-4000-8000-000000000001');
insert into tariffs(category_id, type, amount_usd, amount_crc, created_by, updated_by)
values
  ('e6100000-0000-4000-8000-000000000101', 'rental', 40, 20000,
   'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001'),
  ('e6100000-0000-4000-8000-000000000102', 'tour', 30, 15000,
   'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001');
insert into extras(id, name, price_usd, price_crc, occupies_category_id, occupies_quantity, created_by, updated_by)
values ('e6100000-0000-4000-8000-000000000301', 'PAB Extra', 5, 2500,
  'e6100000-0000-4000-8000-000000000104', 1,
  'e6100000-0000-4000-8000-000000000001', 'e6100000-0000-4000-8000-000000000001');
insert into extra_compatibility(extra_id, unit_id)
values ('e6100000-0000-4000-8000-000000000301', 'e6100000-0000-4000-8000-000000000201');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e6100000-0000-4000-8000-000000000001","role":"authenticated"}';

select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'PAB Rental', 'people_count', 2, 'date', '2041-02-01', 'time', '09:00',
  'duration_minutes', 90, 'unit_id', 'e6100000-0000-4000-8000-000000000204')) $$,
  'a plain rental without extras books');
select results_eq(
  $$ select pricing.list_amount_usd, pricing.list_amount_crc from reservation_pricing as pricing
     join reservations as reservation on reservation.id = pricing.reservation_id
     where reservation.customer_name = 'PAB Rental' $$,
  $$ values (60::numeric, 30000::numeric) $$,
  'a rental stores the tariff times its duration at booking');

select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'PAB Tour', 'people_count', 2, 'date', '2041-02-01', 'time', '12:00',
  'duration_minutes', 60, 'reservation_type', 'tour', 'unit_id', 'e6100000-0000-4000-8000-000000000202')) $$,
  'a plain tour without extras books');
select results_eq(
  $$ select pricing.list_amount_usd, pricing.list_amount_crc from reservation_pricing as pricing
     join reservations as reservation on reservation.id = pricing.reservation_id
     where reservation.customer_name = 'PAB Tour' $$,
  $$ values (30::numeric, 15000::numeric) $$,
  'a tour stores the tour tariff at booking');

reset role;
update tariffs set amount_usd = 100, amount_crc = 50000
where category_id = 'e6100000-0000-4000-8000-000000000101' and type = 'rental';
set local role authenticated;
set local request.jwt.claims to '{"sub":"e6100000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select proposal.proposal_usd, proposal.proposal_crc from reservations as reservation,
     reservation_charge_proposal(reservation.id) as proposal
     where reservation.customer_name = 'PAB Rental' $$,
  $$ values (60::numeric, 30000::numeric) $$,
  'a tariff change does not move the proposal of an already booked reservation');

select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'PAB Rental After Change', 'people_count', 2, 'date', '2041-02-02', 'time', '09:00',
  'duration_minutes', 60, 'unit_id', 'e6100000-0000-4000-8000-000000000204')) $$,
  'a rental booked after the tariff change books');
select results_eq(
  $$ select pricing.list_amount_usd, pricing.list_amount_crc from reservation_pricing as pricing
     join reservations as reservation on reservation.id = pricing.reservation_id
     where reservation.customer_name = 'PAB Rental After Change' $$,
  $$ values (100::numeric, 50000::numeric) $$,
  'a reservation booked after the change uses the new tariff');

select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'PAB No Tariff', 'people_count', 2, 'date', '2041-02-01', 'time', '09:00',
  'duration_minutes', 60, 'unit_id', 'e6100000-0000-4000-8000-000000000203')) $$,
  'a category without tariff books');
select is(
  (select count(*)::integer from reservation_pricing as pricing
   join reservations as reservation on reservation.id = pricing.reservation_id
   where reservation.customer_name = 'PAB No Tariff'),
  0, 'a category without tariff stores no pricing row');

select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'PAB With Extra', 'people_count', 2, 'date', '2041-02-03', 'time', '09:00',
  'duration_minutes', 60, 'unit_id', 'e6100000-0000-4000-8000-000000000201',
  'extra_ids', jsonb_build_array('e6100000-0000-4000-8000-000000000301'))) $$,
  'a rental with extras still books without a pricing conflict');
select results_eq(
  $$ select count(*)::integer, max(pricing.list_amount_usd) from reservation_pricing as pricing
     join reservations as reservation on reservation.id = pricing.reservation_id
     where reservation.customer_name = 'PAB With Extra' $$,
  $$ values (1, 105::numeric) $$,
  'a reservation with extras keeps one pricing row that includes the extras');

reset role;
select * from finish();
rollback;
