begin;
select plan(9);
\ir fixtures/reservation_interval.sql.fixture

insert into interval_commitments
  (customer_name, starts_offset, duration_minutes, unit_code, status)
values
  ('Unit first', interval '0 hours', 60, 'RES15-FIRST', 'scheduled'),
  ('Unit second', interval '1 hour', 60, 'RES15-SECOND', 'scheduled'),
  ('Dispatch moved', interval '1 day', 60, 'RES15-FIRST', 'dispatched'),
  ('Scheduled unit', interval '1 day 1 hour', 60, 'RES15-SECOND', 'scheduled');
insert into interval_commitments
  (customer_name, starts_offset, duration_minutes, quantity, category_id)
select 'Mixed quantity', interval '30 minutes', 60, physical_capacity, unit_category
from interval_fixture;
select pg_temp.persist_interval_commitments();

insert into reservation_dispatches
  (reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
select reservation.id, fixture.unit_category,
  fixture.starts_at + interval '1 day 2 hours', 60, fixture.worker_id, fixture.worker_id
from reservations reservation cross join interval_fixture fixture
where reservation.customer_name = 'Dispatch moved';
insert into reservation_dispatches
  (reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
select reservation.id, fixture.unit_category,
  fixture.starts_at + interval '2 days', 60, fixture.worker_id, fixture.worker_id
from reservations reservation cross join interval_fixture fixture
where reservation.customer_name = 'Mixed quantity';
update reservation_items item set dispatch_id = dispatch.id
from reservation_dispatches dispatch where item.reservation_id = dispatch.reservation_id;

select results_eq(
  $$ select usable, committed, free from interval_fixture fixture
     cross join lateral category_availability(unit_category, starts_at, ends_at,
       (select id from reservations where customer_name = 'Mixed quantity')) $$,
  $$ select physical_capacity, single_commitment, single_commitment from interval_fixture $$,
  'consecutive concrete unit commitments use one simultaneous category slot');

select results_eq(
  $$ select usable, committed, free from interval_fixture fixture
     cross join lateral category_availability(unit_category, starts_at, ends_at) $$,
  $$ select physical_capacity, mixed_peak, overbooked_free from interval_fixture $$,
  'quantity and unit commitments share one simultaneous peak');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(unit_category, starts_at, ends_at,
       (select id from reservations where customer_name = 'Unit first')) $$,
  $$ select mixed_peak, overbooked_free from interval_fixture $$,
  'excluding one unit preserves the later peak with the other unit');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(unit_category,
       starts_at + interval '1 day', starts_at + interval '1 day 1 hour') $$,
  $$ select empty_capacity, physical_capacity from interval_fixture $$,
  'a dispatched unit uses its dispatch window instead of its scheduled window');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(unit_category,
       starts_at + interval '1 day 2 hours', starts_at + interval '1 day 3 hours') $$,
  $$ select single_commitment, single_commitment from interval_fixture $$,
  'a dispatch outside the original reservation still consumes its actual window');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(unit_category,
       starts_at + interval '1 day 1 hour', starts_at + interval '1 day 2 hours') $$,
  $$ select single_commitment, single_commitment from interval_fixture $$,
  'an undispatched concrete unit keeps the scheduled reservation window');

select results_eq(
  $$ select committed, free from interval_fixture fixture
     cross join lateral category_availability(unit_category,
       starts_at + interval '2 days', ends_at + interval '2 days') $$,
  $$ select empty_capacity, physical_capacity from interval_fixture $$,
  'a quantity commitment retains its scheduled window after a dispatch is attached');

select results_eq(
  $$ select count(*)::integer from interval_fixture fixture
     cross join lateral unit_conflicts(
       (select id from equipment_units where code = 'RES15-FIRST'), starts_at, ends_at) $$,
  $$ select single_commitment from interval_fixture $$,
  'a category peak does not erase concrete unit conflicts across the requested interval');

select results_eq(
  $$ select usable from interval_fixture fixture
     cross join lateral category_availability(unit_category,
       starts_at + interval '2 days', ends_at + interval '2 days') $$,
  $$ select physical_capacity from interval_fixture $$,
  'damaged, repair and maintenance units never increase usable capacity');

select * from finish();
rollback;
