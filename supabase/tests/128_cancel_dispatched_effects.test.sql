begin;
select plan(11);
\ir fixtures/cancel_dispatched_reservation.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select is(
  cancel_reservation(jsonb_build_object(
    'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', '  Tormenta en el lago  ', 'cause', 'weather',
    'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305'))),
  'e2b10000-0000-4000-8000-000000000305'::uuid,
  'cancelling a dispatched reservation returns its id'
);

select results_eq(
  $$ select status::text, cancellation_cause::text, cancellation_reason, updated_by
     from reservations where id = 'e2b10000-0000-4000-8000-000000000305' $$,
  $$ values ('cancelled', 'weather', 'Tormenta en el lago', 'e2b10000-0000-4000-8000-000000000001'::uuid) $$,
  'status, cause, trimmed reason and author are stored'
);

select is(
  (select count(*) from reservation_dispatches where reservation_id = 'e2b10000-0000-4000-8000-000000000305' and closed_at is null),
  1::bigint,
  'the dispatch group stays open for operations to close'
);

select is(
  (select count(*) from reservation_items where reservation_id = 'e2b10000-0000-4000-8000-000000000305' and (fuel_in is not null or usage_in is not null)),
  0::bigint,
  'no return reading is created by the cancellation'
);

select results_eq(
  $$ select dispatch_id, unit_id from reservation_items where reservation_id = 'e2b10000-0000-4000-8000-000000000305' $$,
  $$ values ('e2b10000-0000-4000-8000-000000000701'::uuid, 'e2b10000-0000-4000-8000-000000000202'::uuid) $$,
  'the item keeps its dispatch and unit'
);

select results_eq(
  $$ select amount::numeric from reservation_charges where reservation_id = 'e2b10000-0000-4000-8000-000000000305' $$,
  $$ values (30000::numeric) $$,
  'the charge is untouched'
);

select results_eq(
  $$ select amount::numeric, status::text from deposits where reservation_id = 'e2b10000-0000-4000-8000-000000000305' $$,
  $$ values (50000::numeric, 'held') $$,
  'the deposit stays held for its normal close'
);

select is(
  (select status::text from equipment_units where id = 'e2b10000-0000-4000-8000-000000000202'),
  'available',
  'the unit status is not changed by the cancellation'
);

select is(
  (select effective_status::text from unit_current_state where id = 'e2b10000-0000-4000-8000-000000000202'),
  'occupied',
  'the unit is still on the water'
);

select is(
  cancel_reservation(jsonb_build_object(
    'reservation_id', 'e2b10000-0000-4000-8000-000000000301', 'reason', 'Cliente enfermo',
    'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000301'))),
  'e2b10000-0000-4000-8000-000000000301'::uuid,
  'a scheduled cancellation still works without a cause'
);

select is(
  (select cancellation_cause::text from reservations where id = 'e2b10000-0000-4000-8000-000000000301'),
  null,
  'a scheduled cancellation stores no cause'
);

select * from finish();
rollback;
