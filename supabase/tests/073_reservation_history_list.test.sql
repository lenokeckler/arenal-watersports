begin;
select plan(23);

insert into auth.users (id, email) values
  ('e3730000-0000-4000-8000-000000000001', 'history-list-admin@arenal.local'),
  ('e3730000-0000-4000-8000-000000000002', 'history-list-reservations@arenal.local'),
  ('e3730000-0000-4000-8000-000000000003', 'history-list-guide@arenal.local'),
  ('e3730000-0000-4000-8000-000000000004', 'history-list-external@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e3730000-0000-4000-8000-000000000001', 'history-list-admin', 'History Admin', 'history-list-admin@correo.com', 'administracion'),
  ('e3730000-0000-4000-8000-000000000002', 'history-list-reservations', 'History Reservations', 'history-list-reservations@correo.com', 'reservas'),
  ('e3730000-0000-4000-8000-000000000003', 'history-list-guide', 'History Guide', 'history-list-guide@correo.com', 'operaciones');

insert into workers (id, username, full_name, base_role, is_external_guide, expires_at, national_id) values
  ('e3730000-0000-4000-8000-000000000004', 'history-list-external', 'History External', 'operaciones', true, '2099-01-01', '1-1111-1111');

insert into equipment_categories (id, name, status, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by) values
  ('e3730000-0000-4000-8000-000000000101', 'History Alpha', 'active', 'by_unit', true, 60, 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000102', 'History Beta', 'inactive', 'by_quantity', true, 60, 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001');

insert into equipment_units (id, category_id, code, created_by, updated_by) values
  ('e3730000-0000-4000-8000-000000000111', 'e3730000-0000-4000-8000-000000000101', 'HIST-A1', 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000112', 'e3730000-0000-4000-8000-000000000101', 'HIST-A2', 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001');

