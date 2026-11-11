begin;
select plan(18);
insert into auth.users (id, email) values
  ('e3800000-0000-4000-8000-000000000001', 'res10-booking@arenal.local'),
  ('e3800000-0000-4000-8000-000000000002', 'res10-guide@arenal.local'),
  ('e3800000-0000-4000-8000-000000000003', 'res10-worker@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e3800000-0000-4000-8000-000000000001', 'res10-booking', 'RES10 Booking', 'reservas'),
  ('e3800000-0000-4000-8000-000000000002', 'res10-guide', 'RES10 Guide', 'operaciones'),
  ('e3800000-0000-4000-8000-000000000003', 'res10-worker', 'RES10 Worker', 'operaciones');
insert into worker_marks (worker_id, mark, granted_by)
values ('e3800000-0000-4000-8000-000000000002', 'guia', 'e3800000-0000-4000-8000-000000000001');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable,
   guide_only, default_duration_minutes, created_by, updated_by)
values
  ('e3800000-0000-4000-8000-000000000101', 'RES10 Rental', 'by_quantity', true, true,
   false, 60, 'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001'),
  ('e3800000-0000-4000-8000-000000000102', 'RES10 Tour', 'by_quantity', true, true,
   true, 60, 'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values
  ('e3800000-0000-4000-8000-000000000101', 5, 'e3800000-0000-4000-8000-000000000001'),
  ('e3800000-0000-4000-8000-000000000102', 5, 'e3800000-0000-4000-8000-000000000001');
insert into tariffs (category_id, type, amount_usd, amount_crc, created_by, updated_by)
values
  ('e3800000-0000-4000-8000-000000000101', 'rental', 12, 6000,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001'),
  ('e3800000-0000-4000-8000-000000000102', 'tour', 20, 10000,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3800000-0000-4000-8000-000000000001","role":"authenticated"}';
select lives_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Mixed combo', 'people_count', 2, 'date', '2035-10-01',
  'time', '09:00', 'duration_minutes', 90, 'agreed_amount_usd', 45,
  'agreed_amount_crc', 23000, 'guide_ids', array['e3800000-0000-4000-8000-000000000002'],
  'items', jsonb_build_array(
    jsonb_build_object('category_id', 'e3800000-0000-4000-8000-000000000101', 'quantity', 2),
    jsonb_build_object('category_id', 'e3800000-0000-4000-8000-000000000102', 'quantity', 1)))) $$,
  'the RPC creates a combo with rental and tour components');
select is((select type::text from reservations where customer_name = 'RES10 Mixed combo'),
  'combo', 'the custom combo persists with reservation type combo');
select is((select combo_id from reservations where customer_name = 'RES10 Mixed combo'),
  null::uuid, 'a custom combo does not reference a predefined package');
select results_eq($$ select item.category_id, item.quantity from reservation_items as item
  join reservations as reservation on reservation.id = item.reservation_id
  where reservation.customer_name = 'RES10 Mixed combo' order by item.category_id $$,
  $$ values ('e3800000-0000-4000-8000-000000000101'::uuid, 2),
            ('e3800000-0000-4000-8000-000000000102'::uuid, 1) $$,
  'each selected category and quantity is stored as a separate reservation item');
select is((select count(*)::integer from reservation_guides as guide
  join reservations as reservation on reservation.id = guide.reservation_id
  where reservation.customer_name = 'RES10 Mixed combo'
    and guide.worker_id = 'e3800000-0000-4000-8000-000000000002'),
  1, 'a marked guide is assigned when the combo contains a tour component');
