begin;
select plan(13);

\ir fixtures/postponement_release.sql.fixture

update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000601' where id in ('e3300000-0000-4000-8000-000000000501', 'e3300000-0000-4000-8000-000000000504');
update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000603' where id = 'e3300000-0000-4000-8000-000000000503';

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '"3"', '12'), pg_temp.reading(503, '1', '9'), pg_temp.reading(504, '1', '21'))) $$,
  'P0001', 'Postponement fuel reading is invalid',
  'a fuel reading sent as a string is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '"12"'), pg_temp.reading(503, '1', '9'), pg_temp.reading(504, '1', '21'))) $$,
  'P0001', 'Postponement usage reading is invalid',
  'a usage reading sent as a string is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '12'), pg_temp.reading(503, '1', '8'), pg_temp.reading(504, '1', '21'))) $$,
  'P0001', 'Postponement usage reading cannot go below the dispatch reading',
  'usage cannot go below the unit total even when it is above the dispatch reading'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '12'), pg_temp.reading(503, '1', '9'), pg_temp.reading(504, '1', '19'))) $$,
  'P0001', 'Postponement usage reading cannot go below the dispatch reading',
  'the second unit of a group is validated too'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '10000000000', '12'), pg_temp.reading(503, '1', '9'), pg_temp.reading(504, '1', '21'))) $$,
  'P0001', 'Postponement fuel reading is invalid',
  'a fuel reading beyond integer range is refused with the fuel message'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '10000000000000'), pg_temp.reading(503, '1', '9'), pg_temp.reading(504, '1', '21'))) $$,
  'P0001', 'Postponement usage reading is invalid',
  'a usage reading beyond the column precision is refused with the usage message'
);

select throws_ok(
  $$ select pg_temp.record('{"item_id":"e3300000-0000-4000-8000-000000000501"}'::jsonb) $$,
  'P0001', 'Postponement readings are incomplete',
  'a payload that is not an array is incomplete'
);

select throws_ok(
  $$ select pg_temp.record('null'::jsonb) $$,
  'P0001', 'Postponement readings are incomplete',
  'a null payload is incomplete'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '12'), pg_temp.reading(501, '2', '12'), pg_temp.reading(503, '1', '9'), pg_temp.reading(504, '1', '21'))) $$,
  'P0001', 'Postponement readings do not match the reservation',
  'a duplicated item is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '12'), pg_temp.reading(503, '1', '9'), pg_temp.reading(504, '1', '21'), pg_temp.reading(999, '1', '1'))) $$,
  'P0001', 'Postponement readings do not match the reservation',
  'an item that is not on the reservation is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '12'), pg_temp.reading(503, '1', '9'), pg_temp.reading(504, '1', '21'), pg_temp.reading(502))) $$,
  'P0001', 'Postponement readings do not match the reservation',
  'an item that was never dispatched is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '12'), pg_temp.reading(503, '1', '9'), pg_temp.reading(504, '1', '21')), 'e3300000-0000-4000-8000-000000000402') $$,
  'P0001', 'Postponement does not belong to the reservation',
  'the postponement of another reservation is refused'
);

select is(
  (select count(*) from reservation_postponement_readings),
  0::bigint,
  'refused calls store nothing'
);

reset role;

select * from finish();
rollback;
