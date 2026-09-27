begin;
select plan(27);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Jet Ski', 'by_unit', true, true,
        'engine_hours', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_categories
  (id, name, tracking_mode, alert_min_quantity, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000002', 'Chalecos', 'by_quantity', 10,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_categories
  (id, name, tracking_mode, alert_expiry_days, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000003', 'Extintores', 'by_quantity', 30,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_categories
  (id, name, tracking_mode, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000004', 'Remos', 'by_quantity',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_categories
  (id, name, tracking_mode, status, alert_min_quantity, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000005', 'Botiquines viejos', 'by_quantity',
        'inactive', 10,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units
  (id, category_id, code, status, usage_total, next_oil_change_at, created_by, updated_by)
values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
   'JET-01', 'available', 102.5, 100,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001',
   'JET-02', 'available', 60, 100,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001',
   'JET-03', 'in_maintenance', 500, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001',
   'JET-05', 'damaged', 300, 200,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units
  (id, category_id, code, status, usage_total, next_oil_change_at,
   decommissioned_at, decommission_reason, created_by, updated_by)
values
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001',
   'JET-04', 'decommissioned', 900, 100, now(), 'motor fundido',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_stock
  (category_id, quantity_available, quantity_damaged, quantity_in_repair, expiry_date, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000002', 4, 2, 1, null,
   '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 6, 0, 0, current_date + 5,
   '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 20, 0, 0, null,
   '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select is_oil_change_due from unit_service_status
    where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  true,
  'la unidad que alcanzo su umbral queda marcada para cambio de aceite'
);

select is(
  (select is_oil_change_due from unit_service_status
    where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  false,
  'la unidad que no llega al umbral no avisa'
);

select is(
  (select remaining_usage from unit_service_status
    where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  40::numeric,
  'la vista dice cuanto le falta a la unidad que todavia no llega'
);

select is(
  (select remaining_usage from unit_service_status
    where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  -2.5::numeric,
  'la unidad pasada de su umbral lo reporta como faltante negativo'
);

select is(
  (select count(*)::integer from unit_service_status
    where unit_id = 'bbbbbbbb-0000-0000-0000-000000000003'),
  0,
  'una unidad sin umbral configurado no aparece en la vista'
);

select is(
  (select count(*)::integer from unit_service_status
    where unit_id = 'bbbbbbbb-0000-0000-0000-000000000004'),
  0,
  'una unidad dada de baja no aparece en la vista'
);

select is(
  (select is_oil_change_due from unit_service_status
    where unit_id = 'bbbbbbbb-0000-0000-0000-000000000005'),
  true,
  'una unidad danada sigue avisando su cambio de aceite'
);

select is(
  (select usage_metric::text from unit_service_status
    where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'engine_hours',
  'la vista trae la metrica de la categoria, para saber si son horas o kilometros'
);

select is(
  (select quantity_available from inventory_category_summary
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  2,
  'una categoria por unidad cuenta sus fichas disponibles'
);

select is(
  (select quantity_damaged from inventory_category_summary
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  1,
  'una categoria por unidad cuenta sus fichas danadas'
);

select is(
  (select quantity_in_maintenance from inventory_category_summary
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  1,
  'una categoria por unidad cuenta sus fichas en mantenimiento'
);

select is(
  (select quantity_total from inventory_category_summary
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  4,
  'el total por unidad excluye la ficha dada de baja'
);

select is(
  (select quantity_available from inventory_category_summary
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000002'),
  4,
  'una categoria por cantidad lee su fila de existencias'
);

select is(
  (select quantity_total from inventory_category_summary
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000002'),
  7,
  'el total por cantidad suma disponibles, danados y en reparacion'
);

select is(
  (select quantity_in_maintenance from inventory_category_summary
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000002'),
  0,
  'una categoria por cantidad no inventa un conteo de mantenimiento'
);

select is(
  (select count(*)::integer from inventory_category_summary
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000005'),
  0,
  'una categoria inactiva no aparece en el inventario'
);

select is(
  (select missing_quantity from inventory_quantity_alerts
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000002'),
  6,
  'la categoria bajo su minimo dice cuanto falta para volver a el'
);

select is(
  (select count(*)::integer from inventory_quantity_alerts
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000004'),
  0,
  'una categoria sin aviso por cantidad configurado nunca avisa'
);

select is(
  (select count(*)::integer from inventory_quantity_alerts
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000003'),
  0,
  'una categoria por encima de su minimo no avisa'
);

select is(
  (select days_to_expiry from inventory_expiry_alerts
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000003'),
  5,
  'la categoria por vencer dice cuantos dias faltan'
);

select is(
  (select is_expired from inventory_expiry_alerts
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000003'),
  false,
  'lo que todavia no vence se distingue de lo ya vencido'
);

select is(
  (select count(*)::integer from inventory_expiry_alerts
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000002'),
  0,
  'una categoria sin aviso por vencimiento configurado nunca avisa'
);

set local role postgres;
update equipment_stock set expiry_date = current_date + 90
  where category_id = 'aaaaaaaa-0000-0000-0000-000000000003';
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::integer from inventory_expiry_alerts
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000003'),
  0,
  'un vencimiento mas alla de la anticipacion configurada todavia no avisa'
);

set local role postgres;
update equipment_stock set expiry_date = current_date - 2
  where category_id = 'aaaaaaaa-0000-0000-0000-000000000003';
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select is_expired from inventory_expiry_alerts
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000003'),
  true,
  'lo que ya vencio sigue avisando, marcado como vencido'
);

select is(
  (select count(*)::integer from pg_class
    where relnamespace = 'public'::regnamespace
      and relname in ('unit_service_status', 'inventory_category_summary',
                      'inventory_quantity_alerts', 'inventory_expiry_alerts')
      and 'security_invoker=true' = any (coalesce(reloptions, '{}'))),
  4,
  'las cuatro vistas nuevas se crearon con security_invoker'
);

reset role;
set local role anon;

select is(
  (select count(*)::integer from unit_service_status),
  0,
  'anon no lee ninguna unidad por la vista de servicio'
);

select is(
  (select count(*)::integer from inventory_category_summary)
  + (select count(*)::integer from inventory_quantity_alerts)
  + (select count(*)::integer from inventory_expiry_alerts),
  0,
  'anon no lee inventario ni avisos por ninguna de las tres vistas'
);

reset role;
select * from finish();
rollback;
