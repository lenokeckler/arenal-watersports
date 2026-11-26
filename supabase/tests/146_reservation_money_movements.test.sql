begin;
select plan(8);
\ir fixtures/reservation_charge.sql.fixture

insert into refunds (id, reservation_id, amount, currency, reason, created_by)
values ('e2c20000-0000-4000-8000-000000000701', 'e2c20000-0000-4000-8000-000000000301', 20, 'USD', 'RES26 refund',
        'e2c20000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 40,
       'payment_method', 'Efectivo')),
     record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'CRC', 'amount', 15000,
       'payment_method', 'Tarjeta')),
     record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'USD', 'amount', 5,
       'payment_method', 'Sinpe')) $$,
  'one reservation takes several charges, none refused for an earlier one'
);

select results_eq(
  $$ select amount, currency::text, payment_method, created_by
     from reservation_charges where reservation_id = 'e2c20000-0000-4000-8000-000000000301'
     order by amount $$,
  $$ values
       (5::numeric, 'USD', 'Sinpe', 'e2c20000-0000-4000-8000-000000000001'::uuid),
       (40::numeric, 'USD', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'::uuid),
       (15000::numeric, 'CRC', 'Tarjeta', 'e2c20000-0000-4000-8000-000000000001'::uuid) $$,
  'each charge keeps its own amount, currency, method and author'
);

select results_eq(
  $$ select count(*), count(distinct id) from reservation_charges
     where reservation_id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values (3::bigint, 3::bigint) $$,
  'the charges are separate rows'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000003","role":"authenticated"}';

select lives_ok(
  $$ select record_reservation_charge(jsonb_build_object(
       'reservation_id', 'e2c20000-0000-4000-8000-000000000301', 'currency', 'CRC', 'amount', 1000,
       'payment_method', 'Transferencia')) $$,
  'a second worker adds a charge to the same reservation'
);

select results_eq(
  $$ select amount, created_by from reservation_charges
     where reservation_id = 'e2c20000-0000-4000-8000-000000000301'
     order by amount $$,
  $$ values
       (5::numeric, 'e2c20000-0000-4000-8000-000000000001'::uuid),
       (40::numeric, 'e2c20000-0000-4000-8000-000000000001'::uuid),
       (1000::numeric, 'e2c20000-0000-4000-8000-000000000003'::uuid),
       (15000::numeric, 'e2c20000-0000-4000-8000-000000000001'::uuid) $$,
  'each charge stays under the name of the worker who made it'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select id is not null, amount, currency::text, kind::text, payment_method, created_by, created_at is not null
     from reservation_charges where reservation_id = 'e2c20000-0000-4000-8000-000000000301'
     order by amount $$,
  $$ values
       (true, 5::numeric, 'USD', 'tariff', 'Sinpe', 'e2c20000-0000-4000-8000-000000000001'::uuid, true),
       (true, 40::numeric, 'USD', 'tariff', 'Efectivo', 'e2c20000-0000-4000-8000-000000000001'::uuid, true),
       (true, 1000::numeric, 'CRC', 'tariff', 'Transferencia', 'e2c20000-0000-4000-8000-000000000003'::uuid, true),
       (true, 15000::numeric, 'CRC', 'tariff', 'Tarjeta', 'e2c20000-0000-4000-8000-000000000001'::uuid, true) $$,
  'a Reservations worker reads every column of the charge movements'
);

select results_eq(
  $$ select id, amount, currency::text, reason, created_by, created_at is not null
     from refunds where reservation_id = 'e2c20000-0000-4000-8000-000000000301' $$,
  $$ values ('e2c20000-0000-4000-8000-000000000701'::uuid, 20::numeric, 'USD', 'RES26 refund',
             'e2c20000-0000-4000-8000-000000000001'::uuid, true) $$,
  'a Reservations worker reads every column of the refund movements'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000002","role":"authenticated"}';

select results_eq(
  $$ select (select count(*) from refunds), (select count(*) from reservation_charges) $$,
  $$ values (0::bigint, 0::bigint) $$,
  'an Operations worker sees no money movements'
);

select * from finish();
rollback;
