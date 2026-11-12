begin;
select plan(11);

\ir fixtures/postponement_release.sql.fixture

update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000601' where id in ('e3300000-0000-4000-8000-000000000501', 'e3300000-0000-4000-8000-000000000504');
update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000603' where id = 'e3300000-0000-4000-8000-000000000503';

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000303', 'RES20 Closed', 2, 'rental', '2035-04-12 19:00:00+00', 60, 'closed', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select lives_ok(
  $$ select pg_temp.record(jsonb_build_array(pg_temp.reading(501, '2', '12'), pg_temp.reading(503, '0', '9'), pg_temp.reading(504, '4.0', '20'))) $$,
  'boundary readings are accepted for every unit of the dispatch'
);

select is(
  (select string_agg(concat_ws('/', fuel_in, usage_in), ' ' order by unit_id) from reservation_postponement_readings),
  '2/12.00 0/9.00 4/20.00',
  'every unit is recorded with its own reading'
);

select is(
  (select string_agg(concat_ws('/', fuel_level, usage_total), ' ' order by id) from equipment_units where id in ('e3300000-0000-4000-8000-000000000201', 'e3300000-0000-4000-8000-000000000203', 'e3300000-0000-4000-8000-000000000204')),
  '2/12.00 0/9.00 4/20.00',
  'each unit receives its return reading'
);

select is(
  (select status::text from reservations where id = 'e3300000-0000-4000-8000-000000000301'),
  'dispatched',
  'recording readings alone does not change the reservation status'
);

select throws_ok(
  $$ select pg_temp.release('e3300000-0000-4000-8000-000000000301', jsonb_build_array(pg_temp.reading(501, '2', '12'), pg_temp.reading(503, '0', '9'), pg_temp.reading(504, '4.0', '20'))) $$,
  'P0001', 'Only scheduled reservations can be released',
  'a dispatched reservation cannot be released'
);

select is(
  (select (select count(*) from reservation_dispatches where closed_at is null)
       || '/' || (select count(*) from reservation_items where dispatch_id is not null)
       || '/' || (select count(*) from reservation_postponement_readings)),
  '3/3/3',
  'a refused release changes nothing'
);

select throws_ok(
  $$ select pg_temp.release('e3300000-0000-4000-8000-000000000303', '[]', 'e3300000-0000-4000-8000-000000000402') $$,
  'P0001', 'Only scheduled reservations can be released',
  'a closed reservation cannot be released'
);

select is(
  (select status::text from reservations where id = 'e3300000-0000-4000-8000-000000000303'),
  'closed',
  'a closed reservation stays closed'
);

select lives_ok(
  $$ select pg_temp.release('e3300000-0000-4000-8000-000000000302', '[]', 'e3300000-0000-4000-8000-000000000402') $$,
  'releasing a scheduled reservation without dispatch groups is a no-op'
);

select is(
  (select status::text from reservations where id = 'e3300000-0000-4000-8000-000000000301'),
  'dispatched',
  'the release helper does not touch another reservation'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000003","role":"authenticated"}';

select throws_ok(
  $$ select pg_temp.release('e3300000-0000-4000-8000-000000000302', '[]', 'e3300000-0000-4000-8000-000000000402') $$,
  'P0001', 'Reservations access is required',
  'an operator without the reservations area cannot release a reservation'
);

reset role;

select * from finish();
rollback;
