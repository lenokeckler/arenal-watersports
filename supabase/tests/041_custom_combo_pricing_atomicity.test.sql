begin;
select plan(5);

insert into auth.users (id, email) values
  ('e4100000-0000-4000-8000-000000000001', 'res10-pricing-booking@arenal.local'),
  ('e4100000-0000-4000-8000-000000000002', 'res10-pricing-guide@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e4100000-0000-4000-8000-000000000001', 'res10-pricing-booking', 'RES10 Pricing Booking', 'reservas'),
  ('e4100000-0000-4000-8000-000000000002', 'res10-pricing-guide', 'RES10 Pricing Guide', 'operaciones');
insert into worker_marks (worker_id, mark, granted_by)
values ('e4100000-0000-4000-8000-000000000002', 'guia', 'e4100000-0000-4000-8000-000000000001');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable,
   guide_only, default_duration_minutes, created_by, updated_by)
values
  ('e4100000-0000-4000-8000-000000000101', 'RES10 Atomic rental', 'by_quantity', true, true,
   false, 60, 'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001'),
  ('e4100000-0000-4000-8000-000000000102', 'RES10 Atomic tour', 'by_quantity', true, true,
   true, 60, 'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values
  ('e4100000-0000-4000-8000-000000000101', 2, 'e4100000-0000-4000-8000-000000000001'),
  ('e4100000-0000-4000-8000-000000000102', 2, 'e4100000-0000-4000-8000-000000000001');
insert into tariffs (category_id, type, amount_usd, amount_crc, created_by, updated_by)
values
  ('e4100000-0000-4000-8000-000000000101', 'rental', 12, 6000,
   'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001'),
  ('e4100000-0000-4000-8000-000000000102', 'tour', 20, 10000,
   'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001');

create function reject_res10_pricing_insert() returns trigger
language plpgsql as $$
begin
  raise exception 'Injected custom combo pricing failure';
end;
$$;
create trigger reject_res10_pricing_insert
before insert on reservation_pricing
for each row execute function reject_res10_pricing_insert();

set local role authenticated;
set local request.jwt.claims to '{"sub":"e4100000-0000-4000-8000-000000000001","role":"authenticated"}';
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Late pricing failure', 'people_count', 1,
  'date', '2035-10-08', 'time', '09:00', 'duration_minutes', 60,
  'guide_ids', array['e4100000-0000-4000-8000-000000000002'],
  'items', jsonb_build_array(
    jsonb_build_object('category_id', 'e4100000-0000-4000-8000-000000000101', 'quantity', 1),
    jsonb_build_object('category_id', 'e4100000-0000-4000-8000-000000000102', 'quantity', 1)))) $$,
  'P0001', 'Injected custom combo pricing failure',
  'a pricing failure after reservation, equipment, and guide inserts aborts the transaction');
select is((select count(*)::integer from reservations
  where customer_name = 'RES10 Late pricing failure'), 0,
  'late pricing failure rolls back the reservation row');
select is((select count(*)::integer from reservation_items as item
  join reservations as reservation on reservation.id = item.reservation_id
  where reservation.customer_name = 'RES10 Late pricing failure'), 0,
  'late pricing failure rolls back all equipment items');
select is((select count(*)::integer from reservation_guides as guide
  join reservations as reservation on reservation.id = guide.reservation_id
  where reservation.customer_name = 'RES10 Late pricing failure'), 0,
  'late pricing failure rolls back guide assignments');
select is((select count(*)::integer from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 Late pricing failure'), 0,
  'late pricing failure leaves no pricing row');

reset role;
drop trigger reject_res10_pricing_insert on reservation_pricing;
drop function reject_res10_pricing_insert();
select * from finish();
rollback;
