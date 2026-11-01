begin;
select plan(11);

insert into auth.users (id, email) values
  ('e3720000-0000-4000-8000-000000000001', 'history-admin@arenal.local'),
  ('e3720000-0000-4000-8000-000000000002', 'history-reservations@arenal.local'),
  ('e3720000-0000-4000-8000-000000000003', 'history-operations@arenal.local'),
  ('e3720000-0000-4000-8000-000000000004', 'history-blocked@arenal.local'),
  ('e3720000-0000-4000-8000-000000000005', 'history-both@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e3720000-0000-4000-8000-000000000001', 'history-admin', 'History Admin', 'history-admin@correo.com', 'administracion'),
  ('e3720000-0000-4000-8000-000000000002', 'history-reservations', 'History Reservations', 'history-reservations@correo.com', 'reservas'),
  ('e3720000-0000-4000-8000-000000000003', 'history-operations', 'History Operations', 'history-operations@correo.com', 'operaciones'),
  ('e3720000-0000-4000-8000-000000000004', 'history-blocked', 'History Blocked', 'history-blocked@correo.com', 'operaciones'),
  ('e3720000-0000-4000-8000-000000000005', 'history-both', 'History Both', 'history-both@correo.com', 'operaciones');

insert into worker_areas (worker_id, area, granted_by) values
  ('e3720000-0000-4000-8000-000000000005', 'reservas', 'e3720000-0000-4000-8000-000000000001');

update workers set status = 'blocked', blocked_reason = 'administration'
where id = 'e3720000-0000-4000-8000-000000000004';

set local role authenticated;

set local request.jwt.claims to '{"sub":"e3720000-0000-4000-8000-000000000002","role":"authenticated"}';
select lives_ok($$select * from public.list_reservation_history(0, 10)$$,
  'A worker in reservations can read the history');

set local request.jwt.claims to '{"sub":"e3720000-0000-4000-8000-000000000003","role":"authenticated"}';
select lives_ok($$select * from public.list_reservation_history(0, 10)$$,
  'A worker in operations can read the history');

set local request.jwt.claims to '{"sub":"e3720000-0000-4000-8000-000000000001","role":"authenticated"}';
select lives_ok($$select * from public.list_reservation_history(0, 10)$$,
  'An administrator can read the history');

set local request.jwt.claims to '{"sub":"e3720000-0000-4000-8000-000000000004","role":"authenticated"}';
select throws_ok($$select * from public.list_reservation_history(0, 10)$$, '42501',
  null, 'A blocked account cannot read the history');

set local request.jwt.claims to '{"role":"authenticated"}';
select throws_ok($$select * from public.list_reservation_history(0, 10)$$, '42501',
  null, 'A missing identity cannot read the history');

set local request.jwt.claims to '{"sub":"e3720000-0000-4000-8000-000000000005","role":"authenticated"}';
select throws_ok($$select * from public.list_reservation_history(0, 10)$$, '42501',
  null, 'A worker with several areas and no chosen mode cannot read the history');

set local role anon;
set local request.jwt.claims to '{"role":"anon"}';
select throws_ok($$select * from public.list_reservation_history(0, 10)$$, '42501',
  null, 'The anonymous role cannot execute the history list');

reset role;
select ok(
  not has_function_privilege('authenticated', 'public.reservation_history_equipment_names(uuid)', 'execute'),
  'Workers cannot execute the equipment names helper');
select ok(
  not has_function_privilege('authenticated', 'public.reservation_history_guide_names(uuid)', 'execute'),
  'Workers cannot execute the guide names helper');
select is(
  (select p.prosecdef from pg_proc p where p.proname = 'list_reservation_history'),
  true,
  'The history list runs as its owner');
select is(
  (select count(*)::integer
   from pg_proc p, unnest(p.proargnames) as argument_name
   where p.proname = 'list_reservation_history' and argument_name like '%amount%'),
  0,
  'The history list returns no money column');

select * from finish();
rollback;
