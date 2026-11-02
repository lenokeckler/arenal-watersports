begin;
select plan(67);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local'),
  ('77777777-7777-7777-7777-777777777777', 'guia@arenal.local'),
  ('88888888-8888-8888-8888-888888888888', 'nuevo@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   has_condition_photos, default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Jet Ski', 'by_unit', true, true,
        'engine_hours', true, 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_categories
  (id, name, tracking_mode, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000002', 'Chaleco', 'by_quantity',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-01',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_stock (category_id, quantity_available, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000002', 10, '11111111-1111-1111-1111-111111111111');

insert into worker_marks (worker_id, mark, granted_by)
values ('33333333-3333-3333-3333-333333333333', 'guia', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select throws_ok(
  $$ delete from equipment_categories where id = 'aaaaaaaa-0000-0000-0000-000000000001' $$,
  '23503', null,
  'administracion puede borrar categorias pero la llave foranea protege a una con unidades'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from workers),
  2,
  'ismael ve su propia fila y la de cualquier guia'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(
  (select count(*)::int from workers),
  3,
  'administracion ve todas las filas de workers'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

with u as (
     update workers set personal_email = 'ismael.ops@correo.com' where id = '22222222-2222-2222-2222-222222222222'
     returning 1
)
select is((select count(*)::int from u), 1, 'ismael actualiza su propia fila de workers');

with u as (
     update workers set full_name = 'Hackeado' where id = '33333333-3333-3333-3333-333333333333'
     returning 1
)
select is((select count(*)::int from u), 0, 'ismael no actualiza la fila de celso');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

with u as (
     update workers set full_name = 'Celso R.' where id = '33333333-3333-3333-3333-333333333333'
     returning 1
)
select is((select count(*)::int from u), 1, 'administracion actualiza la fila de otro trabajador');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at)
     values ('55555555-5555-5555-5555-555555555555', 'guia1', 'Guia Uno', 'operaciones', true,
             '111110001', now() + interval '30 days') $$,
  '42501', null,
  'reservas sin la marca no registra guias externos'
);

reset role;
set local role postgres;
insert into worker_marks (worker_id, mark, granted_by)
values ('33333333-3333-3333-3333-333333333333', 'registro_guias_externos',
        '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide)
     values ('55555555-5555-5555-5555-555555555555', 'planta1', 'Personal Planta', 'operaciones', false) $$,
  '42501', null,
  'reservas con la marca no crea personal de planta por esta via'
);

select throws_ok(
  $$ insert into workers (id, username, full_name, personal_email, base_role, is_external_guide)
     values ('66666666-6666-6666-6666-666666666666', 'admin2', 'Otro Admin', 'otro@correo.com',
             'administracion', false) $$,
  '42501', null,
  'reservas con la marca no crea una cuenta de administracion'
);

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide)
     values ('66666666-6666-6666-6666-666666666666', 'res2', 'Otro Reservas', 'reservas', false) $$,
  '42501', null,
  'reservas con la marca no crea un trabajador con otro rol'
);

select lives_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at)
     values ('77777777-7777-7777-7777-777777777777', 'guia1', 'Guia Uno', 'operaciones', true,
             '111110001', now() + interval '30 days') $$,
  'reservas con la marca si registra un guia externo'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select lives_ok(
  $$ insert into workers (id, username, full_name, base_role)
     values ('88888888-8888-8888-8888-888888888888', 'nuevo', 'Nuevo Trabajador', 'operaciones') $$,
  'administracion da de alta un trabajador directamente'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from worker_areas),
  1,
  'ismael solo ve su propia fila en worker_areas'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(
  (select count(*)::int from worker_areas),
  5,
  'administracion ve todas las filas de worker_areas'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$ insert into worker_areas (worker_id, area, granted_by)
     values ('33333333-3333-3333-3333-333333333333', 'operaciones', '22222222-2222-2222-2222-222222222222') $$,
  '42501', null,
  'ismael no otorga areas'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

with i as (
     insert into worker_areas (worker_id, area, granted_by)
     values ('88888888-8888-8888-8888-888888888888', 'reservas', '11111111-1111-1111-1111-111111111111')
     returning 1
)
select is((select count(*)::int from i), 1, 'administracion otorga areas');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

with u as (
     update worker_areas set granted_by = '22222222-2222-2222-2222-222222222222'
     where worker_id = '22222222-2222-2222-2222-222222222222' and area = 'operaciones'
     returning 1
)
select is((select count(*)::int from u), 0, 'ismael no actualiza worker_areas');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

with u as (
     update worker_areas set granted_by = '11111111-1111-1111-1111-111111111111'
     where worker_id = '33333333-3333-3333-3333-333333333333' and area = 'reservas'
     returning 1
)
select is((select count(*)::int from u), 1, 'administracion actualiza worker_areas');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from worker_marks),
  1,
  'ismael solo ve la marca guia de otro trabajador'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from worker_marks),
  2,
  'celso ve sus propias marcas'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(
  (select count(*)::int from worker_marks),
  2,
  'administracion ve todas las marcas'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$ insert into worker_marks (worker_id, mark, granted_by)
     values ('22222222-2222-2222-2222-222222222222', 'encargado_general', '22222222-2222-2222-2222-222222222222') $$,
  '42501', null,
  'ismael no otorga marcas'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

with i as (
     insert into worker_marks (worker_id, mark, granted_by)
     values ('22222222-2222-2222-2222-222222222222', 'encargado_general', '11111111-1111-1111-1111-111111111111')
     returning 1
)
select is((select count(*)::int from i), 1, 'administracion otorga marcas');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

with u as (
     update worker_marks set granted_by = '22222222-2222-2222-2222-222222222222'
     where worker_id = '33333333-3333-3333-3333-333333333333' and mark = 'guia'
     returning 1
)
select is((select count(*)::int from u), 0, 'ismael no actualiza worker_marks');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

with u as (
     update worker_marks set granted_by = '11111111-1111-1111-1111-111111111111'
     where worker_id = '33333333-3333-3333-3333-333333333333' and mark = 'guia'
     returning 1
)
select is((select count(*)::int from u), 1, 'administracion actualiza worker_marks');

reset role;
set local role postgres;
insert into password_reset_pins (worker_id, pin_hash, expires_at)
values ('22222222-2222-2222-2222-222222222222', 'hash-x', now() + interval '1 day');

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(
  (select count(*)::int from password_reset_pins),
  0,
  'ni administracion ve password_reset_pins desde authenticated'
);

select throws_ok(
  $$ insert into password_reset_pins (worker_id, pin_hash, expires_at)
     values ('11111111-1111-1111-1111-111111111111', 'hash-y', now() + interval '1 day') $$,
  '42501', null,
  'ni administracion inserta en password_reset_pins desde authenticated'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from equipment_categories),
  2,
  'operaciones lee el catalogo'
);

