begin;
select plan(5);
\ir fixtures/cancel_dispatched_reservation.sql.fixture

select throws_ok(
  $$ update reservations set cancellation_cause = 'weather' where id = 'e2b10000-0000-4000-8000-000000000301' $$,
  '23514', null,
  'a scheduled reservation cannot hold a cause'
);

select throws_ok(
  $$ update reservations set cancellation_cause = 'weather' where id = 'e2b10000-0000-4000-8000-000000000305' $$,
  '23514', null,
  'a dispatched reservation cannot hold a cause'
);

select lives_ok(
  $$ update reservations set status = 'cancelled', cancellation_reason = 'Radio', cancellation_cause = 'weather'
     where id = 'e2b10000-0000-4000-8000-000000000305' $$,
  'a cancelled reservation can hold a cause'
);

select throws_ok(
  $$ update reservations set status = 'closed' where id = 'e2b10000-0000-4000-8000-000000000305' $$,
  '23514', null,
  'a cause cannot outlive the cancelled status'
);

select lives_ok(
  $$ update reservations set status = 'cancelled', cancellation_reason = 'Antes', cancellation_cause = null
     where id = 'e2b10000-0000-4000-8000-000000000301' $$,
  'a cancelled reservation can hold no cause (scheduled cancellation)'
);

select * from finish();
rollback;
