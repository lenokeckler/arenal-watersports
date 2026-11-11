begin;
select plan(10);
\ir fixtures/cancel_reservation.sql.fixture

create temporary table cancel_before on commit drop as
select
  (select count(*) from reservation_items where reservation_id = 'e2b10000-0000-4000-8000-000000000301') as items,
  (select status::text from equipment_units where id = 'e2b10000-0000-4000-8000-000000000201') as unit_status,
  (select amount from reservation_charges where id = 'e2b10000-0000-4000-8000-000000000501') as charge,
  (select status::text from deposits where id = 'e2b10000-0000-4000-8000-000000000601') as deposit_status;
grant select on cancel_before to authenticated;

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select is(
  cancel_reservation(jsonb_build_object(
    'reservation_id', 'e2b10000-0000-4000-8000-000000000301',
    'reason', '  El cliente no llegó  ',
    'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000301'))),
  'e2b10000-0000-4000-8000-000000000301'::uuid,
  'cancelling returns the reservation id'
);

select is(
  (select status::text from reservations where id = 'e2b10000-0000-4000-8000-000000000301'),
  'cancelled',
  'the reservation is cancelled'
);

select is(
  (select cancellation_reason from reservations where id = 'e2b10000-0000-4000-8000-000000000301'),
  'El cliente no llegó',
  'the reason is stored trimmed'
);

select is(
  (select updated_by from reservations where id = 'e2b10000-0000-4000-8000-000000000301'),
  'e2b10000-0000-4000-8000-000000000001'::uuid,
  'the worker who cancelled is recorded'
);

select is(
  (select count(*) from reservation_items where reservation_id = 'e2b10000-0000-4000-8000-000000000301'),
  (select items from cancel_before),
  'the equipment lines are kept'
);

select is(
  (select status::text from equipment_units where id = 'e2b10000-0000-4000-8000-000000000201'),
  (select unit_status from cancel_before),
  'the unit status is not changed by the cancellation'
);

select is(
  (select amount from reservation_charges where id = 'e2b10000-0000-4000-8000-000000000501'),
  (select charge from cancel_before),
  'the charge is kept'
);

select is(
  (select status::text from deposits where id = 'e2b10000-0000-4000-8000-000000000601'),
  (select deposit_status from cancel_before),
  'the deposit is kept'
);

select is(
  (select count(*)::integer from unit_conflicts(
     'e2b10000-0000-4000-8000-000000000201', '2035-05-12 15:00:00+00', '2035-05-12 16:00:00+00')),
  0,
  'the unit is not blocked for that window any more'
);

select is(
  (select cancellation_reason from get_reservation_history_record('e2b10000-0000-4000-8000-000000000301')),
  'El cliente no llegó',
  'the cancelled reservation shows in the history with its reason'
);

select * from finish();
rollback;