select throws_ok(
  $$ insert into equipment_categories (name, tracking_mode)
     values ('Inventada', 'by_quantity') $$,
  '42501', null,
  'operaciones no crea categorias'
);

with u as (
     update equipment_categories set name = 'Jet Ski Hackeado'
     where id = 'aaaaaaaa-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 0, 'operaciones no actualiza categorias');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select lives_ok(
  $$ insert into equipment_categories (id, name, tracking_mode, created_by, updated_by)
     values ('aaaaaaaa-0000-0000-0000-000000000003', 'Ancla', 'by_quantity',
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  'administracion crea categorias'
);

with u as (
     update equipment_categories set name = 'Jet Ski Deluxe'
     where id = 'aaaaaaaa-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 1, 'administracion actualiza categorias');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from equipment_units),
  1,
  'reservas lee las unidades'
);

select throws_ok(
  $$ insert into equipment_units (category_id, code)
     values ('aaaaaaaa-0000-0000-0000-000000000001', 'JET-99') $$,
  '42501', null,
  'reservas no crea unidades'
);

with u as (
     update equipment_units set fuel_level = 2
     where id = 'bbbbbbbb-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 0, 'reservas no actualiza unidades');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$ insert into equipment_units (category_id, code)
     values ('aaaaaaaa-0000-0000-0000-000000000001', 'JET-02') $$,
  'operaciones crea unidades'
);

with u as (
     update equipment_units set fuel_level = 4
     where id = 'bbbbbbbb-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 1, 'operaciones actualiza unidades');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from equipment_stock),
  1,
  'reservas lee el stock'
);

select throws_ok(
  $$ insert into equipment_stock (category_id, quantity_available)
     values ('aaaaaaaa-0000-0000-0000-000000000003', 3) $$,
  '42501', null,
  'reservas no crea filas de stock'
);

with u as (
     update equipment_stock set quantity_available = 999
     where category_id = 'aaaaaaaa-0000-0000-0000-000000000002'
     returning 1
)
select is((select count(*)::int from u), 0, 'reservas no actualiza el stock');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$ insert into equipment_stock (category_id, quantity_available)
     values ('aaaaaaaa-0000-0000-0000-000000000003', 3) $$,
  'operaciones crea filas de stock'
);

with u as (
     update equipment_stock set quantity_available = 7
     where category_id = 'aaaaaaaa-0000-0000-0000-000000000002'
     returning 1
)
select is((select count(*)::int from u), 1, 'operaciones actualiza el stock');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from equipment_stock_movements),
  0,
  'reservas lee el historial de movimientos (vacio, pero sin error)'
);

