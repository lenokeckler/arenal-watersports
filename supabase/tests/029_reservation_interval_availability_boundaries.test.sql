begin;
select plan(13);
\ir fixtures/reservation_interval.sql.fixture

insert into interval_commitments
  (customer_name, starts_offset, duration_minutes, quantity, status)
values
  ('Ends at query start', interval '-1 hour', 60, 2, 'scheduled'),
  ('Starts at query end', interval '2 hours', 60, 2, 'scheduled'),
  ('Cancelled quantity', interval '2 days', 120, 2, 'cancelled'),
  ('Closed quantity', interval '3 days', 120, 2, 'closed'),
  ('Same-time ending', interval '1 day', 60, 2, 'scheduled'),
  ('Same-time starting first', interval '1 day 1 hour', 60, 1, 'scheduled'),
  ('Same-time starting second', interval '1 day 1 hour', 60, 1, 'scheduled');
select pg_temp.persist_interval_commitments();

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category, starts_at, ends_at) $$,
  $$ select empty_capacity, physical_capacity from interval_fixture $$,
  'reservations touching either query boundary do not consume the requested interval');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '2 days', ends_at + interval '2 days') $$,
  $$ select empty_capacity, physical_capacity from interval_fixture $$,
  'cancelled reservations do not consume their former interval');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '3 days', ends_at + interval '3 days') $$,
  $$ select empty_capacity, physical_capacity from interval_fixture $$,
  'closed reservations do not consume their former interval');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '1 day', ends_at + interval '1 day') $$,
  $$ select physical_capacity, empty_capacity from interval_fixture $$,
  'simultaneous starts and ends do not create a transient capacity spike');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '1 day 1 hour', ends_at + interval '1 day') $$,
  $$ select physical_capacity, empty_capacity from interval_fixture $$,
  'querying at a shared boundary includes both new commitments and excludes the ending one');

select results_eq(
  $$ select usable, committed, free from interval_fixture fixture
     cross join lateral category_availability(missing_stock_category, starts_at, ends_at) $$,
  $$ select empty_capacity, empty_capacity, empty_capacity from interval_fixture $$,
  'a category without a stock row returns one zero-capacity result');

select results_eq(
  $$ select usable, committed, free from interval_fixture fixture
     cross join lateral category_availability(empty_stock_category, starts_at, ends_at) $$,
  $$ select empty_capacity, empty_capacity, empty_capacity from interval_fixture $$,
  'damaged and repair stock does not create usable quantity');

select ok(not (select prosecdef from pg_proc
  where oid = 'category_availability(uuid,timestamptz,timestamptz,uuid)'::regprocedure),
  'category availability executes with caller row-level security');
select ok(has_function_privilege('authenticated',
  'category_availability(uuid,timestamptz,timestamptz,uuid)', 'EXECUTE'),
  'authenticated callers retain access to the category availability contract');

select set_config('request.jwt.claims',
  json_build_object('sub', worker_id, 'role', 'authenticated')::text, true)
from interval_fixture;
set local role authenticated;
select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '1 day', ends_at + interval '1 day') $$,
  $$ select physical_capacity, empty_capacity from interval_fixture $$,
  'a Reservations worker can calculate the peak through the public function');
reset role;

delete from worker_areas where worker_id = (select worker_id from interval_fixture);
set local role authenticated;
select results_eq(
  $$ select committed from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '1 day', ends_at + interval '1 day') $$,
  $$ select empty_capacity from interval_fixture $$,
  'a worker without an area cannot infer hidden reservation commitments');
reset role;

set local request.jwt.claims to '{"role":"anon"}';
set local role anon;
select results_eq(
  $$ select usable, committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '1 day', ends_at + interval '1 day') $$,
  $$ select empty_capacity, empty_capacity, empty_capacity from interval_fixture $$,
  'anonymous callers cannot read inventory or reservation commitments');
reset role;

update equipment_units set status = 'damaged'
where category_id = (select unit_category from interval_fixture);
select results_eq(
  $$ select usable, committed, free from interval_fixture fixture
     cross join lateral category_availability(unit_category, starts_at, ends_at) $$,
  $$ select empty_capacity, empty_capacity, empty_capacity from interval_fixture $$,
  'a category with no physically usable units returns zero capacity');

select * from finish();
rollback;
