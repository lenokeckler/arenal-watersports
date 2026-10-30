begin;
select plan(9);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'activo@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'bloqueado@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'retirado@arenal.local'),
  ('77777777-7777-7777-7777-777777777777', 'sin_perfil@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'activo', 'Activo', 'reservas');
insert into workers (id, username, full_name, base_role, status, blocked_reason) values
  ('33333333-3333-3333-3333-333333333333', 'bloqueado', 'Bloqueado', 'operaciones', 'blocked', 'administration');
insert into workers (id, username, full_name, base_role, deleted_at) values
  ('44444444-4444-4444-4444-444444444444', 'retirado', 'Retirado', 'operaciones', now());

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Kayak', 'by_unit',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into tariffs (category_id, type, amount_usd, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'rental', 40,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select count(*)::integer from pg_policies
    where schemaname = 'public'
      and policyname in (
        'units_select', 'stock_movements_select',
        'photos_select', 'damage_select', 'maintenance_select', 'counts_select',
        'count_lines_select', 'tariffs_select', 'extras_select', 'extra_compat_select',
        'combos_select', 'combo_items_select')
      and qual = 'is_active_worker()'),
  12,
  'las doce lecturas sin area propia exigen un trabajador activo'
);

set local role authenticated;

set local request.jwt.claims to '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}';
select is((select count(*)::integer from equipment_categories), 0,
  'una cuenta sin perfil de trabajador no lee el catalogo');
select is((select count(*)::integer from tariffs), 0,
  'una cuenta sin perfil de trabajador no lee las tarifas');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is((select count(*)::integer from equipment_categories), 0,
  'un trabajador bloqueado no lee el catalogo');

set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';
select is((select count(*)::integer from equipment_categories), 0,
  'un trabajador retirado no lee el catalogo');

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated","must_change_password":true}';
select is((select count(*)::integer from equipment_categories), 0,
  'un trabajador con cambio de contrasena pendiente no lee el catalogo');

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is((select count(*)::integer from equipment_categories), 1,
  'un trabajador activo lee el catalogo');
select is((select count(*)::integer from tariffs), 1,
  'un trabajador activo lee las tarifas');

reset role;
select ok(
  not has_function_privilege('anon', 'public.is_active_worker()', 'execute'),
  'una sesion anonima no ejecuta la comprobacion de trabajador activo'
);

select * from finish();
rollback;
