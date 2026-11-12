begin;
select plan(34);

insert into auth.users (id, email) values
  ('77000000-0000-0000-0000-000000000009', 'tab0702-admin@arenal.local'),
  ('77000000-0000-0000-0000-000000000001', 'tab0702-operations@arenal.local'),
  ('77000000-0000-0000-0000-000000000002', 'tab0702-reservations@arenal.local'),
  ('77000000-0000-0000-0000-000000000003', 'tab0702-operations-no-mark@arenal.local');
insert into public.workers (id, username, full_name, personal_email, base_role) values
  ('77000000-0000-0000-0000-000000000009', 'tab0702_admin', 'Administrator', 'tab0702-admin@correo.com', 'administracion'),
  ('77000000-0000-0000-0000-000000000001', 'tab0702_operations', 'Operations with mark', null, 'operaciones'),
  ('77000000-0000-0000-0000-000000000002', 'tab0702_reservations', 'Reservations with mark', null, 'reservas'),
  ('77000000-0000-0000-0000-000000000003', 'tab0702_operations_no_mark', 'Operations without mark', null, 'operaciones');
insert into public.worker_areas (worker_id, area, granted_by) values
  ('77000000-0000-0000-0000-000000000001', 'reservas', '77000000-0000-0000-0000-000000000009'),
  ('77000000-0000-0000-0000-000000000002', 'operaciones', '77000000-0000-0000-0000-000000000009'),
  ('77000000-0000-0000-0000-000000000003', 'reservas', '77000000-0000-0000-0000-000000000009');
insert into public.worker_marks (worker_id, mark, granted_by) values
  ('77000000-0000-0000-0000-000000000001', 'encargado_general', '77000000-0000-0000-0000-000000000009'),
  ('77000000-0000-0000-0000-000000000002', 'encargado_general', '77000000-0000-0000-0000-000000000009');
insert into public.equipment_categories (id, name, tracking_mode, has_condition_photos, created_by, updated_by)
values ('88000000-0000-0000-0000-000000000001', 'TAB-07-02 category', 'by_unit', true,
        '77000000-0000-0000-0000-000000000001', '77000000-0000-0000-0000-000000000001');
insert into public.equipment_units (id, category_id, code, created_by, updated_by)
values ('89000000-0000-0000-0000-000000000001', '88000000-0000-0000-0000-000000000001',
        'TAB-07-02-UNIT', '77000000-0000-0000-0000-000000000001', '77000000-0000-0000-0000-000000000001');
insert into public.equipment_stock_movements (
  id, category_id, from_available, to_available, from_damaged, to_damaged,
  from_in_repair, to_in_repair, reason, created_by
) values (
  '90000000-0000-0000-0000-000000000001', '88000000-0000-0000-0000-000000000001',
  5, 4, 0, 1, 0, 0, 'TAB-07-02 fixture', '77000000-0000-0000-0000-000000000001'
);
insert into public.damage_reports (id, unit_id, cause, description, created_by)
values ('91000000-0000-0000-0000-000000000001', '89000000-0000-0000-0000-000000000001',
        'collision', 'TAB-07-02 fixture', '77000000-0000-0000-0000-000000000001');
insert into public.maintenance_records (
  id, unit_id, work_type, description, is_external, cost_amount, cost_currency,
  performed_at, created_by, updated_by
) values (
  '92000000-0000-0000-0000-000000000001', '89000000-0000-0000-0000-000000000001',
  'TAB-07-02 service', 'TAB-07-02 fixture', false, 125, 'CRC', current_date,
  '77000000-0000-0000-0000-000000000001', '77000000-0000-0000-0000-000000000001'
);
insert into public.inventory_counts (id, notes, created_by)
values ('93000000-0000-0000-0000-000000000001', 'TAB-07-02 fixture', '77000000-0000-0000-0000-000000000001');
insert into public.inventory_count_lines (id, count_id, category_id, unit_id, confirmed_status)
values ('94000000-0000-0000-0000-000000000001', '93000000-0000-0000-0000-000000000001',
        '88000000-0000-0000-0000-000000000001', '89000000-0000-0000-0000-000000000001', 'available');
