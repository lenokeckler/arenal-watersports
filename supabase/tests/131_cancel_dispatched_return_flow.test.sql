begin;
select plan(7);
\ir fixtures/cancel_dispatched_reservation.sql.fixture

update equipment_categories set has_motor = true, usage_metric = 'engine_hours', consumes_fuel = true
where id = 'e2b10000-0000-4000-8000-000000000101';
update reservation_dispatches set dispatched_at = now() - interval '2 hours'
where id = 'e2b10000-0000-4000-8000-000000000701';
update equipment_units set fuel_max = 4, fuel_level = 4, usage_total = 10
where id = 'e2b10000-0000-4000-8000-000000000202';

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select cancel_reservation(jsonb_build_object(
  'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta', 'cause', 'weather',
  'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305')));

set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000002","role":"authenticated"}';

select lives_ok(
  $$ select close_dispatch_group('e2b10000-0000-4000-8000-000000000701', now(),
       '[{"unit_id":"e2b10000-0000-4000-8000-000000000202","fuel":2,"usage":11.5}]'::jsonb) $$,
  'operations closes the group of a cancelled reservation'
);

select is(
  (select status::text from reservations where id = 'e2b10000-0000-4000-8000-000000000305'),
  'cancelled',
  'the reservation stays cancelled'
);

select is(
  (select cancellation_cause::text from reservations where id = 'e2b10000-0000-4000-8000-000000000305'),
  'weather',
  'the cause survives the close'
);

select results_eq(
  $$ select fuel_in::numeric, usage_in::numeric from reservation_items where id = 'e2b10000-0000-4000-8000-000000000402' $$,
  $$ values (2::numeric, 11.5::numeric) $$,
  'the return readings are stored on the item'
);

select results_eq(
  $$ select fuel_level::numeric, usage_total::numeric, status::text from equipment_units where id = 'e2b10000-0000-4000-8000-000000000202' $$,
  $$ values (2::numeric, 11.5::numeric, 'available') $$,
  'the unit takes the readings and stays available'
);

select is(
  (select effective_status::text from unit_current_state where id = 'e2b10000-0000-4000-8000-000000000202'),
  'available',
  'the unit is back on the board'
);

set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select amount::numeric, status::text from deposits where reservation_id = 'e2b10000-0000-4000-8000-000000000305' $$,
  $$ values (50000::numeric, 'held') $$,
  'the deposit is still held after the close'
);

select * from finish();
rollback;
