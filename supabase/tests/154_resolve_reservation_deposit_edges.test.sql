begin;
select plan(13);
\ir fixtures/reservation_charge.sql.fixture
\ir fixtures/deposit_resolution.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select resolve_reservation_deposit('[]'::jsonb) $$,
  'P0001', 'Deposit payload must be an object', 'an array payload is refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(null) $$,
  'P0001', 'Deposit payload must be an object', 'a null payload is refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'not-a-uuid', 'returned_amount', 1)) $$,
  'P0001', 'Deposit payload is invalid', 'a malformed deposit id is refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000906', 'returned_amount', 'abc')) $$,
  'P0001', 'Deposit payload is invalid', 'a text amount is refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000906')) $$,
  'P0001', 'Returned amount is invalid', 'a missing returned amount is refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000906', 'returned_amount', -1, 'reason', 'Daño')) $$,
  'P0001', 'Returned amount is invalid', 'a negative returned amount is refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000906', 'returned_amount', 10.555, 'reason', 'Daño')) $$,
  'P0001', 'Returned amount is invalid', 'three decimals are refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000906', 'returned_amount', 200.01)) $$,
  'P0001', 'Returned amount exceeds the deposit', 'returning more than the deposit is refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000906', 'returned_amount', 120)) $$,
  'P0001', 'A damage reason is required', 'keeping part without a reason is refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000906', 'returned_amount', 120, 'reason', E'   ')) $$,
  'P0001', 'A damage reason is required', 'a blank reason is refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000906', 'returned_amount', 120, 'reason', repeat('a', 201))) $$,
  'P0001', 'Damage reason is too long', 'a reason over 200 characters is refused'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000906', 'returned_amount', 120, 'reason', 7)) $$,
  'P0001', 'Damage reason is invalid', 'a numeric reason is refused'
);

select results_eq(
  $$ select status::text, retained_amount is null, resolved_at is null from deposits where id = 'e2c20000-0000-4000-8000-000000000906' $$,
  $$ values ('held'::text, true, true) $$,
  'every refusal leaves the deposit held and untouched'
);

select * from finish();
rollback;
