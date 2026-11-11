begin;
select plan(3);

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 'NaN', 'USD',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un deposito con monto NaN es rechazado'
);

select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', -5, 'USD',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un deposito con monto negativo sigue siendo rechazado'
);

select lives_ok(
  $$ insert into deposits (reservation_id, amount, currency, created_by)
     values ('dddddddd-0000-0000-0000-000000000001', 50, 'USD',
             '11111111-1111-1111-1111-111111111111') $$,
  'un deposito con monto positivo se acepta'
);

select * from finish();
rollback;
