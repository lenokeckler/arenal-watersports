begin;
select plan(16);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'bloqueado@arenal.local');

insert into public.workers (id, username, full_name, base_role, personal_email, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'administracion', 'admin@correo.cr', false),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso Rojas', 'operaciones', null, false),
  ('44444444-4444-4444-4444-444444444444', 'bloqueado', 'Bloqueado Por Intentos', 'reservas', null, false);

update public.workers
   set status = 'blocked', blocked_reason = 'failed_attempts', failed_attempts = 10
 where id = '44444444-4444-4444-4444-444444444444';

insert into auth.sessions (id, user_id, created_at) values
  ('cccccccc-0000-0000-0000-000000000033', '33333333-3333-3333-3333-333333333333', now());

select ok(
  not has_function_privilege('anon', 'public.block_worker(uuid)', 'execute')
    and not has_function_privilege('anon', 'public.unlock_worker(uuid)', 'execute'),
  'anon no bloquea ni desbloquea'
);
select ok(
  not has_function_privilege('authenticated', 'public.revoke_worker_sessions(uuid)', 'execute'),
  'nadie cierra sesiones ajenas directamente'
);
select is(
  (select array_agg(distinct p.proconfig[1]) from pg_proc p where p.proname in ('block_worker', 'unlock_worker', 'revoke_worker_sessions')),
  array['search_path=""'],
  'las funciones de bloqueo fijan el search_path vacio'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is(public.unlock_worker('44444444-4444-4444-4444-444444444444'), 'not_allowed', 'nadie mas que administracion desbloquea');
select is(public.block_worker('44444444-4444-4444-4444-444444444444'), 'not_allowed', 'nadie mas que administracion bloquea');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.unlock_worker('44444444-4444-4444-4444-444444444444'), 'unlocked', 'administracion levanta el bloqueo de quien llego a los diez intentos');
select is(public.block_worker('11111111-1111-1111-1111-111111111111'), 'admin_account', 'la cuenta de administracion nunca se bloquea');
select is(public.block_worker('99999999-9999-9999-9999-999999999999'), 'not_found', 'una cuenta inexistente no se bloquea');
select is(public.block_worker('33333333-3333-3333-3333-333333333333'), 'blocked', 'administracion bloquea a mano una cuenta activa');
select is(public.block_worker('33333333-3333-3333-3333-333333333333'), 'blocked', 'bloquear dos veces no falla');

reset role;
select is(
  (select status::text || '/' || blocked_reason::text from public.workers where id = '44444444-4444-4444-4444-444444444444'),
  null,
  'al desbloquear no queda motivo de bloqueo'
);
select is(
  (select status::text || '/' || failed_attempts from public.workers where id = '44444444-4444-4444-4444-444444444444'),
  'active/0',
  'al desbloquear la cuenta queda activa y con los intentos en cero'
);
select is(
  (select status::text || '/' || blocked_reason::text from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'blocked/administration',
  'el bloqueo a mano queda como bloqueo de administracion'
);
select is(
  (select count(*) from auth.sessions where user_id = '33333333-3333-3333-3333-333333333333'),
  0::bigint,
  'al bloquear se cierran las sesiones abiertas de esa persona'
);
select is(
  (select deleted_at from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  null,
  'bloquear no da de baja: la persona sigue en el listado'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.unlock_worker('33333333-3333-3333-3333-333333333333'), 'unlocked', 'administracion reactiva despues la cuenta que bloqueo');

select * from finish();
rollback;
