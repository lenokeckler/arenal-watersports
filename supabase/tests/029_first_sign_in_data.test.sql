begin;
select plan(17);

insert into auth.users (id, email) values
  ('22222222-2222-2222-2222-222222222222', 'ismael@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'intentos@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'bloqueado@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'retirada@arenal.local'),
  ('77777777-7777-7777-7777-777777777777', 'sin_perfil@arenal.local'),
  ('88888888-8888-8888-8888-888888888888', 'rosa@arenal.local');

insert into workers (id, username, full_name, base_role, must_change_password) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones', true),
  ('88888888-8888-8888-8888-888888888888', 'rosa', 'Rosa', 'operaciones', false);
insert into workers (id, username, full_name, base_role, status, blocked_reason) values
  ('33333333-3333-3333-3333-333333333333', 'intentos', 'Intentos', 'operaciones',
   'blocked', 'failed_attempts'),
  ('44444444-4444-4444-4444-444444444444', 'bloqueado', 'Bloqueado', 'operaciones',
   'blocked', 'administration');
insert into workers (id, username, full_name, base_role, deleted_at) values
  ('55555555-5555-5555-5555-555555555555', 'retirada', 'Retirada', 'operaciones', now());

select is(
  public.custom_access_token_hook(
    '{"user_id":"22222222-2222-2222-2222-222222222222","claims":{"role":"authenticated"}}'::jsonb
  ) #> '{claims,must_change_password}',
  'true'::jsonb,
  'un trabajador nuevo recibe el reclamo de primer ingreso pendiente'
);

select is(
  public.custom_access_token_hook(
    '{"user_id":"88888888-8888-8888-8888-888888888888","claims":{"role":"authenticated"}}'::jsonb
  ) #> '{claims,must_change_password}',
  'false'::jsonb,
  'un trabajador con el cambio completado recibe el reclamo en falso'
);

select is(
  public.custom_access_token_hook(
    '{"user_id":"22222222-2222-2222-2222-222222222222","claims":{"role":"authenticated"}}'::jsonb
  ) #>> '{claims,role}',
  'authenticated',
  'el reclamo nuevo conserva los demas reclamos del token'
);

select is(
  public.custom_access_token_hook(
    '{"user_id":"77777777-7777-7777-7777-777777777777","claims":{"role":"authenticated"}}'::jsonb
  ) #>> '{error,message}',
  'account_unavailable',
  'un usuario sin perfil de trabajador se rechaza como no disponible'
);

select is(
  public.custom_access_token_hook(
    '{"user_id":"33333333-3333-3333-3333-333333333333","claims":{"role":"authenticated"}}'::jsonb
  ) #>> '{error,message}',
  'account_blocked:failed_attempts',
  'una cuenta bloqueada por intentos se sigue rechazando'
);

select is(
  public.custom_access_token_hook(
    '{"user_id":"44444444-4444-4444-4444-444444444444","claims":{"role":"authenticated"}}'::jsonb
  ) #>> '{error,message}',
  'account_blocked:administration',
  'una cuenta bloqueada por administracion se sigue rechazando'
);

select is(
  public.custom_access_token_hook(
    '{"user_id":"55555555-5555-5555-5555-555555555555","claims":{"role":"authenticated"}}'::jsonb
  ) #>> '{error,message}',
  'account_unavailable',
  'una cuenta retirada se sigue rechazando como no disponible'
);

select ok(
  has_column_privilege('supabase_auth_admin', 'public.workers', 'must_change_password', 'select'),
  'el servidor de autenticacion lee la marca de cambio de contrasena pendiente'
);
select ok(
  not has_column_privilege('supabase_auth_admin', 'public.workers', 'personal_email', 'select'),
  'el servidor de autenticacion sigue sin leer el correo personal'
);

select is(
  (select must_change_password from workers where username = 'ismael'),
  true,
  'un trabajador nuevo tiene el cambio de contrasena pendiente'
);
select complete_first_password_change('22222222-2222-2222-2222-222222222222');
select is(
  (select must_change_password from workers where username = 'ismael'),
  false,
  'completar el primer cambio limpia la marca del trabajador'
);
select is(
  public.custom_access_token_hook(
    '{"user_id":"22222222-2222-2222-2222-222222222222","claims":{"role":"authenticated"}}'::jsonb
  ) #> '{claims,must_change_password}',
  'false'::jsonb,
  'el reclamo pasa a falso despues de completar el primer cambio'
);

update workers set must_change_password = true where username in ('intentos', 'retirada');
select complete_first_password_change('33333333-3333-3333-3333-333333333333');
select complete_first_password_change('55555555-5555-5555-5555-555555555555');
select is(
  (select count(*)::integer from workers
    where username in ('intentos', 'retirada') and must_change_password),
  2,
  'completar el primer cambio no toca cuentas bloqueadas ni retiradas'
);

set local role anon;
select throws_ok(
  $$ select complete_first_password_change('22222222-2222-2222-2222-222222222222') $$,
  '42501', null,
  'una sesion anonima no completa el primer cambio de contrasena'
);

reset role;
set local role authenticated;
select throws_ok(
  $$ select complete_first_password_change('22222222-2222-2222-2222-222222222222') $$,
  '42501', null,
  'un trabajador autenticado no completa el primer cambio de contrasena'
);

reset role;
set local role service_role;
select lives_ok(
  $$ select complete_first_password_change('22222222-2222-2222-2222-222222222222') $$,
  'el rol de servicio completa el primer cambio de contrasena'
);

reset role;
select ok(
  not has_function_privilege('public', 'public.complete_first_password_change(uuid)', 'execute'),
  'el rol publico no ejecuta el cierre del primer cambio de contrasena'
);

select * from finish();
rollback;
