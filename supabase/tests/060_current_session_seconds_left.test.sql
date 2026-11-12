begin;
select plan(11);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'otra@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into auth.sessions (id, user_id, created_at, not_after) values
  ('ffffffff-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', now() - interval '1 hour', null),
  ('ffffffff-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', now() - interval '5 minutes', null),
  ('ffffffff-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', now() - interval '2 days', null),
  ('ffffffff-0000-0000-0000-000000000004', '33333333-3333-3333-3333-333333333333', now(), now() - interval '1 minute'),
  ('ffffffff-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', now(), null);

insert into public.session_activity (session_id, user_id, last_activity_at) values
  ('ffffffff-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', now() - interval '10 minutes');

select ok(
  has_function_privilege('authenticated', 'public.current_session_seconds_left()', 'execute'),
  'authenticated ejecuta current_session_seconds_left'
);
select ok(
  not has_function_privilege('anon', 'public.current_session_seconds_left()', 'execute'),
  'anon no ejecuta current_session_seconds_left'
);
select ok(
  (select p.prosecdef from pg_proc p where p.oid = 'public.current_session_seconds_left()'::regprocedure),
  'current_session_seconds_left es security definer'
);
select is(
  (select p.proconfig from pg_proc p where p.oid = 'public.current_session_seconds_left()'::regprocedure),
  array['search_path=""'],
  'current_session_seconds_left fija el search_path vacio'
);

create temp table expected_seconds as
select
  ceil(extract(epoch from public.session_idle_deadline(now() - interval '10 minutes') - now()))::integer as seconds_after_last_action,
  ceil(extract(epoch from public.session_idle_deadline(now() - interval '5 minutes') - now()))::integer as seconds_after_sign_in;

grant select on expected_seconds to authenticated;

set local role authenticated;

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"ffffffff-0000-0000-0000-000000000001"}';
select is(
  public.current_session_seconds_left(),
  (select seconds_after_last_action from expected_seconds),
  'cuenta desde la ultima accion registrada y con la hora del servidor'
);
select ok(
  public.current_session_seconds_left() > 0,
  'una sesion viva siempre tiene tiempo por delante'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"ffffffff-0000-0000-0000-000000000002"}';
select is(
  public.current_session_seconds_left(),
  (select seconds_after_sign_in from expected_seconds),
  'sin acciones registradas cuenta desde el ingreso'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"ffffffff-0000-0000-0000-000000000003"}';
select is(
  public.current_session_seconds_left(),
  null,
  'una sesion cerrada por inactividad no tiene tiempo'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"ffffffff-0000-0000-0000-000000000004"}';
select is(
  public.current_session_seconds_left(),
  null,
  'una sesion vencida no tiene tiempo'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"ffffffff-0000-0000-0000-000000000005"}';
select is(
  public.current_session_seconds_left(),
  null,
  'la sesion de otro usuario no revela su tiempo'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"not-a-uuid"}';
select is(
  public.current_session_seconds_left(),
  null,
  'un reclamo de sesion malformado no tiene tiempo sin fallar'
);

select * from finish();
rollback;
