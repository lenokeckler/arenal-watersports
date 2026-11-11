begin;
select plan(6);
\ir fixtures/cancel_dispatched_reservation.sql.fixture

update reservation_dispatches set dispatched_at = now() - interval '2 hours'
where id = 'e2b10000-0000-4000-8000-000000000701';

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select cancel_reservation(jsonb_build_object(
  'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta', 'cause', 'weather',
  'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305')));

select is(
  (select effective_status::text from unit_current_state where id = 'e2b10000-0000-4000-8000-000000000202'),
  'occupied',
  'the unit is occupied until operations records the return'
);

set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000002","role":"authenticated"}';

select close_dispatch_group('e2b10000-0000-4000-8000-000000000701', now(),
  '[{"unit_id":"e2b10000-0000-4000-8000-000000000202","maintenance":false}]'::jsonb);

select is(
  (select count(*) from unit_conflicts('e2b10000-0000-4000-8000-000000000202',
    now() - interval '1 hour', now())),
  0::bigint,
  'the unit is no longer committed once the return is recorded'
);

select is(
  (select committed from category_availability('e2b10000-0000-4000-8000-000000000101',
    now() - interval '1 hour', now())),
  0,
  'the category no longer counts the returned unit'
);

select is(
  (select count(*) from reservation_category_conflicts('e2b10000-0000-4000-8000-000000000101',
    now() - interval '1 hour', now())),
  0::bigint,
  'the returned reservation is no longer a category conflict'
);

select is(
  (select effective_status::text from unit_current_state where id = 'e2b10000-0000-4000-8000-000000000202'),
  'available',
  'the returned unit is available again'
);

select is(
  (select status::text from reservations where id = 'e2b10000-0000-4000-8000-000000000305'),
  'cancelled',
  'the reservation stays cancelled after the return'
);

select * from finish();
rollback;
