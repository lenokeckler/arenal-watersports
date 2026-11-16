begin;
select plan(30);
\ir fixtures/reservation_charge.sql.fixture

insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
values
  ('e2c20000-0000-4000-8000-000000000301', 'tariff', 40, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000301', 'extra_time', 10, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000301', 'tariff', 15000, 'CRC', 'Tarjeta', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000302', 'tariff', 20, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000303', 'tariff', 600, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000303', 'tariff', 1000, 'CRC', 'Tarjeta', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000304', 'extra_time', 7, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000311', 'tariff', 10, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000312', 'tariff', 10, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000313', 'tariff', 1000, 'CRC', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001');

insert into refunds (reservation_id, amount, currency, reason, created_by)
values ('e2c20000-0000-4000-8000-000000000301', 20, 'USD', 'RES28 earlier refund', 'e2c20000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select currency::text, charged_amount, refunded_amount, refundable_amount
     from reservation_refundable_net('e2c20000-0000-4000-8000-000000000301') $$,
  $$ values
       ('USD', 50::numeric, 20::numeric, 30::numeric),
       ('CRC', 15000::numeric, 0::numeric, 15000::numeric) $$,
  'the net lists USD then CRC with charged, refunded and refundable'
);

select results_eq(
  $$ select currency::text, charged_amount, refunded_amount, refundable_amount
     from reservation_refundable_net('e2c20000-0000-4000-8000-000000000304') $$,
  $$ values
       ('USD', 7::numeric, 0::numeric, 7::numeric),
       ('CRC', 0::numeric, 0::numeric, 0::numeric) $$,
  'extra time charges count toward the net'
);

select results_eq(
  $$ select currency::text, charged_amount, refunded_amount, refundable_amount
     from reservation_refundable_net('e2c20000-0000-4000-8000-000000000308') $$,
  $$ values
       ('USD', 0::numeric, 0::numeric, 0::numeric),
       ('CRC', 0::numeric, 0::numeric, 0::numeric) $$,
  'a reservation without charges has nothing to refund in either currency'
);

select lives_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 10, 'reason', 'Rain cut')) $$,
  'a refund within the net is recorded'
);

select results_eq(
  $$ select amount, currency::text, reason, created_by from refunds
     where reservation_id = 'e2c20000-0000-4000-8000-000000000301' and reason = 'Rain cut' $$,
  $$ values (10::numeric, 'USD', 'Rain cut', 'e2c20000-0000-4000-8000-000000000001'::uuid) $$,
  'the stored refund keeps amount, currency, reason and the author'
);

select results_eq(
  $$ select refunded_amount, refunded_currency::text, refunded_reason, remaining_amount, recorded_by_name
     from record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 5, 'reason', '  Late return  ')) $$,
  $$ values (5::numeric, 'USD', 'Late return', 15::numeric, 'RES23 Reservas') $$,
  'the result carries the trimmed reason, the remaining net and the author name'
);

select lives_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000302', 'currency', 'USD', 'amount', 20, 'reason', 'Rain cut')) $$,
  'a refund equal to the whole net is recorded'
);

select results_eq(
  $$ select currency::text, charged_amount, refunded_amount, refundable_amount
     from reservation_refundable_net('e2c20000-0000-4000-8000-000000000302') $$,
  $$ values
       ('USD', 20::numeric, 20::numeric, 0::numeric),
       ('CRC', 0::numeric, 0::numeric, 0::numeric) $$,
  'the net is zero after refunding all of it'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 15.01, 'reason', 'Rain cut')) $$,
  'P0001',
  'Refund amount exceeds the refundable net',
  'one cent above the net is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000302', 'currency', 'USD', 'amount', 1, 'reason', 'Rain cut')) $$,
  'P0001',
  'Refund amount exceeds the refundable net',
  'any refund with nothing left is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000303', 'currency', 'CRC', 'amount', 1000.01, 'reason', 'Rain cut')) $$,
  'P0001',
  'Refund amount exceeds the refundable net',
  'a CRC refund above the CRC net is refused although USD is larger'
);

