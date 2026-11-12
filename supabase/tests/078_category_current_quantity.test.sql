begin;
select plan(11);

insert into auth.users (id, email) values
  ('ca7e0000-0000-0000-0000-000000000001', 'qty-ops@arenal.local'),
  ('ca7e0000-0000-0000-0000-000000000002', 'qty-no-area@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('ca7e0000-0000-0000-0000-000000000001', 'qty_ops', 'Quantity operations', 'qty-ops@arenal.local', 'operaciones'),
  ('ca7e0000-0000-0000-0000-000000000002', 'qty_no_area', 'Quantity no area', 'qty-no-area@arenal.local', 'reservas');

delete from worker_areas
where worker_id = 'ca7e0000-0000-0000-0000-000000000002';

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values
  ('ca7e0001-0000-0000-0000-000000000001', 'Quantity test by quantity', 'active', 'by_quantity', false, null, 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0001-0000-0000-0000-000000000002', 'Quantity test by unit', 'active', 'by_unit', true, 60, 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0001-0000-0000-0000-000000000003', 'Quantity test inactive by quantity', 'inactive', 'by_quantity', false, null, 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0001-0000-0000-0000-000000000004', 'Quantity test inactive by unit', 'inactive', 'by_unit', true, 60, 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0001-0000-0000-0000-000000000005', 'Quantity test empty by quantity', 'active', 'by_quantity', false, null, 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0001-0000-0000-0000-000000000006', 'Quantity test empty by unit', 'active', 'by_unit', true, 60, 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001');

insert into equipment_stock
  (category_id, quantity_available, quantity_damaged, quantity_in_repair, updated_by)
values
  ('ca7e0001-0000-0000-0000-000000000001', 10, 3, 2, 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0001-0000-0000-0000-000000000003', 4, 1, 1, 'ca7e0000-0000-0000-0000-000000000001');

insert into equipment_units
  (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by)
values
  ('ca7e0002-0000-0000-0000-000000000001', 'ca7e0001-0000-0000-0000-000000000002', 'QTY-U1', 'available', null, null, 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0002-0000-0000-0000-000000000002', 'ca7e0001-0000-0000-0000-000000000002', 'QTY-U2', 'damaged', null, null, 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0002-0000-0000-0000-000000000003', 'ca7e0001-0000-0000-0000-000000000002', 'QTY-U3', 'in_repair', null, null, 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0002-0000-0000-0000-000000000004', 'ca7e0001-0000-0000-0000-000000000002', 'QTY-U4', 'decommissioned', now(), 'Quantity test reason', 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0002-0000-0000-0000-000000000005', 'ca7e0001-0000-0000-0000-000000000004', 'QTY-I1', 'available', null, null, 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001'),
  ('ca7e0002-0000-0000-0000-000000000006', 'ca7e0001-0000-0000-0000-000000000004', 'QTY-I2', 'decommissioned', now(), 'Quantity test reason', 'ca7e0000-0000-0000-0000-000000000001', 'ca7e0000-0000-0000-0000-000000000001');

select is(
  (select current_quantity from category_current_quantity where category_id = 'ca7e0001-0000-0000-0000-000000000001'),
  15,
  'una categoria por cantidad suma disponibles, danadas y en reparacion'
);
select is(
  (select current_quantity from category_current_quantity where category_id = 'ca7e0001-0000-0000-0000-000000000002'),
  3,
  'una categoria por unidad cuenta las unidades que no estan dadas de baja'
);
select is(
  (select current_quantity from category_current_quantity where category_id = 'ca7e0001-0000-0000-0000-000000000003'),
  6,
  'una categoria inactiva por cantidad tambien aparece con su total'
);
select is(
  (select current_quantity from category_current_quantity where category_id = 'ca7e0001-0000-0000-0000-000000000004'),
  1,
  'una categoria inactiva por unidad tambien aparece sin contar las dadas de baja'
);
select is(
  (select current_quantity from category_current_quantity where category_id = 'ca7e0001-0000-0000-0000-000000000005'),
  0,
  'una categoria por cantidad sin existencias registradas queda en cero'
);
select is(
  (select current_quantity from category_current_quantity where category_id = 'ca7e0001-0000-0000-0000-000000000006'),
  0,
  'una categoria por unidad sin unidades queda en cero'
);
select is(
  (select count(*)::integer from category_current_quantity where category_id::text like 'ca7e0001-%'),
  6,
  'cada categoria de la prueba tiene una sola fila'
);
select is(
  pg_typeof((select current_quantity from category_current_quantity limit 1))::text,
  'integer',
  'la cantidad es un entero'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"ca7e0000-0000-0000-0000-000000000001","role":"authenticated"}';
select is(
  (select count(*)::integer from category_current_quantity where category_id::text like 'ca7e0001-%'),
  6,
  'operaciones lee la cantidad de todas las categorias'
);
select is(
  (select current_quantity from category_current_quantity where category_id = 'ca7e0001-0000-0000-0000-000000000001'),
  15,
  'operaciones ve el total de una categoria por cantidad'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"ca7e0000-0000-0000-0000-000000000002","role":"authenticated"}';
select is(
  (select count(*)::integer from category_current_quantity where category_id::text like 'ca7e0001-%'),
  0,
  'un trabajador sin area no lee ninguna cantidad'
);

reset role;
select * from finish();
rollback;
