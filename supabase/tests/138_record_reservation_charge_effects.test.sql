begin;
select plan(18);
\ir fixtures/reservation_charge.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select set_config('res23.before_updated_at', updated_at::text, true) from reservations where id = 'e2c20000-0000-4000-8000-000000000301';

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 40,
       'payment_method', '  Efectivo  ')) $$,
  'a scheduled reservation accepts a charge'
);

select results_eq(
  $$ select kind::text, amount, currency::text, payment_method, created_by
     from reservation_charges where reservation_id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values ('tariff', 40::numeric, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'::uuid) $$,
  'the charge is a trimmed tariff row stamped with the caller'
);

select results_eq(
  $$ select recorded_by_name, charged_amount, charged_payment_method
     from record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000302', 'currency', 'USD', 'amount', 60,
       'payment_method', 'Tarjeta')) $$,
  $$ values ('RES23 Reservas', 60::numeric, 'Tarjeta') $$,
  'the result names the worker who recorded the charge'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values (40::numeric, null::numeric, null::numeric, null::numeric) $$,
  'the missing pricing row keeps the list price of the charged currency only'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'CRC', 'amount', 15000,
       'payment_method', 'Efectivo')) $$,
  'a charge in the other currency is accepted'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values (40::numeric, 20000::numeric, null::numeric, 15000::numeric) $$,
  'a different amount becomes the agreed price of its own currency and backfills its list price'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 5,
       'payment_method', 'Efectivo')) $$,
  'a second charge in the same currency is accepted'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values (40::numeric, 20000::numeric, null::numeric, 15000::numeric) $$,
  'a later charge never rewrites the pricing'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000304', 'currency', 'CRC', 'amount', 9000,
       'payment_method', 'Efectivo')) $$,
  'a charge in a currency without a proposal is accepted'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000304' $$,
  $$ values (null::numeric, null::numeric, null::numeric, 9000::numeric) $$,
  'a charge without a proposal is stored as the agreed price'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000305', 'currency', 'USD', 'amount', 70,
       'payment_method', 'Efectivo')),
     record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000305', 'currency', 'CRC', 'amount', 50000,
       'payment_method', 'Efectivo')) $$,
  'an existing pricing row accepts charges in both currencies'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000305' $$,
  $$ values (100::numeric, 50000::numeric, 70::numeric, null::numeric) $$,
  'an existing row keeps its list prices and only gains the agreed amount that differs'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000310', 'currency', 'USD', 'amount', 40,
       'payment_method', 'Efectivo')),
     record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000311', 'currency', 'USD', 'amount', 40,
       'payment_method', 'Efectivo')) $$,
  'dispatched and closed reservations accept a charge'
);

select results_eq(
  $$ select (select count(*) from reservation_charges where reservation_id = 'e2c20000-0000-4000-8000-000000000301'),
            (select count(*) from refunds where reservation_id = 'e2c20000-0000-4000-8000-000000000301'),
            (select updated_at::text = current_setting('res23.before_updated_at') from reservations
             where id = 'e2c20000-0000-4000-8000-000000000301') $$,
  $$ values (3::bigint, 0::bigint, true) $$,
  'a party of six is charged per reservation, refunds nothing and leaves the reservation untouched'
);

select results_eq(
  $$ select charged_amount, charged_currency::text from record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000303', 'currency', 'CRC', 'amount', '9999999999.50',
       'payment_method', 'Efectivo')) $$,
  $$ values (9999999999.50::numeric, 'CRC') $$,
  'an amount sent as text is stored as a number'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000302', 'currency', 'CRC', 'amount', 1,
       'payment_method', 'Forged', 'created_by', 'e2c20000-0000-4000-8000-000000000002',
       'kind', 'extra_time')) $$,
  'a payload with extra keys is accepted'
);
select results_eq(
  $$ select created_by, kind::text from reservation_charges where payment_method = 'Forged' $$,
  $$ values ('e2c20000-0000-4000-8000-000000000001'::uuid, 'tariff') $$,
  'payload keys cannot forge the author or the kind of a charge'
);
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000003","role":"authenticated"}';

select results_eq(
  $$ select recorded_by_name from record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000307', 'currency', 'USD', 'amount', 5,
       'payment_method', 'Efectivo')) $$,
  $$ values ('RES23 Admin') $$,
  'an administrator in reservas mode records a charge under their own name'
);

select * from finish();
rollback;
