begin;
select plan(13);

\ir fixtures/postponement_release.sql.fixture
\ir fixtures/postpone_call.sql.fixture

update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000601' where id in ('e3300000-0000-4000-8000-000000000501', 'e3300000-0000-4000-8000-000000000504');
update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000603' where id = 'e3300000-0000-4000-8000-000000000503';

update reservation_dispatches set dispatched_at = '2026-01-10 15:00:00+00' where reservation_id = 'e3300000-0000-4000-8000-000000000301';

create function pg_temp.good_readings() returns jsonb language sql as $$
  select jsonb_build_array(
    jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000501', 'fuel_in', 2, 'usage_in', 12),
    jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000503', 'fuel_in', 0, 'usage_in', 9),
    jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000504', 'fuel_in', 4, 'usage_in', 20))
$$;

create function pg_temp.state() returns text language sql as $$
  select (select status::text from reservations where id = 'e3300000-0000-4000-8000-000000000301')
    || ' ' || pg_temp.cr_start('e3300000-0000-4000-8000-000000000301')
    || ' ' || (select count(*) from reservation_dispatches where reservation_id = 'e3300000-0000-4000-8000-000000000301' and closed_at is null)
    || ' ' || (select count(*) from reservation_items where dispatch_id is not null)
    || ' ' || (select count(*) from reservation_postponement_readings)
    || ' ' || (select count(*) from reservation_postponements where reservation_id = 'e3300000-0000-4000-8000-000000000301')
$$;

create temp table baseline_postponements as select id from reservation_postponements;
grant select on baseline_postponements to authenticated;

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select is(pg_temp.state(), 'dispatched 2035-04-12 09:00:00 3 3 0 1', 'the reservation starts dispatched with open groups');

select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000301', '2035-04-13', '10:00', 'other', 'Cliente enfermo', pg_temp.good_readings()) $$,
  'P0001', 'Dispatched reservations can only be postponed for weather', 'a dispatched reservation cannot be postponed for another cause'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000301', '2035-04-13', '10:00', 'storm', null,
       jsonb_build_array(jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000501', 'fuel_in', 9, 'usage_in', 12))) $$,
  'P0001', 'Postponement fuel reading is invalid', 'a bad reading refuses the postponement'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000301', '2035-04-13', '10:00', 'storm') $$,
  'P0001', 'Postponement readings are incomplete', 'missing readings refuse the postponement'
);
select is(pg_temp.state(), 'dispatched 2035-04-12 09:00:00 3 3 0 1', 'refusals roll back date, groups, items, readings and trace');

select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000301', '2035-04-13', '10:00', 'storm', null, pg_temp.good_readings()) $$,
  'a dispatched reservation is postponed for a storm with its readings'
);
select is(pg_temp.state(), 'scheduled 2035-04-13 10:00:00 0 0 3 2', 'it is scheduled again on the new date with its groups closed and readings stored');
select ok(
  (select dispatched_at is null and closed_at is null from reservations where id = 'e3300000-0000-4000-8000-000000000301'),
  'dispatched_at and closed_at are empty'
);
select is(
  (select count(*) from reservation_dispatches where reservation_id = 'e3300000-0000-4000-8000-000000000301' and closed_at is not null),
  3::bigint,
  'every group of the trip is closed'
);
select is(
  (select string_agg(concat_ws('/', fuel_level, usage_total), ' ' order by id) from equipment_units where id in ('e3300000-0000-4000-8000-000000000201', 'e3300000-0000-4000-8000-000000000203', 'e3300000-0000-4000-8000-000000000204')),
  '2/12.00 0/9.00 4/20.00',
  'the units carry the fuel and usage of the return'
);
select is(
  (select string_agg(concat_ws('/', fuel_out, fuel_in, usage_out, usage_in), ' ' order by unit_id) from reservation_postponement_readings),
  '4/2/10.00/12.00 4/0/5.00/9.00 4/4/18.00/20.00',
  'the readings keep what went out and what came back'
);
select is(
  (select concat_ws('/', cause, coalesce(reason, '-'), was_dispatched, previous_starts_at, new_starts_at, created_by)
     from reservation_postponements where reservation_id = 'e3300000-0000-4000-8000-000000000301' and id not in (select id from baseline_postponements)),
  'storm/-/t/2035-04-12 15:00:00+00/2035-04-13 16:00:00+00/e3300000-0000-4000-8000-000000000002',
  'the trace records the dispatched weather postponement'
);

reset role;

insert into reservation_dispatches
  (reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000301', 'e3300000-0000-4000-8000-000000000101',
        '2035-04-13 16:05:00+00', 60, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

select is(
  (select status::text || ' ' || dispatched_at::text from reservations where id = 'e3300000-0000-4000-8000-000000000301'),
  'dispatched 2035-04-13 16:05:00+00',
  'a later dispatch works and stamps a fresh dispatched_at'
);

select * from finish();
rollback;
