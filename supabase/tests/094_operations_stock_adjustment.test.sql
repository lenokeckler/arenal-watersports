begin;
select plan(10);

insert into auth.users (id, email) values
  ('d7250000-0000-4000-8000-000000000001', 'ope25-stock-ops@arenal.local'),
  ('d7250000-0000-4000-8000-000000000002', 'ope25-stock-reservations@arenal.local'),
  ('d7250000-0000-4000-8000-000000000003', 'ope25-stock-guide@arenal.local');
insert into workers (id, username, full_name, base_role, must_change_password) values
  ('d7250000-0000-4000-8000-000000000001', 'ope25_stock_ops', 'Operations Stock Actor', 'operaciones', false),
  ('d7250000-0000-4000-8000-000000000002', 'ope25_stock_reservations', 'Reservations Stock Actor', 'operaciones', false),
  ('d7250000-0000-4000-8000-000000000003', 'ope25_stock_reservation_user', 'Reservations Stock Actor', 'reservas', false);
insert into worker_areas (worker_id, area, granted_by) values
  ('d7250000-0000-4000-8000-000000000002', 'reservas', 'd7250000-0000-4000-8000-000000000001');
update workers set last_work_area = 'reservas'
where id = 'd7250000-0000-4000-8000-000000000002';

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by)
values ('d7250001-0000-4000-8000-000000000001', 'OPE25 stock test', 'by_quantity',
        'd7250000-0000-4000-8000-000000000001', 'd7250000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, expiry_date, updated_by)
values ('d7250001-0000-4000-8000-000000000001', 5, '2027-02-01',
        'd7250000-0000-4000-8000-000000000001');
insert into reservations (id, customer_name, people_count, type, starts_at, duration_minutes,
                         created_by, updated_by)
values ('d7250002-0000-4000-8000-000000000001', 'OPE25 reservation', 1, 'rental',
        now() + interval '1 day', 60, 'd7250000-0000-4000-8000-000000000001',
        'd7250000-0000-4000-8000-000000000001');
insert into reservation_items (id, reservation_id, category_id, quantity, created_by, updated_by)
values ('d7250003-0000-4000-8000-000000000001', 'd7250002-0000-4000-8000-000000000001',
        'd7250001-0000-4000-8000-000000000001', 3,
        'd7250000-0000-4000-8000-000000000001', 'd7250000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"d7250000-0000-4000-8000-000000000001","role":"authenticated"}';
select lives_ok(
  $$select adjust_equipment_stock('d7250001-0000-4000-8000-000000000001', 4, 0, 0, 'count_correction', null)$$,
  'operations can adjust stock in active operations mode');
select is(
  (select expiry_date from equipment_stock where category_id = 'd7250001-0000-4000-8000-000000000001'),
  '2027-02-01'::date, 'operations adjustments preserve the existing expiry date');
select throws_ok(
  $$select adjust_equipment_stock('d7250001-0000-4000-8000-000000000001', 2, 0, 0, 'count_correction', null)$$,
  '22023', null, 'a reduction below peak reservation commitment is rejected');
select throws_ok(
  $$select adjust_equipment_stock('d7250001-0000-4000-8000-000000000001', 3, 0, 0, null, null)$$,
  '22023', null, 'an adjustment requires an allowed reason');
reset role;
select is(
  (select quantity_available from equipment_stock where category_id = 'd7250001-0000-4000-8000-000000000001'),
  4, 'rejected adjustments leave stock unchanged');
select is(
  (select count(*)::integer from equipment_stock_movements where category_id = 'd7250001-0000-4000-8000-000000000001'),
  1, 'rejected adjustments add no movement');
select is(
  (select created_by from equipment_stock_movements where category_id = 'd7250001-0000-4000-8000-000000000001'),
  'd7250000-0000-4000-8000-000000000001'::uuid, 'movement actor comes from auth.uid');
set local role authenticated;
set local request.jwt.claims to '{"sub":"d7250000-0000-4000-8000-000000000002","role":"authenticated"}';
select throws_ok(
  $$select adjust_equipment_stock('d7250001-0000-4000-8000-000000000001', 3, 0, 0, 'count_correction', null)$$,
  '42501', null, 'operations in reservations mode cannot call the adjustment RPC');
set local request.jwt.claims to '{"sub":"d7250000-0000-4000-8000-000000000001","role":"authenticated"}';
select lives_ok(
  $$select adjust_equipment_stock('d7250001-0000-4000-8000-000000000001', 3, 0, 0, 'count_correction', null)$$,
  'operations may reduce stock to the committed peak');
set local request.jwt.claims to '{"sub":"d7250000-0000-4000-8000-000000000003","role":"authenticated"}';
select throws_ok(
  $$select adjust_equipment_stock('d7250001-0000-4000-8000-000000000001', 2, 0, 0, 'count_correction', null)$$,
  '42501', null, 'workers outside administration and operations cannot adjust stock');

select * from finish();
rollback;
