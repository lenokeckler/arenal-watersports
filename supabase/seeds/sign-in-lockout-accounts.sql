insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
  confirmation_token, recovery_token, email_change_token_new, email_change,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
select
  v.id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', v.email,
  extensions.crypt('Arenal.2026', extensions.gen_salt('bf')), now(),
  '', '', '', '',
  jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')), '{}'::jsonb, now(), now()
from (values
  ('00000000-0000-0000-0000-000000000003'::uuid, 'bloqueo_intentos@arenal.local'),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'bloqueo_admin@arenal.local')
) as v(id, email)
on conflict do nothing;

insert into auth.identities (
  id, user_id, provider_id, identity_data, provider, last_sign_in_at,
  created_at, updated_at
)
select
  gen_random_uuid(), v.id, v.id,
  jsonb_build_object('sub', v.id, 'email', v.email),
  'email', now(), now(), now()
from (values
  ('00000000-0000-0000-0000-000000000003'::uuid, 'bloqueo_intentos@arenal.local'),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'bloqueo_admin@arenal.local')
) as v(id, email)
on conflict do nothing;

insert into workers
  (id, username, full_name, base_role, status, blocked_reason, failed_attempts,
   must_change_password, created_by)
values
  ('00000000-0000-0000-0000-000000000003', 'bloqueo_intentos', 'Bloqueo por intentos',
   'operaciones', 'blocked', 'failed_attempts', sign_in_attempt_limit(), false, '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000004', 'bloqueo_admin', 'Bloqueo por administración',
   'operaciones', 'blocked', 'administration', 0, false, '00000000-0000-0000-0000-000000000001')
on conflict do nothing;
