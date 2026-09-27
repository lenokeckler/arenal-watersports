begin;
select plan(46);

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Jet Ski', 'by_unit', true, true, 'engine_hours', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('aaaaaaaa-0000-0000-0000-000000000002', 'Kayak doble', 'by_quantity', true, false, null, 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-01',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_stock (category_id, quantity_available, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000002', 6, '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 120, 'scheduled',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000002', 2,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select count(*)::int from unit_conflicts(
     'bbbbbbbb-0000-0000-0000-000000000001',
     '2026-09-05 11:00:00+00', '2026-09-05 13:00:00+00')),
  1,
  'una franja que se solapa devuelve el choque'
);
select is(
  (select count(*)::int from unit_conflicts(
     'bbbbbbbb-0000-0000-0000-000000000001',
     '2026-09-05 12:00:00+00', '2026-09-05 14:00:00+00')),
  0,
  'una franja que arranca justo al terminar la otra no choca'
);

select is(
  (select count(*)::int from unit_conflicts(
     'bbbbbbbb-0000-0000-0000-000000000001',
     '2026-09-05 08:00:00+00', '2026-09-05 10:00:00+00')),
  0,
  'una franja que termina justo al arrancar la otra no choca'
);

select is(
  (select count(*)::int from unit_conflicts(
     'bbbbbbbb-0000-0000-0000-000000000001',
     '2026-09-05 09:59:00+00', '2026-09-05 10:01:00+00')),
  1,
  'un minuto de solape si choca'
);

select is(
  (select free from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000002',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00')),
  4,
  'quedan 4 kayaks libres de 6 con 2 comprometidos'
);

select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'available',
  'una reserva agendada todavia no ocupa la unidad'
);

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes,
   created_by, updated_by)
values ('cccccccc-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000001',
        'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-05 10:00:00+00', 120,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
update reservation_items set dispatch_id = 'cccccccc-0000-0000-0000-000000000001'
where reservation_id = 'dddddddd-0000-0000-0000-000000000001'
  and unit_id = 'bbbbbbbb-0000-0000-0000-000000000001';

select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'occupied',
  'al despachar, la unidad aparece ocupada sin que nadie lo digite'
);

