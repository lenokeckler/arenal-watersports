begin;
select plan(13);

\ir fixtures/update_reservation.sql.fixture

select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000301');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000302');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000303');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000304', '2035-04-12 18:00:00+00');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000305', '2035-04-12 18:00:00+00');

insert into reservation_items (id, reservation_id, category_id, quantity, unit_id, created_by, updated_by)
select item.id::uuid, item.reservation_id::uuid, item.category_id::uuid, item.quantity, item.unit_id::uuid,
       'e3180000-0000-4000-8000-000000000001', 'e3180000-0000-4000-8000-000000000001'
from (values
  ('e3180000-0000-4000-8000-000000000501', 'e3180000-0000-4000-8000-000000000301', 'e3180000-0000-4000-8000-000000000101', 2, null),
  ('e3180000-0000-4000-8000-000000000502', 'e3180000-0000-4000-8000-000000000302', 'e3180000-0000-4000-8000-000000000101', 2, null),
  ('e3180000-0000-4000-8000-000000000503', 'e3180000-0000-4000-8000-000000000303', 'e3180000-0000-4000-8000-000000000101', 2, null),
  ('e3180000-0000-4000-8000-000000000504', 'e3180000-0000-4000-8000-000000000304', null, null, 'e3180000-0000-4000-8000-000000000201'),
  ('e3180000-0000-4000-8000-000000000505', 'e3180000-0000-4000-8000-000000000305', null, null, 'e3180000-0000-4000-8000-000000000202')
) as item(id, reservation_id, category_id, quantity, unit_id);

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3180000-0000-4000-8000-000000000002","role":"authenticated"}';

select is(
  update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301')),
  'e3180000-0000-4000-8000-000000000301'::uuid, 'an empty save returns the reservation id'
);

select is(
  (select updated_by from reservations where id = 'e3180000-0000-4000-8000-000000000301'),
  'e3180000-0000-4000-8000-000000000001'::uuid, 'an empty save keeps the last editor'
);

select is(
  (select updated_at from reservations where id = 'e3180000-0000-4000-8000-000000000301'),
  '2030-01-01 12:00:00.123456+00'::timestamptz, 'an empty save keeps the update time'
);

select lives_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000302', '{"people_count":6}')) $$,
  'a second worker changes the people count'
);

select is(
  (select updated_by from reservations where id = 'e3180000-0000-4000-8000-000000000302'),
  'e3180000-0000-4000-8000-000000000002'::uuid, 'the change is recorded under the worker who made it'
);

select is(
  (select created_by from reservations where id = 'e3180000-0000-4000-8000-000000000302'),
  'e3180000-0000-4000-8000-000000000001'::uuid, 'the creator is kept'
);

select is(
  (select updated_at from reservations where id = 'e3180000-0000-4000-8000-000000000302'),
  now(), 'the update time moves'
);

select lives_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000303', '{"quantity":3}')) $$,
  'an equipment-only change is accepted'
);

select is(
  (select updated_by from reservations where id = 'e3180000-0000-4000-8000-000000000303'),
  'e3180000-0000-4000-8000-000000000002'::uuid, 'an equipment-only change records the editor on the reservation'
);

select is(
  (select updated_at from reservations where id = 'e3180000-0000-4000-8000-000000000303'),
  now(), 'an equipment-only change moves the reservation update time'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000305', '{"unit_id":"e3180000-0000-4000-8000-000000000201","people_count":6}')) $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'a unit conflict refuses the whole change'
);

select is(
  (select unit_id from reservation_items where id = 'e3180000-0000-4000-8000-000000000505'),
  'e3180000-0000-4000-8000-000000000202'::uuid, 'the conflict leaves the item untouched'
);

select is(
  (select people_count from reservations where id = 'e3180000-0000-4000-8000-000000000305'),
  2, 'the conflict leaves the reservation untouched'
);

reset role;
select * from finish();
rollback;
