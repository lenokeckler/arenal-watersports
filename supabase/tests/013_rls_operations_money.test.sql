begin;
select plan(47);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'diego@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas'),
  ('44444444-4444-4444-4444-444444444444', 'diego', 'Diego', 'operaciones');

delete from worker_areas
 where worker_id = '44444444-4444-4444-4444-444444444444' and area = 'operaciones';

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Jet Ski', 'by_unit', true, 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into equipment_categories (id, name, tracking_mode, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000002', 'Chaleco', 'by_quantity',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-01',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into tariffs (category_id, type, amount_usd, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'rental', 120,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
values ('dddddddd-0000-0000-0000-000000000001', 'tariff', 120, 'USD', 'Efectivo',
        '11111111-1111-1111-1111-111111111111');

insert into refunds (reservation_id, amount, currency, reason, created_by)
values ('dddddddd-0000-0000-0000-000000000001', 60, 'USD',
        'Cliente cancelo por mal clima', '11111111-1111-1111-1111-111111111111');

insert into deposits (reservation_id, amount, currency, created_by)
values ('dddddddd-0000-0000-0000-000000000001', 200, 'USD',
        '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select lives_ok(
  $$ insert into extras (id, name, price_usd)
     values ('eeeeeeee-0000-0000-0000-000000000001', 'Tabla Wakeboard', 20) $$,
  'administracion crea extras'
);

select lives_ok(
  $$ insert into combos (id, name, audience, package_price_usd)
     values ('cccccccc-0000-0000-0000-000000000001', 'Paquete Familiar', 'foreign', 300) $$,
  'administracion crea combos'
);

select lives_ok(
  $$ insert into combo_items (combo_id, category_id, quantity)
     values ('cccccccc-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000002', 4) $$,
  'administracion arma el combo'
);

select lives_ok(
  $$ insert into extra_compatibility (extra_id, unit_id)
     values ('eeeeeeee-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001') $$,
  'administracion define compatibilidad de extras'
);

select lives_ok(
  $$ insert into tariffs (category_id, type, amount_usd)
     values ('aaaaaaaa-0000-0000-0000-000000000001', 'tour', 80) $$,
  'administracion crea tarifas'
);

with u as (
     update tariffs set amount_usd = 130
     where category_id = 'aaaaaaaa-0000-0000-0000-000000000001' and type = 'rental'
     returning 1
)
select is((select count(*)::int from u), 1, 'administracion actualiza tarifas');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ insert into tariffs (category_id, type, amount_usd)
     values ('aaaaaaaa-0000-0000-0000-000000000002', 'rental', 50) $$,
  '42501', null,
  'reservas no crea tarifas'
);

select throws_ok(
  $$ insert into extras (name, price_usd) values ('Extra No Autorizado', 15) $$,
  '42501', null,
  'reservas no crea extras'
);

select throws_ok(
  $$ insert into combos (name, audience, package_price_usd) values ('Combo No Autorizado', 'foreign', 100) $$,
  '42501', null,
  'reservas no crea combos'
);