select is((select list_amount_usd from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 Mixed combo'), 66::numeric,
  'the persisted USD proposal sums both equipment tariffs');
select is((select list_amount_crc from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 Mixed combo'), 33000::numeric,
  'the persisted CRC proposal is calculated independently');
select is((select agreed_amount_usd from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 Mixed combo'), 45::numeric,
  'the agreed USD amount remains separate from the proposal');
select is((select agreed_amount_crc from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 Mixed combo'), 23000::numeric,
  'the agreed CRC amount remains separate from the proposal');
select lives_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 No tour combo', 'people_count', 1, 'date', '2035-10-02',
  'time', '09:00', 'duration_minutes', 60,
  'items', jsonb_build_array(jsonb_build_object(
    'category_id', 'e3800000-0000-4000-8000-000000000101', 'quantity', 1)))) $$,
  'the RPC creates a combo without a tour component or guide');
select is((select count(*)::integer from reservation_guides as guide
  join reservations as reservation on reservation.id = guide.reservation_id
  where reservation.customer_name = 'RES10 No tour combo'), 0,
  'a no-tour combo stores no guide assignment');
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Guide without tour', 'people_count', 1, 'date', '2035-10-03',
  'time', '09:00', 'duration_minutes', 60,
  'guide_ids', array['e3800000-0000-4000-8000-000000000002'],
  'items', jsonb_build_array(jsonb_build_object(
    'category_id', 'e3800000-0000-4000-8000-000000000101', 'quantity', 1)))) $$,
  'P0001', 'Guides can only be assigned to tour reservations',
  'guide assignment is rejected when no selected component makes the combo a tour');
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Unmarked guide', 'people_count', 1, 'date', '2035-10-04',
  'time', '09:00', 'duration_minutes', 60,
  'guide_ids', array['e3800000-0000-4000-8000-000000000003'],
  'items', jsonb_build_array(jsonb_build_object(
    'category_id', 'e3800000-0000-4000-8000-000000000102', 'quantity', 1)))) $$,
  'P0001', 'Every assigned worker must be marked as a guide',
  'an unmarked worker cannot be assigned to a tour combo');
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Duplicate category', 'people_count', 1, 'date', '2035-10-05',
  'time', '09:00', 'duration_minutes', 60,
  'items', jsonb_build_array(
    jsonb_build_object('category_id', 'e3800000-0000-4000-8000-000000000101', 'quantity', 1),
    jsonb_build_object('category_id', 'e3800000-0000-4000-8000-000000000101', 'quantity', 2)))) $$,
  'P0001', 'Custom combo equipment categories cannot repeat',
  'duplicate items fail before creating a reservation');
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Zero quantity', 'people_count', 1, 'date', '2035-10-06',
  'time', '09:00', 'duration_minutes', 60,
  'items', jsonb_build_array(jsonb_build_object(
    'category_id', 'e3800000-0000-4000-8000-000000000101', 'quantity', 0)))) $$,
  'P0001', 'Custom combo equipment selections are invalid',
  'zero equipment quantity fails before creating a reservation');

reset role;
create function reject_res10_second_item() returns trigger
language plpgsql as $$
begin
  if new.category_id = 'e3800000-0000-4000-8000-000000000102' then
    raise exception 'Injected custom combo item failure';
  end if;
  return new;
end;
$$;
create trigger reject_res10_second_item
before insert on reservation_items
for each row execute function reject_res10_second_item();
set local role authenticated;
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Late item failure', 'people_count', 1, 'date', '2035-10-07',
  'time', '09:00', 'duration_minutes', 60,
  'items', jsonb_build_array(
    jsonb_build_object('category_id', 'e3800000-0000-4000-8000-000000000101', 'quantity', 1),
    jsonb_build_object('category_id', 'e3800000-0000-4000-8000-000000000102', 'quantity', 1)))) $$,
  'P0001', 'Injected custom combo item failure',
  'a failure after the first item insertion aborts the complete reservation');
select is((select count(*)::integer from reservations
  where customer_name = 'RES10 Late item failure'), 0,
  'late failure rolls back the reservation row');
select is((select count(*)::integer from reservation_items as item
  join reservations as reservation on reservation.id = item.reservation_id
  where reservation.customer_name = 'RES10 Late item failure'), 0,
  'late failure rolls back every equipment item');

reset role;
drop trigger reject_res10_second_item on reservation_items;
drop function reject_res10_second_item();
select * from finish();
rollback;
