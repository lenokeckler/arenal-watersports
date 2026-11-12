begin;
select plan(11);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ismael@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'rosa@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'bloqueado@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'retirada@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'rosa', 'Rosa', 'operaciones');
insert into workers (id, username, full_name, base_role, status, blocked_reason) values
  ('44444444-4444-4444-4444-444444444444', 'bloqueado', 'Bloqueado', 'operaciones',
   'blocked', 'administration');
insert into workers (id, username, full_name, base_role, deleted_at) values
  ('55555555-5555-5555-5555-555555555555', 'retirada', 'Retirada', 'operaciones', now());

select record_failed_sign_in('ismael');
select is(
  (select failed_attempts::integer from workers where username = 'ismael'),
  1,
  'un intento fallido suma uno al contador'
);

select record_failed_sign_in('ismael') from generate_series(1, 8);
select is(
  (select status::text from workers where username = 'ismael'),
  'active',
  'nueve intentos fallidos no bloquean la cuenta'
);

select record_failed_sign_in('ismael');
select is(
  (select status::text from workers where username = 'ismael'),
  'blocked',
  'el decimo intento fallido bloquea la cuenta'
);
select is(
  (select blocked_reason::text from workers where username = 'ismael'),
  'failed_attempts',
  'el bloqueo por intentos queda con el motivo intentos fallidos'
);

select record_failed_sign_in('ismael');
select is(
  (select failed_attempts::integer from workers where username = 'ismael'),
  10,
  'un intento mas sobre una cuenta bloqueada no pasa del limite'
);

select record_failed_sign_in('bloqueado');
select is(
  (select blocked_reason::text from workers where username = 'bloqueado'),
  'administration',
  'un intento fallido no cambia el motivo de un bloqueo de administracion'
);

select lives_ok(
  $$ select record_failed_sign_in('no_existe') $$,
  'un usuario desconocido no produce error'
);

select record_failed_sign_in('  ROSA ');
select is(
  (select failed_attempts::integer from workers where username = 'rosa'),
  1,
  'el usuario con espacios y mayusculas cuenta contra el trabajador correcto'
);

select record_failed_sign_in('admin') from generate_series(1, 12);
select is(
  (select status::text from workers where username = 'admin'),
  'active',
  'la cuenta de administracion sigue activa tras doce intentos fallidos'
);
select is(
  (select failed_attempts::integer from workers where username = 'admin'),
  10,
  'el contador de administracion se detiene en el limite'
);

select record_failed_sign_in('retirada');
select is(
  (select failed_attempts::integer from workers where username = 'retirada'),
  0,
  'un trabajador retirado no se cuenta'
);

select * from finish();
rollback;
