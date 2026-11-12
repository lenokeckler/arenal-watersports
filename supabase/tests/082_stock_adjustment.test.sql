begin;
select plan(22);

insert into auth.users (id, email)
select '5a0c0000-0000-0000-0000-000000000001', 'stock-admin@arenal.local'
where not exists (select 1 from workers where base_role = 'administracion');
insert into auth.users (id, email) values
  ('5a0c0000-0000-0000-0000-000000000002', 'stock-ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role)
select '5a0c0000-0000-0000-0000-000000000001', 'stock_admin', 'Stock admin', 'stock-admin@arenal.local', 'administracion'
where not exists (select 1 from workers where base_role = 'administracion');
insert into workers (id, username, full_name, personal_email, base_role) values
  ('5a0c0000-0000-0000-0000-000000000002', 'stock_ops', 'Stock operations', 'stock-ops@arenal.local', 'operaciones');
select set_config('stock.admin_id',
  (select id::text from workers where base_role = 'administracion' and status = 'active'), true);
insert into worker_areas (worker_id, area, granted_by)
values ('5a0c0000-0000-0000-0000-000000000002', 'reservas', current_setting('stock.admin_id')::uuid);
update workers set last_work_area = 'reservas'
where id = '5a0c0000-0000-0000-0000-000000000002';
update workers set last_work_area = 'administracion'
where id = current_setting('stock.admin_id')::uuid;

select set_config('stock.admin_claims',
  json_build_object('sub', current_setting('stock.admin_id'), 'role', 'authenticated')::text, true);

insert into equipment_categories
  (id, name, tracking_mode, alert_expiry_days, created_by, updated_by)
values
  ('5a0c0001-0000-0000-0000-000000000001', 'Stock test paddles', 'by_quantity', null, current_setting('stock.admin_id')::uuid, current_setting('stock.admin_id')::uuid),
  ('5a0c0001-0000-0000-0000-000000000002', 'Stock test flares', 'by_quantity', 30, current_setting('stock.admin_id')::uuid, current_setting('stock.admin_id')::uuid),
  ('5a0c0001-0000-0000-0000-000000000003', 'Stock test kayaks', 'by_unit', null, current_setting('stock.admin_id')::uuid, current_setting('stock.admin_id')::uuid);

set local role authenticated;

set local request.jwt.claims to '{"sub":"5a0c0000-0000-0000-0000-000000000002","role":"authenticated"}';
select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', 10, 0, 0, 'initial_count', null)$$,
  '42501', null, 'operaciones no ajusta el conteo con la funcion');

select set_config('request.jwt.claims', current_setting('stock.admin_claims'), true);

select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', -1, 0, 0, 'initial_count', null)$$,
  '22023', null, 'rechaza disponibles negativos');
select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', 1, -1, 0, 'initial_count', null)$$,
  '22023', null, 'rechaza danados negativos');
select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', 1, 0, -1, 'initial_count', null)$$,
  '22023', null, 'rechaza en reparacion negativos');
select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', 1, 0, 0, 'nonsense', null)$$,
  '22023', null, 'rechaza un motivo fuera del conjunto cerrado');
select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000003', 1, 0, 0, 'initial_count', null)$$,
  '22023', null, 'rechaza una categoria por unidad');
select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000099', 1, 0, 0, 'initial_count', null)$$,
  'P0002', null, 'rechaza una categoria que no existe');
select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', 1, 0, 0, 'initial_count', '2027-01-01')$$,
  '22023', null, 'rechaza fecha de vencimiento sin aviso por vencimiento');
select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', 0, 0, 0, 'initial_count', null)$$,
  '22023', null, 'rechaza un ajuste que no cambia nada');

reset role;
select is(
  (select count(*)::integer from equipment_stock where category_id = '5a0c0001-0000-0000-0000-000000000001'),
  0, 'un ajuste rechazado no deja fila de conteo');
set local role authenticated;
select set_config('request.jwt.claims', current_setting('stock.admin_claims'), true);

select lives_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', 10, 3, 2, 'initial_count', null)$$,
  'administracion registra el conteo inicial');

reset role;
select is(
  (select quantity_available * 10000 + quantity_damaged * 100 + quantity_in_repair
     from equipment_stock where category_id = '5a0c0001-0000-0000-0000-000000000001'),
  100302, 'el conteo se separa por estado');
select is(
  (select count(*)::integer from equipment_stock_movements where category_id = '5a0c0001-0000-0000-0000-000000000001'),
  1, 'un ajuste deja exactamente un movimiento');
select results_eq(
  $$select from_available, to_available, from_damaged, to_damaged, from_in_repair, to_in_repair, reason, created_by
      from equipment_stock_movements where category_id = '5a0c0001-0000-0000-0000-000000000001'$$,
  $$values (0, 10, 0, 3, 0, 2, 'initial_count', current_setting('stock.admin_id')::uuid)$$,
  'el movimiento guarda de cuanto a cuanto, motivo y autor');
select ok(
  (select created_at from equipment_stock_movements where category_id = '5a0c0001-0000-0000-0000-000000000001') is not null,
  'el movimiento guarda la fecha');
set local role authenticated;
select set_config('request.jwt.claims', current_setting('stock.admin_claims'), true);

select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', 12, 3, 2, 'initial_count', null)$$,
  '22023', null, 'el conteo inicial no se repite');
select throws_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', 10, 4, 2, 'discarded', null)$$,
  '22023', null, 'botar sin bajar el total se rechaza');

select lives_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000001', 10, 1, 2, 'discarded', null)$$,
  'administracion baja la cantidad al botar');

reset role;
select results_eq(
  $$select from_damaged, to_damaged, reason from equipment_stock_movements
     where category_id = '5a0c0001-0000-0000-0000-000000000001' order by created_at desc, to_damaged limit 1$$,
  $$values (3, 1, 'discarded')$$,
  'la baja deja de cuanto a cuanto bajo');
select is(
  (select count(*)::integer from equipment_stock_movements where category_id = '5a0c0001-0000-0000-0000-000000000001'),
  2, 'el historial conserva ambos movimientos');
set local role authenticated;
select set_config('request.jwt.claims', current_setting('stock.admin_claims'), true);

select lives_ok(
  $$select adjust_equipment_stock('5a0c0001-0000-0000-0000-000000000002', 5, 0, 0, 'initial_count', '2027-06-30')$$,
  'se registra el vencimiento en una categoria con aviso por vencimiento');
reset role;
select is(
  (select expiry_date from equipment_stock where category_id = '5a0c0001-0000-0000-0000-000000000002'),
  '2027-06-30'::date, 'la fecha de vencimiento queda guardada');

select * from finish();
rollback;