insert into extras (id, name, created_by, updated_by) values
  ('e3730000-0000-4000-8000-000000000121', 'History Extra', 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001');

insert into reservations (customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
select 'Page ' || to_char(n, 'FM00'), 1, 'rental', '2030-01-01 12:00:00+00'::timestamptz + make_interval(days => n), 60, 'closed',
  'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'
from generate_series(1, 12) n;

insert into reservations (id, customer_name, people_count, type, starts_at, duration_minutes, status, cancellation_reason, created_by, updated_by) values
  ('e3730000-0000-4000-8000-000000000201', 'Open scheduled', 1, 'rental', '2030-01-05 15:00:00+00', 60, 'scheduled', null, 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000202', 'Open dispatched', 1, 'rental', '2030-01-06 15:00:00+00', 60, 'dispatched', null, 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000203', 'Tour cancelled', 1, 'tour', '2031-01-01 15:00:00+00', 60, 'cancelled', 'No show', 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000204', 'Quantity combo', 1, 'combo', '2032-01-01 15:00:00+00', 60, 'closed', null, 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000205', 'Edge before', 1, 'rental', '2026-10-31 05:59:59+00', 60, 'closed', null, 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000206', 'Edge after', 1, 'rental', '2026-10-31 06:00:00+00', 60, 'closed', null, 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001');

insert into reservation_items (reservation_id, unit_id, category_id, quantity, extra_id, created_by, updated_by) values
  ('e3730000-0000-4000-8000-000000000203', 'e3730000-0000-4000-8000-000000000111', null, null, null, 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000203', 'e3730000-0000-4000-8000-000000000112', null, null, null, 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000203', null, null, null, 'e3730000-0000-4000-8000-000000000121', 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000204', null, 'e3730000-0000-4000-8000-000000000102', 2, null, 'e3730000-0000-4000-8000-000000000001', 'e3730000-0000-4000-8000-000000000001');

insert into reservation_guides (reservation_id, worker_id, assigned_by) values
  ('e3730000-0000-4000-8000-000000000203', 'e3730000-0000-4000-8000-000000000003', 'e3730000-0000-4000-8000-000000000001'),
  ('e3730000-0000-4000-8000-000000000203', 'e3730000-0000-4000-8000-000000000004', 'e3730000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3730000-0000-4000-8000-000000000002","role":"authenticated"}';

select is((select max(total_count) from public.list_reservation_history(0, 10, '2030-01-01', '2030-01-31')), 12::bigint,
  'Scheduled and dispatched reservations are not in the history');
select is((select status::text from public.list_reservation_history(0, 10, '2031-01-01', '2031-01-01')), 'cancelled',
  'A cancelled reservation is in the history');
select is((select status::text from public.list_reservation_history(0, 10, '2032-01-01', '2032-01-01')), 'closed',
  'A closed reservation is in the history');
select is((select array_agg(customer_name) from public.list_reservation_history(0, 3, '2030-01-01', '2030-01-31')),
  array['Page 12', 'Page 11', 'Page 10'], 'The history is ordered from the latest start');
select is((select count(*)::integer from public.list_reservation_history(0, 10, '2030-01-01', '2030-01-31')), 10,
  'The first page holds ten rows');
select is((select count(*)::integer from public.list_reservation_history(1, 10, '2030-01-01', '2030-01-31')), 2,
  'The second page holds the remaining two rows');
select is((select array[min(page_index), max(total_count)::integer] from public.list_reservation_history(9, 10, '2030-01-01', '2030-01-31')),
  array[1, 12], 'An out-of-range page returns the last page with its index and total');
select is((select count(*)::integer from public.list_reservation_history(9, 10, '2030-01-01', '2030-01-31')), 2,
  'An out-of-range page returns the rows of the last page');
select is((select array_agg(customer_name) from public.list_reservation_history(0, 10, '2026-10-30', '2026-10-30')),
  array['Edge before'], 'A start one second before 06:00 UTC falls on the previous Costa Rica day');
select is((select array_agg(customer_name) from public.list_reservation_history(0, 10, '2026-10-31', '2026-10-31')),
  array['Edge after'], 'A start at 06:00 UTC opens the Costa Rica day');
select is((select array_agg(customer_name) from public.list_reservation_history(0, 10, null, null, 'tour')),
  array['Tour cancelled'], 'The type filter keeps only that type');
select is((select array_agg(customer_name) from public.list_reservation_history(0, 10, null, null, null, 'e3730000-0000-4000-8000-000000000101')),
  array['Tour cancelled'], 'The category filter matches a unit item once');
select is((select array_agg(customer_name) from public.list_reservation_history(0, 10, null, null, null, 'e3730000-0000-4000-8000-000000000102')),
  array['Quantity combo'], 'The category filter matches a quantity item of an inactive category');
select is((select equipment_names from public.list_reservation_history(0, 10, '2031-01-01', '2031-01-01')),
  array['History Alpha'], 'Equipment is de-duplicated and extras are not listed');
select is((select equipment_names from public.list_reservation_history(0, 10, '2032-01-01', '2032-01-01')),
  array['History Beta'], 'A quantity item lists its category name');
select is((select guide_names from public.list_reservation_history(0, 10, '2031-01-01', '2031-01-01')),
  array['History External', 'History Guide'], 'Guide names include the external guide');
select is((select equipment_names || guide_names from public.list_reservation_history(0, 10, '2030-01-13', '2030-01-13')),
  '{}'::text[], 'A reservation without items or guides has empty lists');
select is((select created_by_name from public.list_reservation_history(0, 10, '2031-01-01', '2031-01-01')), 'History Admin',
  'The attending worker name is returned');
select is((select count(*)::integer from public.workers where id = 'e3730000-0000-4000-8000-000000000001'), 0,
  'The workers table hides that name from the caller');
select throws_ok($$select * from public.list_reservation_history(0, 10, '2030-02-01', '2030-01-01')$$, '22023',
  null, 'An inverted date range is refused');
select throws_ok($$select * from public.list_reservation_history(0, 0)$$, '22023',
  null, 'A page size of zero is refused');
select throws_ok($$select * from public.list_reservation_history(0, 101)$$, '22023',
  null, 'A page size above one hundred is refused');
select throws_ok($$select * from public.list_reservation_history(-1, 10)$$, '22023',
  null, 'A negative page is refused');

select * from finish();
rollback;
