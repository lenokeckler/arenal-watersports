begin;
select plan(8);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Hours gear', 'by_unit', true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'HU-1', 'available', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'HU-2', 'available', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'HU-3', 'available', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 'HU-4', 'decommissioned', now(), 'baja de prueba',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 'HU-5', 'available', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   cancellation_reason, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'One', 1, 'rental', now() - interval '20 days', 60, 'closed', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Two', 1, 'rental', now() - interval '10 days', 120, 'closed', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'Old', 1, 'rental', now() - interval '500 days', 60, 'closed', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'Open', 1, 'rental', now() - interval '1 hour', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, closed_at, created_by, updated_by) values
  ('eeeeeeee-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
   now() - interval '20 days', 60, now() - interval '20 days' + interval '1 hour',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-0000-0000-0000-000000000002', 'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001',
   now() - interval '10 days', 120, now() - interval '10 days' + interval '2 hours',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-0000-0000-0000-000000000003', 'dddddddd-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001',
   now() - interval '500 days', 60, now() - interval '500 days' + interval '1 hour',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-0000-0000-0000-000000000004', 'dddddddd-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001',
   now() - interval '1 hour', 60, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, unit_id, dispatch_id, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', 'eeeeeeee-0000-0000-0000-000000000001',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000001', 'eeeeeeee-0000-0000-0000-000000000002',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000005', 'eeeeeeee-0000-0000-0000-000000000003',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'bbbbbbbb-0000-0000-0000-000000000002', 'eeeeeeee-0000-0000-0000-000000000004',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(
  (select hours_used from public.equipment_usage_hours where unit_code = 'HU-1'),
  3.00::numeric,
  'las horas de un equipo suman el tiempo que estuvo despachado'
);
select is(
  (select dispatch_count from public.equipment_usage_hours where unit_code = 'HU-1'),
  2,
  'cuenta las salidas cerradas del equipo'
);
select is(
  (select hours_used from public.equipment_usage_hours where unit_code = 'HU-2'),
  0::numeric,
  'una salida que sigue abierta todavia no suma horas'
);
select is(
  (select hours_used from public.equipment_usage_hours where unit_code = 'HU-3'),
  0::numeric,
  'un equipo que nunca salio aparece con cero horas'
);
select is(
  (select dispatch_count from public.equipment_usage_hours where unit_code = 'HU-5'),
  0,
  'una salida de hace mas de un anio no cuenta'
);
select ok(
  not exists (select 1 from public.equipment_usage_hours where unit_code = 'HU-4'),
  'un equipo dado de baja no aparece'
);
select is(
  (select category_name from public.equipment_usage_hours where unit_code = 'HU-1'),
  'Hours gear',
  'cada equipo trae el nombre de su categoria'
);

reset role;
select ok(
  not has_table_privilege('anon', 'public.equipment_usage_hours', 'select'),
  'anon no consulta las horas de uso'
);

select * from finish();
rollback;
