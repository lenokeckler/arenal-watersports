begin;
select plan(23);
\ir fixtures/reservation_charge.sql.fixture
\ir fixtures/reservation_deposit_amounts.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select recorded_has_deposit, recorded_amount, recorded_currency::text from record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'USD', 'amount', 200)) $$,
  $$ values (true, 200::numeric, 'USD'::text) $$,
  'yes records the amount and currency received'
);

select results_eq(
  $$ select status::text, amount, currency::text, created_by, retained_amount is null and resolved_at is null from deposits where reservation_id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values ('held'::text, 200::numeric, 'USD'::text, 'e2c20000-0000-4000-8000-000000000001'::uuid, true) $$,
  'the stored deposit is held, authored and unresolved'
);

select results_eq(
  $$ select recorded_by_name from record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000303', 'has_deposit', true, 'currency', 'CRC', 'amount', 100000)) $$,
  $$ values ('RES23 Reservas'::text) $$,
  'the result carries the name of the author'
);

select results_eq(
  $$ select amount, currency::text from deposits where reservation_id = 'e2c20000-0000-4000-8000-000000000303' $$,
  $$ values (100000::numeric, 'CRC'::text) $$,
  'a deposit received in colones is stored in colones'
);

select results_eq(
  $$ select recorded_amount from record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000305', 'has_deposit', true, 'currency', 'USD', 'amount', 150.5)) $$,
  $$ values (150.5::numeric) $$,
  'an amount different from the proposal is accepted'
);

select results_eq(
  $$ select count(*)::integer from deposits join reservations on reservations.id = deposits.reservation_id where deposits.status = 'held' and reservations.id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values (1) $$,
  'the held deposit is listed as pending'
);

select results_eq(
  $$ select recorded_has_deposit, recorded_deposit_id is null, recorded_amount is null, recorded_currency is null from record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000304', 'has_deposit', false)) $$,
  $$ values (false, true, true, true) $$,
  'no deposit returns an empty result row'
);

select results_eq(
  $$ select (select count(*)::integer from deposit_declinations where reservation_id = 'e2c20000-0000-4000-8000-000000000304' and created_by = 'e2c20000-0000-4000-8000-000000000001'), (select count(*)::integer from deposits where reservation_id = 'e2c20000-0000-4000-8000-000000000304') $$,
  $$ values (1, 0) $$,
  'no deposit stores one authored declination and no deposit'
);

select results_eq(
  $$ select recorded_has_deposit from record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000306', 'has_deposit', false, 'currency', 'bad', 'amount', -5)) $$,
  $$ values (false) $$,
  'no deposit ignores an invalid amount and currency'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'has_deposit', true, 'currency', 'USD', 'amount', 200)) $$,
  'P0001', 'A deposit decision was already recorded', 'a second decision after a deposit is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000304', 'has_deposit', false)) $$,
  'P0001', 'A deposit decision was already recorded', 'a second decision after no deposit is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000304', 'has_deposit', true, 'currency', 'USD', 'amount', 10)) $$,
  'P0001', 'A deposit decision was already recorded', 'a deposit after no deposit is refused'
);

select results_eq(
  $$ select recorded_has_deposit from record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000310', 'has_deposit', true, 'currency', 'USD', 'amount', 200)) $$,
  $$ values (true) $$,
  'a dispatched reservation can record a deposit'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000311', 'has_deposit', true, 'currency', 'USD', 'amount', 200)) $$,
  'P0001', 'Only scheduled or dispatched reservations can record a deposit', 'a closed reservation is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000312', 'has_deposit', true, 'currency', 'USD', 'amount', 200)) $$,
  'P0001', 'Only scheduled or dispatched reservations can record a deposit', 'a cancelled reservation is refused'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000314', 'has_deposit', true, 'currency', 'USD', 'amount', 200)) $$,
  'P0001', 'A split reservation keeps its deposit on the original reservation', 'a split child is refused with the English message'
);

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', '00000000-0000-4000-8000-000000000000', 'has_deposit', true, 'currency', 'USD', 'amount', 1)) $$,
  'P0001', 'Reservation was not found', 'an unknown reservation is refused'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000302', 'has_deposit', true, 'currency', 'USD', 'amount', 200)) $$,
  'P0001', 'Reservations access is required', 'an Operations worker cannot record a deposit'
);

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, created_by) values ('e2c20000-0000-4000-8000-000000000302', 1, 'USD', 'e2c20000-0000-4000-8000-000000000002') $$,
  '42501', null, 'an Operations worker cannot insert a deposit directly'
);

select throws_ok(
  $$ insert into deposit_declinations (reservation_id, created_by) values ('e2c20000-0000-4000-8000-000000000302', 'e2c20000-0000-4000-8000-000000000002') $$,
  '42501', null, 'an Operations worker cannot insert a declination directly'
);

select results_eq(
  $$ select (select count(*)::integer from deposits), (select count(*)::integer from deposit_declinations) $$,
  $$ values (0, 0) $$,
  'an Operations worker reads no deposit and no declination'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000003","role":"authenticated"}';

select results_eq(
  $$ select recorded_by_name from record_reservation_deposit(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000309', 'has_deposit', true, 'currency', 'USD', 'amount', 50)) $$,
  $$ values ('RES23 Admin'::text) $$,
  'the administration decision is returned under his name'
);

select results_eq(
  $$ select created_by from deposits where reservation_id = 'e2c20000-0000-4000-8000-000000000309' $$,
  $$ values ('e2c20000-0000-4000-8000-000000000003'::uuid) $$,
  'the administration deposit is stored under his name'
);

select * from finish();
rollback;
