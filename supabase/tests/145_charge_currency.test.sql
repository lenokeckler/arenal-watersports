begin;
select plan(7);
\ir fixtures/reservation_charge.sql.fixture

select results_eq(
  $$ select enum_range(null::currency_code)::text $$,
  $$ values ('{USD,CRC}') $$,
  'the currency enum holds exactly dollars and colones'
);

select results_eq(
  $$ select (string_agg(table_name::text, ',' order by table_name::text collate "C"))::text collate "C" from information_schema.columns
     where table_schema = 'public' and column_name = 'currency' and udt_name = 'currency_code'
       and table_name in (select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE') $$,
  $$ values ('deposits,refunds,reservation_charges'::text collate "C") $$,
  'exactly the charge, refund and deposit tables store their currency as the currency enum'
);

select is_empty(
  $$ select table_name, column_name from information_schema.columns
     where table_schema = 'public'
       and table_name in ('reservation_charges', 'reservation_pricing', 'refunds', 'deposits', 'tariffs')
       and (column_name ilike '%exchange%' or column_name ilike 'rate\_%' or column_name ilike '%\_rate') $$,
  'no money table keeps an exchange rate'
);

select is_empty(
  $$ select proname from pg_proc
     where pronamespace in ('public'::regnamespace, 'private'::regnamespace)
       and (proname ilike '%exchange\_rate%' or proname ilike '%convert%currency%' or proname ilike '%currency%convert%') $$,
  'no function converts between currencies'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'EUR', 'amount', 10, 'payment_method', 'Efectivo')) $$,
  null,
  'Charge currency is invalid',
  'a currency outside dollars and colones is refused'
);

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'CRC', 'amount', 5000, 'payment_method', 'Efectivo')),
     record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'CRC', 'amount', 2500, 'payment_method', 'Efectivo')),
     record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'USD', 'amount', 7, 'payment_method', 'Efectivo')) $$,
  'colones and dollars are recorded on the same reservation'
);

select results_eq(
  $$ select currency::text, sum(amount) from reservation_charges
     where reservation_id = 'e2c20000-0000-4000-8000-000000000308' group by currency order by currency $$,
  $$ values ('CRC', 7500::numeric), ('USD', 7::numeric) $$,
  'amounts stay in the currency they were entered in and add up per currency'
);

select * from finish();
rollback;
