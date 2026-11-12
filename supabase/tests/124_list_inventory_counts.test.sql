begin;
select plan(15);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'res', 'Res', 'reservas');

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'History gear', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'History stock', 'by_quantity',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'HG-1', 'available', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'HG-2', 'available', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into inventory_counts (id, counted_at, notes, created_by) values
  ('cccccccc-0000-0000-0000-000000000001', now() - interval '1 day', 'con diferencias', '22222222-2222-2222-2222-222222222222'),
  ('cccccccc-0000-0000-0000-000000000002', now() - interval '2 days', 'sin diferencias', '11111111-1111-1111-1111-111111111111'),
  ('cccccccc-0000-0000-0000-000000000003', now() - interval '400 days', 'muy viejo', '22222222-2222-2222-2222-222222222222'),
  ('cccccccc-0000-0000-0000-000000000004', now() - interval '3 days', 'sin foto del sistema', '22222222-2222-2222-2222-222222222222');

insert into inventory_count_lines
  (count_id, category_id, unit_id, confirmed_status, system_status,
   quantity_available, quantity_damaged, quantity_in_repair,
   system_quantity_available, system_quantity_damaged, system_quantity_in_repair) values
  ('cccccccc-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', 'damaged', 'available', null, null, null, null, null, null),
  ('cccccccc-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002', 'available', 'available', null, null, null, null, null, null),
  ('cccccccc-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000002', null, null, null, 4, 1, 1, 5, 1, 0),
  ('cccccccc-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', 'available', 'available', null, null, null, null, null, null),
  ('cccccccc-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002', null, null, null, 5, 1, 0, 5, 1, 0),
  ('cccccccc-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', 'damaged', null, null, null, null, null, null, null),
  ('cccccccc-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', null, null, null, 9, 9, 9, null, null, null);

select ok(
  not has_function_privilege('anon', 'public.list_inventory_counts(integer, integer, uuid)', 'execute'),
  'anon no consulta los conteos'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is(
  (select count(*)::integer from public.list_inventory_counts(0, 100)),
  0,
  'reservas no ve ningun conteo'
);

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is(
  (select count(*)::integer from public.list_inventory_counts(0, 100)),
  3,
  'operaciones ve los conteos del ultimo anio'
);
select is(
  (select count_id from public.list_inventory_counts(0, 100) limit 1),
  'cccccccc-0000-0000-0000-000000000001'::uuid,
  'el conteo mas reciente va primero'
);
select ok(
  not exists (select 1 from public.list_inventory_counts(0, 100) where count_id = 'cccccccc-0000-0000-0000-000000000003'),
  'un conteo de hace mas de un anio no aparece'
);
select is(
  (select difference_count from public.list_inventory_counts(0, 100) where count_id = 'cccccccc-0000-0000-0000-000000000001'),
  2,
  'cuenta la unidad con otro estado y la categoria con otras cantidades'
);
select is(
  (select difference_count from public.list_inventory_counts(0, 100) where count_id = 'cccccccc-0000-0000-0000-000000000002'),
  0,
  'un conteo igual al sistema no tiene diferencias'
);
select is(
  (select difference_count from public.list_inventory_counts(0, 100) where count_id = 'cccccccc-0000-0000-0000-000000000004'),
  0,
  'un conteo sin foto del sistema no inventa diferencias'
);
select is(
  (select category_count from public.list_inventory_counts(0, 100) where count_id = 'cccccccc-0000-0000-0000-000000000001'),
  2,
  'cada conteo dice cuantas categorias cubrio'
);
select is(
  (select unit_count from public.list_inventory_counts(0, 100) where count_id = 'cccccccc-0000-0000-0000-000000000001'),
  2,
  'cada conteo dice cuantas unidades confirmo'
);
select is(
  (select counted_by from public.list_inventory_counts(0, 100) where count_id = 'cccccccc-0000-0000-0000-000000000002'),
  'Admin',
  'cada conteo muestra el nombre de quien lo levanto'
);

select is(
  (select count_id from public.list_inventory_counts(1, 1)),
  'cccccccc-0000-0000-0000-000000000002'::uuid,
  'una pagina trae solo la porcion pedida'
);
select is(
  (select total_count from public.list_inventory_counts(1, 1)),
  3,
  'cada fila dice cuantos conteos hay en total para armar las paginas'
);
select is(
  (select count(*)::integer from public.list_inventory_counts(0, 100, 'cccccccc-0000-0000-0000-000000000004')),
  1,
  'un conteo se pide por su id'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(
  (select count(*)::integer from public.list_inventory_counts(0, 100)),
  3,
  'administracion tambien consulta los conteos'
);

select * from finish();
rollback;
