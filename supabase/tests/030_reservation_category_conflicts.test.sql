begin;
select plan(10);
\ir fixtures/reservation_interval.sql.fixture

insert into interval_commitments
  (customer_name, starts_offset, duration_minutes, quantity, category_id, unit_code, status)
values
  ('Category overlap', interval '-30 minutes', 120, 1,
   (select quantity_category from interval_fixture), null, 'scheduled'),
  ('Dispatched category overlap', interval '-15 minutes', 90, 1,
   (select quantity_category from interval_fixture), null, 'dispatched'),
  ('Category ends at query start', interval '-1 hour', 60, 1,
   (select quantity_category from interval_fixture), null, 'scheduled'),
  ('Category starts at query end', interval '2 hours', 60, 1,
   (select quantity_category from interval_fixture), null, 'scheduled'),
  ('Cancelled category overlap', interval '0 minutes', 120, 1,
   (select quantity_category from interval_fixture), null, 'cancelled'),
  ('Closed category overlap', interval '0 minutes', 120, 1,
   (select quantity_category from interval_fixture), null, 'closed'),
  ('Unit category overlap', interval '15 minutes', 90, null,
   null, 'RES15-FIRST', 'scheduled');
select pg_temp.persist_interval_commitments();

select results_eq(
  $$ select customer_name from interval_fixture fixture
     cross join lateral reservation_category_conflicts(
       quantity_category, starts_at, ends_at) $$,
  $$ select customer_name from interval_commitments
     where customer_name in ('Category overlap', 'Dispatched category overlap')
     order by starts_offset $$,
  'category commitments include scheduled and dispatched reservations only when intervals overlap'
);

select results_eq(
  $$ select customer_name from interval_fixture fixture
     cross join lateral reservation_category_conflicts(
       unit_category, starts_at, ends_at) $$,
  $$ select customer_name from interval_commitments
     where customer_name = 'Unit category overlap' $$,
  'unit commitments match the selected category through equipment units'
);

select is(
  (select count(*)::integer from interval_fixture fixture
   cross join lateral reservation_category_conflicts(
     quantity_category, starts_at, ends_at)),
  2,
  'cancelled, closed, and boundary-touching reservations are excluded'
);

select results_eq(
  $$ select conflict.customer_name from interval_fixture fixture
     cross join lateral reservation_category_conflicts(
       quantity_category, starts_at, ends_at) as conflict $$,
  $$ select reservation.customer_name from reservations as reservation
     where reservation.customer_name in
       ('Category overlap', 'Dispatched category overlap')
     order by reservation.starts_at, reservation.id $$,
  'conflicts have deterministic start-time and reservation-id ordering'
);

select ok(not (select prosecdef from pg_proc
  where oid = 'reservation_category_conflicts(uuid,timestamptz,timestamptz)'::regprocedure),
  'the conflict function runs with caller row-level security');
select ok(has_function_privilege('authenticated',
  'reservation_category_conflicts(uuid,timestamptz,timestamptz)', 'EXECUTE'),
  'authenticated callers can execute the conflict function');
select ok(not has_function_privilege('anon',
  'reservation_category_conflicts(uuid,timestamptz,timestamptz)', 'EXECUTE'),
  'anonymous callers cannot execute the conflict function');

select set_config('request.jwt.claims',
  json_build_object('sub', worker_id, 'role', 'authenticated')::text, true)
from interval_fixture;
set local role authenticated;
select is(
  (select count(*)::integer from interval_fixture fixture
   cross join lateral reservation_category_conflicts(
     quantity_category, starts_at, ends_at)),
  2,
  'Reservations workers can see matching conflicts'
);
reset role;

delete from worker_areas where worker_id = (select worker_id from interval_fixture);
set local role authenticated;
select is(
  (select count(*)::integer from interval_fixture fixture
   cross join lateral reservation_category_conflicts(
     quantity_category, starts_at, ends_at)),
  0,
  'workers without an authorized area cannot infer reservation conflicts'
);
reset role;

set local request.jwt.claims to '{"role":"anon"}';
set local role anon;
select throws_ok(
  $$ select * from reservation_category_conflicts(
       'e2800000-0000-4000-8000-000000000101',
       '2035-04-12 10:00:00+00', '2035-04-12 12:00:00+00') $$,
  '42501', null,
  'anonymous callers cannot retrieve customer or reservation details'
);
reset role;

select * from finish();
rollback;