insert into public.unit_condition_photos (unit_id, angle, storage_path, uploaded_by)
values ('89000000-0000-0000-0000-000000000001', 'right_side', 'tab-07-02/existing.webp', '77000000-0000-0000-0000-000000000001');
insert into storage.buckets (id, name, public)
values ('tab-07-02-other-bucket', 'tab-07-02-other-bucket', false);
insert into storage.objects (bucket_id, name, owner)
values ('unit-condition-photos', 'tab-07-02/existing.webp', '77000000-0000-0000-0000-000000000001');
set local role authenticated; set local request.jwt.claims to '{"sub":"77000000-0000-0000-0000-000000000001","role":"authenticated"}';
select is(public.choose_work_area('operaciones'), 'chosen', 'dual-area marked worker selects operations mode');
select ok(public.has_area('operaciones') and not public.has_area('reservas'), 'operations mode restricts the reservations area');
select is(array[
  (select count(*)::integer from public.equipment_stock_movements where id = '90000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.damage_reports where id = '91000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.maintenance_records where id = '92000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.inventory_counts where id = '93000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.inventory_count_lines where id = '94000000-0000-0000-0000-000000000001')
], array[1, 1, 1, 1, 1], 'operations reads all five inventory history tables');
select lives_ok($$insert into public.unit_condition_photos (unit_id, angle, storage_path, uploaded_by) values ('89000000-0000-0000-0000-000000000001', 'left_side', 'tab-07-02/operations.webp', '77000000-0000-0000-0000-000000000001')$$, 'operations with the mark inserts a condition photo row');
with changed as (update public.unit_condition_photos set storage_path = 'tab-07-02/operations-updated.webp' where unit_id = '89000000-0000-0000-0000-000000000001' and angle = 'right_side' returning 1)
select is((select count(*)::integer from changed), 1, 'operations with the mark updates a condition photo row');
select lives_ok($$insert into storage.objects (bucket_id, name, owner) values ('unit-condition-photos', 'tab-07-02/operations.webp', '77000000-0000-0000-0000-000000000001')$$, 'operations with the mark uploads into the condition photo bucket');
with changed as (update storage.objects set metadata = '{"size":1024}'::jsonb where bucket_id = 'unit-condition-photos' and name = 'tab-07-02/existing.webp' returning 1)
select is((select count(*)::integer from changed), 1, 'operations with the mark updates a condition photo object');
select throws_ok($$insert into storage.objects (bucket_id, name, owner) values ('tab-07-02-other-bucket', 'tab-07-02/other.webp', '77000000-0000-0000-0000-000000000001')$$, '42501', null, 'the photo mark does not grant writes to another bucket');

