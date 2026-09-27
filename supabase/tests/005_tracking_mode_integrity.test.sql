begin;
select plan(9);

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Kayak doble', 'by_quantity', true, 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_categories
  (id, name, tracking_mode, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000002', 'Chaleco', 'by_quantity',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_categories
  (id, name, tracking_mode, has_motor, usage_metric, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000003', 'Cuadraciclo', 'by_unit', true, 'kilometers',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select lives_ok(
  $$ update equipment_categories set tracking_mode = 'by_unit'
     where id = 'aaaaaaaa-0000-0000-0000-000000000001' $$,
  'una categoria sin registros todavia puede cambiar de modalidad'
);

select lives_ok(
  $$ insert into equipment_units (category_id, code, created_by, updated_by)
     values ('aaaaaaaa-0000-0000-0000-000000000001', 'KAY-01',
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  'una unidad se archiva sin problema bajo una categoria by_unit'
);

select throws_ok(
  $$ update equipment_categories set tracking_mode = 'by_quantity'
     where id = 'aaaaaaaa-0000-0000-0000-000000000001' $$,
  'La modalidad de una categoria con registros no se cambia'
);

select lives_ok(
  $$ insert into equipment_stock (category_id, updated_by)
     values ('aaaaaaaa-0000-0000-0000-000000000002',
             '11111111-1111-1111-1111-111111111111') $$,
  'un renglon de stock se archiva sin problema bajo una categoria by_quantity'
);

select throws_ok(
  $$ update equipment_categories set tracking_mode = 'by_unit'
     where id = 'aaaaaaaa-0000-0000-0000-000000000002' $$,
  'La modalidad de una categoria con registros no se cambia'
);

select throws_ok(
  $$ insert into equipment_units (category_id, code, created_by, updated_by)
     values ('aaaaaaaa-0000-0000-0000-000000000002', 'CHA-01',
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  'Una categoria por cantidad no lleva unidades individuales'
);

select throws_ok(
  $$ insert into equipment_stock (category_id, updated_by)
     values ('aaaaaaaa-0000-0000-0000-000000000003',
             '11111111-1111-1111-1111-111111111111') $$,
  'Una categoria identificada por unidad no lleva conteo de stock'
);

select throws_ok(
  $$ update equipment_units set category_id = 'aaaaaaaa-0000-0000-0000-000000000002'
     where code = 'KAY-01' $$,
  'Una categoria por cantidad no lleva unidades individuales'
);

select throws_ok(
  $$ update equipment_stock set category_id = 'aaaaaaaa-0000-0000-0000-000000000003'
     where category_id = 'aaaaaaaa-0000-0000-0000-000000000002' $$,
  'Una categoria identificada por unidad no lleva conteo de stock'
);

select * from finish();
rollback;
