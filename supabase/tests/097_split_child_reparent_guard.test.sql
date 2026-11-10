begin;
select plan(6);
\ir fixtures/split_reservation.sql.fixture

insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
values ('e2900000-0000-4000-8000-000000000303', 'tariff', 50, 'USD', 'cash', 'e2900000-0000-4000-8000-000000000001');

insert into deposits (reservation_id, amount, currency, created_by)
values ('e2900000-0000-4000-8000-000000000304', 30, 'USD', 'e2900000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ update reservations set parent_reservation_id = 'e2900000-0000-4000-8000-000000000301'
     where id = 'e2900000-0000-4000-8000-000000000303' $$,
  'P0001', 'una reserva con cobro de tarifa o deposito no puede pasar a ser una salida nacida de una division',
  'a reservation that holds a tariff charge cannot become a departure'
);

select throws_ok(
  $$ update reservations set parent_reservation_id = 'e2900000-0000-4000-8000-000000000301'
     where id = 'e2900000-0000-4000-8000-000000000304' $$,
  'P0001', 'una reserva con cobro de tarifa o deposito no puede pasar a ser una salida nacida de una division',
  'a reservation that holds a deposit cannot become a departure'
);

select throws_ok(
  $$ update reservations set parent_reservation_id = 'e2900000-0000-4000-8000-000000000302'
     where id = 'e2900000-0000-4000-8000-000000000305' $$,
  'P0001', 'una salida nacida de una division debe apuntar a la reserva original',
  'a departure cannot point to another departure'
);

select throws_ok(
  $$ insert into reservations
       (customer_name, people_count, type, starts_at, duration_minutes, parent_reservation_id, created_by, updated_by)
     values ('RES19 Grandchild', 1, 'rental', '2035-04-20 15:00:00+00', 60, 'e2900000-0000-4000-8000-000000000302',
             'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001') $$,
  'P0001', 'una salida nacida de una division debe apuntar a la reserva original',
  'a new departure cannot point to another departure'
);

select lives_ok(
  $$ update reservations set parent_reservation_id = 'e2900000-0000-4000-8000-000000000301'
     where id = 'e2900000-0000-4000-8000-000000000305' $$,
  'a clean reservation can become a departure of the original'
);

select throws_ok(
  $$ update reservations set parent_reservation_id = 'e2900000-0000-4000-8000-000000000306'
     where id = 'e2900000-0000-4000-8000-000000000301' $$,
  'P0001', 'una reserva con salidas nacidas de una division no puede pasar a ser una salida',
  'a reservation that already has departures cannot become a departure'
);

reset role;
select * from finish();
rollback;
