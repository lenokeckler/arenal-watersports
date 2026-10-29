begin;
select plan(15);

insert into auth.users (id, email) values
  ('e4200000-0000-4000-8000-000000000001', 'res09-predefined-booking@arenal.local'),
  ('e4200000-0000-4000-8000-000000000002', 'res09-predefined-guide@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e4200000-0000-4000-8000-000000000001', 'res09-predefined-booking', 'RES09 Predefined Booking', 'reservas'),
  ('e4200000-0000-4000-8000-000000000002', 'res09-predefined-guide', 'RES09 Predefined Guide', 'operaciones');
insert into worker_marks (worker_id, mark, granted_by)
values ('e4200000-0000-4000-8000-000000000002', 'guia', 'e4200000-0000-4000-8000-000000000001');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable,
   guide_only, default_duration_minutes, created_by, updated_by)
values
  ('e4200000-0000-4000-8000-000000000101', 'RES09 predefined rental', 'by_quantity', true, true,
   false, 60, 'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001'),
  ('e4200000-0000-4000-8000-000000000102', 'RES09 predefined guide', 'by_quantity', true, true,
   true, 60, 'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001'),
  ('e4200000-0000-4000-8000-000000000103', 'RES09 predefined inactive', 'by_quantity', false, true,
   false, 60, 'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001'),
  ('e4200000-0000-4000-8000-000000000104', 'RES09 predefined Lancha', 'by_unit', true, false,
   false, 60, 'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values
  ('e4200000-0000-4000-8000-000000000101', 3, 'e4200000-0000-4000-8000-000000000001'),
  ('e4200000-0000-4000-8000-000000000102', 3, 'e4200000-0000-4000-8000-000000000001');
insert into combos (id, name, audience, package_price_crc, created_by, updated_by)
values
  ('e4200000-0000-4000-8000-000000000201', 'RES09 predefined active', 'national', 42500,
   'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001'),
  ('e4200000-0000-4000-8000-000000000202', 'RES09 predefined inactive', 'national', 10000,
   'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001'),
  ('e4200000-0000-4000-8000-000000000203', 'RES09 predefined invalid item', 'national', 10000,
   'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001'),
  ('e4200000-0000-4000-8000-000000000204', 'RES09 predefined no guide', 'national', 10000,
   'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001'),
  ('e4200000-0000-4000-8000-000000000205', 'RES09 predefined Lancha combo', 'national', 20000,
   'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001');
update combos set status = 'inactive'
where id = 'e4200000-0000-4000-8000-000000000202';
insert into combo_items (combo_id, category_id, quantity)
values
  ('e4200000-0000-4000-8000-000000000201', 'e4200000-0000-4000-8000-000000000101', 2),
  ('e4200000-0000-4000-8000-000000000201', 'e4200000-0000-4000-8000-000000000102', 1),
  ('e4200000-0000-4000-8000-000000000203', 'e4200000-0000-4000-8000-000000000103', 1),
  ('e4200000-0000-4000-8000-000000000204', 'e4200000-0000-4000-8000-000000000101', 1),
  ('e4200000-0000-4000-8000-000000000205', 'e4200000-0000-4000-8000-000000000104', 1);

set local role authenticated;
set local request.jwt.claims to '{"sub":"e4200000-0000-4000-8000-000000000001","role":"authenticated"}';
select lives_ok($$ select create_predefined_combo_reservation(jsonb_build_object(
  'combo_id', 'e4200000-0000-4000-8000-000000000201',
  'customer_name', 'RES09 fixed package', 'people_count', 2,
  'date', '2035-10-08', 'time', '09:00', 'duration_minutes', 60,
  'guide_ids', array['e4200000-0000-4000-8000-000000000002'],
  'items', jsonb_build_array(jsonb_build_object('category_id', 'e4200000-0000-4000-8000-000000000103', 'quantity', 99)),
  'package_price_crc', 1)) $$,
  'an active combo with a guide-only component can be booked with an assigned guide');
select is((select count(*)::integer from reservations
  where customer_name = 'RES09 fixed package' and type = 'combo'
    and combo_id = 'e4200000-0000-4000-8000-000000000201'), 1,
  'the reservation retains the persisted combo identity');
select is((select count(*)::integer from reservation_items as item
  join reservations as reservation on reservation.id = item.reservation_id
  where reservation.customer_name = 'RES09 fixed package'
    and ((item.category_id = 'e4200000-0000-4000-8000-000000000101' and item.quantity = 2)
      or (item.category_id = 'e4200000-0000-4000-8000-000000000102' and item.quantity = 1))), 2,
  'reservation components are snapshotted from combo_items instead of the client');
select is((select pricing.list_amount_crc
  from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES09 fixed package'), 42500::numeric,
  'the stored package price replaces the client-supplied price');
select is((select count(*)::integer from reservation_guides as guide
  join reservations as reservation on reservation.id = guide.reservation_id
  where reservation.customer_name = 'RES09 fixed package'), 1,
  'the persisted guide assignment passes the guide-only combo guard');
select throws_ok($$ select create_predefined_combo_reservation(jsonb_build_object(
  'combo_id', 'e4200000-0000-4000-8000-000000000202',
  'customer_name', 'RES09 inactive package', 'people_count', 1,
  'date', '2035-10-08', 'time', '09:00', 'duration_minutes', 60)) $$,
  'P0001', 'Predefined combo is not active',
  'inactive predefined combos cannot be booked');
select throws_ok($$ select create_predefined_combo_reservation(jsonb_build_object(
  'combo_id', 'e4200000-0000-4000-8000-000000000203',
  'customer_name', 'RES09 invalid component', 'people_count', 1,
  'date', '2035-10-08', 'time', '09:00', 'duration_minutes', 60)) $$,
  'P0001', 'Equipment category is not available for reservation',
  'non-reservable combo components are rejected');
select throws_ok($$ select create_predefined_combo_reservation(jsonb_build_object(
  'combo_id', 'e4200000-0000-4000-8000-000000000205',
  'customer_name', 'RES09 non-interchangeable component', 'people_count', 1,
  'date', '2035-10-08', 'time', '09:00', 'duration_minutes', 60)) $$,
  'P0001', 'Equipment category is not available for reservation',
  'a combo containing a non-interchangeable Lancha component cannot be booked');
select throws_ok($$ select private.resolve_predefined_combo_price(
  'national', null, null) $$,
  'P0001', 'Predefined combo package price is invalid',
  'a predefined combo without its audience price is rejected');
select throws_ok($$ select create_predefined_combo_reservation(jsonb_build_object(
  'combo_id', 'e4200000-0000-4000-8000-000000000204',
  'customer_name', 'RES09 guide not eligible', 'people_count', 1,
  'date', '2035-10-08', 'time', '09:00', 'duration_minutes', 60,
  'guide_ids', array['e4200000-0000-4000-8000-000000000002'])) $$,
  'P0001', 'Guides can only be assigned to tour reservations',
  'combos without a guide-only definition cannot receive guide assignments');
insert into reservations (
  customer_name, people_count, type, combo_id, starts_at,
  duration_minutes, created_by, updated_by
)
values (
  'RES09 guide-only guard', 1, 'combo',
  'e4200000-0000-4000-8000-000000000204',
  '2035-10-08 09:00:00-06', 60,
  'e4200000-0000-4000-8000-000000000001',
  'e4200000-0000-4000-8000-000000000001'
);
select throws_ok($$ insert into reservation_items (
  reservation_id, category_id, quantity, created_by, updated_by
)
select reservation.id, 'e4200000-0000-4000-8000-000000000102', 1,
  'e4200000-0000-4000-8000-000000000001',
  'e4200000-0000-4000-8000-000000000001'
from reservations as reservation
where reservation.customer_name = 'RES09 guide-only guard' $$,
  'P0001', 'Guide-only equipment requires a tour reservation',
  'guide-only equipment is rejected unless it belongs to the predefined combo');
reset role;
create function reject_res09_pricing_insert() returns trigger
language plpgsql as $$
begin
  raise exception 'Injected predefined combo pricing failure';
end;
$$;
create trigger reject_res09_pricing_insert
before insert on reservation_pricing
for each row execute function reject_res09_pricing_insert();
set local role authenticated;
set local request.jwt.claims to '{"sub":"e4200000-0000-4000-8000-000000000001","role":"authenticated"}';
select throws_ok($$ select create_predefined_combo_reservation(jsonb_build_object(
  'combo_id', 'e4200000-0000-4000-8000-000000000201',
  'customer_name', 'RES09 atomic failure', 'people_count', 2,
  'date', '2035-10-08', 'time', '09:00', 'duration_minutes', 60,
  'guide_ids', array['e4200000-0000-4000-8000-000000000002'])) $$,
  'P0001', 'Injected predefined combo pricing failure',
  'a late pricing failure aborts the complete reservation transaction');

reset role;
select is((select count(*)::integer from reservations
  where customer_name = 'RES09 atomic failure'), 0,
  'the late failure rolls back the reservation, components and guides');
reset role;
delete from combo_items
where combo_id = 'e4200000-0000-4000-8000-000000000201'
  and category_id = 'e4200000-0000-4000-8000-000000000102';
set local role authenticated;
select lives_ok($$ update reservations set type = 'combo'
  where customer_name = 'RES09 fixed package' $$,
  'guide eligibility remains valid after the combo catalog changes');
select is((select count(*)::integer from reservation_items as item
  join reservations as reservation on reservation.id = item.reservation_id
  where reservation.customer_name = 'RES09 fixed package'
    and item.category_id = 'e4200000-0000-4000-8000-000000000102'), 1,
  'the saved reservation retains its original guide-only equipment snapshot');
reset role;
drop trigger reject_res09_pricing_insert on reservation_pricing;
drop function reject_res09_pricing_insert();
select * from finish();
rollback;
