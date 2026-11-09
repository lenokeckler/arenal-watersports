begin;
select plan(16);

\ir fixtures/postponement_release.sql.fixture

update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000601' where id = 'e3300000-0000-4000-8000-000000000501';
update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000602' where id = 'e3300000-0000-4000-8000-000000000502';
update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000603', fuel_in = 2, usage_in = 9 where id = 'e3300000-0000-4000-8000-000000000503';
update reservation_dispatches set closed_at = '2035-04-12 15:30:00+00' where id = 'e3300000-0000-4000-8000-000000000603';
update reservations set status = 'scheduled', dispatched_at = null where id = 'e3300000-0000-4000-8000-000000000301';

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select pg_temp.record('[]'::jsonb) $$,
  'P0001', 'Postponement readings are incomplete',
  'an empty payload is incomplete'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '12'))) $$,
  'P0001', 'Postponement readings are incomplete',
  'an open item without an entry is incomplete'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '5', '12'), pg_temp.reading(502))) $$,
  'P0001', 'Postponement fuel reading is invalid',
  'a fuel reading above the unit maximum is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '-1', '12'), pg_temp.reading(502))) $$,
  'P0001', 'Postponement fuel reading is invalid',
  'a negative fuel reading is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '1.5', '12'), pg_temp.reading(502))) $$,
  'P0001', 'Postponement fuel reading is invalid',
  'a fractional fuel reading is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '9'), pg_temp.reading(502))) $$,
  'P0001', 'Postponement usage reading cannot go below the dispatch reading',
  'a usage reading below the dispatch reading is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, null, '12'), pg_temp.reading(502))) $$,
  'P0001', 'Postponement fuel reading is invalid',
  'a missing fuel reading is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2'), pg_temp.reading(502))) $$,
  'P0001', 'Postponement usage reading is invalid',
  'a missing usage reading is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '12'), pg_temp.reading(502, '1'))) $$,
  'P0001', 'Postponement fuel reading is invalid',
  'a fuel reading on a category without fuel is refused'
);

select throws_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '12'), pg_temp.reading(502, null, '1'))) $$,
  'P0001', 'Postponement usage reading is invalid',
  'a usage reading on a category without a meter is refused'
);

select is(
  (select count(*) from reservation_postponement_readings),
  0::bigint,
  'refused calls leave no readings behind'
);

select lives_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '0', '12.5'), pg_temp.reading(502))) $$,
  'an empty tank is a valid reading'
);

select is(
  (select count(*) from reservation_postponement_readings),
  3::bigint,
  'one reading is stored for each dispatched unit'
);

select is(
  (select concat_ws('/', fuel_out, fuel_in, usage_out, usage_in)
     from reservation_postponement_readings where unit_id = 'e3300000-0000-4000-8000-000000000201'),
  '4/0/10.00/12.50',
  'the open item stores its dispatch and return readings'
);

select is(
  (select concat_ws('/', fuel_out, fuel_in, usage_out, usage_in)
     from reservation_postponement_readings where unit_id = 'e3300000-0000-4000-8000-000000000203'),
  '4/2/5.00/9.00',
  'the item of a closed group is copied as stored'
);

select is(
  (select string_agg(concat_ws('/', fuel_level, usage_total), ' ' order by id) from equipment_units where id in ('e3300000-0000-4000-8000-000000000201', 'e3300000-0000-4000-8000-000000000203')),
  '0/12.50 3/9.00',
  'the open unit receives the return reading and the closed one is untouched'
);

reset role;

select * from finish();
rollback;
