begin;
select plan(7);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Jet Ski', 'by_unit', true, true, 'engine_hours', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-01',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, dispatched_at,
   created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 120, 'dispatched', '2026-09-05 10:00:00+00',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values ('cccccccc-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000001',
        'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-05 10:00:00+00', 120,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, unit_id, dispatch_id, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001',
        'cccccccc-0000-0000-0000-000000000001',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

with u as (
     update reservations set status = 'cancelled', cancellation_reason = 'Tormenta electrica'
     where id = 'dddddddd-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 1, 'reservas cancela una salida en curso');

reset role;

select ok(
  (select closed_at from reservation_dispatches
   where id = 'cccccccc-0000-0000-0000-000000000001') is null,
  'cancelar la reserva no cierra el grupo de despacho que sigue abierto'
);
select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'occupied',
  'el equipo de una reserva cancelada sigue ocupado en el tablero hasta que operaciones lo cierre'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

with u as (
     update reservation_dispatches set closed_at = '2026-09-05 12:00:00+00'
     where id = 'cccccccc-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 1, 'operaciones cierra el grupo de una reserva cancelada por el flujo normal');

reset role;

select is(
  (select status from reservations
   where id = 'dddddddd-0000-0000-0000-000000000001'),
  'cancelled',
  'cerrar el ultimo grupo de una reserva cancelada la deja cancelada, no cerrada'
);
select ok(
  (select closed_at from reservations
   where id = 'dddddddd-0000-0000-0000-000000000001') is null,
  'una reserva cancelada nunca recibe closed_at al cerrar sus grupos'
);
select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'available',
  'con el grupo cerrado el equipo vuelve a estar disponible en el tablero'
);

select * from finish();
rollback;
