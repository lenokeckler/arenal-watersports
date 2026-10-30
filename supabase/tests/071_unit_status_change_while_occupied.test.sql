begin;
select plan(3);

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Jet Ski', 'by_unit', true, true, 'engine_hours', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-01',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-02',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select lives_ok(
  $$update equipment_units set status = 'in_maintenance' where code = 'JET-02'$$,
  'una unidad libre puede pasar a mantenimiento'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 120, 'scheduled',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes,
   created_by, updated_by)
values ('cccccccc-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000001',
        'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-05 10:00:00+00', 120,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
update reservation_items set dispatch_id = 'cccccccc-0000-0000-0000-000000000001'
where reservation_id = 'dddddddd-0000-0000-0000-000000000001'
  and unit_id = 'bbbbbbbb-0000-0000-0000-000000000001';

select throws_ok(
  $$update equipment_units set status = 'decommissioned', decommissioned_at = now(), decommission_reason = 'Motor dañado' where code = 'JET-01'$$,
  'P0001',
  'La unidad esta ocupada en un despacho abierto',
  'una unidad con despacho abierto no se puede dar de baja'
);

update reservation_dispatches set closed_at = now()
where reservation_id = 'dddddddd-0000-0000-0000-000000000001';

select lives_ok(
  $$update equipment_units set status = 'decommissioned', decommissioned_at = now(), decommission_reason = 'Motor dañado' where code = 'JET-01'$$,
  'al cerrar el despacho la unidad se puede dar de baja'
);

select * from finish();
rollback;
