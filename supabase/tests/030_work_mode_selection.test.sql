begin;
select plan(17);

insert into auth.users (id, email) values
  ('a3333333-3333-3333-3333-333333333333', 'mode-select@example.test');
insert into public.workers (id, username, full_name, base_role, must_change_password) values
  ('a3333333-3333-3333-3333-333333333333', 'mode_select', 'Selection', 'reservas', false);
insert into public.worker_areas (worker_id, area, granted_by) values
  ('a3333333-3333-3333-3333-333333333333', 'operaciones', 'a3333333-3333-3333-3333-333333333333');
insert into auth.sessions (id, user_id) values
  ('b4444444-4444-4444-4444-444444444444', 'a3333333-3333-3333-3333-333333333333');

set local role authenticated;
set local request.jwt.claims to '{"sub":"a3333333-3333-3333-3333-333333333333","session_id":"b4444444-4444-4444-4444-444444444444","role":"authenticated"}';
select is((select active_area from public.select_work_mode('reservas')), 'reservas'::public.work_area, 'Selection confirms a granted area');
select is((select last_work_area from public.workers where id = auth.uid()), 'reservas'::public.work_area, 'Selection remembers its confirmed area');
select is((select session_revision from public.resolve_work_mode()), 1::bigint, 'Selection advances revision');
select is((select active_area from public.select_work_mode('operaciones')), 'operaciones'::public.work_area, 'Switching needs no new authentication');
select is((select last_work_area from public.workers where id = auth.uid()), 'operaciones'::public.work_area, 'Switching updates the remembered preference');
select throws_ok($$select * from public.select_work_mode('administracion')$$, '42501', 'The requested work area is not enabled', 'Selection cannot grant an unavailable area');
select throws_ok($$select * from public.select_work_mode(null)$$, '42501', 'The requested work area is not enabled', 'A null target is refused');
select is((select session_revision from public.resolve_work_mode()), 2::bigint, 'Denied selection leaves revision unchanged');
select is((select active_area from public.resolve_work_mode()), 'operaciones'::public.work_area, 'Denied selection leaves the current mode unchanged');
select throws_ok($$update public.worker_session_modes set area = 'administracion'$$, '42501', 'permission denied for table worker_session_modes', 'Direct session mode updates are denied');
select throws_ok($$delete from public.worker_session_modes$$, '42501', 'permission denied for table worker_session_modes', 'Direct session mode deletion is denied');
select throws_ok($$insert into public.worker_session_modes (session_id, worker_id) values ('b4444444-4444-4444-4444-444444444444', auth.uid())$$, '42501', 'permission denied for table worker_session_modes', 'Direct session mode insertion is denied');

reset role;
create function pg_temp.refuse_mode_preference() returns trigger language plpgsql as $$
begin
  raise exception 'Preference persistence failed';
end $$;
create trigger refuse_mode_preference before update of last_work_area on public.workers
  for each row execute function pg_temp.refuse_mode_preference();
set local role authenticated;
select throws_ok($$select * from public.select_work_mode('reservas')$$, 'P0001', 'Preference persistence failed', 'A persistence failure fails the entire selection');
select is((select active_area from public.resolve_work_mode()), 'operaciones'::public.work_area, 'Persistence failure rolls back the mode update');
select is((select session_revision from public.resolve_work_mode()), 2::bigint, 'Persistence failure rolls back the revision');
select is((select last_work_area from public.workers where id = auth.uid()), 'operaciones'::public.work_area, 'Persistence failure preserves the old preference');
reset role;
drop trigger refuse_mode_preference on public.workers;
delete from public.worker_areas where worker_id = 'a3333333-3333-3333-3333-333333333333' and area = 'reservas';
set local role authenticated;
select throws_ok($$select * from public.select_work_mode('reservas')$$, '42501', 'The requested work area is not enabled', 'Selection rechecks a freshly revoked grant');

reset role;
select * from finish();
rollback;
