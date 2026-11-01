begin;
select plan(9);

\ir fixtures/update_reservation.sql.fixture

select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000301');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000302', '2035-04-12 18:00:00+00');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000303', '2035-04-12 18:00:00+00');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000304', '2035-04-13 15:00:00+00');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000305', '2035-04-14 15:00:00+00');

insert into reservation_items (reservation_id, category_id, quantity, unit_id, created_by, updated_by)
select item.reservation_id::uuid, item.category_id::uuid, item.quantity, item.unit_id::uuid,
       'e3180000-0000-4000-8000-000000000001', 'e3180000-0000-4000-8000-000000000001'
from (values
  ('e3180000-0000-4000-8000-000000000301', null, null, 'e3180000-0000-4000-8000-000000000201'),
  ('e3180000-0000-4000-8000-000000000302', null, null, 'e3180000-0000-4000-8000-000000000201'),
  ('e3180000-0000-4000-8000-000000000303', null, null, 'e3180000-0000-4000-8000-000000000202'),
  ('e3180000-0000-4000-8000-000000000304', null, null, 'e3180000-0000-4000-8000-000000000203'),
  ('e3180000-0000-4000-8000-000000000305', 'e3180000-0000-4000-8000-000000000101', 2, null)
) as item(reservation_id, category_id, quantity, unit_id);

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3180000-0000-4000-8000-000000000002","role":"authenticated"}';

select lives_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301', '{"time":"09:30"}')) $$,
  'a window overlapping its own old window passes'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301', '{"time":"12:30"}')) $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'a window moved onto another reservation of the unit conflicts'
);

select lives_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301', '{"time":"11:00"}')) $$,
  'a window ending as the next reservation starts passes'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000303', '{"unit_id":"e3180000-0000-4000-8000-000000000201"}')) $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'a change to a unit committed elsewhere conflicts'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000304', '{"time":"10:00"}')) $$,
  'P0001', 'Equipment unit is not available for reservation', 'a unit in maintenance refuses a window change'
);

select lives_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000305', '{"quantity":50}')) $$,
  'a quantity above the stock does not block the change'
);

select lives_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000305', '{"time":"10:00"}')) $$,
  'a window change with no unit checks no unit'
);

select is(
  (select starts_at from reservations where id = 'e3180000-0000-4000-8000-000000000305'),
  '2035-04-14 16:00:00+00'::timestamptz, 'the quantity commitment takes the new window'
);

select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES18 New', 'people_count', 2, 'date', '2035-04-12', 'time', '12:00', 'duration_minutes', 60, 'unit_id', 'e3180000-0000-4000-8000-000000000201')) $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'creating a reservation still conflicts'
);

reset role;
select * from finish();
rollback;
