begin;
select plan(12);
\ir fixtures/split_reservation.sql.fixture

select ok(
  not has_function_privilege('anon', 'split_movable_items(uuid)', 'execute')
  and not has_function_privilege('anon', 'split_item_allocations(jsonb)', 'execute')
  and not has_function_privilege('anon', 'assert_split_departures_shape(jsonb)', 'execute')
  and not has_function_privilege('anon', 'assert_split_allocations_valid(uuid, jsonb)', 'execute')
  and not has_function_privilege('anon', 'assert_split_remainder(reservations, jsonb)', 'execute')
  and not has_function_privilege('anon', 'assert_reservation_splittable(reservations, timestamptz)', 'execute')
  and not has_function_privilege('anon', 'assert_split_departure_units_available(uuid, jsonb, tstzrange)', 'execute'),
  'anon cannot execute any split guard'
);

select ok(
  has_function_privilege('authenticated', 'split_movable_items(uuid)', 'execute')
  and has_function_privilege('authenticated', 'assert_split_departures_shape(jsonb)', 'execute')
  and has_function_privilege('authenticated', 'assert_split_departure_units_available(uuid, jsonb, tstzrange)', 'execute'),
  'authenticated can execute the split guards'
);

select ok(
  (select bool_and(not p.prosecdef) from pg_proc p
   where p.proname ~ '^(split_movable_items|split_item_allocations|assert_split_|assert_reservation_splittable)'),
  'every split guard runs as its caller'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-0000000000ff","role":"authenticated"}';

select is(
  (select count(*)::integer from split_movable_items('e2900000-0000-4000-8000-000000000301')),
  0,
  'a worker without reservation access reads no movable items'
);

set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select lives_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'),
       (select updated_at::text::timestamptz from reservations where id = 'e2900000-0000-4000-8000-000000000301')) $$,
  'the stale token survives a text round trip with microseconds'
);

select throws_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'),
       (select date_trunc('milliseconds', updated_at) from reservations where id = 'e2900000-0000-4000-8000-000000000301')) $$,
  'P0001', 'Reservation changed since the form was loaded',
  'a token truncated to milliseconds is stale'
);

select lives_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'),
       (select updated_at from reservations where id = 'e2900000-0000-4000-8000-000000000301')) $$,
  'a token read back from the row is fresh'
);

select throws_ok(
  $$ select assert_reservation_splittable(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'),
       (select updated_at + interval '1 microsecond' from reservations where id = 'e2900000-0000-4000-8000-000000000301')) $$,
  'P0001', 'Reservation changed since the form was loaded',
  'a token one microsecond apart is stale'
);

reset role;
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000307', 'RES19 Unit holder', 2, 'rental', '2035-04-12 17:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000307', 'e2900000-0000-4000-8000-000000000201',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select assert_split_departure_units_available('e2900000-0000-4000-8000-000000000301',
       '[{"item_id": "e2900000-0000-4000-8000-000000000401"}]'::jsonb, null::tstzrange) $$,
  'P0001', 'Equipment unit conflicts with another reservation',
  'an unbounded window conflicts with a holder'
);

select throws_ok(
  $$ select assert_split_departure_units_available('e2900000-0000-4000-8000-000000000301',
       '[{"item_id": "e2900000-0000-4000-8000-000000000401"}]'::jsonb,
       tstzrange('2035-04-12 16:59:00+00', '2035-04-12 17:01:00+00', '[)')) $$,
  'P0001', 'Equipment unit conflicts with another reservation',
  'a window that overlaps the holder by one minute conflicts'
);

select lives_ok(
  $$ select assert_split_departure_units_available('e2900000-0000-4000-8000-000000000301',
       '[{"item_id": "e2900000-0000-4000-8000-000000000401"}]'::jsonb,
       tstzrange('2035-04-12 16:00:00+00', '2035-04-12 17:00:00+00', '[)')) $$,
  'a window that ends when the holder starts does not conflict'
);

select lives_ok(
  $$ select assert_split_departure_units_available('e2900000-0000-4000-8000-000000000301',
       '[{"item_id": "e2900000-0000-4000-8000-000000000401"}]'::jsonb,
       tstzrange('2035-04-12 18:00:00+00', '2035-04-12 19:00:00+00', '[)')) $$,
  'a window after the holder does not conflict'
);

reset role;
select * from finish();
rollback;
