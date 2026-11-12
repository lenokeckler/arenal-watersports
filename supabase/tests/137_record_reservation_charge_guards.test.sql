begin;
select plan(19);
\ir fixtures/reservation_charge.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select record_reservation_charge('[]'::jsonb) $$,
  'P0001', 'Reservation payload must be an object',
  'a payload that is not an object is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'not-a-uuid', 'currency', 'USD', 'amount', 40, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Reservation payload is invalid',
  'a malformed reservation id is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000009999', 'currency', 'USD', 'amount', 40, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Reservation was not found',
  'an unknown reservation cannot be charged'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000312', 'currency', 'USD', 'amount', 40, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Only scheduled, dispatched or closed reservations can be charged',
  'a cancelled reservation cannot be charged'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000314', 'currency', 'USD', 'amount', 40, 'payment_method', 'Efectivo')) $$,
  'P0001', 'A split reservation is charged on the original reservation',
  'a split child cannot be charged'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'EUR', 'amount', 40, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Charge currency is invalid',
  'an unknown currency is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'amount', 40, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Charge currency is invalid',
  'a missing currency is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'payment_method', 'Efectivo')) $$,
  'P0001', 'Charge amount is invalid',
  'a missing amount is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 0, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Charge amount is invalid',
  'a zero amount is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', -5, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Charge amount is invalid',
  'a negative amount is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 12.345, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Charge amount is invalid',
  'an amount with three decimals is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 10000000000, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Charge amount is invalid',
  'a dollar amount past the pricing column is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'CRC', 'amount', 1000000000000, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Charge amount is invalid',
  'a colon amount past the pricing column is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 40,
       'payment_method', '   ')) $$,
  'P0001', 'A payment method is required',
  'a blank payment method is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 40)) $$,
  'P0001', 'A payment method is required',
  'a missing payment method is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 40,
       'payment_method', repeat('x', 61))) $$,
  'P0001', 'Payment method is too long',
  'a payment method over sixty characters is refused'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 40, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Reservations access is required',
  'a worker without reservas access cannot record a charge'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 'abc', 'payment_method', 'Efectivo')) $$,
  'P0001', 'Reservation payload is invalid',
  'a non numeric amount is refused'
);

select is(
  (select count(*) from reservation_charges),
  0::bigint,
  'no refusal left a charge behind'
);

select * from finish();
rollback;