select is(
  (select reservation_id from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'dddddddd-0000-0000-0000-000000000001'::uuid,
  'la unidad ocupada apunta a la reserva que la tiene'
);
select ok(
  (select returns_at from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001')
  = '2026-09-05 12:00:00+00'::timestamptz,
  'returns_at es el ends_at del grupo de despacho que ocupa la unidad, no el de la reserva'
);

select is(
  (select count(*)::int from unit_conflicts(
     'bbbbbbbb-0000-0000-0000-000000000001',
     '2026-09-05 11:00:00+00', '2026-09-05 13:00:00+00')),
  1,
  'una reserva despachada tambien choca'
);

select is(
  (select count(*)::int from unit_conflicts(
     'bbbbbbbb-0000-0000-0000-000000000001',
     '2026-09-05 11:00:00+00', '2026-09-05 13:00:00+00',
     'dddddddd-0000-0000-0000-000000000001')),
  0,
  'excluir la propia reserva la saca del choque'
);

select lives_ok(
  $$ select * from unit_conflicts(
       'bbbbbbbb-0000-0000-0000-000000000001',
       '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00') $$,
  'unit_conflicts no revienta sobre una franja totalmente choque'
);

insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-02',
        'in_maintenance',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-03',
        'damaged',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-04',
        'in_repair',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('bbbbbbbb-0000-0000-0000-000000000006', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-06',
        'available',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('bbbbbbbb-0000-0000-0000-000000000007', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-07',
        'available',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, decommissioned_at, decommission_reason,
                              created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-05',
        'decommissioned', now(), 'fin de vida util',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, dispatched_at,
   created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000002', 'Carlos', 1, 'rental',
        '2026-09-06 09:00:00+00', 60, 'dispatched', now(),
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('dddddddd-0000-0000-0000-000000000003', 'Carlos', 1, 'rental',
        '2026-09-06 09:00:00+00', 60, 'dispatched', now(),
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('dddddddd-0000-0000-0000-000000000004', 'Carlos', 1, 'rental',
        '2026-09-06 09:00:00+00', 60, 'dispatched', now(),
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('dddddddd-0000-0000-0000-000000000005', 'Carlos', 1, 'rental',
        '2026-09-06 09:00:00+00', 60, 'dispatched', now(),
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000002',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('dddddddd-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000003',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('dddddddd-0000-0000-0000-000000000004', 'bbbbbbbb-0000-0000-0000-000000000004',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('dddddddd-0000-0000-0000-000000000005', 'bbbbbbbb-0000-0000-0000-000000000005',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'in_maintenance',
  'en mantenimiento gana aunque haya un despacho activo encima'
);
select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000003'),
  'damaged',
  'danada gana aunque haya un despacho activo encima'
);
select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000004'),
  'in_repair',
  'en reparacion gana aunque haya un despacho activo encima'
);
select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000005'),
  'decommissioned',
  'dada de baja gana aunque haya un despacho activo encima'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, closed_at,
   created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000006', 'Ana', 1, 'rental',
        '2026-09-06 09:00:00+00', 60, 'closed', now(),
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, cancellation_reason,
   created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000007', 'Ana', 1, 'rental',
        '2026-09-06 09:00:00+00', 60, 'cancelled', 'cliente cancelo',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000006', 'bbbbbbbb-0000-0000-0000-000000000006',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('dddddddd-0000-0000-0000-000000000007', 'bbbbbbbb-0000-0000-0000-000000000007',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000006'),
  'available',
  'una reserva cerrada no ocupa la unidad'
);
select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000007'),
  'available',
  'una reserva cancelada no ocupa la unidad'
);
select is(
  (select count(*)::int from unit_conflicts(
     'bbbbbbbb-0000-0000-0000-000000000006',
     '2026-09-06 09:00:00+00', '2026-09-06 10:00:00+00')),
  0,
  'una reserva cerrada no cuenta como choque'
);
select is(
  (select count(*)::int from unit_conflicts(
     'bbbbbbbb-0000-0000-0000-000000000007',
     '2026-09-06 09:00:00+00', '2026-09-06 10:00:00+00')),
  0,
  'una reserva cancelada no cuenta como choque'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000008', 'Pedro', 2, 'rental',
        '2026-09-05 14:00:00+00', 60, 'scheduled',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000008', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select free from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000002',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00')),
  4,
  'una reserva fuera de la franja no reduce lo disponible'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, cancellation_reason,
   created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000009', 'Pedro', 2, 'rental',
        '2026-09-05 10:30:00+00', 30, 'cancelled', 'no llego',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000009', 'aaaaaaaa-0000-0000-0000-000000000002', 3,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select free from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000002',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00')),
  4,
  'una reserva cancelada dentro de la franja no compromete cantidad'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, closed_at,
   created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000010', 'Pedro', 2, 'rental',
        '2026-09-05 10:15:00+00', 30, 'closed', now(),
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000010', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select free from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000002',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00')),
  4,
  'una reserva cerrada dentro de la franja no compromete cantidad'
);

select is(
  (select committed from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000002',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00',
     'dddddddd-0000-0000-0000-000000000001')),
  0,
  'excluir la propia reserva la saca de lo comprometido'
);
select is(
  (select free from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000002',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00',
     'dddddddd-0000-0000-0000-000000000001')),
  6,
  'sin su propio compromiso quedan las 6 unidades de cupo'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000011', 'Sofia', 4, 'rental',
        '2026-09-05 10:00:00+00', 60, 'scheduled',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000011', 'aaaaaaaa-0000-0000-0000-000000000002', 4,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select free from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000002',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00')),
  0,
  'con los 6 kayaks comprometidos quedan 0 libres'
);
select lives_ok(
  $$ select * from category_availability(
       'aaaaaaaa-0000-0000-0000-000000000002',
       '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00') $$,
  'category_availability no revienta sobre una franja totalmente agotada'
);

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000003', 'Tabla SUP', 'by_quantity', true, false, null, 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select count(*)::int from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000003',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00')),
  1,
  'una categoria sin fila de stock igual devuelve exactamente una fila'
);
select is(
  (select usable from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000003',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00')),
  0,
  'sin fila de stock, usable es 0'
);
select is(
  (select committed from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000003',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00')),
  0,
  'sin fila de stock, committed es 0'
);
select is(
  (select free from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000003',
     '2026-09-05 10:00:00+00', '2026-09-05 12:00:00+00')),
  0,
  'sin fila de stock, free es 0'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes,
   created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000012', 'Luis', 1, 'rental',
        '2026-09-05 10:15:00+00', 30,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000012', 'bbbbbbbb-0000-0000-0000-000000000001',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes,
   created_by, updated_by)
