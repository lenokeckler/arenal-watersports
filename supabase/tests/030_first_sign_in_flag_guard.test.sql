begin;
select plan(5);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ismael@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion', false);
insert into workers (id, username, full_name, base_role, must_change_password) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones', true);

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$ update workers set must_change_password = false where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', null,
  'un trabajador no limpia su propia marca de cambio de contrasena pendiente'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select throws_ok(
  $$ update workers set must_change_password = false where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', null,
  'administracion no limpia la marca de cambio de contrasena pendiente de otro trabajador'
);

reset role;
select is(
  (select must_change_password from workers where username = 'ismael'),
  true,
  'la marca de cambio de contrasena pendiente sigue activa tras los intentos de limpiarla'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select lives_ok(
  $$ update workers set must_change_password = true where id = '11111111-1111-1111-1111-111111111111' $$,
  'administracion puede volver a exigir el cambio de contrasena'
);

reset role;
select lives_ok(
  $$ update workers set must_change_password = false where username = 'ismael' $$,
  'el servidor limpia la marca sin sesion de cliente'
);

select * from finish();
rollback;
