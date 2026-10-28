begin;
select plan(19);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'rosa@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'bloqueada@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'retirado@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'sin_perfil@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'rosa', 'Rosa', 'reservas');
insert into workers (id, username, full_name, base_role, status, blocked_reason) values
  ('33333333-3333-3333-3333-333333333333', 'bloqueada', 'Bloqueada', 'operaciones', 'blocked', 'failed_attempts');
insert into workers (id, username, full_name, base_role, deleted_at) values
  ('44444444-4444-4444-4444-444444444444', 'retirado', 'Retirado', 'operaciones', now());

update workers set failed_attempts = public.sign_in_attempt_limit() - 1 where username = 'admin';
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb),
  '{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{"must_change_password":true}}'::jsonb,
  'la administracion a un intento del limite recibe el evento con la marca de cambio de clave'
);

update workers set failed_attempts = public.sign_in_attempt_limit() where username = 'admin';
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_recovery_required',
  'la administracion en el limite se rechaza con clave correcta pidiendo recuperacion'
);
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb)
    #>> '{error,http_code}',
  '403',
  'el rechazo por recuperacion lleva el codigo http 403'
);
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb) ? 'claims',
  false,
  'el rechazo por recuperacion no devuelve claims'
);

update workers set failed_attempts = public.sign_in_attempt_limit() + 1 where username = 'admin';
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_recovery_required',
  'la administracion sobre el limite tambien se rechaza'
);

update workers set failed_attempts = public.sign_in_attempt_limit() where username = 'admin';
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"token_refresh","claims":{}}'::jsonb),
  '{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"token_refresh","claims":{"must_change_password":true}}'::jsonb,
  'la renovacion de token de la administracion en el limite conserva la sesion abierta'
);
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_recovery_required',
  'sin metodo de autenticacion la administracion en el limite se rechaza'
);
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":null,"claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_recovery_required',
  'con metodo de autenticacion nulo la administracion en el limite se rechaza'
);
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"otp","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_recovery_required',
  'con ingreso por codigo la administracion en el limite se rechaza'
);
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"recovery","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_recovery_required',
  'con ingreso por enlace de recuperacion la administracion en el limite se rechaza'
);
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"Token_Refresh","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_recovery_required',
  'la exencion de renovacion distingue mayusculas y minusculas'
);

update workers set failed_attempts = public.sign_in_attempt_limit() where username in ('rosa', 'bloqueada', 'retirado');
select is(
  public.custom_access_token_hook('{"user_id":"22222222-2222-2222-2222-222222222222","authentication_method":"password","claims":{}}'::jsonb),
  '{"user_id":"22222222-2222-2222-2222-222222222222","authentication_method":"password","claims":{"must_change_password":true}}'::jsonb,
  'una cuenta activa que no es de administracion en el limite recibe el evento normal'
);
select is(
  public.custom_access_token_hook('{"user_id":"33333333-3333-3333-3333-333333333333","authentication_method":"password","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_blocked:failed_attempts',
  'una cuenta bloqueada por intentos en el limite conserva su motivo de bloqueo'
);
select is(
  public.custom_access_token_hook('{"user_id":"44444444-4444-4444-4444-444444444444","authentication_method":"password","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_unavailable',
  'una cuenta retirada en el limite conserva su rechazo de no disponible'
);

alter table workers disable trigger workers_guard_admin;
update workers set status = 'blocked', blocked_reason = 'administration' where username = 'admin';
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_blocked:administration',
  'una administracion bloqueada en el limite conserva su motivo de bloqueo'
);
update workers set status = 'active', blocked_reason = null, deleted_at = now() where username = 'admin';
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_unavailable',
  'una administracion retirada en el limite conserva su rechazo de no disponible'
);
update workers set deleted_at = null where username = 'admin';
alter table workers enable trigger workers_guard_admin;

select is(
  public.custom_access_token_hook('{"user_id":"55555555-5555-5555-5555-555555555555","authentication_method":"password","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_unavailable',
  'un usuario sin perfil de trabajador se rechaza como no disponible'
);

select ok(
  not has_function_privilege('anon', 'public.custom_access_token_hook(jsonb)', 'execute')
    and not has_function_privilege('authenticated', 'public.custom_access_token_hook(jsonb)', 'execute'),
  'anon y authenticated no ejecutan el gancho del token'
);
select ok(
  has_function_privilege('supabase_auth_admin', 'public.custom_access_token_hook(jsonb)', 'execute')
    and not has_column_privilege('supabase_auth_admin', 'public.workers', 'failed_attempts', 'select')
    and not has_column_privilege('supabase_auth_admin', 'public.workers', 'personal_email', 'select'),
  'el servidor de autenticacion ejecuta el gancho sin leer intentos fallidos ni correo personal'
);

select * from finish();
rollback;