values ('cccccccc-0000-0000-0000-000000000002', 'dddddddd-0000-0000-0000-000000000012',
        'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-05 10:15:00+00', 30,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
update reservation_items set dispatch_id = 'cccccccc-0000-0000-0000-000000000002'
where reservation_id = 'dddddddd-0000-0000-0000-000000000012'
  and unit_id = 'bbbbbbbb-0000-0000-0000-000000000001';

select is(
  (select reservation_id from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'dddddddd-0000-0000-0000-000000000001'::uuid,
  'con dos despachos encima, gana la reserva que termina despues'
);
select ok(
  (select returns_at from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001')
  = '2026-09-05 12:00:00+00'::timestamptz,
  'returns_at refleja el fin mas tardio de los grupos de despacho activos, no el mas cercano'
);

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000004', 'Moto de agua', 'by_unit', true, true, 'engine_hours', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values
  ('eeeeeeee-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000004', 'MA-01', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000004', 'MA-02', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000004', 'MA-03', 'in_maintenance',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000004', 'MA-04', 'damaged',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-0000-0000-0000-000000000006', 'aaaaaaaa-0000-0000-0000-000000000004', 'MA-06', 'in_repair',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, decommissioned_at, decommission_reason,
                              created_by, updated_by)
values ('eeeeeeee-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000004', 'MA-05',
        'decommissioned', now(), 'fin de vida util',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select usable from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000004',
     '2026-09-07 09:00:00+00', '2026-09-07 10:00:00+00')),
  2,
  'una categoria por unidad cuenta usable con sus unidades available: MA-03 (mantenimiento), MA-04 (danada), MA-05 (de baja) y MA-06 (en reparacion) quedan fuera'
);
select is(
  (select committed from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000004',
     '2026-09-07 09:00:00+00', '2026-09-07 10:00:00+00')),
  0,
  'sin reservas todavia, nada comprometido'
);
select is(
  (select free from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000004',
     '2026-09-07 09:00:00+00', '2026-09-07 10:00:00+00')),
  2,
  'libre es igual a usable cuando no hay compromiso'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, dispatched_at,
   created_by, updated_by)
values ('ffffffff-0000-0000-0000-000000000001', 'Ana', 2, 'rental',
        '2026-09-07 09:00:00+00', 60, 'dispatched', now(),
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('ffffffff-0000-0000-0000-000000000001', 'eeeeeeee-0000-0000-0000-000000000001',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   created_by, updated_by)
values ('ffffffff-0000-0000-0000-000000000002', 'Beto', 1, 'rental',
        '2026-09-07 09:00:00+00', 60, 'scheduled',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by)
values ('ffffffff-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000004', 1,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   created_by, updated_by)
values ('ffffffff-0000-0000-0000-000000000003', 'Carla', 1, 'rental',
        '2026-09-08 09:00:00+00', 60, 'scheduled',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('ffffffff-0000-0000-0000-000000000003', 'eeeeeeee-0000-0000-0000-000000000002',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select committed from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000004',
     '2026-09-07 09:00:00+00', '2026-09-07 10:00:00+00')),
  2,
  'una linea de unidad y una de cantidad en la misma categoria se suman en committed'
);
select is(
  (select free from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000004',
     '2026-09-07 09:00:00+00', '2026-09-07 10:00:00+00')),
  0,
  'con las dos formas comprometidas no queda nada libre'
);
select is(
  (select committed from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000004',
     '2026-09-08 09:00:00+00', '2026-09-08 10:00:00+00')),
  1,
  'la franja sin solape con A ni B solo ve el compromiso de C'
);

select is(
  (select committed from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000004',
     '2026-09-07 09:00:00+00', '2026-09-07 10:00:00+00',
     'ffffffff-0000-0000-0000-000000000001')),
  1,
  'excluir la reserva A quita su linea de unidad y deja solo la de cantidad de B'
);
select is(
  (select committed from category_availability(
     'aaaaaaaa-0000-0000-0000-000000000004',
     '2026-09-07 09:00:00+00', '2026-09-07 10:00:00+00',
     'ffffffff-0000-0000-0000-000000000002')),
  1,
  'excluir la reserva B quita su linea de cantidad y deja solo la de unidad de A'
);

insert into auth.users (id, email) values
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'diego@arenal.local');

insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('44444444-4444-4444-4444-444444444444', 'diego', 'Diego', 'operaciones');

delete from worker_areas
 where worker_id = '44444444-4444-4444-4444-444444444444' and area = 'operaciones';

set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';

select is(
  (select count(*)::int from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  1,
  'units_select es abierto a cualquier autenticado, asi que la fila de la unidad sigue visible sin area'
);
select ok(
  (select reservation_id from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001') is null,
  'sin area, la vista ya no entrega el identificador de la reserva despachada'
);
select ok(
  (select returns_at from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001') is null,
  'sin area, la vista ya no entrega la hora de regreso de la reserva despachada'
);
select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'available',
  'sin la reserva a la vista, la unidad se reporta disponible: menos informacion, nunca informacion ajena'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select reservation_id from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'dddddddd-0000-0000-0000-000000000001'::uuid,
  'operaciones si tiene politica sobre reservations, asi que la vista le sigue mostrando el despacho activo'
);

reset role;

select * from finish();
rollback;
