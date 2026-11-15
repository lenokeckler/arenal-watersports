begin;
select plan(16);
\ir fixtures/reservation_charge.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  format(
    $$ select record_reservation_charge(jsonb_build_object(
         'reservation_id', 'e2c20000-0000-4000-8000-000000000309', 'payment_method', 'Efectivo', 'parts', %L::jsonb)) $$,
    v.parts
  ),
  'P0001', 'Charge parts are invalid', 'parts that are ' || v.label || ' are refused'
)
from (values
  ('JSON null', 'null'),
  ('a string', '"USD"'),
  ('an object', '{}'),
  ('empty', '[]'),
  ('three elements', '[{"currency":"USD","amount":1},{"currency":"CRC","amount":1},{"currency":"USD","amount":1}]'),
  ('a number element', '[1]'),
  ('a repeated currency', '[{"currency":"USD","amount":1},{"currency":"USD","amount":2}]')
) as v(label, parts);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000309', 'payment_method', 'Efectivo',
       'parts', '[{"currency":"USD","amount":1},{"currency":"EUR","amount":1}]'::jsonb)) $$,
  'P0001', 'Charge currency is invalid', 'a part with an unknown currency is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000309', 'payment_method', 'Efectivo',
       'parts', '[{"currency":"USD","amount":1},{"currency":"CRC","amount":0}]'::jsonb)) $$,
  'P0001', 'Charge amount is invalid', 'a part with a zero amount is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000309', 'payment_method', 'Efectivo',
       'parts', '[{"currency":"USD","amount":"abc"}]'::jsonb)) $$,
  'P0001', 'Reservation payload is invalid', 'a part with a non-numeric amount is refused'
);

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000309', 'payment_method', '  ',
       'parts', '[{"currency":"USD","amount":1},{"currency":"CRC","amount":1}]'::jsonb)) $$,
  'P0001', 'A payment method is required', 'valid parts without a payment method are refused'
);

select results_eq(
  $$ select (select count(*) from reservation_charges where reservation_id = 'e2c20000-0000-4000-8000-000000000309'),
            (select count(*) from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000309') $$,
  $$ values (0::bigint, 0::bigint) $$,
  'no refused payload leaves a charge or a pricing row behind'
);

select results_eq(
  $$ select count(*) from information_schema.columns
     where table_schema = 'public' and table_name = 'reservations' and column_name ~ '(amount|price|usd|crc)' $$,
  $$ values (0::bigint) $$,
  'the reservation row has no amount or price column'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'payment_method', 'Efectivo',
       'parts', '[{"currency":"USD","amount":55},{"currency":"CRC","amount":18000}]'::jsonb)) $$,
  'a mixed charge is recorded'
);

select results_eq(
  $$ select count(*) from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values (1::bigint) $$,
  'reservas reads the pricing written by a mixed charge'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000002","role":"authenticated"}';

select results_eq(
  $$ select count(*) from reservation_pricing where reservation_id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values (0::bigint) $$,
  'operations cannot read the pricing written by a mixed charge'
);

select * from finish();
rollback;