reset role; set local role authenticated; set local request.jwt.claims to '{"sub":"77000000-0000-0000-0000-000000000002","role":"authenticated"}';
select is(public.choose_work_area('reservas'), 'chosen', 'dual-area marked worker selects reservations mode');
select ok(public.has_area('reservas') and not public.has_area('operaciones'), 'reservations mode restricts the operations area');
select is(array[
  (select count(*)::integer from public.equipment_units where id = '89000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.unit_condition_photos where unit_id = '89000000-0000-0000-0000-000000000001' and angle = 'right_side'),
  (select count(*)::integer from storage.objects where bucket_id = 'unit-condition-photos' and name = 'tab-07-02/existing.webp')
], array[1, 1, 1], 'reservations retains shared reads for equipment and condition photos');
select is(array[
  (select count(*)::integer from public.equipment_stock_movements where id = '90000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.damage_reports where id = '91000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.maintenance_records where id = '92000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.inventory_counts where id = '93000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.inventory_count_lines where id = '94000000-0000-0000-0000-000000000001')
], array[0, 0, 0, 0, 0], 'reservations cannot read any of the five inventory history tables');
with stock_update as (update public.equipment_stock_movements set reason = reason where id = '90000000-0000-0000-0000-000000000001' returning 1), damage_update as (update public.damage_reports set description = description where id = '91000000-0000-0000-0000-000000000001' returning 1), maintenance_update as (update public.maintenance_records set description = description where id = '92000000-0000-0000-0000-000000000001' returning 1), counts_update as (update public.inventory_counts set notes = notes where id = '93000000-0000-0000-0000-000000000001' returning 1), lines_update as (update public.inventory_count_lines set confirmed_status = confirmed_status where id = '94000000-0000-0000-0000-000000000001' returning 1)
select is(array[(select count(*)::integer from stock_update), (select count(*)::integer from damage_update), (select count(*)::integer from maintenance_update), (select count(*)::integer from counts_update), (select count(*)::integer from lines_update)], array[0, 0, 0, 0, 0], 'reservations cannot update inventory history rows');
select throws_ok($$insert into public.unit_condition_photos (unit_id, angle, storage_path, uploaded_by) values ('89000000-0000-0000-0000-000000000001', 'bottom', 'tab-07-02/reservations.webp', '77000000-0000-0000-0000-000000000002')$$, '42501', null, 'reservations cannot insert condition photo rows even with the mark');
with changed as (update public.unit_condition_photos set storage_path = 'tab-07-02/reservations.webp' where unit_id = '89000000-0000-0000-0000-000000000001' and angle = 'right_side' returning 1)
select is((select count(*)::integer from changed), 0, 'reservations cannot update condition photo rows');
select throws_ok($$insert into storage.objects (bucket_id, name, owner) values ('unit-condition-photos', 'tab-07-02/reservations.webp', '77000000-0000-0000-0000-000000000002')$$, '42501', null, 'reservations cannot upload condition photo objects even with the mark');
with changed as (update storage.objects set metadata = '{"size":2048}'::jsonb where bucket_id = 'unit-condition-photos' and name = 'tab-07-02/existing.webp' returning 1)
select is((select count(*)::integer from changed), 0, 'reservations cannot update condition photo objects');

reset role; set local role authenticated; set local request.jwt.claims to '{"sub":"77000000-0000-0000-0000-000000000003","role":"authenticated"}';
select is(public.choose_work_area('operaciones'), 'chosen', 'operations worker without the mark selects operations mode');
select ok(public.has_area('operaciones') and not public.has_mark('encargado_general'), 'operations area does not imply the photo mark');
select is(array[
  (select count(*)::integer from public.equipment_stock_movements where id = '90000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.damage_reports where id = '91000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.maintenance_records where id = '92000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.inventory_counts where id = '93000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.inventory_count_lines where id = '94000000-0000-0000-0000-000000000001')
], array[1, 1, 1, 1, 1], 'operations without the mark retains inventory history reads');
select throws_ok($$insert into public.unit_condition_photos (unit_id, angle, storage_path, uploaded_by) values ('89000000-0000-0000-0000-000000000001', 'front', 'tab-07-02/unmarked.webp', '77000000-0000-0000-0000-000000000003')$$, '42501', null, 'operations without the mark cannot insert condition photo rows');
with changed as (update public.unit_condition_photos set storage_path = 'tab-07-02/unmarked.webp' where unit_id = '89000000-0000-0000-0000-000000000001' and angle = 'right_side' returning 1)
select is((select count(*)::integer from changed), 0, 'operations without the mark cannot update condition photo rows');
select throws_ok($$insert into storage.objects (bucket_id, name, owner) values ('unit-condition-photos', 'tab-07-02/unmarked.webp', '77000000-0000-0000-0000-000000000003')$$, '42501', null, 'operations without the mark cannot upload condition photo objects');
with changed as (update storage.objects set metadata = '{"size":4096}'::jsonb where bucket_id = 'unit-condition-photos' and name = 'tab-07-02/existing.webp' returning 1)
select is((select count(*)::integer from changed), 0, 'operations without the mark cannot update condition photo objects');

reset role; set local role authenticated; set local request.jwt.claims to '{"sub":"77000000-0000-0000-0000-000000000009","role":"authenticated"}';
select ok(public.is_admin(), 'administrator retains active access');
select is(array[
  (select count(*)::integer from public.equipment_stock_movements where id = '90000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.damage_reports where id = '91000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.maintenance_records where id = '92000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.inventory_counts where id = '93000000-0000-0000-0000-000000000001'),
  (select count(*)::integer from public.inventory_count_lines where id = '94000000-0000-0000-0000-000000000001')
], array[1, 1, 1, 1, 1], 'administrator reads the five inventory history tables');
select lives_ok($$insert into public.unit_condition_photos (unit_id, angle, storage_path, uploaded_by) values ('89000000-0000-0000-0000-000000000001', 'bottom', 'tab-07-02/admin.webp', '77000000-0000-0000-0000-000000000009')$$, 'administrator inserts a condition photo row without the mark');
with changed as (update public.unit_condition_photos set storage_path = 'tab-07-02/admin-updated.webp' where unit_id = '89000000-0000-0000-0000-000000000001' and angle = 'right_side' returning 1)
select is((select count(*)::integer from changed), 1, 'administrator updates a condition photo row without the mark');
select lives_ok($$insert into storage.objects (bucket_id, name, owner) values ('unit-condition-photos', 'tab-07-02/admin.webp', '77000000-0000-0000-0000-000000000009')$$, 'administrator uploads a condition photo object without the mark');
with changed as (update storage.objects set metadata = '{"size":8192}'::jsonb where bucket_id = 'unit-condition-photos' and name = 'tab-07-02/existing.webp' returning 1)
select is((select count(*)::integer from changed), 1, 'administrator updates a condition photo object without the mark');

set local request.jwt.claims to '';
select ok(not public.has_area('operaciones') and not public.has_area('reservas'), 'cleared JWT claims grant no area');
select is(array[
  (select count(*)::integer from public.equipment_stock_movements),
  (select count(*)::integer from public.damage_reports),
  (select count(*)::integer from public.maintenance_records),
  (select count(*)::integer from public.inventory_counts),
  (select count(*)::integer from public.inventory_count_lines)
], array[0, 0, 0, 0, 0], 'authenticated requests without an identity cannot read restricted history');

reset role;
set local role anon;
select is((select count(*)::integer from storage.objects where bucket_id = 'unit-condition-photos'), 0, 'anonymous requests cannot read condition photo objects');
select throws_ok($$insert into storage.objects (bucket_id, name) values ('unit-condition-photos', 'tab-07-02/anonymous.webp')$$, '42501', null, 'anonymous requests cannot upload condition photo objects');

reset role;
select * from finish();
rollback;
