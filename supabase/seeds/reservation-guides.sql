insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
  confirmation_token, recovery_token, email_change_token_new, email_change,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
values
  ('cccccccc-1111-4000-8000-000000000001', '00000000-0000-0000-0000-000000000000',
   'authenticated', 'authenticated', 'guide-one@arenal.local', '', now(),
   '', '', '', '', jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')),
   '{}'::jsonb, now(), now()),
  ('cccccccc-1111-4000-8000-000000000002', '00000000-0000-0000-0000-000000000000',
   'authenticated', 'authenticated', 'guide-two@arenal.local', '', now(),
   '', '', '', '', jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')),
   '{}'::jsonb, now(), now())
on conflict (id) do nothing;

insert into auth.identities (
  id, user_id, provider_id, identity_data, provider, last_sign_in_at,
  created_at, updated_at
)
values
  ('cccccccc-1111-4000-8000-000000000001', 'cccccccc-1111-4000-8000-000000000001',
   'cccccccc-1111-4000-8000-000000000001',
   jsonb_build_object('sub', 'cccccccc-1111-4000-8000-000000000001', 'email', 'guide-one@arenal.local'),
   'email', now(), now(), now()),
  ('cccccccc-1111-4000-8000-000000000002', 'cccccccc-1111-4000-8000-000000000002',
   'cccccccc-1111-4000-8000-000000000002',
   jsonb_build_object('sub', 'cccccccc-1111-4000-8000-000000000002', 'email', 'guide-two@arenal.local'),
   'email', now(), now(), now())
on conflict do nothing;

insert into workers (id, username, full_name, base_role, created_by, updated_by)
values
  ('cccccccc-1111-4000-8000-000000000001', 'guide-one', 'Guia de prueba uno',
   'operaciones', '00000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000001'),
  ('cccccccc-1111-4000-8000-000000000002', 'guide-two', 'Guia de prueba dos',
   'operaciones', '00000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;

insert into worker_marks (worker_id, mark, granted_by)
values
  ('cccccccc-1111-4000-8000-000000000001', 'guia',
   '00000000-0000-0000-0000-000000000001'),
  ('cccccccc-1111-4000-8000-000000000002', 'guia',
   '00000000-0000-0000-0000-000000000001')
on conflict (worker_id, mark) do nothing;
