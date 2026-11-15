begin;
select plan(13);
\ir fixtures/reservation_charge.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select charged_amount, charged_currency::text, charged_payment_method, recorded_by_name
     from record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'payment_method', 'Efectivo',
       'parts', jsonb_build_array(
         jsonb_build_object('currency', 'USD', 'amount', 55),
         jsonb_build_object('currency', 'CRC', 'amount', 18000)))) $$,
  $$ values (55::numeric, 'USD', 'Efectivo', 'RES23 Reservas'),
            (18000::numeric, 'CRC', 'Efectivo', 'RES23 Reservas') $$,
  'a two-part payload returns one row per part in input order with the same method and author name'
);

select results_eq(
  $$ select kind::text, currency::text, amount, created_by
     from reservation_charges where reservation_id = 'e2c20000-0000-4000-8000-000000000301'
     order by currency $$,
  $$ values ('tariff', 'CRC', 18000::numeric, 'e2c20000-0000-4000-8000-000000000001'::uuid),
            ('tariff', 'USD', 55::numeric, 'e2c20000-0000-4000-8000-000000000001'::uuid) $$,
  'each part is a tariff row of its own currency stamped with the caller'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values (40::numeric, 20000::numeric, 55::numeric, 18000::numeric) $$,
  'differing parts become the agreed price of their own currency beside both list prices'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000310', 'payment_method', 'Efectivo',
       'parts', jsonb_build_array(
         jsonb_build_object('currency', 'USD', 'amount', 40),
         jsonb_build_object('currency', 'CRC', 'amount', 20000)))) $$,
  'parts equal to the proposals are accepted'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000310' $$,
  $$ values (40::numeric, 20000::numeric, null::numeric, null::numeric) $$,
  'parts equal to the proposals record only the list prices'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000305', 'currency', 'USD', 'amount', 70,
       'payment_method', 'Efectivo')),
     record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000305', 'payment_method', 'Efectivo',
       'parts', jsonb_build_array(
         jsonb_build_object('currency', 'USD', 'amount', 90),
         jsonb_build_object('currency', 'CRC', 'amount', 60000)))) $$,
  'a mixed charge after a dollar charge is accepted'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000305' $$,
  $$ values (100::numeric, 50000::numeric, 70::numeric, 60000::numeric) $$,
  'only the part that is first in its currency writes the agreed price'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000311', 'payment_method', 'Efectivo',
       'parts', jsonb_build_array(
         jsonb_build_object('currency', 'USD', 'amount', 40000),
         jsonb_build_object('currency', 'CRC', 'amount', 20000000)))),
     record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'payment_method', 'Efectivo',
       'parts', jsonb_build_array(jsonb_build_object('currency', 'USD', 'amount', 9999999999.99)))) $$,
  'parts a thousand times the list price and the storage ceiling are accepted'
);

select results_eq(
  $$ select charged_amount, charged_currency::text
     from record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000317', 'payment_method', 'Efectivo',
       'parts', jsonb_build_array(jsonb_build_object('currency', 'USD', 'amount', 35)))) $$,
  $$ values (35::numeric, 'USD') $$,
  'a one-element parts array returns one row'
);

select results_eq(
  $$ select list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc
     from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000317' $$,
  $$ values (40::numeric, null::numeric, 35::numeric, null::numeric) $$,
  'a one-element parts array prices like the single shape'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000302', 'payment_method', 'Forged',
       'created_by', 'e2c20000-0000-4000-8000-000000000002', 'kind', 'extra_time',
       'parts', jsonb_build_array(
         jsonb_build_object('currency', 'USD', 'amount', 1, 'created_by', 'e2c20000-0000-4000-8000-000000000002',
                            'kind', 'extra_time')))) $$,
  'extra keys in the payload and in a part are accepted'
);

select results_eq(
  $$ select created_by, kind::text from reservation_charges where payment_method = 'Forged' $$,
  $$ values ('e2c20000-0000-4000-8000-000000000001'::uuid, 'tariff') $$,
  'extra keys cannot forge the author or the kind of a part'
);

select results_eq(
  $$ select count(*) from record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000304', 'currency', 'CRC', 'amount', 9000,
       'payment_method', 'Efectivo')) $$,
  $$ values (1::bigint) $$,
  'the single-currency shape without parts still returns exactly one row'
);

select * from finish();
rollback;
