begin;
select plan(7);
\ir fixtures/split_reservation.sql.fixture

insert into reservation_charges (id, reservation_id, kind, amount, currency, payment_method, created_by)
values ('e2900000-0000-4000-8000-000000000a01', 'e2900000-0000-4000-8000-000000000302', 'extra_time', 5, 'USD', 'cash',
        'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000a02', 'e2900000-0000-4000-8000-000000000301', 'extra_time', 5, 'USD', 'cash',
        'e2900000-0000-4000-8000-000000000001');

insert into deposits (id, reservation_id, amount, currency, created_by)
values ('e2900000-0000-4000-8000-000000000b01', 'e2900000-0000-4000-8000-000000000301', 30, 'USD',
        'e2900000-0000-4000-8000-000000000001');

select throws_ok(
  $$ update reservation_charges set kind = 'tariff' where id = 'e2900000-0000-4000-8000-000000000a01' $$,
  'P0001', 'una salida nacida de una division solo admite tiempo adicional: el cobro de tarifa se queda en la reserva original',
  'an extra time charge of a departure cannot become a tariff'
);

select lives_ok(
  $$ update reservation_charges set amount = 9 where id = 'e2900000-0000-4000-8000-000000000a01' $$,
  'the amount of a departure extra time charge can change'
);

select lives_ok(
  $$ update reservation_charges set reservation_id = 'e2900000-0000-4000-8000-000000000302'
     where id = 'e2900000-0000-4000-8000-000000000a02' $$,
  'an extra time charge can move to a departure'
);

select throws_ok(
  $$ update deposits set reservation_id = 'e2900000-0000-4000-8000-000000000302'
     where id = 'e2900000-0000-4000-8000-000000000b01' $$,
  'P0001', 'el deposito de garantia se queda en la reserva original, no en una salida nacida de una division',
  'an existing deposit cannot move to a departure'
);

select lives_ok(
  $$ update deposits set amount = 40 where id = 'e2900000-0000-4000-8000-000000000b01' $$,
  'the amount of the deposit of the original can change'
);

select throws_ok(
  $$ insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
     values ('e2900000-0000-4000-8000-000000000302', 'tariff', 0, 'USD', 'cash', 'e2900000-0000-4000-8000-000000000001') $$,
  'P0001', null,
  'a zero tariff on a departure is refused too'
);

select is(
  (select count(*)::integer from reservation_charges where reservation_id = 'e2900000-0000-4000-8000-000000000302'),
  2,
  'the departure keeps only its extra time charges'
);

select * from finish();
rollback;
