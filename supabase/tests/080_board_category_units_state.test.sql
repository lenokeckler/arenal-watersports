begin;
select plan(18);

insert into auth.users (id, email) values
  ('b0a5d000-0000-0000-0000-000000000001', 'units-state@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('b0a5d000-0000-0000-0000-000000000001', 'units_state', 'Units state', 'units-state@arenal.local', 'operaciones');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values
  ('b0a5d001-0000-0000-0000-000000000001', 'Units state category', 'active', 'by_unit', true, 60, 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001');

insert into equipment_units
  (id, category_id, code, status, created_by, updated_by)
values
  ('b0a5d002-0000-0000-0000-000000000001', 'b0a5d001-0000-0000-0000-000000000001', 'UST-A', 'available', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d002-0000-0000-0000-000000000002', 'b0a5d001-0000-0000-0000-000000000001', 'UST-B', 'available', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d002-0000-0000-0000-000000000003', 'b0a5d001-0000-0000-0000-000000000001', 'UST-C', 'in_maintenance', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d002-0000-0000-0000-000000000004', 'b0a5d001-0000-0000-0000-000000000001', 'UST-D', 'damaged', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d002-0000-0000-0000-000000000005', 'b0a5d001-0000-0000-0000-000000000001', 'UST-E', 'available', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d002-0000-0000-0000-000000000006', 'b0a5d001-0000-0000-0000-000000000001', 'UST-F', 'available', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, dispatched_at, created_by, updated_by)
values
  ('b0a5d003-0000-0000-0000-000000000001', 'Units state early customer', 2, 'rental', '2026-01-03 10:00:00+00', 60, 'dispatched', '2026-01-03 10:00:00+00', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d003-0000-0000-0000-000000000002', 'Units state late customer', 3, 'rental', '2026-01-03 10:30:00+00', 120, 'dispatched', '2026-01-03 10:30:00+00', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d003-0000-0000-0000-000000000003', 'Units state closed customer', 1, 'rental', '2026-01-03 09:00:00+00', 60, 'dispatched', '2026-01-03 09:00:00+00', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d003-0000-0000-0000-000000000004', 'Units state later closed customer', 4, 'rental', '2026-01-03 11:00:00+00', 120, 'dispatched', '2026-01-03 11:00:00+00', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, closed_at, created_by, updated_by)
values
  ('b0a5d004-0000-0000-0000-000000000001', 'b0a5d003-0000-0000-0000-000000000001', 'b0a5d001-0000-0000-0000-000000000001', '2026-01-03 10:00:00+00', 60, null, 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d004-0000-0000-0000-000000000002', 'b0a5d003-0000-0000-0000-000000000002', 'b0a5d001-0000-0000-0000-000000000001', '2026-01-03 10:30:00+00', 120, null, 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d004-0000-0000-0000-000000000003', 'b0a5d003-0000-0000-0000-000000000003', 'b0a5d001-0000-0000-0000-000000000001', '2026-01-03 09:00:00+00', 60, '2026-01-03 09:45:00+00', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d004-0000-0000-0000-000000000004', 'b0a5d003-0000-0000-0000-000000000004', 'b0a5d001-0000-0000-0000-000000000001', '2026-01-03 11:00:00+00', 120, '2026-01-03 12:00:00+00', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001');

set local session_replication_role = replica;

insert into reservation_items
  (reservation_id, unit_id, dispatch_id, created_by, updated_by)
values
  ('b0a5d003-0000-0000-0000-000000000001', 'b0a5d002-0000-0000-0000-000000000001', 'b0a5d004-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d003-0000-0000-0000-000000000003', 'b0a5d002-0000-0000-0000-000000000002', 'b0a5d004-0000-0000-0000-000000000003', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d003-0000-0000-0000-000000000001', 'b0a5d002-0000-0000-0000-000000000003', 'b0a5d004-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d003-0000-0000-0000-000000000001', 'b0a5d002-0000-0000-0000-000000000004', 'b0a5d004-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d003-0000-0000-0000-000000000001', 'b0a5d002-0000-0000-0000-000000000005', 'b0a5d004-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d003-0000-0000-0000-000000000002', 'b0a5d002-0000-0000-0000-000000000005', 'b0a5d004-0000-0000-0000-000000000002', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d003-0000-0000-0000-000000000001', 'b0a5d002-0000-0000-0000-000000000006', 'b0a5d004-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001'),
  ('b0a5d003-0000-0000-0000-000000000004', 'b0a5d002-0000-0000-0000-000000000006', 'b0a5d004-0000-0000-0000-000000000004', 'b0a5d000-0000-0000-0000-000000000001', 'b0a5d000-0000-0000-0000-000000000001');

reset session_replication_role;

select is((select effective_status from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000001'), 'occupied', 'una unidad con despacho abierto esta ocupada aunque ya paso la hora de regreso');
select is((select reservation_id from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000001'), 'b0a5d003-0000-0000-0000-000000000001'::uuid, 'la unidad ocupada trae la reserva del despacho');
select is((select reservation_code from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000001'), (select code from reservations where id = 'b0a5d003-0000-0000-0000-000000000001'), 'la unidad ocupada trae el codigo de la reserva');
select is((select customer_name from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000001'), 'Units state early customer', 'la unidad ocupada trae el cliente');
select is((select returns_at from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000001'), '2026-01-03 11:00:00+00'::timestamptz, 'la hora de regreso es el fin del despacho');
select is((select reservation_starts_at from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000001'), '2026-01-03 10:00:00+00'::timestamptz, 'trae el inicio de la reserva');
select is((select reservation_ends_at from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000001'), '2026-01-03 11:00:00+00'::timestamptz, 'trae el fin de la reserva');
select is((select effective_status from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000002'), 'available', 'con el despacho cerrado la unidad esta disponible');
select is((select count(*)::integer from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000002' and returns_at is null and reservation_id is null and reservation_code is null and customer_name is null and reservation_starts_at is null and reservation_ends_at is null), 1, 'una unidad disponible no trae datos de reserva');
select is((select effective_status from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000003'), 'in_maintenance', 'mantenimiento con despacho abierto sigue en mantenimiento');
select is((select count(*)::integer from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000003' and returns_at is null and reservation_id is null and customer_name is null), 1, 'mantenimiento no trae hora de regreso ni reserva');
select is((select effective_status from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000004'), 'damaged', 'danada con despacho abierto sigue danada');
select is((select count(*)::integer from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000004' and returns_at is null and reservation_id is null and customer_name is null), 1, 'danada no trae hora de regreso ni reserva');
select is((select reservation_id from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000005'), 'b0a5d003-0000-0000-0000-000000000002'::uuid, 'con dos despachos abiertos gana la reserva que regresa de ultimo');
select is((select returns_at from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000005'), '2026-01-03 12:30:00+00'::timestamptz, 'con dos despachos abiertos la hora es la del que regresa de ultimo');
select isnt((select reservation_id from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000005'), 'b0a5d003-0000-0000-0000-000000000001'::uuid, 'no se muestra la reserva que regresa antes');
select is((select count(*)::integer from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000005'), 1, 'una unidad en dos despachos abiertos tiene una sola fila');
select is((select reservation_id from board_category_units where unit_id = 'b0a5d002-0000-0000-0000-000000000006'), 'b0a5d003-0000-0000-0000-000000000001'::uuid, 'si el despacho que regresa de ultimo se cierra, queda el otro abierto');

select * from finish();
rollback;
