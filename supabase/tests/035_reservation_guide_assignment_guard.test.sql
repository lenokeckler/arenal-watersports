begin;
select plan(12);

insert into auth.users (id, email) values
  ('e3500000-0000-4000-8000-000000000001', 'res12-guard-reservas@arenal.local'),
  ('e3500000-0000-4000-8000-000000000002', 'res12-guard-guide@arenal.local'),
  ('e3500000-0000-4000-8000-000000000003', 'res12-guard-worker@arenal.local'),
  ('e3500000-0000-4000-8000-000000000004', 'res12-guard-second-guide@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e3500000-0000-4000-8000-000000000001', 'res12-guard-reservas', 'RES12 Guard Reservas', 'reservas'),
  ('e3500000-0000-4000-8000-000000000002', 'res12-guard-guide', 'RES12 Guard Guide', 'operaciones'),
  ('e3500000-0000-4000-8000-000000000003', 'res12-guard-worker', 'RES12 Guard Worker', 'operaciones'),
  ('e3500000-0000-4000-8000-000000000004', 'res12-guard-second-guide', 'RES12 Guard Second Guide', 'operaciones');
insert into worker_marks (worker_id, mark, granted_by)
values
  ('e3500000-0000-4000-8000-000000000002', 'guia', 'e3500000-0000-4000-8000-000000000001'),
  ('e3500000-0000-4000-8000-000000000004', 'guia', 'e3500000-0000-4000-8000-000000000001');
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('e3500000-0000-4000-8000-000000000101', 'RES12 Guard tour', 1, 'tour', '2035-12-01 09:00:00+00', 60, 'scheduled',
   'e3500000-0000-4000-8000-000000000001', 'e3500000-0000-4000-8000-000000000001'),
  ('e3500000-0000-4000-8000-000000000102', 'RES12 Guard rental', 1, 'rental', '2035-12-02 09:00:00+00', 60, 'scheduled',
   'e3500000-0000-4000-8000-000000000001', 'e3500000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3500000-0000-4000-8000-000000000001","role":"authenticated"}';

select lives_ok(
  $$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
     values ('e3500000-0000-4000-8000-000000000101', 'e3500000-0000-4000-8000-000000000002',
             'e3500000-0000-4000-8000-000000000001') $$,
  'direct inserts permit marked guides on tours'
);
select is((select count(*)::integer from reservation_guides
  where reservation_id = 'e3500000-0000-4000-8000-000000000101'), 1,
  'the valid direct assignment is persisted');
select throws_ok(
  $$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
     values ('e3500000-0000-4000-8000-000000000101', 'e3500000-0000-4000-8000-000000000004',
             'e3500000-0000-4000-8000-000000000002') $$,
  'P0001', 'Assignment author must match the authenticated worker',
  'direct inserts cannot spoof the assignment author'
);
select throws_ok(
  $$ update reservation_guides set assigned_by = 'e3500000-0000-4000-8000-000000000002'
     where reservation_id = 'e3500000-0000-4000-8000-000000000101' $$,
  'P0001', 'Assignment author must match the authenticated worker',
  'direct updates cannot spoof the assignment author'
);
select throws_ok(
  $$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
     values ('e3500000-0000-4000-8000-000000000101', 'e3500000-0000-4000-8000-000000000003',
             'e3500000-0000-4000-8000-000000000001') $$,
  'P0001', 'Every assigned worker must be marked as a guide',
  'direct inserts reject workers without the guide mark'
);
select throws_ok(
  $$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
     values ('e3500000-0000-4000-8000-000000000102', 'e3500000-0000-4000-8000-000000000002',
             'e3500000-0000-4000-8000-000000000001') $$,
  'P0001', 'Guides can only be assigned to tour reservations',
  'direct inserts reject guide assignments on rentals'
);
select throws_ok(
  $$ update reservation_guides set worker_id = 'e3500000-0000-4000-8000-000000000003'
     where reservation_id = 'e3500000-0000-4000-8000-000000000101' $$,
  'P0001', 'Every assigned worker must be marked as a guide',
  'updates cannot replace a guide with an unmarked worker'
);
select is((select count(*)::integer from reservation_guides
  where reservation_id = 'e3500000-0000-4000-8000-000000000101'
    and worker_id = 'e3500000-0000-4000-8000-000000000002'), 1,
  'a rejected worker update preserves the valid assignment');
select throws_ok(
  $$ update reservation_guides set reservation_id = 'e3500000-0000-4000-8000-000000000102'
     where reservation_id = 'e3500000-0000-4000-8000-000000000101' $$,
  'P0001', 'Guides can only be assigned to tour reservations',
  'updates cannot move a guide assignment to a rental'
);
select is((select count(*)::integer from reservation_guides
  where reservation_id = 'e3500000-0000-4000-8000-000000000101'), 1,
  'a rejected reservation update preserves the valid assignment');

reset role;
set local role service_role;
set local request.jwt.claims to '{}';
select lives_ok(
  $$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
     values ('e3500000-0000-4000-8000-000000000101', 'e3500000-0000-4000-8000-000000000004',
             'e3500000-0000-4000-8000-000000000001') $$,
  'service role maintenance can insert guide assignments without an auth claim'
);
select lives_ok(
  $$ update reservations set type = 'rental'
     where id = 'e3500000-0000-4000-8000-000000000101' $$,
  'service role maintenance can update reservation types with existing assignments'
);
reset role;
select * from finish();
rollback;
