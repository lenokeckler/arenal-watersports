begin;
select plan(17);

insert into auth.users (id, email) values
  ('b0a2d000-0000-0000-0000-000000000001', 'board-admin@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('b0a2d000-0000-0000-0000-000000000001', 'board_admin', 'Board admin', 'board-admin@arenal.local', 'administracion');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, default_duration_minutes, group_name, created_by, updated_by)
values
  ('b0a2d001-0000-0000-0000-000000000001', 'Board test reservable', 'active', 'by_unit', true, 60, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d001-0000-0000-0000-000000000002', 'Board test not reservable', 'active', 'by_unit', false, null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d001-0000-0000-0000-000000000003', 'Board test by quantity', 'active', 'by_quantity', true, 60, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d001-0000-0000-0000-000000000004', 'Board test inactive', 'inactive', 'by_unit', true, 60, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d001-0000-0000-0000-000000000005', 'Board test empty', 'active', 'by_unit', true, 60, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d001-0000-0000-0000-000000000006', 'Board test group one', 'active', 'by_unit', true, 60, 'Boardtest Zed', 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d001-0000-0000-0000-000000000007', 'Board test group two', 'active', 'by_unit', true, 60, 'boardtest zed', 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001');

insert into equipment_units
  (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by)
values
  ('b0a2d002-0000-0000-0000-000000000001', 'b0a2d001-0000-0000-0000-000000000001', 'BRD-R1', 'available', null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d002-0000-0000-0000-000000000002', 'b0a2d001-0000-0000-0000-000000000001', 'BRD-R2', 'available', null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d002-0000-0000-0000-000000000003', 'b0a2d001-0000-0000-0000-000000000001', 'BRD-R3', 'available', null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d002-0000-0000-0000-000000000004', 'b0a2d001-0000-0000-0000-000000000001', 'BRD-R4', 'in_maintenance', null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d002-0000-0000-0000-000000000005', 'b0a2d001-0000-0000-0000-000000000001', 'BRD-R5', 'damaged', null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d002-0000-0000-0000-000000000006', 'b0a2d001-0000-0000-0000-000000000001', 'BRD-R6', 'decommissioned', now(), 'Board test reason', 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d002-0000-0000-0000-000000000007', 'b0a2d001-0000-0000-0000-000000000001', 'BRD-R7', 'available', null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d002-0000-0000-0000-000000000008', 'b0a2d001-0000-0000-0000-000000000002', 'BRD-N1', 'available', null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d002-0000-0000-0000-000000000009', 'b0a2d001-0000-0000-0000-000000000004', 'BRD-I1', 'available', null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d002-0000-0000-0000-000000000010', 'b0a2d001-0000-0000-0000-000000000006', 'BRD-G1', 'available', null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d002-0000-0000-0000-000000000011', 'b0a2d001-0000-0000-0000-000000000007', 'BRD-G2', 'available', null, null, 'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   dispatched_at, created_by, updated_by)
values
  ('b0a2d003-0000-0000-0000-000000000001', 'Board overdue customer', 1, 'rental',
   '2026-01-03 10:00:00+00', 60, 'dispatched', '2026-01-03 10:00:00+00',
   'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d003-0000-0000-0000-000000000002', 'Board closed customer', 1, 'rental',
   '2026-01-04 10:00:00+00', 60, 'dispatched', '2026-01-04 10:00:00+00',
   'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, closed_at, created_by, updated_by)
values
  ('b0a2d004-0000-0000-0000-000000000001', 'b0a2d003-0000-0000-0000-000000000001',
   'b0a2d001-0000-0000-0000-000000000001', '2026-01-03 10:00:00+00', 60, null,
   'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d004-0000-0000-0000-000000000002', 'b0a2d003-0000-0000-0000-000000000002',
   'b0a2d001-0000-0000-0000-000000000001', '2026-01-04 10:00:00+00', 60, '2026-01-04 11:00:00+00',
   'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001');

insert into reservation_items
  (reservation_id, unit_id, dispatch_id, created_by, updated_by)
values
  ('b0a2d003-0000-0000-0000-000000000001', 'b0a2d002-0000-0000-0000-000000000003',
   'b0a2d004-0000-0000-0000-000000000001',
   'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001'),
  ('b0a2d003-0000-0000-0000-000000000002', 'b0a2d002-0000-0000-0000-000000000007',
   'b0a2d004-0000-0000-0000-000000000002',
   'b0a2d000-0000-0000-0000-000000000001', 'b0a2d000-0000-0000-0000-000000000001');

select is(
  (select in_use_count from board_category_summary where category_id = 'b0a2d001-0000-0000-0000-000000000001'),
  1,
  'una unidad con despacho abierto vencido cuenta en uso'
);
select is(
  (select free_count from board_category_summary where category_id = 'b0a2d001-0000-0000-0000-000000000001'),
  3,
  'la unidad vencida no es libre y la unidad con despacho cerrado si lo es'
);
select is(
  (select total_count from board_category_summary where category_id = 'b0a2d001-0000-0000-0000-000000000001'),
  6,
  'el total excluye la unidad dada de baja'
);
select is(
  (select total_count - free_count - in_use_count from board_category_summary
   where category_id = 'b0a2d001-0000-0000-0000-000000000001'),
  2,
  'mantenimiento y danada solo cuentan en el total'
);
select is(
  (select count(*)::integer from board_category_summary
   where category_id::text like 'b0a2d001-%' and free_count + in_use_count > total_count),
  0,
  'libres mas en uso nunca supera el total'
);
select is(
  (select count(*)::integer from board_category_summary where category_id = 'b0a2d001-0000-0000-0000-000000000002'),
  0,
  'una categoria no reservable no aparece'
);
select is(
  (select count(*)::integer from board_category_summary where category_id = 'b0a2d001-0000-0000-0000-000000000003'),
  0,
  'una categoria por cantidad no aparece'
);
select is(
  (select count(*)::integer from board_category_summary where category_id = 'b0a2d001-0000-0000-0000-000000000004'),
  0,
  'una categoria inactiva no aparece'
);
select results_eq(
  $$select free_count, in_use_count, total_count from board_category_summary
    where category_id = 'b0a2d001-0000-0000-0000-000000000005'$$,
  $$values (0, 0, 0)$$,
  'una categoria sin unidades aparece en cero'
);
select is(
  (select group_name from board_category_summary where category_id = 'b0a2d001-0000-0000-0000-000000000006'),
  'Boardtest Zed',
  'el grupo pasa sin cambios con su mayuscula original'
);
select is(
  (select group_name from board_category_summary where category_id = 'b0a2d001-0000-0000-0000-000000000007'),
  'boardtest zed',
  'el grupo pasa sin cambios con su minuscula original'
);
select is(
  (select group_name from board_category_summary where category_id = 'b0a2d001-0000-0000-0000-000000000001'),
  null,
  'una categoria sin grupo conserva el grupo nulo'
);
select col_type_is('public', 'board_category_summary', 'free_count', 'integer', 'free_count es entero');
select col_type_is('public', 'board_category_summary', 'in_use_count', 'integer', 'in_use_count es entero');
select col_type_is('public', 'board_category_summary', 'total_count', 'integer', 'total_count es entero');
select is(
  (select reloptions::text from pg_class where oid = 'public.board_category_summary'::regclass),
  '{security_invoker=true}',
  'la vista usa security_invoker'
);
select is(
  (select count(*)::integer from board_category_summary where category_id::text like 'b0a2d001-%'),
  4,
  'solo las categorias reservables por unidad activas del fixture aparecen'
);

select * from finish();
rollback;
