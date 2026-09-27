begin;
select plan(18);

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
values ('dddddddd-0000-0000-0000-000000000001', 'tariff', 60, 'USD', 'Efectivo',
        '11111111-1111-1111-1111-111111111111'),
       ('dddddddd-0000-0000-0000-000000000001', 'tariff', 30000, 'CRC', 'SINPE',
        '11111111-1111-1111-1111-111111111111');

select is(
  (select count(distinct currency)::int from reservation_charges
   where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  2,
  'una reserva se paga parte en dolares y parte en colones'
);

select throws_ok(
  $$ insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 'tariff', 0, 'USD', 'Efectivo',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un cobro con monto cero es rechazado'
);

select throws_ok(
  $$ insert into refunds (reservation_id, amount, currency, reason, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 0, 'USD', 'Cancelacion',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'una devolucion con monto cero es rechazada'
);

select lives_ok(
  $$ insert into refunds (reservation_id, amount, currency, reason, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 30, 'USD', 'Cancelacion parcial',
             '11111111-1111-1111-1111-111111111111') $$,
  'un monto de devolucion valido se acepta'
);

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 0, 'USD',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un deposito con monto cero es rechazado'
);

insert into deposits (id, reservation_id, amount, currency, created_by)
values ('eeeeeeee-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000001',
        200, 'USD', '11111111-1111-1111-1111-111111111111');

select is(
  (select status from deposits where id = 'eeeeeeee-0000-0000-0000-000000000001'),
  'held'::deposit_status,
  'un deposito nuevo queda en estado held'
);

select has_index(
  'deposits', 'deposits_pending_idx',
  'el indice deposits_pending_idx existe'
);

select matches(
  (select indexdef from pg_indexes
   where schemaname = 'public' and tablename = 'deposits' and indexname = 'deposits_pending_idx'),
  'WHERE \(status = ''held''::deposit_status\)',
  'el indice deposits_pending_idx sigue filtrado por status = held'
);

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, status, resolved_at, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 100, 'USD', 'held', now(),
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un deposito held no puede llevar resolved_at'
);

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, status, retained_amount, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 100, 'USD', 'held', 40,
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un deposito held no puede llevar retained_amount'
);

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, status, resolved_by, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 100, 'USD', 'returned',
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un deposito resuelto sin resolved_at es rechazado'
);

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, status, resolved_at, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 100, 'USD', 'returned', now(),
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un deposito resuelto sin resolved_by es rechazado'
);

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, status, retention_reason,
                            resolved_by, resolved_at, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 100, 'USD', 'retained', 'Golpe',
             '11111111-1111-1111-1111-111111111111', now(),
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un deposito retenido sin retained_amount es rechazado'
);

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, status, retained_amount,
                            resolved_by, resolved_at, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 100, 'USD', 'retained', 50,
             '11111111-1111-1111-1111-111111111111', now(),
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un deposito retenido sin retention_reason es rechazado'
);

select throws_ok(
  $$ update deposits
     set status = 'partially_retained', retained_amount = 500,
         retention_reason = 'Golpe', resolved_by = '11111111-1111-1111-1111-111111111111',
         resolved_at = now()
     where id = 'eeeeeeee-0000-0000-0000-000000000001' $$,
  '23514', null,
  'no se retiene mas de lo depositado'
);

insert into deposits (id, reservation_id, amount, currency, created_by)
values ('eeeeeeee-0000-0000-0000-000000000007', 'dddddddd-0000-0000-0000-000000000001',
        100, 'USD', '11111111-1111-1111-1111-111111111111');

select lives_ok(
  $$ update deposits
     set status = 'retained', retained_amount = 50, retention_reason = 'Golpe leve',
         resolved_by = '11111111-1111-1111-1111-111111111111', resolved_at = now()
     where id = 'eeeeeeee-0000-0000-0000-000000000007' $$,
  'un deposito held se puede resolver'
);

update deposits
set status = 'returned', resolved_by = '11111111-1111-1111-1111-111111111111', resolved_at = now()
where id = 'eeeeeeee-0000-0000-0000-000000000001';

select throws_ok(
  $$ update deposits set status = 'held'
     where id = 'eeeeeeee-0000-0000-0000-000000000001' $$,
  'Un deposito ya resuelto no cambia de estado'
);
select throws_ok(
  $$ update deposits set status = 'retained', retained_amount = 200,
         retention_reason = 'Aparecio un golpe'
     where id = 'eeeeeeee-0000-0000-0000-000000000001' $$,
  'Un deposito ya resuelto no cambia de estado'
);

select * from finish();
rollback;
