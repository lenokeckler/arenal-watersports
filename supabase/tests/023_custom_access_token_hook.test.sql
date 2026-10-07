begin;
select plan(12);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ismael@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'intentos@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'bloqueado@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'retirada@arenal.local'),
  ('66666666-6666-6666-6666-666666666666', 'retirado_bloqueado@arenal.local'),
  ('77777777-7777-7777-7777-777777777777', 'sin_perfil@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones');
insert into workers (id, username, full_name, base_role, status, blocked_reason) values
  ('33333333-3333-3333-3333-333333333333', 'intentos', 'Intentos', 'operaciones',
   'blocked', 'failed_attempts'),
  ('44444444-4444-4444-4444-444444444444', 'bloqueado', 'Bloqueado', 'operaciones',
   'blocked', 'administration');
insert into workers (id, username, full_name, base_role, deleted_at) values
  ('55555555-5555-5555-5555-555555555555', 'retirada', 'Retirada', 'operaciones', now());
insert into workers (id, username, full_name, base_role, status, blocked_reason, deleted_at) values
  ('66666666-6666-6666-6666-666666666666', 'retirado', 'Retirado', 'operaciones',
   'blocked', 'administration', now());

select is(
  public.custom_access_token_hook('{"user_id":"22222222-2222-2222-2222-222222222222"}'::jsonb),
  '{"user_id":"22222222-2222-2222-2222-222222222222"}'::jsonb,
  'una cuenta activa recibe el evento sin cambios'
);

select is(
  public.custom_access_token_hook('{"user_id":"33333333-3333-3333-3333-333333333333"}'::jsonb)
    #>> '{error,message}',
  'account_blocked:failed_attempts',
  'una cuenta bloqueada por intentos se rechaza con su motivo'
);

select is(
  public.custom_access_token_hook('{"user_id":"44444444-4444-4444-4444-444444444444"}'::jsonb)
    #>> '{error,message}',
  'account_blocked:administration',
  'una cuenta bloqueada por administracion se rechaza con su motivo'
);

select is(
  public.custom_access_token_hook('{"user_id":"44444444-4444-4444-4444-444444444444"}'::jsonb)
    #>> '{error,http_code}',
  '403',
  'el rechazo lleva el codigo http 403'
);

select is(
  public.custom_access_token_hook('{"user_id":"55555555-5555-5555-5555-555555555555"}'::jsonb)
    #>> '{error,message}',
  'account_unavailable',
  'una cuenta retirada se rechaza como no disponible'
);

select is(
  public.custom_access_token_hook('{"user_id":"66666666-6666-6666-6666-666666666666"}'::jsonb)
    #>> '{error,message}',
  'account_unavailable',
  'una cuenta retirada y bloqueada se rechaza como no disponible'
);

select is(
  public.custom_access_token_hook('{"user_id":"77777777-7777-7777-7777-777777777777"}'::jsonb),
  '{"user_id":"77777777-7777-7777-7777-777777777777"}'::jsonb,
  'un usuario sin perfil de trabajador recibe el evento sin cambios'
);

select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111"}'::jsonb),
  '{"user_id":"11111111-1111-1111-1111-111111111111"}'::jsonb,
  'la cuenta de administracion recibe el evento sin cambios'
);

set local role authenticated;
select throws_ok(
  $$ select public.custom_access_token_hook('{"user_id":"22222222-2222-2222-2222-222222222222"}'::jsonb) $$,
  '42501', null,
  'un trabajador autenticado no ejecuta el gancho del token'
);

reset role;
select ok(
  has_function_privilege('supabase_auth_admin', 'public.custom_access_token_hook(jsonb)', 'execute'),
  'el servidor de autenticacion ejecuta el gancho del token'
);
select ok(
  not has_column_privilege('supabase_auth_admin', 'public.workers', 'personal_email', 'select'),
  'el servidor de autenticacion no lee el correo personal'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is(
  (select count(*)::integer from public.workers),
  1,
  'un trabajador autenticado sigue viendo solo su propia fila'
);

reset role;
select * from finish();
rollback;
