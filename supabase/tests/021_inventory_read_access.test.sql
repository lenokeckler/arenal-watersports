begin;
select plan(25);

insert into auth.users (id, email) values
  ('11111111-0000-0000-0000-000000000001', 'ops-inventory@arenal.local'),
  ('11111111-0000-0000-0000-000000000002', 'reservations-inventory@arenal.local'),
  ('11111111-0000-0000-0000-000000000003', 'no-area-inventory@arenal.local'),
  ('11111111-0000-0000-0000-000000000004', 'admin-inventory@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-0000-0000-0000-000000000001', 'ops_inventory', 'Operations', 'ops-inventory@arenal.local', 'operaciones'),
  ('11111111-0000-0000-0000-000000000002', 'reservations_inventory', 'Reservations', 'reservations-inventory@arenal.local', 'reservas'),
  ('11111111-0000-0000-0000-000000000003', 'no_area_inventory', 'No area', 'no-area-inventory@arenal.local', 'reservas'),
  ('11111111-0000-0000-0000-000000000004', 'admin_inventory', 'Administrator', 'admin-inventory@arenal.local', 'administracion');

delete from worker_areas
where worker_id = '11111111-0000-0000-0000-000000000003';

insert into equipment_categories
  (id, name, tracking_mode, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Inventory jet ski', 'by_unit',
   '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Inventory life jacket', 'by_quantity',
   '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');

insert into equipment_units
  (id, category_id, code, created_by, updated_by)
values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
   'JET-01', '11111111-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000001');

insert into equipment_stock
  (category_id, quantity_available, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000002', 10,
   '11111111-0000-0000-0000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   dispatched_at, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Inventory customer', 1, 'rental',
   '2026-10-03 10:00:00+00', 60, 'dispatched', '2026-10-03 10:00:00+00',
   '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values
  ('cccccccc-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000001',
   'aaaaaaaa-0000-0000-0000-000000000001', '2026-10-03 10:00:00+00', 60,
   '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');

insert into reservation_items
  (reservation_id, unit_id, dispatch_id, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001',
   'cccccccc-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');

select is(
  (select effective_status from unit_current_state
   where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'occupied',
  'una unidad con despacho abierto se presenta como ocupada'
);
select is(
  (select quantity_available from inventory_category_summary
   where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  0,
  'una unidad con despacho abierto no se cuenta como disponible'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-0000-0000-0000-000000000001","role":"authenticated"}';
select ok(has_area('operaciones'), 'operaciones conserva su area');
select is((select count(*)::integer from equipment_categories), 2, 'operaciones lee categorias');
select is((select count(*)::integer from inventory_category_summary), 2, 'operaciones lee el resumen');
select is((select count(*)::integer from equipment_units), 1, 'operaciones lee unidades');
select is((select count(*)::integer from equipment_stock), 1, 'operaciones lee existencias');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-0000-0000-0000-000000000002","role":"authenticated"}';
select ok(has_area('reservas'), 'reservas conserva su area');
select is((select count(*)::integer from equipment_categories), 2, 'reservas lee categorias para los flujos de reserva');
select is((select count(*)::integer from inventory_category_summary), 2, 'reservas lee el resumen para disponibilidad');
select is((select count(*)::integer from equipment_units), 1, 'reservas lee unidades para disponibilidad');
select is((select count(*)::integer from equipment_stock), 1, 'reservas lee existencias para reservas');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-0000-0000-0000-000000000003","role":"authenticated"}';
select ok(not has_area('operaciones'), 'la cuenta sin area no tiene acceso a operaciones');
select is((select count(*)::integer from equipment_categories), 0, 'sin area no se leen categorias');
select is((select count(*)::integer from inventory_category_summary), 0, 'sin area no se lee el resumen');
select is((select count(*)::integer from equipment_units), 1, 'la policy de disponibilidad mantiene lectura de unidades autenticada');
select is((select count(*)::integer from equipment_stock), 0, 'sin area no se leen existencias');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-0000-0000-0000-000000000004","role":"authenticated"}';
select ok(is_admin(), 'administracion conserva su acceso');
select is((select count(*)::integer from equipment_categories), 2, 'administracion lee categorias');
select is((select count(*)::integer from inventory_category_summary), 2, 'administracion lee el resumen');
select is((select count(*)::integer from equipment_units), 1, 'administracion lee unidades');
select is((select count(*)::integer from equipment_stock), 1, 'administracion lee existencias');

reset role;
select is(
  (select count(*)::integer
   from pg_publication_tables
   where pubname = 'supabase_realtime'
     and tablename = 'equipment_categories'),
  1,
  'los cambios de categorias se publican en tiempo real'
);
select is(
  (select count(*)::integer
   from pg_publication_tables
   where pubname = 'supabase_realtime'
     and tablename = 'equipment_units'),
  1,
  'los cambios de unidades se publican en tiempo real'
);
select is(
  (select count(*)::integer
   from pg_publication_tables
   where pubname = 'supabase_realtime'
     and tablename = 'equipment_stock'),
  1,
  'los cambios de existencias se publican en tiempo real'
);

select * from finish();
rollback;
