begin;
select plan(18);
\ir fixtures/reservation_charge.sql.fixture
\ir fixtures/reservation_deposit_amounts.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select record_reservation_deposit('[]'::jsonb) $$,
  'P0001', 'Reservation payload must be an object', 'an array payload is refused'
);

select throws_ok(
  $$ select record_reservation_deposit('"text"'::jsonb) $$,
  'P0001', 'Reservation payload must be an object', 'a scalar payload is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(null) $$,
  'P0001', 'Reservation payload must be an object', 'a null payload is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'not-a-uuid', 'has_deposit', true, 'currency', 'USD', 'amount', 1)) $$,
  'P0001', 'Reservation payload is invalid', 'a malformed reservation id is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('has_deposit', true, 'currency', 'USD', 'amount', 1)) $$,
  'P0001', 'Reservation was not found', 'a payload without a reservation id is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1)) $$,
  'P0001', 'A deposit decision is required', 'a payload without a decision is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', 'maybe', 'currency', 'USD', 'amount', 1)) $$,
  'P0001', 'Reservation payload is invalid', 'a non boolean decision is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'USD')) $$,
  'P0001', 'Charge amount is invalid', 'a deposit without an amount is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'USD', 'amount', 0)) $$,
  'P0001', 'Charge amount is invalid', 'a zero amount is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'USD', 'amount', -5)) $$,
  'P0001', 'Charge amount is invalid', 'a negative amount is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'USD', 'amount', 12.345)) $$,
  'P0001', 'Charge amount is invalid', 'an amount with three decimals is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'amount', 1)) $$,
  'P0001', 'Charge currency is invalid', 'a deposit without a currency is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'usd', 'amount', 1)) $$,
  'P0001', 'Charge currency is invalid', 'a lowercase currency is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'USD', 'amount', 10000000000)) $$,
  'P0001', 'Charge amount is invalid', 'a USD amount at the ceiling is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'CRC', 'amount', 1000000000000)) $$,
  'P0001', 'Charge amount is invalid', 'a CRC amount at the ceiling is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'USD', 'amount', 'abc')) $$,
  'P0001', 'Reservation payload is invalid', 'a non numeric amount is refused'
);

select results_eq(
  $$ select (select count(*)::integer from deposits where reservation_id = 'e2c20000-0000-4000-8000-000000000301'), (select count(*)::integer from deposit_declinations where reservation_id = 'e2c20000-0000-4000-8000-000000000301') $$,
  $$ values (0, 0) $$,
  'every refusal left nothing stored'
);

select results_eq(
  $$ select recorded_amount, recorded_currency::text from record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'CRC', 'amount', 999999999999.99)) $$,
  $$ values (999999999999.99::numeric, 'CRC'::text) $$,
  'a CRC amount just under the ceiling is accepted and the reservation was still undecided'
);

select * from finish();
rollback;