with u as (
     update reservations set people_count = 3
     where id = 'dddddddd-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 1, 'reservas modifica la reserva');

select lives_ok(
  $$ insert into reservation_guides (reservation_id, worker_id)
     values ('dddddddd-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222') $$,
  'reservas asigna un guia'
);

select lives_ok(
  $$ insert into reservation_items (reservation_id, unit_id)
     values ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001') $$,
  'reservas agrega un item a la reserva'
);

select is(
  (select count(*)::int from reservation_charges),
  1,
  'reservas si ve los cobros'
);
select is(
  (select count(*)::int from refunds),
  1,
  'reservas si ve los reembolsos'
);
select is(
  (select count(*)::int from deposits),
  1,
  'reservas si ve los depositos'
);

select lives_ok(
  $$ insert into deposits (reservation_id, amount, currency)
     values ('dddddddd-0000-0000-0000-000000000001', 150, 'USD') $$,
  'reservas registra un deposito'
);

with u as (
     update deposits set amount = 250
     where reservation_id = 'dddddddd-0000-0000-0000-000000000001' and amount = 200
     returning 1
)
select is((select count(*)::int from u), 1, 'reservas actualiza un deposito');

select lives_ok(
  $$ insert into refunds (reservation_id, amount, currency, reason)
     values ('dddddddd-0000-0000-0000-000000000001', 30, 'USD', 'Ajuste menor') $$,
  'reservas registra un reembolso'
);

select lives_ok(
  $$ insert into reservation_charges (reservation_id, kind, amount, currency, payment_method)
     values ('dddddddd-0000-0000-0000-000000000001', 'extra_time', 30, 'USD', 'Tarjeta') $$,
  'reservas registra un cobro'
);

select lives_ok(
  $$ insert into reservation_pricing
       (reservation_id, list_amount_usd, agreed_amount_usd)
     values ('dddddddd-0000-0000-0000-000000000001', 480, 400) $$,
  'reservas fija el precio de la reserva'
);

select is(
  (select count(*)::int from reservation_pricing),
  1,
  'reservas si ve el precio de la reserva'
);

with u as (
     update reservation_pricing set agreed_amount_usd = 350
     where reservation_id = 'dddddddd-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 1, 'reservas acuerda un precio distinto');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from reservations),
  1,
  'operaciones ve las reservas que despacha'
);

select is(
  (select count(*)::int from tariffs),
  2,
  'operaciones consulta las tarifas'
);
select is(
  (select count(*)::int from extras),
  1,
  'operaciones consulta los extras'
);
select is(
  (select count(*)::int from combos),
  1,
  'operaciones consulta los combos'
);

select is(
  (select count(*)::int from reservation_charges),
  0,
  'operaciones no ve los cobros'
);
select is(
  (select count(*)::int from refunds),
  0,
  'operaciones no ve los reembolsos'
);
select is(
  (select count(*)::int from deposits),
  0,
  'operaciones no ve los depositos'
);

select is(
  (select count(*)::int from reservation_pricing),
  0,
  'operaciones no ve el precio de la reserva'
);

select throws_ok(
  $$ insert into reservation_charges (reservation_id, kind, amount, currency, payment_method)
     values ('dddddddd-0000-0000-0000-000000000001', 'tariff', 10, 'USD', 'Efectivo') $$,
  '42501', null,
  'operaciones no inserta cobros'
);
select throws_ok(
  $$ insert into refunds (reservation_id, amount, currency, reason)
     values ('dddddddd-0000-0000-0000-000000000001', 10, 'USD', 'Prueba') $$,
  '42501', null,
  'operaciones no inserta reembolsos'
);
select throws_ok(
  $$ insert into deposits (reservation_id, amount, currency)
     values ('dddddddd-0000-0000-0000-000000000001', 50, 'USD') $$,
  '42501', null,
  'operaciones no inserta depositos'
);

select throws_ok(
  $$ insert into reservation_pricing (reservation_id, agreed_amount_usd)
     values ('dddddddd-0000-0000-0000-000000000001', 10) $$,
  '42501', null,
  'operaciones no escribe el precio de la reserva'
);

with u as (
     update reservation_pricing set agreed_amount_usd = 1
     where reservation_id = 'dddddddd-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 0, 'operaciones no cambia el precio acordado');

with u as (
     update deposits set amount = 999
     where amount = 250
     returning 1
)
select is((select count(*)::int from u), 0, 'operaciones no actualiza depositos');

with u as (
     update reservations set dispatched_at = now()
     where id = 'dddddddd-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 1, 'operaciones despacha la reserva');

select is(
  (select count(*)::int from reservation_guides),
  1,
  'operaciones lee la asignacion de guias'
);
select is(
  (select count(*)::int from reservation_items),
  1,
  'operaciones lee los items de la reserva'
);

select throws_ok(
  $$ insert into reservation_guides (reservation_id, worker_id)
     values ('dddddddd-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333') $$,
  '42501', null,
  'operaciones no asigna guias'
);

select throws_ok(
  $$ insert into tariffs (category_id, type, amount_usd)
     values ('aaaaaaaa-0000-0000-0000-000000000002', 'rental', 50) $$,
  '42501', null,
  'operaciones no crea tarifas'
);
select throws_ok(
  $$ insert into extras (name, price_usd) values ('Extra No Autorizado', 15) $$,
  '42501', null,
  'operaciones no crea extras'
);
select throws_ok(
  $$ insert into combos (name, audience, package_price_usd) values ('Combo No Autorizado', 'foreign', 100) $$,
  '42501', null,
  'operaciones no crea combos'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';

with u as (
     update reservations set people_count = 9
     where id = 'dddddddd-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 0, 'quien no tiene area asignada no actualiza la reserva');

select is(
  (select count(*)::int from reservations),
  0,
  'quien no tiene area asignada no ve reservas'
);

select is(
  (select count(*)::int from reservation_pricing),
  0,
  'quien no tiene area asignada no ve el precio de la reserva'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(
  (select count(*)::int from reservation_pricing),
  1,
  'administracion ve el precio que fijo reservas'
);

select * from finish();
rollback;
