begin;
select plan(9);
\ir fixtures/cancel_dispatched_reservation.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta en el lago',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))) $$,
  'P0001', 'A cancellation cause is required for a dispatched reservation',
  'a dispatched cancellation without a cause is refused'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta en el lago', 'cause', '   ',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))) $$,
  'P0001', 'A cancellation cause is required for a dispatched reservation',
  'a blank cause is refused'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta en el lago', 'cause', 'rain',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))) $$,
  'P0001', 'Cancellation cause is invalid',
  'an unknown cause is refused'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000301', 'reason', 'Cliente enfermo', 'cause', 'weather',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000301'))) $$,
  'P0001', 'A cancellation cause only applies to a dispatched reservation',
  'a scheduled cancellation cannot carry a cause'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', '   ', 'cause', 'weather',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))) $$,
  'P0001', 'A cancellation reason is required',
  'the reason stays mandatory for a dispatched cancellation'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', repeat('a', 301), 'cause', 'weather',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))) $$,
  'P0001', 'Cancellation reason is too long',
  'a dispatched reason over 300 characters is refused'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta en el lago', 'cause', 'weather',
       'expected_updated_at', '2000-01-01 00:00:00+00')) $$,
  'P0001', 'Reservation changed since the form was loaded',
  'a stale token on a dispatched reservation is refused'
);

select results_eq(
  $$ select status::text, cancellation_cause::text, cancellation_reason
     from reservations where id = 'e2b10000-0000-4000-8000-000000000305' $$,
  $$ values ('dispatched', null::text, null::text) $$,
  'every refusal leaves the reservation dispatched without cause'
);

set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta en el lago', 'cause', 'weather',
       'expected_updated_at', now())) $$,
  'P0001', 'Reservations access is required',
  'an operations-only worker cannot cancel a dispatched reservation'
);

select * from finish();
rollback;
