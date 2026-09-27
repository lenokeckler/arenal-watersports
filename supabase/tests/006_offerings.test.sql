begin;
select plan(24);

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Lancha', 'by_unit', true, true, 'engine_hours', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_categories
  (id, name, tracking_mode, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000002', 'Chaleco', 'by_quantity',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'PONTOON',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select has_table('public', 'extras', 'existe extras');
select has_table('public', 'extra_compatibility', 'existe extra_compatibility');
select has_table('public', 'combos', 'existe combos');
select has_table('public', 'combo_items', 'existe combo_items');
select has_table('public', 'tariffs', 'existe tariffs');

select throws_ok(
  $$ insert into extras (name, occupies_category_id, created_by, updated_by)
     values ('Parrilla', 'aaaaaaaa-0000-0000-0000-000000000001',
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un extra que ocupa equipo exige cantidad'
);

select throws_ok(
  $$ insert into extras (name, occupies_quantity, created_by, updated_by)
     values ('Cantidad huerfana', 1,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un extra con cantidad exige categoria'
);

select throws_ok(
  $$ insert into extras (name, occupies_category_id, occupies_quantity, created_by, updated_by)
     values ('Cantidad en cero', 'aaaaaaaa-0000-0000-0000-000000000001', 0,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'occupies_quantity exige un valor positivo'
);

select lives_ok(
  $$ insert into extras (id, name, price_usd, created_by, updated_by)
     values ('cccccccc-0000-0000-0000-000000000001', 'Parrilla', 25,
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  'un extra que es solo un cobro adicional se inserta bien'
);

select lives_ok(
  $$ insert into extras (id, name, occupies_category_id, occupies_quantity, created_by, updated_by)
     values ('cccccccc-0000-0000-0000-000000000002', 'Tabla de wakeboard',
             'aaaaaaaa-0000-0000-0000-000000000001', 1,
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  'un extra que ocupa equipo real se inserta bien'
);

select lives_ok(
  $$ insert into extra_compatibility (extra_id, unit_id)
     values ('cccccccc-0000-0000-0000-000000000001',
             'bbbbbbbb-0000-0000-0000-000000000001') $$,
  'un extra se asocia a una unidad concreta'
);

select throws_ok(
  $$ insert into extra_compatibility (extra_id, unit_id)
     values ('cccccccc-0000-0000-0000-000000000001',
             'bbbbbbbb-0000-0000-0000-000000000001') $$,
  '23505', null,
  'la pareja extra-unidad no se repite'
);

select throws_ok(
  $$ insert into extras (name, price_usd, created_by, updated_by)
     values ('Parrilla', 30,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23505', null,
  'el nombre de un extra no se repite'
);

insert into combos (id, name, audience, package_price_usd, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Paquete pontoon', 'foreign', 150,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select throws_ok(
  $$ insert into combos (name, audience, package_price_usd, created_by, updated_by)
     values ('Paquete pontoon', 'foreign', 175,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23505', null,
  'el nombre de un combo no se repite dentro de la misma seccion'
);

select lives_ok(
  $$ insert into combos (name, audience, package_price_crc, created_by, updated_by)
     values ('Paquete pontoon', 'national', 75000,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'el mismo nombre se repite en la otra seccion, con su propio precio'
);

select throws_ok(
  $$ insert into combos (name, audience, package_price_usd, created_by, updated_by)
     values ('Paquete mezclado', 'national', 100,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un combo de nacionales no se cotiza en dolares'
);

select throws_ok(
  $$ insert into combos (name, audience, created_by, updated_by)
     values ('Paquete sin precio', 'foreign',
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un combo sin precio es rechazado'
);

select lives_ok(
  $$ insert into combo_items (combo_id, category_id, quantity)
     values ('dddddddd-0000-0000-0000-000000000001',
             'aaaaaaaa-0000-0000-0000-000000000001', 2) $$,
  'un combo_item con cantidad positiva se inserta bien'
);

select throws_ok(
  $$ insert into combo_items (combo_id, category_id, quantity)
     values ('dddddddd-0000-0000-0000-000000000001',
             'aaaaaaaa-0000-0000-0000-000000000002', 0) $$,
  '23514', null,
  'un combo_item con cantidad cero es rechazado'
);

select throws_ok(
  $$ insert into combo_items (combo_id, category_id, quantity)
     values ('dddddddd-0000-0000-0000-000000000001',
             'aaaaaaaa-0000-0000-0000-000000000001', 5) $$,
  '23505', null,
  'la pareja combo-categoria no se repite'
);

select throws_ok(
  $$ insert into tariffs (category_id, type, amount_usd, created_by, updated_by)
     values ('aaaaaaaa-0000-0000-0000-000000000001', 'combo', 100,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'no existe tarifa por hora para el tipo combo'
);

select throws_ok(
  $$ insert into tariffs (category_id, type, created_by, updated_by)
     values ('aaaaaaaa-0000-0000-0000-000000000001', 'rental',
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'una tarifa sin monto en ninguna moneda es rechazada'
);

select lives_ok(
  $$ insert into tariffs (category_id, type, amount_usd, created_by, updated_by)
     values ('aaaaaaaa-0000-0000-0000-000000000001', 'rental', 100,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'una tarifa con monto se inserta bien'
);

select throws_ok(
  $$ insert into tariffs (category_id, type, amount_crc, created_by, updated_by)
     values ('aaaaaaaa-0000-0000-0000-000000000001', 'rental', 50000,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23505', null,
  'no se repite tarifa para la misma categoria y el mismo tipo'
);

select * from finish();
rollback;
