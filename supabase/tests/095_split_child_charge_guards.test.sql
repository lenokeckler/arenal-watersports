begin;
select plan(8);

\ir fixtures/split_reservation.sql.fixture

insert into reservation_charges (id, reservation_id, kind, amount, currency, payment_method, created_by)
values ('e2900000-0000-4000-8000-000000000401', 'e2900000-0000-4000-8000-000000000301', 'tariff', 50, 'USD', 'cash',
        'e2900000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
     values ('e2900000-0000-4000-8000-000000000302', 'tariff', 20, 'USD', 'cash', 'e2900000-0000-4000-8000-000000000001') $$,
  'P0001', 'una salida nacida de una division solo admite tiempo adicional: el cobro de tarifa se queda en la reserva original',
  'a worker cannot charge a tariff on a departure'
);

select lives_ok(
  $$ insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
     values ('e2900000-0000-4000-8000-000000000302', 'extra_time', 10, 'USD', 'cash', 'e2900000-0000-4000-8000-000000000001') $$,
  'a departure accepts an extra time charge'
);

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, created_by)
     values ('e2900000-0000-4000-8000-000000000302', 30, 'USD', 'e2900000-0000-4000-8000-000000000001') $$,
  'P0001', 'el deposito de garantia se queda en la reserva original, no en una salida nacida de una division',
  'a worker cannot hold a deposit on a departure'
);

select lives_ok(
  $$ insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
     values ('e2900000-0000-4000-8000-000000000301', 'tariff', 20, 'USD', 'cash', 'e2900000-0000-4000-8000-000000000001') $$,
  'the original reservation accepts a tariff charge'
);

select lives_ok(
  $$ insert into deposits (reservation_id, amount, currency, created_by)
     values ('e2900000-0000-4000-8000-000000000301', 30, 'USD', 'e2900000-0000-4000-8000-000000000001') $$,
  'the original reservation holds the deposit'
);

reset role;

select throws_ok(
  $$ insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
     values ('e2900000-0000-4000-8000-000000000302', 'tariff', 20, 'USD', 'cash', 'e2900000-0000-4000-8000-000000000001') $$,
  'P0001', 'una salida nacida de una division solo admite tiempo adicional: el cobro de tarifa se queda en la reserva original',
  'the tariff refusal also applies to superuser writes'
);

select throws_ok(
  $$ update reservation_charges set reservation_id = 'e2900000-0000-4000-8000-000000000302'
     where id = 'e2900000-0000-4000-8000-000000000401' $$,
  'P0001', 'una salida nacida de una division solo admite tiempo adicional: el cobro de tarifa se queda en la reserva original',
  'an existing tariff charge cannot move to a departure'
);

select throws_ok(
  $$ insert into reservation_pricing (reservation_id, agreed_amount_usd, created_by, updated_by)
     values ('e2900000-0000-4000-8000-000000000302', 50,
             'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001') $$,
  'P0001', 'una salida nacida de una division no lleva cobro propio: se cobra por reserva y no por persona, asi que el cobro se queda completo en la reserva original',
  'a departure still cannot carry its own pricing'
);

select * from finish();
rollback;
