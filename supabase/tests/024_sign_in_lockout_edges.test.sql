begin;
select plan(18);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ismael@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'bloqueada@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'bloqueado_admin@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones');
insert into workers (id, username, full_name, base_role, status, blocked_reason, failed_attempts) values
  ('33333333-3333-3333-3333-333333333333', 'bloqueada', 'Bloqueada', 'operaciones',
   'blocked', 'failed_attempts', 10),
  ('44444444-4444-4444-4444-444444444444', 'bloqueado_admin', 'Bloqueado', 'operaciones',
   'blocked', 'administration', 0);

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, status)
     values (gen_random_uuid(), 'sin_motivo', 'Sin motivo', 'operaciones', 'blocked') $$,
  '23514', null,
  'insertar un trabajador bloqueado sin motivo viola la restriccion'
);

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, blocked_reason)
     values (gen_random_uuid(), 'activo_motivo', 'Activo', 'operaciones', 'failed_attempts') $$,
  '23514', null,
  'insertar un trabajador activo con motivo viola la restriccion'
);

select throws_ok(
  $$ update workers set status = 'active' where username = 'bloqueada' $$,
  '23514', null,
  'desbloquear sin limpiar el motivo viola la restriccion'
);

select lives_ok(
  $$ update workers set status = 'active', blocked_reason = null, failed_attempts = 0
      where username = 'bloqueada' $$,
  'desbloquear limpiando motivo y contador es valido'
);

select throws_ok(
  $$ update workers set status = 'blocked', blocked_reason = 'administration'
      where username = 'admin' $$,
  'P0001', null,
  'administracion no puede bloquear la cuenta de administracion'
);

select record_failed_sign_in('bloqueado_admin') from generate_series(1, 15);
select is(
  (select blocked_reason::text || ':' || failed_attempts::text from workers where username = 'bloqueado_admin'),
  'administration:0',
  'quince intentos sobre un bloqueo de administracion no cambian motivo ni contador'
);

select record_failed_sign_in('ISMAEL') from generate_series(1, 10);
select is(
  (select status::text || ':' || blocked_reason::text from workers where username = 'ismael'),
  'blocked:failed_attempts',
  'el usuario en mayusculas llega al limite y bloquea al trabajador correcto'
);

select is(
  (select count(*)::integer from workers where failed_attempts <> 0 and username not in ('ismael')),
  0,
  'los intentos de un usuario no tocan a otros trabajadores'
);

select is(
  (select count(*)::integer from workers where username = 'admin' and failed_attempts = 0),
  1,
  'un usuario desconocido y otros usuarios no cuentan contra administracion'
);

select record_failed_sign_in('');
select record_failed_sign_in(null);
select is(
  (select count(*)::integer from workers where failed_attempts <> 0),
  1,
  'un usuario vacio o nulo no cuenta contra nadie'
);

select is(
  public.custom_access_token_hook('{}'::jsonb),
  '{}'::jsonb,
  'un evento sin user_id se devuelve sin cambios'
);

select throws_ok(
  $$ select public.custom_access_token_hook('{"user_id":"no-es-uuid"}'::jsonb) $$,
  '22P02', null,
  'un user_id que no es uuid falla en lugar de aprobar'
);

select ok(
  not has_function_privilege('anon', 'public.custom_access_token_hook(jsonb)', 'execute'),
  'una sesion anonima no ejecuta el gancho del token'
);
select ok(
  not has_function_privilege('supabase_auth_admin', 'public.record_failed_sign_in(text)', 'execute'),
  'el servidor de autenticacion no ejecuta el registro de intentos fallidos'
);
select ok(
  has_column_privilege('supabase_auth_admin', 'public.workers', 'blocked_reason', 'select')
    and has_column_privilege('supabase_auth_admin', 'public.workers', 'deleted_at', 'select'),
  'el servidor de autenticacion lee el motivo de bloqueo y la fecha de retiro'
);
select ok(
  not has_column_privilege('supabase_auth_admin', 'public.workers', 'failed_attempts', 'update')
    and not has_table_privilege('supabase_auth_admin', 'public.workers', 'update'),
  'el servidor de autenticacion no modifica trabajadores'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';
select throws_ok(
  $$ update workers set status = 'active', blocked_reason = null
      where id = '44444444-4444-4444-4444-444444444444' $$,
  '42501', null,
  'un trabajador bloqueado no se desbloquea a si mismo'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
update workers set failed_attempts = 7 where id = '44444444-4444-4444-4444-444444444444';

reset role;
select is(
  (select failed_attempts::integer from workers where username = 'bloqueado_admin'),
  0,
  'un trabajador no modifica la fila de otro trabajador'
);

select * from finish();
rollback;
