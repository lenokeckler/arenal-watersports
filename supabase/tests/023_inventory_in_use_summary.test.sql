begin;
select plan(3);

insert into auth.users (id, email) values
  ('11111111-0000-0000-0000-000000000001', 'ops-inventory-in-use@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-0000-0000-0000-000000000001', 'ops_inventory_in_use', 'Operations', 'ops-inventory-in-use@arenal.local', 'operaciones');

insert into equipment_categories
  (id, name, tracking_mode, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Inventory unit category', 'by_unit',
   '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Inventory quantity category', 'by_quantity',
   '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');

insert into equipment_stock
  (category_id, quantity_available, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000002', 4,
   '11111111-0000-0000-0000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   dispatched_at, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Inventory customer', 1, 'rental',
   now(), 60, 'dispatched', now(),
   '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');

insert into equipment_units
  (id, category_id, code, created_by, updated_by)
values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
   'UNIT-01', '11111111-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000001'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001',
   'UNIT-02', '11111111-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000001');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values
  ('cccccccc-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000001',
   'aaaaaaaa-0000-0000-0000-000000000001', now(), 60,
   '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');

insert into reservation_items
  (reservation_id, unit_id, dispatch_id, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001',
   'cccccccc-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');

select is(
  (select quantity_in_use from inventory_category_summary
   where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  1,
  'una unidad ocupada se cuenta en uso'
);
select is(
  (select quantity_available + quantity_damaged + quantity_in_repair
      + quantity_in_maintenance + quantity_in_use
   from inventory_category_summary
   where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  (select quantity_total from inventory_category_summary
   where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  'los estados por unidad cuadran con el total'
);
select is(
  (select quantity_in_use from inventory_category_summary
   where category_id = 'aaaaaaaa-0000-0000-0000-000000000002'),
  0,
  'el conteo en uso es cero para una categoria por cantidad'
);

select * from finish();
rollback;
