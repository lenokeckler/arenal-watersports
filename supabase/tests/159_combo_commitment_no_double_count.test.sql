begin;
select plan(6);

insert into auth.users (id, email) values
  ('e5900000-0000-4000-8000-000000000001', 'res05-commitment-booker@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e5900000-0000-4000-8000-000000000001', 'res05-commitment-booker', 'RES05 Commitment Booker', 'reservas');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable,
   guide_only, default_duration_minutes, created_by, updated_by)
values
  ('e5900000-0000-4000-8000-000000000101', 'RES05 commitment paddle', 'by_quantity', true, true,
   false, 60, 'e5900000-0000-4000-8000-000000000001', 'e5900000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e5900000-0000-4000-8000-000000000101', 4, 'e5900000-0000-4000-8000-000000000001');
insert into combos (id, name, audience, package_price_usd, created_by, updated_by)
values
  ('e5900000-0000-4000-8000-000000000201', 'RES05 commitment pair', 'foreign', 100,
   'e5900000-0000-4000-8000-000000000001', 'e5900000-0000-4000-8000-000000000001'),
  ('e5900000-0000-4000-8000-000000000202', 'RES05 commitment legacy', 'foreign', 100,
   'e5900000-0000-4000-8000-000000000001', 'e5900000-0000-4000-8000-000000000001');
insert into combo_items (combo_id, category_id, quantity)
values
  ('e5900000-0000-4000-8000-000000000201', 'e5900000-0000-4000-8000-000000000101', 2),
  ('e5900000-0000-4000-8000-000000000202', 'e5900000-0000-4000-8000-000000000101', 3);
insert into reservations (
  customer_name, people_count, type, combo_id, starts_at,
  duration_minutes, status, created_by, updated_by
) values (
  'RES05 legacy combo', 3, 'combo', 'e5900000-0000-4000-8000-000000000202',
  '2035-10-09 09:00:00+00', 60, 'scheduled',
  'e5900000-0000-4000-8000-000000000001', 'e5900000-0000-4000-8000-000000000001'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"e5900000-0000-4000-8000-000000000001","role":"authenticated"}';

select create_predefined_combo_reservation(jsonb_build_object(
  'combo_id', 'e5900000-0000-4000-8000-000000000201',
  'customer_name', 'RES05 first pair', 'people_count', 2,
  'date', '2035-10-08', 'time', '09:00', 'duration_minutes', 60));

select is(private.reservation_category_peak_commitment(
    'e5900000-0000-4000-8000-000000000101',
    '2035-10-08 00:00:00+00', '2035-10-09 00:00:00+00', null, null, null),
  2,
  'a predefined combo reservation commits the quantity of its snapshot once, not twice');

select lives_ok($$ select create_predefined_combo_reservation(jsonb_build_object(
  'combo_id', 'e5900000-0000-4000-8000-000000000201',
  'customer_name', 'RES05 second pair', 'people_count', 2,
  'date', '2035-10-08', 'time', '09:00', 'duration_minutes', 60)) $$,
  'a second predefined combo reservation fits when the stock covers both snapshots');

select is(private.reservation_category_peak_commitment(
    'e5900000-0000-4000-8000-000000000101',
    '2035-10-08 00:00:00+00', '2035-10-09 00:00:00+00', null, null, null),
  4,
  'two predefined combo reservations at the same time commit the sum of their snapshots');

select throws_ok($$ select create_predefined_combo_reservation(jsonb_build_object(
  'combo_id', 'e5900000-0000-4000-8000-000000000201',
  'customer_name', 'RES05 third pair', 'people_count', 2,
  'date', '2035-10-08', 'time', '09:00', 'duration_minutes', 60)) $$,
  null,
  'a third predefined combo reservation is refused once the stock is fully committed');

select is(private.reservation_category_peak_commitment(
    'e5900000-0000-4000-8000-000000000101',
    '2035-10-09 00:00:00+00', '2035-10-10 00:00:00+00', null, null, null),
  3,
  'a combo reservation without snapshot rows still commits through combo_items');

select is(private.reservation_category_peak_commitment(
    'e5900000-0000-4000-8000-000000000101',
    '2035-10-08 00:00:00+00', '2035-10-09 00:00:00+00', null,
    (select item.id from reservation_items as item
      join reservations as reservation on reservation.id = item.reservation_id
      where reservation.customer_name = 'RES05 first pair'),
    null),
  2,
  'excluding the only snapshot row of a reservation does not bring its combo_items back');

select * from finish();
rollback;
