begin;
select plan(8);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'retirado@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'activo@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'marcado@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'admin@correo.com', 'administracion'),
  ('22222222-2222-2222-2222-222222222222', 'retirado', 'Retirado', 'retirado@correo.com', 'reservas'),
  ('33333333-3333-3333-3333-333333333333', 'activo', 'Activo', 'activo@correo.com', 'reservas'),
  ('44444444-4444-4444-4444-444444444444', 'marcado', 'Marcado', null, 'reservas');
insert into worker_areas (worker_id, area, granted_by) values
  ('22222222-2222-2222-2222-222222222222', 'administracion', '11111111-1111-1111-1111-111111111111'),
  ('33333333-3333-3333-3333-333333333333', 'operaciones', '11111111-1111-1111-1111-111111111111');
insert into worker_marks (worker_id, mark, granted_by) values
  ('44444444-4444-4444-4444-444444444444', 'registro_guias_externos', '11111111-1111-1111-1111-111111111111');
update workers set deleted_at = now()
 where id in ('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(is_admin(), false, 'un trabajador eliminado con area de administracion no es administrador');
select is(has_area('administracion'), false, 'un trabajador eliminado no conserva sus areas');
select throws_ok(
  $$ update workers set personal_email = 'nuevo@correo.com' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador eliminado no cambia nada en su cuenta',
  'un trabajador eliminado no cambia su correo personal'
);
select throws_ok(
  $$ update workers set status = 'blocked', blocked_reason = 'administration'
     where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador eliminado no cambia nada en su cuenta',
  'un trabajador eliminado no cambia su propio estado'
);

update workers set personal_email = 'ajeno@correo.com' where id = '33333333-3333-3333-3333-333333333333';

reset role;
select is(
  (select personal_email from workers where id = '33333333-3333-3333-3333-333333333333'),
  'activo@correo.com',
  'un trabajador eliminado no cambia la fila de otro trabajador'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';

select is(has_mark('registro_guias_externos'), false, 'un trabajador eliminado no conserva sus marcas');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(has_area('operaciones'), true, 'un trabajador activo conserva sus areas');
select lives_ok(
  $$ update workers set personal_email = 'nuevo@correo.com' where id = '33333333-3333-3333-3333-333333333333' $$,
  'un trabajador activo cambia su correo personal'
);

select * from finish();
rollback;
