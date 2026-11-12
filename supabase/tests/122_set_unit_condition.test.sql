begin;
select plan(18);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'res', 'Res', 'reservas');

insert into equipment_categories (id, name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Gear A', 'by_unit', true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'A-1', 'available', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'A-2', 'available', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'A-3', 'in_maintenance', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 'A-4', 'decommissioned', now(), 'baja de prueba',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   cancellation_reason, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Late', 2, 'rental', '2026-09-07 15:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select ok(
  not has_function_privilege('anon', 'public.set_unit_condition(uuid, public.unit_status)', 'execute'),
  'anon no cambia el estado de una unidad'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is(
  public.set_unit_condition('bbbbbbbb-0000-0000-0000-000000000001', 'damaged'),
  'not_allowed',
  'reservas no cambia el estado de una unidad'
);

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is(
  public.set_unit_condition('bbbbbbbb-0000-0000-0000-000000000001', 'damaged'),
  'changed',
  'operaciones marca una unidad como danada'
);

reset role;
select is(
  (select status::text from public.equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'damaged',
  'la unidad queda danada'
);
select is(
  (select updated_by from public.equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  '22222222-2222-2222-2222-222222222222'::uuid,
  'queda registrado quien cambio el estado'
);
select is(
  (select free_count from public.board_category_summary where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  1,
  'el tablero deja de ofrecer la unidad danada en ese mismo momento'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is(
  public.set_unit_condition('bbbbbbbb-0000-0000-0000-000000000001', 'damaged'),
  'no_change',
  'repetir el mismo estado no cambia nada'
);
select is(
  public.set_unit_condition('bbbbbbbb-0000-0000-0000-000000000001', 'in_repair'),
  'changed',
  'una unidad danada pasa a en reparacion'
);
select is(
  public.set_unit_condition('bbbbbbbb-0000-0000-0000-000000000001', 'available'),
  'changed',
  'una unidad en reparacion vuelve a estar disponible'
);
select is(
  public.set_unit_condition('bbbbbbbb-0000-0000-0000-000000000001', 'decommissioned'),
  'invalid_status',
  'solo se escoge disponible, danada o en reparacion'
);
select is(
  public.set_unit_condition('bbbbbbbb-0000-0000-0000-000000000003', 'available'),
  'not_changeable',
  'una unidad en mantenimiento se devuelve desde mantenimiento'
);
select is(
  public.set_unit_condition('bbbbbbbb-0000-0000-0000-000000000004', 'available'),
  'not_changeable',
  'una unidad dada de baja no cambia de estado'
);
select is(
  public.set_unit_condition('99999999-9999-9999-9999-999999999999', 'damaged'),
  'not_found',
  'una unidad inexistente no cambia'
);

select dispatch_reservation_group(
  'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
  '2026-09-07 15:10:00+00', '2026-09-07 16:40:00+00',
  array['bbbbbbbb-0000-0000-0000-000000000002']::uuid[]
);
select is(
  public.set_unit_condition('bbbbbbbb-0000-0000-0000-000000000002', 'damaged'),
  'occupied',
  'una unidad en una salida abierta no se marca danada'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(
  public.set_unit_condition('bbbbbbbb-0000-0000-0000-000000000001', 'in_repair'),
  'changed',
  'administracion tambien cambia el estado de una unidad'
);

reset role;
select is(
  (select status::text from public.equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'available',
  'la unidad ocupada conserva su estado'
);
select is(
  (select status::text from public.equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000003'),
  'in_maintenance',
  'la unidad en mantenimiento conserva su estado'
);
select is(
  (select count(*)::integer from public.equipment_units where status = 'in_repair'),
  1,
  'solo cambio la unidad escogida'
);

select * from finish();
rollback;
