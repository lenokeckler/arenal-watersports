begin;
select plan(14);
\ir fixtures/split_reservation.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000009999'), now()) $$,
  'P0001', 'Reservation was not found',
  'an unknown reservation cannot be split'
);

select throws_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000303'),
       (select updated_at from reservations where id = 'e2900000-0000-4000-8000-000000000303')) $$,
  'P0001', 'Only scheduled reservations can be split',
  'a dispatched reservation cannot be split'
);

select throws_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000304'),
       (select updated_at from reservations where id = 'e2900000-0000-4000-8000-000000000304')) $$,
  'P0001', 'Only scheduled reservations can be split',
  'a closed reservation cannot be split'
);

select throws_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000305'),
       (select updated_at from reservations where id = 'e2900000-0000-4000-8000-000000000305')) $$,
  'P0001', 'Only scheduled reservations can be split',
  'a cancelled reservation cannot be split'
);

select throws_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000303'), '2000-01-01 00:00:00+00') $$,
  'P0001', 'Only scheduled reservations can be split',
  'the status is checked before the token'
);

select throws_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'), '2000-01-01 00:00:00+00') $$,
  'P0001', 'Reservation changed since the form was loaded',
  'a stale token is refused'
);

select throws_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'), null) $$,
  'P0001', 'Reservation changed since the form was loaded',
  'a missing token is stale'
);

select lives_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000302'),
       (select updated_at from reservations where id = 'e2900000-0000-4000-8000-000000000302')) $$,
  'a departure can be split again'
);

select throws_ok(
  $$ select assert_split_departures_shape('[]'::jsonb) $$,
  'P0001', 'A split needs at least one new departure',
  'an empty departure list is refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('{"people_count": 1}'::jsonb) $$,
  'P0001', 'A split needs at least one new departure',
  'departures that are not an array are refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('[{"people_count": 0, "items": [{"quantity": 1}]}]'::jsonb) $$,
  'P0001', 'Every departure needs at least one person',
  'a departure with zero people is refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('[{"items": [{"quantity": 1}]}]'::jsonb) $$,
  'P0001', 'Every departure needs at least one person',
  'a departure without people is refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('[{"people_count": 1, "items": []}]'::jsonb) $$,
  'P0001', 'Every departure needs equipment',
  'a departure without equipment is refused'
);

select lives_ok(
  $$ select assert_split_departures_shape('[{"people_count": 1, "items": [{"quantity": 1}]}]'::jsonb) $$,
  'a well formed departure list passes the shape guard'
);

reset role;
select * from finish();
rollback;
