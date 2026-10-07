begin;
select plan(9);

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
  ),
  '{"user_id":"77777777-7777-7777-7777-777777777777","claims":{"role":"authenticated"}}'::jsonb,
  'un usuario sin perfil de trabajador no recibe el reclamo'
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

select * from finish();
rollback;
