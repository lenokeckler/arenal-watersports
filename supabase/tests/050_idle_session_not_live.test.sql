begin;
select plan(17);

insert into auth.users (id, email) values
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into auth.sessions (id, user_id, created_at, not_after) values
  ('dddddddd-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', now(), null),
  ('dddddddd-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', now() - interval '2 days', null),
  ('dddddddd-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', now() - interval '2 days', null),
  ('dddddddd-0000-0000-0000-000000000004', '33333333-3333-3333-3333-333333333333', now(), now() - interval '1 minute'),
  ('dddddddd-0000-0000-0000-000000000005', '33333333-3333-3333-3333-333333333333', now() - interval '3 days', null);

insert into public.session_activity (session_id, user_id, last_activity_at) values
  ('dddddddd-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', now()),
  ('dddddddd-0000-0000-0000-000000000005', '33333333-3333-3333-3333-333333333333', now() - interval '2 days'),
  ('dddddddd-0000-0000-0000-000000000099', '33333333-3333-3333-3333-333333333333', now());

select ok(
  (select c.relrowsecurity from pg_class c where c.oid = 'public.session_activity'::regclass),
  'session_activity tiene RLS activo'
);
select ok(
  not has_table_privilege('authenticated', 'public.session_activity', 'select')
    and not has_table_privilege('authenticated', 'public.session_activity', 'update')
    and not has_table_privilege('authenticated', 'public.session_activity', 'insert'),
  'authenticated no lee ni escribe session_activity'
);
select ok(
  not has_table_privilege('anon', 'public.session_activity', 'select'),
  'anon no lee session_activity'
);
select ok(
  not has_function_privilege('authenticated', 'public.session_last_activity(uuid, timestamptz)', 'execute'),
  'authenticated no ejecuta session_last_activity'
);
select ok(
  not has_function_privilege('authenticated', 'public.purge_ended_session_activity()', 'execute'),
  'authenticated no ejecuta la purga'
);
select ok(
  has_function_privilege('authenticated', 'public.current_session_state()', 'execute'),
  'authenticated ejecuta current_session_state'
);
select ok(
  not has_function_privilege('anon', 'public.current_session_state()', 'execute'),
  'anon no ejecuta current_session_state'
);
select is(
  (select p.proconfig from pg_proc p where p.oid = 'public.current_session_state()'::regprocedure),
  array['search_path=""'],
  'current_session_state fija el search_path vacio'
);

set local role authenticated;

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"dddddddd-0000-0000-0000-000000000001"}';
select is(public.current_session_state(), 'live', 'una sesion recien abierta esta viva');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"dddddddd-0000-0000-0000-000000000002"}';
select is(public.current_session_state(), 'idle', 'esa sesion se reporta como cerrada por inactividad');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"dddddddd-0000-0000-0000-000000000003"}';
select is(public.current_session_state(), 'live', 'la ultima accion cuenta y no la hora del ingreso');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"dddddddd-0000-0000-0000-000000000005"}';
select is(public.current_session_state(), 'idle', 'una ultima accion vieja cierra la sesion');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"dddddddd-0000-0000-0000-000000000004"}';
select is(public.current_session_state(), 'ended', 'una sesion vencida no se confunde con inactividad');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"dddddddd-0000-0000-0000-000000000098"}';
select is(public.current_session_state(), 'ended', 'una sesion inexistente esta terminada');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"not-a-uuid"}';
select is(public.current_session_state(), 'ended', 'un reclamo de sesion malformado esta terminado sin fallar');

reset role;
select public.purge_ended_session_activity();

select ok(
  not exists (select 1 from public.session_activity where session_id = 'dddddddd-0000-0000-0000-000000000099'),
  'la purga borra la actividad de una sesion que ya no existe'
);
select is(
  (select count(*) from public.session_activity where session_id in ('dddddddd-0000-0000-0000-000000000003', 'dddddddd-0000-0000-0000-000000000005')),
  2::bigint,
  'la purga conserva la actividad de las sesiones que existen'
);

select * from finish();
rollback;
