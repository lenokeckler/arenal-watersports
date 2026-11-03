begin;
select plan(4);

insert into auth.users (id, email) values
  ('b0a3d000-0000-0000-0000-000000000001', 'board-maintenance@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('b0a3d000-0000-0000-0000-000000000001', 'board_maintenance', 'Board maintenance', 'board-maintenance@arenal.local', 'administracion');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, default_duration_minutes, group_name, created_by, updated_by)
values
  ('b0a3d001-0000-0000-0000-000000000001', 'Board maintenance category', 'active', 'by_unit', true, 60, null, 'b0a3d000-0000-0000-0000-000000000001', 'b0a3d000-0000-0000-0000-000000000001');

insert into equipment_units
  (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by)
values
  ('b0a3d002-0000-0000-0000-000000000001', 'b0a3d001-0000-0000-0000-000000000001', 'BRM-1', 'in_maintenance', null, null, 'b0a3d000-0000-0000-0000-000000000001', 'b0a3d000-0000-0000-0000-000000000001'),
  ('b0a3d002-0000-0000-0000-000000000002', 'b0a3d001-0000-0000-0000-000000000001', 'BRM-2', 'available', null, null, 'b0a3d000-0000-0000-0000-000000000001', 'b0a3d000-0000-0000-0000-000000000001'),
  ('b0a3d002-0000-0000-0000-000000000003', 'b0a3d001-0000-0000-0000-000000000001', 'BRM-3', 'available', null, null, 'b0a3d000-0000-0000-0000-000000000001', 'b0a3d000-0000-0000-0000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   dispatched_at, created_by, updated_by)
values
  ('b0a3d003-0000-0000-0000-000000000001', 'Board maintenance customer', 2, 'rental',
   '2026-01-03 10:00:00+00', 60, 'dispatched', '2026-01-03 10:00:00+00',
   'b0a3d000-0000-0000-0000-000000000001', 'b0a3d000-0000-0000-0000-000000000001');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, closed_at, created_by, updated_by)
values
  ('b0a3d004-0000-0000-0000-000000000001', 'b0a3d003-0000-0000-0000-000000000001',
   'b0a3d001-0000-0000-0000-000000000001', '2026-01-03 10:00:00+00', 60, null,
   'b0a3d000-0000-0000-0000-000000000001', 'b0a3d000-0000-0000-0000-000000000001');

set local session_replication_role = replica;

insert into reservation_items
  (reservation_id, unit_id, dispatch_id, created_by, updated_by)
values
  ('b0a3d003-0000-0000-0000-000000000001', 'b0a3d002-0000-0000-0000-000000000001',
   'b0a3d004-0000-0000-0000-000000000001',
   'b0a3d000-0000-0000-0000-000000000001', 'b0a3d000-0000-0000-0000-000000000001'),
  ('b0a3d003-0000-0000-0000-000000000001', 'b0a3d002-0000-0000-0000-000000000002',
   'b0a3d004-0000-0000-0000-000000000001',
   'b0a3d000-0000-0000-0000-000000000001', 'b0a3d000-0000-0000-0000-000000000001');

reset session_replication_role;

select is(
  (select in_use_count from board_category_summary where category_id = 'b0a3d001-0000-0000-0000-000000000001'),
  1,
  'una unidad en mantenimiento con despacho abierto no cuenta en uso'
);
select is(
  (select free_count from board_category_summary where category_id = 'b0a3d001-0000-0000-0000-000000000001'),
  1,
  'una unidad en mantenimiento con despacho abierto no cuenta libre'
);
select is(
  (select total_count from board_category_summary where category_id = 'b0a3d001-0000-0000-0000-000000000001'),
  3,
  'una unidad en mantenimiento con despacho abierto cuenta en el total'
);
select is(
  (select count(*)::integer from board_category_summary where free_count + in_use_count > total_count),
  0,
  'libres mas en uso nunca supera el total'
);

select * from finish();
rollback;
