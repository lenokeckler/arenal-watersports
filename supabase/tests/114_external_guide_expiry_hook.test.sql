begin;
select plan(5);

insert into auth.users (id, email) values
  ('e1400000-0000-4000-8000-000000000001', 'res14-expired@arenal.local'),
  ('e1400000-0000-4000-8000-000000000002', 'res14-current@arenal.local');

insert into workers (
  id, username, full_name, base_role, is_external_guide,
  national_id, expires_at
) values
  ('e1400000-0000-4000-8000-000000000001', '140000001', 'Expired Guide',
   'operaciones', true, '140000001', now() - interval '1 second'),
  ('e1400000-0000-4000-8000-000000000002', '140000002', 'Current Guide',
   'operaciones', true, '140000002', now() + interval '1 day');

select is(
  custom_access_token_hook(jsonb_build_object(
    'user_id', 'e1400000-0000-4000-8000-000000000001',
    'authentication_method', 'password', 'claims', '{}'::jsonb
  )) #>> '{error,message}',
  'account_expired', 'expired guide cannot sign in');
select is(
  custom_access_token_hook(jsonb_build_object(
    'user_id', 'e1400000-0000-4000-8000-000000000001',
    'authentication_method', 'token_refresh', 'claims', '{}'::jsonb
  )) #>> '{error,message}',
  'account_expired', 'expired guide cannot refresh a token');
select is(
  custom_access_token_hook(jsonb_build_object(
    'user_id', 'e1400000-0000-4000-8000-000000000002',
    'authentication_method', 'password', 'claims', '{}'::jsonb
  )) #>> '{claims,must_change_password}',
  'true', 'current guide receives the first password change claim');
select is(
  has_column_privilege('supabase_auth_admin', 'public.workers', 'expires_at', 'select'),
  true, 'Auth hook can read guide expiry');
select is(
  (select private.is_active_guide('e1400000-0000-4000-8000-000000000001')),
  false, 'expired guide cannot be assigned to a new tour');

select * from finish();
rollback;
