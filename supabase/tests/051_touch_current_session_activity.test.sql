begin;
select plan(13);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'otra@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into auth.sessions (id, user_id, created_at, not_after) values
  ('eeeeeeee-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', now(), null),
  ('eeeeeeee-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', now() - interval '2 days', null),
  ('eeeeeeee-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', now(), now() - interval '1 minute'),
  ('eeeeeeee-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', now(), null);

insert into public.session_activity (session_id, user_id, last_activity_at) values
  ('eeeeeeee-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', now() - interval '10 minutes');

select ok(
  has_function_privilege('authenticated', 'public.touch_current_session_activity()', 'execute'),
  'authenticated ejecuta touch_current_session_activity'
);
select ok(
  not has_function_privilege('anon', 'public.touch_current_session_activity()', 'execute'),
  'anon no ejecuta touch_current_session_activity'
);
select is(
  (select p.proconfig from pg_proc p where p.oid = 'public.touch_current_session_activity()'::regprocedure),
  array['search_path=""'],
  'touch_current_session_activity fija el search_path vacio'
);

set local role authenticated;

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"eeeeeeee-0000-0000-0000-000000000001"}';
select is(public.touch_current_session_activity(), 'live', 'una sesion viva registra su accion');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"eeeeeeee-0000-0000-0000-000000000002"}';
select is(public.touch_current_session_activity(), 'idle', 'una sesion cerrada por inactividad no registra la accion y lo dice');
select is(public.current_session_state(), 'idle', 'la accion no revive la sesion cerrada por inactividad');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"eeeeeeee-0000-0000-0000-000000000003"}';
select is(public.touch_current_session_activity(), 'ended', 'una sesion vencida no registra la accion');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"eeeeeeee-0000-0000-0000-000000000004"}';
select is(public.touch_current_session_activity(), 'ended', 'nadie registra acciones en la sesion de otra persona');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"not-a-uuid"}';
select is(public.touch_current_session_activity(), 'ended', 'un reclamo de sesion malformado no registra nada');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is(public.touch_current_session_activity(), 'ended', 'un token sin sesion no registra nada');

reset role;

select ok(
  (select last_activity_at > now() - interval '1 minute' from public.session_activity where session_id = 'eeeeeeee-0000-0000-0000-000000000001'),
  'la accion reinicia el contador de la sesion viva'
);
select ok(
  not exists (select 1 from public.session_activity where session_id in ('eeeeeeee-0000-0000-0000-000000000002', 'eeeeeeee-0000-0000-0000-000000000003', 'eeeeeeee-0000-0000-0000-000000000004')),
  'las sesiones rechazadas no quedan con actividad'
);
select is(
  (select user_id from public.session_activity where session_id = 'eeeeeeee-0000-0000-0000-000000000001'),
  '33333333-3333-3333-3333-333333333333'::uuid,
  'la actividad queda a nombre de quien es la sesion'
);

select * from finish();
rollback;
