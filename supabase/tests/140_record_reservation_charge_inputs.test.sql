begin;
select plan(17);
\ir fixtures/reservation_charge.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 9999999999.99, 'payment_method', 'Efectivo')) $$,
  'the largest dollar amount is accepted'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'CRC', 'amount', 999999999999.99, 'payment_method', 'Efectivo')) $$,
  'the largest colon amount is accepted'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 12.340, 'payment_method', 'Efectivo')) $$,
  'an amount equal to itself at two decimals is accepted'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 12.345, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Charge amount is invalid',
  'an amount with a third significant decimal is refused'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 1, 'payment_method', repeat('a', 60))) $$,
  'a payment method of sixty characters is accepted'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 1, 'payment_method', repeat('a', 61))) $$,
  'P0001', 'Payment method is too long',
  'a payment method of sixty-one characters is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 1, 'payment_method', E'	 
')) $$,
  'P0001', 'A payment method is required',
  'a payment method of tabs and newlines is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 1, 'payment_method', chr(160) || chr(160))) $$,
  'P0001', 'A payment method is required',
  'a payment method of non-breaking spaces is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 1, 'payment_method', 'Efec' || chr(1) || 'tivo')) $$,
  'P0001', 'Payment method is invalid',
  'a payment method with a control character is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 1, 'payment_method', E'Efec	tivo')) $$,
  'P0001', 'Payment method is invalid',
  'a payment method with an inner tab is refused'
);

select results_eq(
  $$ select charged_payment_method from record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 1, 'payment_method', E'	 Tarjeta
' || chr(160))) $$,
  $$ values ('Tarjeta') $$,
  'tabs, newlines and non-breaking spaces around a method are trimmed'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000317', 'currency', 'USD', 'amount', 35, 'payment_method', 'Efectivo')) $$,
  'a first charge on an empty pricing row is accepted'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000317' $$,
  $$ values (40::numeric, null::numeric, 35::numeric, null::numeric) $$,
  'the empty row gains the catalog list price and the agreed amount'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000305', 'currency', 'USD', 'amount', 100, 'payment_method', 'Efectivo')) $$,
  'a first charge on a row that already has an agreed amount is accepted'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000305' $$,
  $$ values (100::numeric, 50000::numeric, 100::numeric, null::numeric) $$,
  'a differing first charge replaces the agreed amount and keeps the list price'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object('reservation_id', 'e2c20000-0000-4000-8000-000000000305', 'currency', 'CRC', 'amount', 60000, 'payment_method', 'Efectivo')) $$,
  'a first charge in the other currency on an agreed row is accepted'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000305' $$,
  $$ values (100::numeric, 50000::numeric, 100::numeric, 60000::numeric) $$,
  'the other currency gains its agreed amount and the first currency is untouched'
);

select * from finish();
rollback;
