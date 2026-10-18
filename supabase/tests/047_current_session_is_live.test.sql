begin;
select plan(15);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into auth.sessions (id, user_id, not_after) values
  ('cccccccc-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', null),
  ('cccccccc-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', now() - interval '1 minute'),
  ('cccccccc-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', null),
  ('cccccccc-0000-0000-0000-000000000004', '33333333-3333-3333-3333-333333333333', now() + interval '1 hour');

select ok(
  not has_function_privilege('anon', 'public.current_session_is_live()', 'execute'),
  'anon no ejecuta current_session_is_live'
);
select ok(
  has_function_privilege('authenticated', 'public.current_session_is_live()', 'execute'),
  'authenticated ejecuta current_session_is_live'
);
select ok(
  not has_function_privilege('authenticated', 'public.session_is_live()', 'execute'),
  'authenticated sigue sin ejecutar session_is_live directamente'
);
select ok(
  (select p.prosecdef from pg_proc p where p.oid = 'public.current_session_is_live()'::regprocedure),
  'current_session_is_live es security definer'
);
select is(
  (select p.proconfig from pg_proc p where p.oid = 'public.current_session_is_live()'::regprocedure),
  array['search_path=""'],
  'current_session_is_live fija el search_path vacio'
);

set local role authenticated;

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"cccccccc-0000-0000-0000-000000000001"}';
select ok(public.current_session_is_live(), 'una sesion propia existente esta viva');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"cccccccc-0000-0000-0000-000000000004"}';
select ok(public.current_session_is_live(), 'una sesion propia con vencimiento futuro esta viva');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"cccccccc-0000-0000-0000-000000000002"}';
select ok(not public.current_session_is_live(), 'una sesion propia vencida no esta viva');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"cccccccc-0000-0000-0000-000000000003"}';
select ok(not public.current_session_is_live(), 'la sesion de otro usuario no revela que existe');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"cccccccc-0000-0000-0000-000000000099"}';
select ok(not public.current_session_is_live(), 'una sesion inexistente no esta viva');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"not-a-uuid"}';
select ok(not public.current_session_is_live(), 'un reclamo de sesion malformado no esta vivo sin fallar');

reset role;
delete from auth.sessions where id = 'cccccccc-0000-0000-0000-000000000001';
set local role authenticated;

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"cccccccc-0000-0000-0000-000000000001"}';
select ok(not public.current_session_is_live(), 'una sesion cuya fila se borro deja de estar viva');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"cccccccc-0000-0000-0000-000000000004"}';
select ok(public.current_session_is_live(), 'borrar una sesion no mata las demas del mismo usuario');

reset role;
set local request.jwt.claims to '';
set local role anon;
select throws_ok(
  'select public.current_session_is_live()',
  '42501',
  null,
  'anon recibe permiso denegado al llamar current_session_is_live'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"cccccccc-0000-0000-0000-000000000004"}';
select throws_ok(
  'select public.session_is_live()',
  '42501',
  null,
  'authenticated recibe permiso denegado al llamar session_is_live'
);

select * from finish();
rollback;
