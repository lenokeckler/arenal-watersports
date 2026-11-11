begin;
select plan(4);
\ir fixtures/reservation_interval.sql.fixture

insert into interval_commitments
  (customer_name, starts_offset, duration_minutes, quantity, category_id, unit_code, status)
values
  ('Edited reservation', interval '0 minutes', 120, 1,
   (select quantity_category from interval_fixture), null, 'scheduled'),
  ('Other reservation', interval '30 minutes', 60, 1,
   (select quantity_category from interval_fixture), null, 'scheduled'),
  ('Edited unit reservation', interval '0 minutes', 120, null,
   null, 'RES15-FIRST', 'scheduled');
select pg_temp.persist_interval_commitments();

select results_eq(
  $$ select conflict.customer_name from interval_fixture fixture
     cross join lateral reservation_category_conflicts(
       quantity_category, starts_at, ends_at,
       (select id from reservations where customer_name = 'Edited reservation')
     ) as conflict $$,
  $$ values ('Other reservation') $$,
  'the excluded reservation is not a conflict with itself'
);

select is(
  (select count(*)::integer from interval_fixture fixture
   cross join lateral reservation_category_conflicts(
     unit_category, starts_at, ends_at,
     (select id from reservations where customer_name = 'Edited unit reservation'))),
  0,
  'an excluded unit commitment is not a conflict with itself'
);

select is(
  (select count(*)::integer from interval_fixture fixture
   cross join lateral reservation_category_conflicts(
     quantity_category, starts_at, ends_at)),
  2,
  'without an exclusion every overlapping reservation is a conflict'
);

select is(
  (select count(*)::integer from pg_proc
   where proname = 'reservation_category_conflicts'),
  1,
  'the exclusion replaces the function instead of overloading it'
);

select * from finish();
rollback;
