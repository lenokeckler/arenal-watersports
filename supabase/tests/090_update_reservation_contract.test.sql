begin;
select plan(21);

\ir fixtures/update_reservation.sql.fixture

select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000301');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000302', p_status => 'dispatched');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000303', p_status => 'closed');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000304', p_status => 'cancelled');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000305', '2035-04-13 05:30:00+00');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by)
select reservation.id, 'e3180000-0000-4000-8000-000000000101', 2, reservation.created_by, reservation.created_by
from reservations as reservation
where reservation.customer_name = 'RES18 Customer';

set local request.jwt.claims to '{"role":"anon"}';
set local role anon;

select throws_ok(
  $$ select update_reservation('{}'::jsonb) $$,
  '42501', null, 'anonymous users cannot execute the update'
);

reset role;
set local request.jwt.claims to '{"sub":"e3180000-0000-4000-8000-000000000003","role":"authenticated"}';
set local role authenticated;

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301')) $$,
  'P0001', 'Reservations access is required', 'Operations-only workers cannot update a reservation'
);

reset role;
set local request.jwt.claims to '{"sub":"e3180000-0000-4000-8000-000000000002","role":"authenticated"}';
set local role authenticated;

select throws_ok(
  $$ select update_reservation('[]'::jsonb) $$,
  'P0001', 'Reservation payload must be an object', 'a payload that is not an object is refused'
);

select throws_ok(
  $$ select update_reservation('{"reservation_id":"e3180000-0000-4000-8000-000000000399"}'::jsonb) $$,
  'P0001', 'Reservation was not found', 'an unknown reservation is refused'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000302')) $$,
  'P0001', 'Only scheduled reservations can be modified', 'a dispatched reservation is refused'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000303')) $$,
  'P0001', 'Only scheduled reservations can be modified', 'a closed reservation is refused'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000304')) $$,
  'P0001', 'Only scheduled reservations can be modified', 'a cancelled reservation is refused'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301', '{"expected_updated_at":"2030-01-01T12:00:00.123457+00:00"}')) $$,
  'P0001', 'Reservation changed since the form was loaded', 'a token one microsecond off is stale'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301') - 'expected_updated_at') $$,
  'P0001', 'Reservation changed since the form was loaded', 'a missing token is stale'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301', '{"people_count":0}')) $$,
  'P0001', 'People count must be positive', 'zero people is refused'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301', '{"duration_minutes":0}')) $$,
  'P0001', 'Duration must be positive', 'a zero duration is refused'
);

select throws_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301', '{"time":null}')) $$,
  'P0001', 'A valid reservation date and time are required', 'a missing time is refused'
);

select is(
  update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301', '{"people_count":5,"time":"11:15","duration_minutes":90}')),
  'e3180000-0000-4000-8000-000000000301'::uuid, 'the update returns the reservation id'
);

select is(
  (select people_count from reservations where id = 'e3180000-0000-4000-8000-000000000301'),
  5, 'the people count is applied'
);

select is(
  (select duration_minutes from reservations where id = 'e3180000-0000-4000-8000-000000000301'),
  90, 'the duration is applied'
);

select is(
  (select starts_at from reservations where id = 'e3180000-0000-4000-8000-000000000301'),
  '2035-04-12 17:15:00+00'::timestamptz, 'the time is applied in Costa Rica time'
);

select is(
  (select ends_at from reservations where id = 'e3180000-0000-4000-8000-000000000301'),
  '2035-04-12 18:45:00+00'::timestamptz, 'the end moves with the time and the duration'
);

select lives_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000305', '{"time":"23:45"}')) $$,
  'a late Costa Rica reservation changes its time'
);

select is(
  (select starts_at from reservations where id = 'e3180000-0000-4000-8000-000000000305'),
  '2035-04-13 05:45:00+00'::timestamptz, 'the Costa Rica date is kept when UTC is already the next day'
);

select lives_ok(
  $$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000305', '{"time":"08:00"}')) $$,
  'a later reservation moves to the morning'
);

select is(
  (select starts_at from reservations where id = 'e3180000-0000-4000-8000-000000000305'),
  '2035-04-12 14:00:00+00'::timestamptz, 'a time change does not move the date'
);

reset role;
select * from finish();
rollback;