select lives_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000303', 'currency', 'USD', 'amount', 500, 'reason', 'Rain cut')) $$,
  'a USD refund is accepted within the USD net'
);

select results_eq(
  $$ select currency::text, charged_amount, refunded_amount, refundable_amount
     from reservation_refundable_net('e2c20000-0000-4000-8000-000000000303') $$,
  $$ values
       ('USD', 600::numeric, 500::numeric, 100::numeric),
       ('CRC', 1000::numeric, 0::numeric, 1000::numeric) $$,
  'a USD refund leaves the CRC net untouched'
);

select lives_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000311', 'currency', 'USD', 'amount', 1, 'reason', 'Rain cut')) $$,
  'a closed reservation can be refunded'
);

select lives_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000312', 'currency', 'USD', 'amount', 1, 'reason', 'Rain cut')) $$,
  'a cancelled reservation can be refunded'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000314', 'currency', 'USD', 'amount', 1, 'reason', 'Rain cut')) $$,
  'P0001',
  'Refund amount exceeds the refundable net',
  'a split reservation has nothing to refund'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000313', 'currency', 'CRC', 'amount', 0, 'reason', 'Rain cut')) $$,
  'P0001',
  'Charge amount is invalid',
  'a zero amount is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000313', 'currency', 'CRC', 'amount', -5, 'reason', 'Rain cut')) $$,
  'P0001',
  'Charge amount is invalid',
  'a negative amount is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000313', 'currency', 'CRC', 'amount', 12.345, 'reason', 'Rain cut')) $$,
  'P0001',
  'Charge amount is invalid',
  'a three decimals amount is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000313', 'currency', 'EUR', 'amount', 1, 'reason', 'Rain cut')) $$,
  'P0001',
  'Charge currency is invalid',
  'an unknown currency is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000313', 'currency', 'CRC', 'amount', 1, 'reason', '   ')) $$,
  'P0001',
  'A refund reason is required',
  'a blank reason is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000313', 'currency', 'CRC', 'amount', 1, 'reason', 'Rain' || chr(10) || 'cut')) $$,
  'P0001',
  'Refund reason is invalid',
  'a reason with control characters is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000313', 'currency', 'CRC', 'amount', 1, 'reason', repeat('a', 201))) $$,
  'P0001',
  'Refund reason is too long',
  'a reason of 201 characters is refused'
);

select lives_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000313', 'currency', 'CRC', 'amount', 1, 'reason', repeat('a', 200))) $$,
  'a reason of 200 characters is accepted'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000009999', 'currency', 'USD', 'amount', 1, 'reason', 'Rain cut')) $$,
  'P0001',
  'Reservation was not found',
  'an unknown reservation is refused'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000003","role":"authenticated"}';

select lives_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', 'Rain cut')) $$,
  'a second worker refunds the same reservation'
);

select results_eq(
  $$ select created_by from refunds where reservation_id = 'e2c20000-0000-4000-8000-000000000301' and amount = 1 $$,
  $$ values ('e2c20000-0000-4000-8000-000000000003'::uuid) $$,
  'the refund stays under the name of the worker who made it'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', 'Rain cut')) $$,
  'P0001',
  'Reservations access is required',
  'an Operations worker cannot record a refund'
);

select throws_ok(
  $$ select * from reservation_refundable_net('e2c20000-0000-4000-8000-000000000301') $$,
  'P0001',
  'Reservations access is required',
  'an Operations worker cannot read the refundable net'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select refunds_amount, net_amount from daily_revenue_report
     where day = (now() at time zone 'UTC')::date and currency = 'USD' $$,
  $$ values (558::numeric, 139::numeric) $$,
  'the daily report reflects the refunds in their currency'
);

select * from finish();
rollback;
