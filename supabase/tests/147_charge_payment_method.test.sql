begin;
select plan(3);
\ir fixtures/reservation_charge.sql.fixture

select is_empty(
  $$ select column_name from information_schema.columns
     where table_schema = 'public' and table_name = 'reservation_charges'
       and (column_name ilike '%card%' or column_name ilike '%tarjeta%'
         or column_name ilike '%processor%' or column_name ilike '%token%') $$,
  'a charge keeps no card, processor or token column'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000308', 'currency', 'CRC', 'amount', 1000, 'payment_method', method))
     from unnest(array['Efectivo', 'Tarjeta', 'PayPal', 'SINPE', 'Transferencia']) as method $$,
  'each of the five choices is recorded as a charge'
);

select results_eq(
  $$ select payment_method::text from reservation_charges
     where reservation_id = 'e2c20000-0000-4000-8000-000000000308'
     order by payment_method collate "C" $$,
  $$ values ('Efectivo'), ('PayPal'), ('SINPE'), ('Tarjeta'), ('Transferencia') $$,
  'every method is stored verbatim as the text it was sent with'
);

select * from finish();
rollback;
