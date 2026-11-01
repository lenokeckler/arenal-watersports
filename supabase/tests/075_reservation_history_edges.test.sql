begin;
select plan(11);

insert into auth.users (id, email) values
  ('e3750000-0000-4000-8000-000000000001', 'history-edge-admin@arenal.local'),
  ('e3750000-0000-4000-8000-000000000002', 'history-edge-reservations@arenal.local'),
  ('e3750000-0000-4000-8000-000000000003', 'history-edge-pending@arenal.local'),
  ('e3750000-0000-4000-8000-000000000004', 'history-edge-external@arenal.local'),
  ('e3750000-0000-4000-8000-000000000005', 'history-edge-both@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e3750000-0000-4000-8000-000000000001', 'history-edge-admin', 'Edge Admin', 'history-edge-admin@correo.com', 'administracion'),
  ('e3750000-0000-4000-8000-000000000002', 'history-edge-reservations', 'Edge Closer', 'history-edge-reservations@correo.com', 'reservas'),
  ('e3750000-0000-4000-8000-000000000003', 'history-edge-pending', 'Edge Pending', 'history-edge-pending@correo.com', 'reservas'),
  ('e3750000-0000-4000-8000-000000000005', 'history-edge-both', 'Edge Both', 'history-edge-both@correo.com', 'operaciones');

insert into workers (id, username, full_name, base_role, is_external_guide, expires_at, national_id) values
  ('e3750000-0000-4000-8000-000000000004', 'history-edge-external', 'Edge External', 'operaciones', true, '2099-01-01', '1-2222-2222');

insert into worker_areas (worker_id, area, granted_by) values
  ('e3750000-0000-4000-8000-000000000005', 'reservas', 'e3750000-0000-4000-8000-000000000001');

update workers set last_work_area = 'operaciones' where id = 'e3750000-0000-4000-8000-000000000005';
update workers set expires_at = now() - interval '1 day' where id = 'e3750000-0000-4000-8000-000000000004';

insert into equipment_categories (id, name, status, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by) values
  ('e3750000-0000-4000-8000-000000000101', 'Edge Category', 'active', 'by_unit', true, 60, 'e3750000-0000-4000-8000-000000000001', 'e3750000-0000-4000-8000-000000000001');

insert into equipment_units (id, category_id, code, created_by, updated_by) values
  ('e3750000-0000-4000-8000-000000000111', 'e3750000-0000-4000-8000-000000000101', 'EDGE-1', 'e3750000-0000-4000-8000-000000000001', 'e3750000-0000-4000-8000-000000000001');

insert into reservations (customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
select 'Tie ' || n, 1, 'rental', '2030-05-05 12:00:00+00', 60, 'closed',
  'e3750000-0000-4000-8000-000000000001', 'e3750000-0000-4000-8000-000000000001'
from generate_series(1, 20) n;

insert into reservations (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by) values
  ('e3750000-0000-4000-8000-000000000301', 'Closed through dispatch', 1, 'rental', '2031-05-05 12:00:00+00', 60, 'scheduled', 'e3750000-0000-4000-8000-000000000001', 'e3750000-0000-4000-8000-000000000001');

insert into reservation_items (reservation_id, unit_id, created_by, updated_by) values
  ('e3750000-0000-4000-8000-000000000301', 'e3750000-0000-4000-8000-000000000111', 'e3750000-0000-4000-8000-000000000001', 'e3750000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3750000-0000-4000-8000-000000000001","role":"authenticated"}';
insert into reservation_dispatches (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by) values
  ('e3750000-0000-4000-8000-000000000401', 'e3750000-0000-4000-8000-000000000301', 'e3750000-0000-4000-8000-000000000101', '2031-05-05 12:00:00+00', 60, 'e3750000-0000-4000-8000-000000000001', 'e3750000-0000-4000-8000-000000000001');
update reservation_items set dispatch_id = 'e3750000-0000-4000-8000-000000000401'
where reservation_id = 'e3750000-0000-4000-8000-000000000301';

set local request.jwt.claims to '{"sub":"e3750000-0000-4000-8000-000000000002","role":"authenticated"}';
update reservation_dispatches set closed_at = '2031-05-05 13:00:00+00'
where id = 'e3750000-0000-4000-8000-000000000401';

select is((select updated_by_name from public.get_reservation_history_record('e3750000-0000-4000-8000-000000000301')), 'Edge Closer',
  'A reservation closed through its dispatch is signed by whoever closed it');
select is((select customer_name from public.list_reservation_history(0, 10, '2031-05-05', '2031-05-05')), 'Closed through dispatch',
  'A reservation closed through its dispatch is listed');
select is((select count(distinct id)::integer from (
    select id from public.list_reservation_history(0, 7, '2030-05-05', '2030-05-05')
    union all select id from public.list_reservation_history(1, 7, '2030-05-05', '2030-05-05')
    union all select id from public.list_reservation_history(2, 7, '2030-05-05', '2030-05-05')) pages), 20,
  'Rows tied on the start time never repeat or vanish across pages');
select is((select array[count(*)::integer, min(page_index)] from public.list_reservation_history(2, 10, '2030-05-05', '2030-05-05')),
  array[10, 1], 'A total divisible by the page size has no empty page after the last');
select is((select count(*)::integer from public.list_reservation_history(3, 10, '1999-01-01', '1999-01-01')), 0,
  'A page beyond zero matches returns no rows');
select throws_ok($$select * from public.list_reservation_history(0, null)$$, '22023',
  null, 'A null page size is refused instead of returning every row');
select throws_ok($$select * from public.list_reservation_history(null, 10)$$, '22023',
  null, 'A null page index is refused');

set local request.jwt.claims to '{"sub":"e3750000-0000-4000-8000-000000000003","role":"authenticated","must_change_password":true}';
select throws_ok($$select * from public.list_reservation_history(0, 10)$$, '42501',
  null, 'An account that must change its password cannot read the history');

set local request.jwt.claims to '{"sub":"e3750000-0000-4000-8000-000000000004","role":"authenticated"}';
select throws_ok($$select * from public.list_reservation_history(0, 10)$$, '42501',
  null, 'An expired external guide cannot read the history');

set local request.jwt.claims to '{"sub":"e3750000-0000-4000-8000-000000000005","role":"authenticated"}';
select lives_ok($$select * from public.list_reservation_history(0, 10)$$,
  'A worker with several areas reads the history in the chosen mode');

reset role;
update workers set last_work_area = 'reservas' where id = 'e3750000-0000-4000-8000-000000000005';
set local role authenticated;
set local request.jwt.claims to '{"sub":"e3750000-0000-4000-8000-000000000005","role":"authenticated"}';
select lives_ok($$select * from public.get_reservation_history_record('e3750000-0000-4000-8000-000000000301')$$,
  'Switching the chosen mode between allowed areas keeps access');

select * from finish();
rollback;