select throws_ok(
  $$ insert into equipment_stock_movements
       (category_id, from_available, to_available, from_damaged, to_damaged,
        from_in_repair, to_in_repair, reason)
     values ('aaaaaaaa-0000-0000-0000-000000000002', 10, 7, 0, 0, 0, 0, 'ajuste') $$,
  '42501', null,
  'reservas no registra movimientos de stock'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$ insert into equipment_stock_movements
       (category_id, from_available, to_available, from_damaged, to_damaged,
        from_in_repair, to_in_repair, reason)
     values ('aaaaaaaa-0000-0000-0000-000000000002', 10, 7, 0, 0, 0, 0, 'ajuste') $$,
  'operaciones registra movimientos de stock'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from unit_condition_photos),
  0,
  'reservas lee las fotos de estado (vacio, pero sin error)'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$ insert into unit_condition_photos (unit_id, angle, storage_path, uploaded_by)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'front', 'fotos/x.webp',
             '22222222-2222-2222-2222-222222222222') $$,
  'con la marca de encargado general si sube fotos de estado'
);

with u as (
     update unit_condition_photos set storage_path = 'fotos/y.webp'
     where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001' and angle = 'front'
     returning 1
)
select is((select count(*)::int from u), 1, 'con la marca de encargado general si reemplaza fotos de estado');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ insert into unit_condition_photos (unit_id, angle, storage_path, uploaded_by)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'left_side', 'fotos/z.webp',
             '33333333-3333-3333-3333-333333333333') $$,
  '42501', null,
  'sin la marca de encargado general no se suben fotos de estado'
);

with u as (
     update unit_condition_photos set storage_path = 'fotos/w.webp'
     where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001' and angle = 'front'
     returning 1
)
select is((select count(*)::int from u), 0, 'sin la marca de encargado general no se reemplazan fotos de estado');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from damage_reports),
  0,
  'reservas lee los reportes de dano (vacio, pero sin error)'
);

select throws_ok(
  $$ insert into damage_reports (unit_id, cause, description)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'collision', 'golpe leve') $$,
  '42501', null,
  'reservas no reporta danos'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$ insert into damage_reports (unit_id, cause, description)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'collision', 'golpe leve') $$,
  'operaciones reporta danos'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from maintenance_records),
  0,
  'reservas lee el mantenimiento (vacio, pero sin error)'
);

select throws_ok(
  $$ insert into maintenance_records (unit_id, work_type, is_external, performed_at)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'cambio de aceite', false, current_date) $$,
  '42501', null,
  'reservas no registra mantenimiento'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$ insert into maintenance_records (unit_id, work_type, is_external, performed_at)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'cambio de aceite', false, current_date) $$,
  'operaciones registra mantenimiento'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

with u as (
     update maintenance_records set description = 'hackeado'
     where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 0, 'reservas no actualiza el mantenimiento');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

with u as (
     update maintenance_records set description = 'aceite 10w40'
     where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'
     returning 1
)
select is((select count(*)::int from u), 1, 'operaciones actualiza el mantenimiento');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from inventory_counts),
  0,
  'reservas lee los conteos (vacio, pero sin error)'
);

select throws_ok(
  $$ insert into inventory_counts (notes) values ('conteo de prueba') $$,
  '42501', null,
  'reservas no crea conteos'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$ insert into inventory_counts (id, notes)
     values ('cccccccc-0000-0000-0000-000000000001', 'conteo de prueba') $$,
  'operaciones crea conteos'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from inventory_count_lines),
  0,
  'reservas lee las lineas de conteo (vacio, pero sin error)'
);

select throws_ok(
  $$ insert into inventory_count_lines
       (count_id, category_id, quantity_available, quantity_damaged, quantity_in_repair)
     values ('cccccccc-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000002', 10, 0, 0) $$,
  '42501', null,
  'reservas no crea lineas de conteo'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$ insert into inventory_count_lines
       (count_id, category_id, quantity_available, quantity_damaged, quantity_in_repair)
     values ('cccccccc-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000002', 10, 0, 0) $$,
  'operaciones crea lineas de conteo'
);

reset role;
insert into auth.users (id, email)
values ('44444444-4444-4444-4444-444444444444', 'diego@arenal.local');
insert into workers (id, username, full_name, base_role)
values ('44444444-4444-4444-4444-444444444444', 'diego', 'Diego', 'operaciones');
delete from worker_areas
 where worker_id = '44444444-4444-4444-4444-444444444444' and area = 'operaciones';

set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';

select is(
  (select count(*)::int from workers),
  1,
  'sin area, workers_select_guides no aplica: solo se ve la fila propia'
);
select is(
  (select count(*)::int from workers
   where id = '33333333-3333-3333-3333-333333333333'),
  0,
  'sin area, la fila de un guia sigue invisible aunque tenga la marca'
);
select is(
  (select count(*)::int from worker_marks),
  0,
  'sin area, la marca guia de otro trabajador sigue invisible'
);

reset role;

select * from finish();
rollback;
