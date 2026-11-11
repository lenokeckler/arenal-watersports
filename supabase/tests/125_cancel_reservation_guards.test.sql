begin;
select plan(13);
\ir fixtures/cancel_reservation.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000009999', 'reason', 'Cliente enfermo',
       'expected_updated_at', now())) $$,
  'P0001', 'Reservation was not found',
  'an unknown reservation cannot be cancelled'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000303', 'reason', 'Cliente enfermo',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000303'))) $$,
  'P0001', 'Only scheduled or dispatched reservations can be cancelled',
  'a closed reservation cannot be cancelled'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000304', 'reason', 'Cliente enfermo',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000304'))) $$,
  'P0001', 'Only scheduled or dispatched reservations can be cancelled',
  'a cancelled reservation cannot be cancelled again'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000301', 'reason', 'Cliente enfermo',
       'expected_updated_at', '2000-01-01 00:00:00+00')) $$,
  'P0001', 'Reservation changed since the form was loaded',
  'a stale form is refused'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000301', 'reason', 'Cliente enfermo')) $$,
  'P0001', 'Reservation changed since the form was loaded',
  'a missing token is stale'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000301', 'reason', '   ',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000301'))) $$,
  'P0001', 'A cancellation reason is required',
  'a blank reason is refused'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000301',
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000301'))) $$,
  'P0001', 'A cancellation reason is required',
  'a missing reason is refused'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000301', 'reason', repeat('a', 301),
       'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000301'))) $$,
  'P0001', 'Cancellation reason is too long',
  'a reason over 300 characters is refused'
);

select is(
  normalize_cancellation_reason('  ' || repeat('a', 300) || '  '),
  repeat('a', 300),
  'a reason of 300 characters once trimmed is accepted'
);

select throws_ok(
  $$ select cancel_reservation('[]'::jsonb) $$,
  'P0001', 'Reservation payload must be an object',
  'a payload that is not an object is refused'
);

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object('reservation_id', 'nope', 'reason', 'Cliente enfermo')) $$,
  'P0001', 'Reservation payload is invalid',
  'a malformed reservation id is refused'
);

select is(
  (select status::text from reservations where id = 'e2b10000-0000-4000-8000-000000000301'),
  'scheduled',
  'every refusal leaves the reservation scheduled'
);

set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select cancel_reservation(jsonb_build_object(
       'reservation_id', 'e2b10000-0000-4000-8000-000000000301', 'reason', 'Cliente enfermo',
       'expected_updated_at', now())) $$,
  'P0001', 'Reservations access is required',
  'an operations-only worker cannot cancel'
);

select * from finish();
rollback;
