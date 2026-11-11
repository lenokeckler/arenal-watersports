begin;
select plan(9);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas');

select throws_ok(
  $$ update workers set personal_email = null where username = 'admin' $$,
  '23514', null,
  'administracion sigue sin poder quedar sin direccion'
);
select throws_ok(
  $$ update workers set personal_email = '' where username = 'admin' $$,
  '23514', null,
  'la cadena vacia se rechaza para administracion'
);
insert into auth.users (id, email) values
  ('44444444-4444-4444-4444-444444444444', 'nuevo@arenal.local');

select throws_ok(
  $$ insert into workers (id, username, full_name, personal_email, base_role)
     values ('44444444-4444-4444-4444-444444444444', 'nuevo', 'Nuevo', 'NUEVO@correo.com', 'reservas') $$,
  '23514', null,
  'una insercion con una direccion invalida se rechaza'
);
select lives_ok(
  $$ insert into workers (id, username, full_name, personal_email, base_role)
     values ('44444444-4444-4444-4444-444444444444', 'nuevo', 'Nuevo', 'nuevo@correo.com', 'reservas') $$,
  'una insercion con una direccion valida se acepta'
);

select is(
  (select convalidated from pg_constraint where conname = 'workers_personal_email_format'),
  true,
  'la restriccion esta validada'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select lives_ok(
  $$ update workers set personal_email = 'celso.propio@correo.com' where id = '33333333-3333-3333-3333-333333333333' $$,
  'un trabajador cambia su propia direccion con una direccion valida'
);
select throws_ok(
  $$ update workers set personal_email = 'Celso.Propio@correo.com' where id = '33333333-3333-3333-3333-333333333333' $$,
  '23514', null,
  'un trabajador no guarda una direccion invalida en su propia fila'
);
select is(
  (select personal_email from workers where id = '33333333-3333-3333-3333-333333333333'),
  'celso.propio@correo.com',
  'la fila conserva la ultima direccion valida'
);

reset role;

select ok(
  not has_column_privilege('supabase_auth_admin', 'public.workers', 'personal_email', 'select'),
  'el hook de acceso sigue sin leer la direccion personal'
);

select * from finish();
rollback;
