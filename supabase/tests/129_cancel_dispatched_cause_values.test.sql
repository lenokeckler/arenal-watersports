begin;
select plan(9);
\ir fixtures/cancel_dispatched_reservation.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta', 'cause', 'Weather',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))) $$,
  'P0001', 'Cancellation cause is invalid',
  'a cause in the wrong case is refused'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta', 'cause', 'weather,trip_problem',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))) $$,
  'P0001', 'Cancellation cause is invalid',
  'a list of causes is refused'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta', 'cause', null,
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))) $$,
  'P0001', 'A cancellation cause is required for a dispatched reservation',
  'a null cause is refused for a dispatched reservation'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000301', 'reason', 'Cliente enfermo', 'cause', 'rain',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000301'))) $$,
  'P0001', 'A cancellation cause only applies to a dispatched reservation',
  'a scheduled cancellation refuses any non-blank cause'
);

select is(
  cancel_reservation(jsonb_build_object(
    'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Falla del motor', 'cause', '  trip_problem ',
    'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))),
  'e2b10000-0000-4000-8000-000000000305'::uuid,
  'a padded trip_problem cause is accepted'
);

select is(
  (select cancellation_cause::text from reservations where id = 'e2b10000-0000-4000-8000-000000000305'),
  'trip_problem',
  'the padded cause is stored trimmed'
);

select is(
  cancel_reservation(jsonb_build_object(
    'reservation_id', 'e2b10000-0000-4000-8000-000000000301', 'reason', 'Cliente enfermo', 'cause', '   ',
    'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000301'))),
  'e2b10000-0000-4000-8000-000000000301'::uuid,
  'a blank cause is ignored for a scheduled cancellation'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Otra vez', 'cause', 'weather',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))) $$,
  'P0001', 'Only scheduled or dispatched reservations can be cancelled',
  'a cancelled dispatched reservation cannot be cancelled again'
);

select results_eq(
  $$ select cancellation_cause::text, cancellation_reason from reservations where id = 'e2b10000-0000-4000-8000-000000000305' $$,
  $$ values ('trip_problem', 'Falla del motor') $$,
  'the second attempt leaves the first cause and reason'
);

select * from finish();
rollback;
