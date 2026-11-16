begin;
select plan(32);
\ir fixtures/reservation_charge.sql.fixture

insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
values
  ('e2c20000-0000-4000-8000-000000000301', 'tariff', 20.10, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000301', 'tariff', 2500.50, 'CRC', 'Tarjeta', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000302', 'tariff', 10, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'),
  ('e2c20000-0000-4000-8000-000000000303', 'tariff', 1000, 'CRC', 'Tarjeta', 'e2c20000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

create temporary table report_baseline as
select refunds_amount, net_amount from daily_revenue_report
where day = (now() at time zone 'UTC')::date and currency = 'CRC';

select throws_ok(
  $$ select record_reservation_refund('[]'::jsonb) $$,
  'P0001', 'Reservation payload must be an object', 'an array payload is refused'
);

select throws_ok(
  $$ select record_reservation_refund('"text"'::jsonb) $$,
  'P0001', 'Reservation payload must be an object', 'a scalar payload is refused'
);

select throws_ok(
  $$ select record_reservation_refund(null) $$,
  'P0001', 'Reservation payload must be an object', 'a null payload is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'not-a-uuid', 'currency', 'USD', 'amount', 1, 'reason', 'Rain cut')) $$,
  'P0001', 'Reservation payload is invalid', 'a malformed reservation id is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 'abc', 'reason', 'Rain cut')) $$,
  'P0001', 'Reservation payload is invalid', 'a non numeric amount is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('currency', 'USD', 'amount', 1, 'reason', 'Rain cut')) $$,
  'P0001', 'Reservation was not found', 'a payload without a reservation id is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'reason', 'Rain cut')) $$,
  'P0001', 'Charge amount is invalid', 'a payload without an amount is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'amount', 1, 'reason', 'Rain cut')) $$,
  'P0001', 'Charge currency is invalid', 'a payload without a currency is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'usd', 'amount', 1, 'reason', 'Rain cut')) $$,
  'P0001', 'Charge currency is invalid', 'a lowercase currency is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1)) $$,
  'P0001', 'A refund reason is required', 'a payload without a reason is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', E'\t ')) $$,
  'P0001', 'A refund reason is required', 'a tab only reason is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', jsonb_build_object('a', 1))) $$,
  'P0001', 'Refund reason is invalid', 'a reason sent as an object is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', jsonb_build_array(1, 2))) $$,
  'P0001', 'Refund reason is invalid', 'a reason sent as an array is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', to_jsonb(5))) $$,
  'P0001', 'Refund reason is invalid', 'a reason sent as a number is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', to_jsonb(true))) $$,
  'P0001', 'Refund reason is invalid', 'a reason sent as a boolean is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', chr(160))) $$,
  'P0001', 'A refund reason is required', 'a reason of a non-breaking space only is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', chr(8203))) $$,
  'P0001', 'A refund reason is required', 'a reason of a zero-width space only is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', chr(65279))) $$,
  'P0001', 'A refund reason is required', 'a reason of a byte order mark only is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 1, 'reason', chr(160) || chr(8203) || ' ' || chr(12288))) $$,
  'P0001', 'A refund reason is required', 'a reason of a mix of invisible characters only is refused'
);

select results_eq(
  $$ select refunded_reason from record_reservation_refund(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000302', 'currency', 'USD', 'amount', 1, 'reason', chr(160) || chr(8203) || 'Rain cut' || chr(160))) $$,
  $$ values ('Rain cut') $$,
  'invisible characters around a reason are trimmed'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 10000000000, 'reason', 'Rain cut')) $$,
  'P0001', 'Charge amount is invalid', 'a USD amount at the ceiling is refused'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 20.11, 'reason', 'Rain cut')) $$,
  'P0001', 'Refund amount exceeds the refundable net', 'a cent above a decimal net is refused'
);

select results_eq(
  $$ select refunded_amount, remaining_amount from record_reservation_refund(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 20.09, 'reason', 'Rain cut')) $$,
  $$ values (20.09::numeric, 0.01::numeric) $$,
  'a refund leaves the exact cents of the net'
);

select results_eq(
  $$ select refunded_amount, remaining_amount from record_reservation_refund(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 0.01, 'reason', 'Rain cut')) $$,
  $$ values (0.01::numeric, 0::numeric) $$,
  'the last cent of the net can be refunded'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 0.01, 'reason', 'Rain cut')) $$,
  'P0001', 'Refund amount exceeds the refundable net', 'a cent after the whole net was refunded is refused'
);

select results_eq(
  $$ select refundable_amount from reservation_refundable_net('e2c20000-0000-4000-8000-000000000301') where currency = 'CRC' $$,
  $$ values (2500.50::numeric) $$,
  'refunding all the USD leaves the CRC net untouched'
);

select results_eq(
  $$ select refunded_amount, remaining_amount from record_reservation_refund(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000303', 'currency', 'CRC', 'amount', 1000, 'reason', 'Rain cut')) $$,
  $$ values (1000::numeric, 0::numeric) $$,
  'a CRC refund equal to the whole CRC net is recorded'
);

select results_eq(
  $$ select count(*)::integer from refunds
     where reservation_id in ('e2c20000-0000-4000-8000-000000000301', 'e2c20000-0000-4000-8000-000000000303') $$,
  $$ values (3) $$,
  'refused refunds leave no row behind'
);

select throws_ok(
  $$ select * from reservation_refundable_net('e2c20000-0000-4000-8000-000000000999') $$,
  'P0001', 'Reservation was not found', 'the net of an unknown reservation is refused'
);

select results_eq(
  $$ select report.refunds_amount - baseline.refunds_amount, report.net_amount - baseline.net_amount
     from daily_revenue_report report, report_baseline baseline
     where report.day = (now() at time zone 'UTC')::date and report.currency = 'CRC' $$,
  $$ values (1000::numeric, -1000::numeric) $$,
  'the daily report moves by the CRC refunds apart from USD'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000002","role":"authenticated"}';

select results_eq(
  $$ select private.reservation_refundable_amount('e2c20000-0000-4000-8000-000000000302', 'USD') $$,
  $$ values (0::numeric) $$,
  'an Operations worker reading the helper directly sees no charged money'
);

select throws_ok(
  $$ select record_reservation_refund(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000302', 'currency', 'USD', 'amount', 1, 'reason', 'Rain cut')) $$,
  'P0001', 'Reservations access is required', 'an Operations worker is refused before the payload is read'
);

select * from finish();
rollback;
