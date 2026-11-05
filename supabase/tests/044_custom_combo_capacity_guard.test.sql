begin;
select plan(8);
insert into auth.users(id, email) values
  ('e4400000-0000-4000-8000-000000000001', 'res10-capacity@arenal.local'),
  ('e4400000-0000-4000-8000-000000000002', 'res10-forged-worker@arenal.local'),
  ('e4400000-0000-4000-8000-000000000003', 'res10-admin@arenal.local');
insert into workers(id, username, full_name, personal_email, base_role) values
  ('e4400000-0000-4000-8000-000000000001', 'res10-capacity', 'RES10 Capacity', null, 'reservas'),
  ('e4400000-0000-4000-8000-000000000002', 'res10-forged-worker', 'RES10 Forged Worker', null, 'operaciones'),
  ('e4400000-0000-4000-8000-000000000003', 'res10-admin', 'RES10 Admin', 'res10-admin@arenal.local', 'administracion');
insert into equipment_categories(id, name, tracking_mode, is_reservable, units_are_interchangeable, guide_only, default_duration_minutes, created_by, updated_by)
values ('e4400000-0000-4000-8000-000000000101', 'RES10 Capacity Rental', 'by_quantity', true, true, false, 60,
  'e4400000-0000-4000-8000-000000000001', 'e4400000-0000-4000-8000-000000000001');
insert into equipment_stock(category_id, quantity_available, updated_by)
values ('e4400000-0000-4000-8000-000000000101', 5, 'e4400000-0000-4000-8000-000000000001');
insert into equipment_categories(id, name, tracking_mode, is_reservable, units_are_interchangeable, guide_only, default_duration_minutes, created_by, updated_by)
values ('e4400000-0000-4000-8000-000000000102', 'RES10 Capacity Unit', 'by_unit', true, false, false, 60,
  'e4400000-0000-4000-8000-000000000001', 'e4400000-0000-4000-8000-000000000001');
insert into equipment_units(id, category_id, code, status, created_by, updated_by)
values ('e4400000-0000-4000-8000-000000000201', 'e4400000-0000-4000-8000-000000000102', 'RES10-CAPACITY-UNIT', 'available',
  'e4400000-0000-4000-8000-000000000001', 'e4400000-0000-4000-8000-000000000001');
insert into tariffs(category_id, type, amount_usd, amount_crc, created_by, updated_by)
values ('e4400000-0000-4000-8000-000000000101', 'rental', 20, 10000,
  'e4400000-0000-4000-8000-000000000001', 'e4400000-0000-4000-8000-000000000001');
set local role authenticated;
set local request.jwt.claims to '{"sub":"e4400000-0000-4000-8000-000000000001","role":"authenticated"}';
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object('customer_name','RES10 Over stock','people_count',1,'date','2035-10-01','time','09:00','duration_minutes',60,'items',jsonb_build_array(jsonb_build_object('category_id','e4400000-0000-4000-8000-000000000101','quantity',6)))) $$,
  'P0001', 'Equipment category has insufficient availability', 'a combo above available stock is rejected');
select lives_ok($$ select create_custom_combo_reservation(jsonb_build_object('customer_name','RES10 Capacity Fill','people_count',1,'date','2035-10-02','time','09:00','duration_minutes',60,'items',jsonb_build_array(jsonb_build_object('category_id','e4400000-0000-4000-8000-000000000101','quantity',4)))) $$,
  'a combo can reserve the available portion of a category');
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object('customer_name','RES10 Overlapping Capacity','people_count',1,'date','2035-10-02','time','09:30','duration_minutes',60,'items',jsonb_build_array(jsonb_build_object('category_id','e4400000-0000-4000-8000-000000000101','quantity',2)))) $$,
  'P0001', 'Equipment category has insufficient availability', 'overlapping combos cannot exceed remaining stock');
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object('customer_name','RES10 USD Overflow','people_count',1,'date','2035-10-04','time','09:00','duration_minutes',60,'agreed_amount_usd',10000000000,'items',jsonb_build_array(jsonb_build_object('category_id','e4400000-0000-4000-8000-000000000101','quantity',1)))) $$,
  'P0001', 'Agreed USD amount is invalid for the available tariff', 'USD agreement above numeric storage capacity is rejected');
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object('customer_name','RES10 CRC Overflow','people_count',1,'date','2035-10-05','time','09:00','duration_minutes',60,'agreed_amount_crc',1000000000000,'items',jsonb_build_array(jsonb_build_object('category_id','e4400000-0000-4000-8000-000000000101','quantity',1)))) $$,
  'P0001', 'Agreed CRC amount is invalid for the available tariff', 'CRC agreement above numeric storage capacity is rejected');
select lives_ok($$ select create_custom_combo_reservation(jsonb_build_object('customer_name','RES10 Forged Validation','people_count',1,'date','2035-10-03','time','09:00','duration_minutes',60,'validated_worker_id','e4400000-0000-4000-8000-000000000002','validated_starts_at','2040-01-01 00:00:00+00','validated_list_amount_usd',999,'validated_list_amount_crc',999,'validated_guide_ids','[]'::jsonb,'items',jsonb_build_array(jsonb_build_object('category_id','e4400000-0000-4000-8000-000000000101','quantity',1)))) $$,
  'client-supplied validated fields are overwritten during reservation validation');
select is((select created_by from reservations where customer_name='RES10 Forged Validation'), 'e4400000-0000-4000-8000-000000000001'::uuid,
  'client-supplied worker identity is ignored');
set local request.jwt.claims to '{"sub":"e4400000-0000-4000-8000-000000000003","role":"authenticated"}';
select throws_ok($$ select lock_reservable_unit('e4400000-0000-4000-8000-000000000201') $$,
  'P0001', 'Reservations access is required', 'an administrator without Reservations cannot lock a reservable unit');
reset role;
select * from finish();
rollback;
