begin;
select plan(4);

insert into auth.users (id, email) values
  ('e3600000-0000-4000-8000-000000000001', 'res12-type-reservas@arenal.local'),
  ('e3600000-0000-4000-8000-000000000002', 'res12-type-guide@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e3600000-0000-4000-8000-000000000001', 'res12-type-reservas', 'RES12 Type Reservas', 'reservas'),
  ('e3600000-0000-4000-8000-000000000002', 'res12-type-guide', 'RES12 Type Guide', 'operaciones');
insert into worker_marks (worker_id, mark, granted_by)
values ('e3600000-0000-4000-8000-000000000002', 'guia', 'e3600000-0000-4000-8000-000000000001');
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('e3600000-0000-4000-8000-000000000101', 'RES12 Type assigned tour', 1, 'tour', '2035-12-03 09:00:00+00', 60, 'scheduled',
   'e3600000-0000-4000-8000-000000000001', 'e3600000-0000-4000-8000-000000000001'),
  ('e3600000-0000-4000-8000-000000000102', 'RES12 Type unassigned tour', 1, 'tour', '2035-12-04 09:00:00+00', 60, 'scheduled',
   'e3600000-0000-4000-8000-000000000001', 'e3600000-0000-4000-8000-000000000001');
set local request.jwt.claims to '{"sub":"e3600000-0000-4000-8000-000000000001","role":"authenticated"}';
insert into reservation_guides (reservation_id, worker_id, assigned_by)
values ('e3600000-0000-4000-8000-000000000101', 'e3600000-0000-4000-8000-000000000002',
        'e3600000-0000-4000-8000-000000000001');

set local role authenticated;

select throws_ok(
  $$ update reservations set type = 'rental' where id = 'e3600000-0000-4000-8000-000000000101' $$,
  'P0001', 'Guides can only be assigned to tour reservations',
  'a tour with assigned guides cannot be converted to a rental'
);
select is((select type = 'tour' from reservations where id = 'e3600000-0000-4000-8000-000000000101'), true,
  'the rejected type change preserves the tour');
select lives_ok(
  $$ update reservations set type = 'rental' where id = 'e3600000-0000-4000-8000-000000000102' $$,
  'a tour without guides can be converted to a rental'
);
select is((select type = 'rental' from reservations where id = 'e3600000-0000-4000-8000-000000000102'), true,
  'the unassigned reservation type change is persisted');

reset role;
select * from finish();
rollback;
