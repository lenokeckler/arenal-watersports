begin;
select plan(5);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'reservas@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'reservas', 'Reservas', 'reservas');

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Kayak', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Chaleco', 'by_quantity',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'Remo', 'by_quantity',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into tariffs (category_id, type, amount_usd, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000003', 'rental', 5,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
delete from equipment_categories where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is((select count(*)::integer from equipment_categories where id = 'aaaaaaaa-0000-0000-0000-000000000001'), 1,
  'un trabajador que no es administrador no borra una categoria');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
delete from equipment_categories where id = 'aaaaaaaa-0000-0000-0000-000000000002';
select is((select count(*)::integer from equipment_categories where id = 'aaaaaaaa-0000-0000-0000-000000000002'), 0,
  'un administrador borra una categoria sin registros');

select throws_ok(
  $$delete from equipment_categories where id = 'aaaaaaaa-0000-0000-0000-000000000003'$$,
  '23503',
  null,
  'una categoria con tarifas no se borra, aunque sea administrador'
);

select is((select count(*)::integer from equipment_categories where id = 'aaaaaaaa-0000-0000-0000-000000000003'), 1,
  'la categoria con registros sigue en el catalogo');

reset role;
select is(
  (select count(*)::integer from pg_policies
    where schemaname = 'public' and tablename = 'equipment_categories' and cmd = 'DELETE'),
  1,
  'la tabla de categorias tiene una sola politica de borrado'
);

select * from finish();
rollback;
