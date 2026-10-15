begin;
select plan(15);

insert into auth.users (id, email) values
  ('a1111111-1111-1111-1111-111111111111', 'mode-one@example.test'),
  ('a2222222-2222-2222-2222-222222222222', 'mode-many@example.test');
insert into public.workers (id, username, full_name, base_role, must_change_password) values
  ('a1111111-1111-1111-1111-111111111111', 'mode_one', 'One area', 'operaciones', false),
  ('a2222222-2222-2222-2222-222222222222', 'mode_many', 'Many areas', 'reservas', false);
insert into public.worker_areas (worker_id, area, granted_by) values
  ('a2222222-2222-2222-2222-222222222222', 'operaciones', 'a2222222-2222-2222-2222-222222222222'),
  ('a2222222-2222-2222-2222-222222222222', 'administracion', 'a2222222-2222-2222-2222-222222222222');
insert into auth.sessions (id, user_id) values
  ('b1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111'),
  ('b2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222'),
  ('b3333333-3333-3333-3333-333333333333', 'a2222222-2222-2222-2222-222222222222');

set local role authenticated;
set local request.jwt.claims to '{"sub":"a1111111-1111-1111-1111-111111111111","session_id":"b1111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is((select active_area from public.resolve_work_mode()), 'operaciones'::public.work_area, 'One area enters directly');
select is((select allowed_areas from public.resolve_work_mode()), array['operaciones']::public.work_area[], 'Discovery returns granted areas');
select is((select session_revision from public.resolve_work_mode()), 0::bigint, 'Repeated resolution does not advance revision');

set local request.jwt.claims to '{"sub":"a2222222-2222-2222-2222-222222222222","session_id":"b2222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is((select active_area from public.resolve_work_mode()), null::public.work_area, 'Multiple areas without preference require selection');
select is((select cardinality(allowed_areas) from public.resolve_work_mode()), 3, 'All three grants are discoverable');
update public.workers set last_work_area = 'reservas' where id = auth.uid();
select is((select active_area from public.resolve_work_mode()), null::public.work_area, 'An unresolved session ignores later preference changes');
set local request.jwt.claims to '{"sub":"a2222222-2222-2222-2222-222222222222","session_id":"b3333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is((select active_area from public.resolve_work_mode()), 'reservas'::public.work_area, 'A new session uses a granted remembered area');

reset role;
delete from public.worker_areas where worker_id = 'a2222222-2222-2222-2222-222222222222' and area = 'reservas';
set local role authenticated;
select is((select active_area from public.resolve_work_mode()), null::public.work_area, 'Revocation clears an active mode when multiple grants remain');
select is((select session_revision from public.resolve_work_mode()), 1::bigint, 'Revocation advances the session revision');
reset role;
delete from auth.sessions where id = 'b2222222-2222-2222-2222-222222222222';
insert into auth.sessions (id, user_id) values
  ('b2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222');
set local role authenticated;
set local request.jwt.claims to '{"sub":"a2222222-2222-2222-2222-222222222222","session_id":"b2222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is((select active_area from public.resolve_work_mode()), null::public.work_area, 'A new session ignores a revoked remembered area');
reset role;
delete from public.worker_areas where worker_id = 'a2222222-2222-2222-2222-222222222222' and area = 'administracion';
set local role authenticated;
select is((select active_area from public.resolve_work_mode()), 'operaciones'::public.work_area, 'A remaining sole grant is confirmed automatically');
reset role;
delete from public.worker_areas where worker_id = 'a2222222-2222-2222-2222-222222222222';
set local role authenticated;
select is((select allowed_areas from public.resolve_work_mode()), '{}'::public.work_area[], 'Zero grants remain an empty discovery result');
select is((select active_area from public.resolve_work_mode()), null::public.work_area, 'Zero grants never fabricate a mode');
select is((select session_revision from public.resolve_work_mode()), 2::bigint, 'Clearing the last grant advances revision');
select is((select session_revision from public.resolve_work_mode()), 2::bigint, 'An unchanged null mode keeps its revision');

reset role;
select * from finish();
rollback;
