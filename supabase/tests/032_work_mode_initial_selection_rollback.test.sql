begin;
select plan(6);

insert into auth.users (id, email) values
  ('a6666666-6666-6666-6666-666666666666', 'mode-initial@example.test');
insert into public.workers (id, username, full_name, base_role, must_change_password) values
  ('a6666666-6666-6666-6666-666666666666', 'mode_initial', 'Initial selection', 'reservas', false);
insert into public.worker_areas (worker_id, area, granted_by) values
  ('a6666666-6666-6666-6666-666666666666', 'operaciones', 'a6666666-6666-6666-6666-666666666666');
insert into auth.sessions (id, user_id) values
  ('b9999999-9999-9999-9999-999999999999', 'a6666666-6666-6666-6666-666666666666');

set local role authenticated;
set local request.jwt.claims to '{"sub":"a6666666-6666-6666-6666-666666666666","session_id":"b9999999-9999-9999-9999-999999999999","role":"authenticated"}';
select throws_ok($$select * from public.select_work_mode('administracion')$$, '42501', 'The requested work area is not enabled', 'A denied first selection fails');
select is((select count(*) from public.worker_session_modes), 0::bigint, 'A denied first selection rolls back its new session row');
select is((select last_work_area from public.workers where id = auth.uid()), null::public.work_area, 'A denied first selection preserves the unset preference');

reset role;
create function pg_temp.refuse_initial_mode_preference() returns trigger language plpgsql as $$
begin
  raise exception 'Initial preference persistence failed';
end $$;
create trigger refuse_initial_mode_preference before update of last_work_area on public.workers
  for each row execute function pg_temp.refuse_initial_mode_preference();

set local role authenticated;
select throws_ok($$select * from public.select_work_mode('operaciones')$$, 'P0001', 'Initial preference persistence failed', 'A failed initial preference fails the first selection');
select is((select count(*) from public.worker_session_modes), 0::bigint, 'A failed first selection rolls back its new session row');
select is((select last_work_area from public.workers where id = auth.uid()), null::public.work_area, 'A failed first selection preserves the unset preference');

reset role;
select * from finish();
rollback;
