begin;
select plan(11);

insert into auth.users (id, email) values
  ('b0a6d000-0000-0000-0000-000000000001', 'units-ops@arenal.local'),
  ('b0a6d000-0000-0000-0000-000000000002', 'units-reservations@arenal.local'),
  ('b0a6d000-0000-0000-0000-000000000003', 'units-no-area@arenal.local'),
  ('b0a6d000-0000-0000-0000-000000000004', 'units-admin@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('b0a6d000-0000-0000-0000-000000000001', 'units_ops', 'Units operations', 'units-ops@arenal.local', 'operaciones'),
  ('b0a6d000-0000-0000-0000-000000000002', 'units_reservations', 'Units reservations', 'units-reservations@arenal.local', 'reservas'),
  ('b0a6d000-0000-0000-0000-000000000003', 'units_no_area', 'Units no area', 'units-no-area@arenal.local', 'reservas');

insert into workers (id, username, full_name, personal_email, base_role)
select 'b0a6d000-0000-0000-0000-000000000004', 'units_admin', 'Units administrator', 'units-admin@arenal.local', 'administracion'
where not exists (select 1 from workers where base_role = 'administracion');

delete from worker_areas
where worker_id = 'b0a6d000-0000-0000-0000-000000000003';

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values
  ('b0a6d001-0000-0000-0000-000000000001', 'Units access visible', 'by_unit', true, 60, 'b0a6d000-0000-0000-0000-000000000001', 'b0a6d000-0000-0000-0000-000000000001'),
  ('b0a6d001-0000-0000-0000-000000000002', 'Units access other', 'by_unit', true, 60, 'b0a6d000-0000-0000-0000-000000000001', 'b0a6d000-0000-0000-0000-000000000001');

insert into equipment_units
  (id, category_id, code, created_by, updated_by)
values
  ('b0a6d002-0000-0000-0000-000000000001', 'b0a6d001-0000-0000-0000-000000000001', 'UAC-1', 'b0a6d000-0000-0000-0000-000000000001', 'b0a6d000-0000-0000-0000-000000000001'),
  ('b0a6d002-0000-0000-0000-000000000002', 'b0a6d001-0000-0000-0000-000000000002', 'UAC-2', 'b0a6d000-0000-0000-0000-000000000001', 'b0a6d000-0000-0000-0000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, dispatched_at, created_by, updated_by)
values
  ('b0a6d003-0000-0000-0000-000000000001', 'Units access customer', 2, 'rental', '2026-01-03 10:00:00+00', 60, 'dispatched', '2026-01-03 10:00:00+00', 'b0a6d000-0000-0000-0000-000000000001', 'b0a6d000-0000-0000-0000-000000000001');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, closed_at, created_by, updated_by)
values
  ('b0a6d004-0000-0000-0000-000000000001', 'b0a6d003-0000-0000-0000-000000000001', 'b0a6d001-0000-0000-0000-000000000001', '2026-01-03 10:00:00+00', 60, null, 'b0a6d000-0000-0000-0000-000000000001', 'b0a6d000-0000-0000-0000-000000000001');

set local session_replication_role = replica;

insert into reservation_items
  (reservation_id, unit_id, dispatch_id, created_by, updated_by)
values
  ('b0a6d003-0000-0000-0000-000000000001', 'b0a6d002-0000-0000-0000-000000000001', 'b0a6d004-0000-0000-0000-000000000001', 'b0a6d000-0000-0000-0000-000000000001', 'b0a6d000-0000-0000-0000-000000000001');

reset session_replication_role;

set local role authenticated;
set local request.jwt.claims to '{"sub":"b0a6d000-0000-0000-0000-000000000001","role":"authenticated"}';
select is((select count(*)::integer from board_category_units where category_id = 'b0a6d001-0000-0000-0000-000000000001'), 1, 'operaciones lee las unidades de la categoria');
select is((select customer_name || ' ' || reservation_code from board_category_units where unit_id = 'b0a6d002-0000-0000-0000-000000000001'), 'Units access customer ' || (select code from reservations where id = 'b0a6d003-0000-0000-0000-000000000001'), 'operaciones ve el cliente y la reserva de la unidad ocupada');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"b0a6d000-0000-0000-0000-000000000002","role":"authenticated"}';
select is((select count(*)::integer from board_category_units where category_id = 'b0a6d001-0000-0000-0000-000000000001'), 1, 'reservas lee las unidades de la categoria');
select is((select customer_name from board_category_units where unit_id = 'b0a6d002-0000-0000-0000-000000000001'), 'Units access customer', 'reservas ve el cliente de la unidad ocupada');

reset role;
select set_config('request.jwt.claims', json_build_object('sub', (select id from workers where base_role = 'administracion'), 'role', 'authenticated')::text, true);
set local role authenticated;
select is((select count(*)::integer from board_category_units where category_id = 'b0a6d001-0000-0000-0000-000000000001'), 1, 'administracion lee las unidades de la categoria');
select is((select reservation_code from board_category_units where unit_id = 'b0a6d002-0000-0000-0000-000000000001'), (select code from reservations where id = 'b0a6d003-0000-0000-0000-000000000001'), 'administracion ve el codigo de la reserva');
select is((select count(*)::integer from board_category_units where unit_id = 'b0a6d002-0000-0000-0000-000000000002'), 1, 'cada categoria devuelve solo sus propias unidades');
select is((select count(*)::integer from board_category_units where category_id = 'b0a6d001-0000-0000-0000-000000000001' and unit_id = 'b0a6d002-0000-0000-0000-000000000002'), 0, 'las unidades de otra categoria no aparecen en la consultada');
select throws_ok(
  $$insert into board_category_units (unit_id) values (gen_random_uuid())$$,
  '55000',
  null,
  'la vista no admite escrituras'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"b0a6d000-0000-0000-0000-000000000003","role":"authenticated"}';
select is((select count(*)::integer from board_category_units where category_id = 'b0a6d001-0000-0000-0000-000000000001'), 0, 'un trabajador sin area no lee las unidades');
select is((select count(*)::integer from board_category_units), 0, 'un trabajador sin area no ve ninguna fila');

reset role;
select * from finish();
rollback;
