begin;
select plan(31);

insert into auth.users (id, email) values
  ('a4444444-4444-4444-4444-444444444444', 'mode-device@example.test'),
  ('a5555555-5555-5555-5555-555555555555', 'mode-other@example.test');
insert into public.workers (id, username, full_name, base_role, must_change_password) values
  ('a4444444-4444-4444-4444-444444444444', 'mode_device', 'Devices', 'reservas', false),
  ('a5555555-5555-5555-5555-555555555555', 'mode_other', 'Other worker', 'operaciones', false);
insert into public.worker_areas (worker_id, area, granted_by) values
  ('a4444444-4444-4444-4444-444444444444', 'operaciones', 'a4444444-4444-4444-4444-444444444444');
insert into auth.sessions (id, user_id) values
  ('b5555555-5555-5555-5555-555555555555', 'a4444444-4444-4444-4444-444444444444'),
  ('b6666666-6666-6666-6666-666666666666', 'a4444444-4444-4444-4444-444444444444'),
  ('b7777777-7777-7777-7777-777777777777', 'a5555555-5555-5555-5555-555555555555');

create function pg_temp.mode_claims(session_claim text, pending boolean default false) returns text
language sql as $$
  select set_config('request.jwt.claims', jsonb_build_object(
    'sub', 'a4444444-4444-4444-4444-444444444444', 'role', 'authenticated',
    'session_id', session_claim, 'must_change_password', pending)::text, true);
$$;

set local role authenticated;
select pg_temp.mode_claims('b5555555-5555-5555-5555-555555555555');
select is((select active_area from public.select_work_mode('reservas')), 'reservas'::public.work_area, 'The first device confirms Reservations');
select pg_temp.mode_claims('b6666666-6666-6666-6666-666666666666');
select is((select active_area from public.resolve_work_mode()), 'reservas'::public.work_area, 'Another device starts with the remembered preference');
select is((select active_area from public.select_work_mode('operaciones')), 'operaciones'::public.work_area, 'The second device changes its own mode');
select pg_temp.mode_claims('b5555555-5555-5555-5555-555555555555');
select is((select active_area from public.resolve_work_mode()), 'reservas'::public.work_area, 'An existing device ignores another device preference');
select is((select count(*) from public.worker_session_modes), 1::bigint, 'Metadata exposes only the current session');
select is((select active_area from public.select_work_mode('operaciones')), 'operaciones'::public.work_area, 'The same session can switch from another tab');
select is((select active_area from public.resolve_work_mode()), 'operaciones'::public.work_area, 'Tabs sharing a session see its confirmed mode');
select throws_ok($$select public.require_work_mode_session()$$, '42501', 'permission denied for function require_work_mode_session', 'Private identity cannot be executed directly');

select pg_temp.mode_claims(null);
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'A null session claim is rejected');
set local request.jwt.claims to '{"sub":"a4444444-4444-4444-4444-444444444444","role":"authenticated"}';
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'An absent session claim is rejected');
select pg_temp.mode_claims('not-a-uuid');
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'A malformed session claim is rejected');
select pg_temp.mode_claims('b8888888-8888-8888-8888-888888888888');
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'A nonexistent session is rejected');
select pg_temp.mode_claims('b7777777-7777-7777-7777-777777777777');
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'Another worker session is rejected');
select pg_temp.mode_claims('b5555555-5555-5555-5555-555555555555', true);
select throws_ok($$select * from public.select_work_mode('reservas')$$, '42501', 'Work mode requires an eligible authenticated session', 'A true pending-password JWT rejects selection');

reset role;
set local request.jwt.claims to '{}';
update auth.sessions set not_after = now() where id = 'b5555555-5555-5555-5555-555555555555';
set local role authenticated;
select pg_temp.mode_claims('b5555555-5555-5555-5555-555555555555');
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'An expired auth session is rejected');
reset role;
set local request.jwt.claims to '{}';
update auth.sessions set not_after = null where id = 'b5555555-5555-5555-5555-555555555555';
update public.workers set must_change_password = true where username = 'mode_device';
set local role authenticated;
select pg_temp.mode_claims('b5555555-5555-5555-5555-555555555555');
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'Database pending-password rejects a stale false claim');
reset role;
set local request.jwt.claims to '{}';
update public.workers set must_change_password = false, status = 'blocked', blocked_reason = 'administration' where username = 'mode_device';
set local role authenticated;
select pg_temp.mode_claims('b5555555-5555-5555-5555-555555555555');
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'A blocked worker is rejected');
reset role;
set local request.jwt.claims to '{}';
update public.workers set status = 'active', blocked_reason = null, expires_at = now() where username = 'mode_device';
set local role authenticated;
select pg_temp.mode_claims('b5555555-5555-5555-5555-555555555555');
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'An expired worker is rejected');
reset role;
set local request.jwt.claims to '{}';
update public.workers set expires_at = null, deleted_at = now() where username = 'mode_device';
set local role authenticated;
select pg_temp.mode_claims('b5555555-5555-5555-5555-555555555555');
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'A retired worker is rejected');
reset role;
set local request.jwt.claims to '{}';
update public.workers set deleted_at = null where username = 'mode_device';
delete from auth.sessions where id = 'b5555555-5555-5555-5555-555555555555';
select is((select count(*) from public.worker_session_modes where session_id = 'b5555555-5555-5555-5555-555555555555'), 0::bigint, 'Deleting auth session removes its mode');
set local role authenticated;
select pg_temp.mode_claims('b5555555-5555-5555-5555-555555555555');
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'A deleted session cannot be restored by its JWT');
set local request.jwt.claims to '{}';
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'Work mode requires an eligible authenticated session', 'A missing worker identity is rejected');
reset role;
set local role anon;
select throws_ok($$select * from public.resolve_work_mode()$$, '42501', 'permission denied for function resolve_work_mode', 'Anonymous callers cannot resolve mode');
select throws_ok($$select * from public.select_work_mode('reservas')$$, '42501', 'permission denied for function select_work_mode', 'Anonymous callers cannot select mode');
select throws_ok($$select * from public.worker_session_modes$$, '42501', 'permission denied for table worker_session_modes', 'Anonymous callers cannot read mode metadata');

reset role;
select is(has_function_privilege('service_role', 'public.resolve_work_mode()', 'EXECUTE'), false, 'Service role cannot resolve work mode');
select is(has_function_privilege('service_role', 'public.select_work_mode(public.work_area)', 'EXECUTE'), false, 'Service role cannot select work mode');
select is(has_function_privilege('service_role', 'public.require_work_mode_session()', 'EXECUTE'), false, 'Service role cannot execute private identity');
select is(has_function_privilege('authenticated', 'public.resolve_session_work_area(public.work_area,public.work_area[])', 'EXECUTE'), false, 'Clients cannot execute the private area resolver');
select is(has_table_privilege('service_role', 'public.worker_session_modes', 'UPDATE'), false, 'Service role cannot update session modes');
select is(has_function_privilege('anon', 'public.require_work_mode_session()', 'EXECUTE'), false, 'Anonymous callers cannot execute private identity');
select * from finish();
rollback;
