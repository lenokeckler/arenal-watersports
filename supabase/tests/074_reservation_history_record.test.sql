begin;
select plan(15);

insert into auth.users (id, email) values
  ('e3740000-0000-4000-8000-000000000001', 'history-record-admin@arenal.local'),
  ('e3740000-0000-4000-8000-000000000002', 'history-record-reservations@arenal.local'),
  ('e3740000-0000-4000-8000-000000000003', 'history-record-operations@arenal.local'),
  ('e3740000-0000-4000-8000-000000000004', 'history-record-blocked@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e3740000-0000-4000-8000-000000000001', 'history-record-admin', 'Record Admin', 'history-record-admin@correo.com', 'administracion'),
  ('e3740000-0000-4000-8000-000000000002', 'history-record-reservations', 'Record Reservations', 'history-record-reservations@correo.com', 'reservas'),
  ('e3740000-0000-4000-8000-000000000003', 'history-record-operations', 'Record Operations', 'history-record-operations@correo.com', 'operaciones'),
  ('e3740000-0000-4000-8000-000000000004', 'history-record-blocked', 'Record Blocked', 'history-record-blocked@correo.com', 'operaciones');

update workers set status = 'blocked', blocked_reason = 'administration'
where id = 'e3740000-0000-4000-8000-000000000004';

insert into reservations (id, customer_name, people_count, type, starts_at, duration_minutes, status, cancellation_reason, created_by, updated_by) values
  ('e3740000-0000-4000-8000-000000000201', 'Record closed', 1, 'rental', '2030-01-01 15:00:00+00', 60, 'closed', null, 'e3740000-0000-4000-8000-000000000001', 'e3740000-0000-4000-8000-000000000002'),
  ('e3740000-0000-4000-8000-000000000202', 'Record cancelled', 1, 'tour', '2030-01-02 15:00:00+00', 60, 'cancelled', 'No show', 'e3740000-0000-4000-8000-000000000001', 'e3740000-0000-4000-8000-000000000001'),
  ('e3740000-0000-4000-8000-000000000203', 'Record scheduled', 1, 'rental', '2030-01-03 15:00:00+00', 60, 'scheduled', null, 'e3740000-0000-4000-8000-000000000001', 'e3740000-0000-4000-8000-000000000001'),
  ('e3740000-0000-4000-8000-000000000204', 'Record dispatched', 1, 'rental', '2030-01-04 15:00:00+00', 60, 'dispatched', null, 'e3740000-0000-4000-8000-000000000001', 'e3740000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3740000-0000-4000-8000-000000000002","role":"authenticated"}';

select is((select customer_name || ':' || status::text from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000201')),
  'Record closed:closed', 'A closed reservation has a record');
select is((select cancellation_reason from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000201')), null,
  'A closed record has no cancellation reason');
select is((select cancellation_reason from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000202')), 'No show',
  'A cancelled record carries its reason');
select is((select count(*)::integer from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000203')), 0,
  'A scheduled reservation has no record');
select is((select count(*)::integer from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000204')), 0,
  'A dispatched reservation has no record');
select is((select count(*)::integer from public.get_reservation_history_record('e3740000-0000-4000-8000-0000000000ff')), 0,
  'An unknown id has no record');
select is((select array[created_by_name, updated_by_name] from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000201')),
  array['Record Admin', 'Record Reservations'], 'The creator and last modifier names resolve');
select is((select array[h.created_at::text, h.updated_at::text] from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000201') h),
  (select array[r.created_at::text, r.updated_at::text] from public.reservations r where r.id = 'e3740000-0000-4000-8000-000000000201'),
  'The creation and modification instants are those stored');
select is((select count(*)::integer from public.workers where id = 'e3740000-0000-4000-8000-000000000001'), 0,
  'The workers table hides the creator from the caller');

set local request.jwt.claims to '{"sub":"e3740000-0000-4000-8000-000000000003","role":"authenticated"}';
select is((select count(*)::integer from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000201')), 1,
  'A worker in operations can read a record');

set local request.jwt.claims to '{"sub":"e3740000-0000-4000-8000-000000000001","role":"authenticated"}';
select is((select count(*)::integer from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000201')), 1,
  'An administrator can read a record');

set local request.jwt.claims to '{"sub":"e3740000-0000-4000-8000-000000000004","role":"authenticated"}';
select throws_ok($$select * from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000201')$$, '42501',
  null, 'A blocked account cannot read a record');

set local role anon;
set local request.jwt.claims to '{"role":"anon"}';
select throws_ok($$select * from public.get_reservation_history_record('e3740000-0000-4000-8000-000000000201')$$, '42501',
  null, 'The anonymous role cannot execute the record read');

reset role;
select is((select p.prosecdef from pg_proc p where p.proname = 'get_reservation_history_record'), true,
  'The record read runs as its owner');
select is(
  (select count(*)::integer
   from pg_proc p, unnest(p.proargnames) as argument_name
   where p.proname = 'get_reservation_history_record' and argument_name like '%amount%'),
  0,
  'The record read returns no money column');

select * from finish();
rollback;
