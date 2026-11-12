begin;
select plan(24);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'rosa@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'ismael@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'rosa', 'Rosa', 'reservas'),
  ('33333333-3333-3333-3333-333333333333', 'ismael', 'Ismael', 'operaciones');

select is(public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111'), false, 'la administracion sin intentos fallidos no requiere recuperacion');

update workers set failed_attempts = public.sign_in_attempt_limit() - 1 where username = 'admin';
select is(public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111'), false, 'la administracion a un intento del limite no requiere recuperacion');

update workers set failed_attempts = public.sign_in_attempt_limit() where username = 'admin';
select is(public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111'), true, 'la administracion en el limite requiere recuperacion');

update workers set failed_attempts = public.sign_in_attempt_limit() + 1 where username = 'admin';
select is(public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111'), true, 'la administracion sobre el limite requiere recuperacion');

update workers set failed_attempts = public.sign_in_attempt_limit() where username in ('rosa', 'ismael');
select is(public.sign_in_requires_recovery('22222222-2222-2222-2222-222222222222'), false, 'una cuenta de reservas en el limite no requiere recuperacion');
select is(public.sign_in_requires_recovery('33333333-3333-3333-3333-333333333333'), false, 'una cuenta de operaciones en el limite no requiere recuperacion');
select is(public.sign_in_requires_recovery('ffffffff-0000-0000-0000-000000000000'), false, 'un id desconocido no requiere recuperacion');
select is(public.sign_in_requires_recovery(null), false, 'un id nulo no requiere recuperacion');

select throws_ok(
  $$ update workers set status = 'blocked', blocked_reason = 'failed_attempts' where username = 'admin' $$,
  'P0001', 'La cuenta de administracion no se bloquea',
  'el guardian impide bloquear la cuenta de administracion'
);
select throws_ok(
  $$ update workers set deleted_at = now() where username = 'admin' $$,
  'P0001', 'La cuenta de administracion no se elimina',
  'el guardian impide retirar la cuenta de administracion'
);

alter table workers disable trigger workers_guard_admin;
update workers set status = 'blocked', blocked_reason = 'administration' where username = 'admin';
select is(public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111'), false, 'una administracion bloqueada en el limite no requiere recuperacion');

update workers set status = 'active', blocked_reason = null, deleted_at = now() where username = 'admin';
select is(public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111'), false, 'una administracion retirada en el limite no requiere recuperacion');

update workers set deleted_at = null where username = 'admin';
alter table workers enable trigger workers_guard_admin;

select is(public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111'), true, 'la administracion activa en el limite vuelve a requerir recuperacion');

select is(has_function_privilege('supabase_auth_admin', 'public.sign_in_requires_recovery(uuid)', 'execute'), true, 'supabase_auth_admin ejecuta la regla');
select is(has_function_privilege('anon', 'public.sign_in_requires_recovery(uuid)', 'execute'), false, 'anon no tiene permiso sobre la regla');
select is(has_function_privilege('authenticated', 'public.sign_in_requires_recovery(uuid)', 'execute'), false, 'authenticated no tiene permiso sobre la regla');
select is(has_function_privilege('service_role', 'public.sign_in_requires_recovery(uuid)', 'execute'), false, 'service_role no tiene permiso sobre la regla');

set local role anon;
select throws_ok($$ select public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111') $$, '42501', null, 'anon no puede ejecutar la regla');
reset role;

set local role authenticated;
select throws_ok($$ select public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111') $$, '42501', null, 'authenticated no puede ejecutar la regla');
reset role;

set local role service_role;
select throws_ok($$ select public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111') $$, '42501', null, 'service_role no puede ejecutar la regla');
reset role;

select is_definer('public', 'sign_in_requires_recovery', array['uuid'], 'la regla es security definer');
select is(
  (select proconfig from pg_proc where pronamespace = 'public'::regnamespace and proname = 'sign_in_requires_recovery'),
  array['search_path=""'],
  'la regla fija un search_path vacio'
);

select is(has_function_privilege('anon', 'public.sign_in_attempt_limit()', 'execute'), false, 'anon sigue sin leer el limite de intentos');
select is(has_function_privilege('authenticated', 'public.sign_in_attempt_limit()', 'execute'), false, 'authenticated sigue sin leer el limite de intentos');

select * from finish();
rollback;
