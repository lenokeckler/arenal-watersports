begin;
select plan(7);
\ir fixtures/reservation_interval.sql.fixture

insert into interval_commitments
  (customer_name, starts_offset, duration_minutes, quantity)
values
  ('Sequential first', interval '0 hours', 60, 1),
  ('Sequential second', interval '1 hour', 60, 1),
  ('Partial first', interval '1 day', 60, 2),
  ('Partial second', interval '1 day 30 minutes', 60, 1),
  ('Partial last', interval '1 day 90 minutes', 30, 1);
select pg_temp.persist_interval_commitments();

select results_eq(
  $$ select usable, committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category, starts_at, ends_at) $$,
  $$ select physical_capacity, single_commitment, single_commitment from interval_fixture $$,
  'consecutive quantity reservations consume one simultaneous slot');

select results_eq(
  $$ select usable, committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '1 day', ends_at + interval '1 day') $$,
  $$ select physical_capacity, mixed_peak, overbooked_free from interval_fixture $$,
  'partially overlapping quantities use their largest simultaneous load');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '2 days', ends_at + interval '2 days') $$,
  $$ select empty_capacity, physical_capacity from interval_fixture $$,
  'commitments outside the requested day leave physical stock free');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '1 day', ends_at + interval '1 day',
       (select id from reservations where customer_name = 'Partial first')) $$,
  $$ select single_commitment, single_commitment from interval_fixture $$,
  'excluding a reservation removes its quantity before calculating the peak');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '1 day 1 hour', starts_at + interval '1 day 90 minutes') $$,
  $$ select single_commitment, single_commitment from interval_fixture $$,
  'a reservation ending at the query start does not consume quantity');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at + interval '1 day 45 minutes', starts_at + interval '1 day 75 minutes') $$,
  $$ select mixed_peak, overbooked_free from interval_fixture $$,
  'clipping a query inside commitments preserves their simultaneous peak');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(quantity_category,
       starts_at, starts_at + interval '1 hour',
       (select id from reservations where customer_name = 'Sequential first')) $$,
  $$ select empty_capacity, physical_capacity from interval_fixture $$,
  'excluding the only intersecting reservation restores all stock');

select * from finish();
rollback;
