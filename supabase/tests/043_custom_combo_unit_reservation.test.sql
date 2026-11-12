begin;
select plan(7);
insert into auth.users(id, email) values
  ('e4300000-0000-4000-8000-000000000001', 'res10-unit-booking@arenal.local'),
  ('e4300000-0000-4000-8000-000000000002', 'res10-unit-guide@arenal.local');
insert into workers(id, username, full_name, base_role) values
  ('e4300000-0000-4000-8000-000000000001', 'res10-unit-booking', 'RES10 Unit Booking', 'reservas'),
  ('e4300000-0000-4000-8000-000000000002', 'res10-unit-guide', 'RES10 Unit Guide', 'operaciones');
insert into worker_marks(worker_id, mark, granted_by) values
  ('e4300000-0000-4000-8000-000000000002', 'guia', 'e4300000-0000-4000-8000-000000000001');
insert into equipment_categories(id, name, tracking_mode, is_reservable, units_are_interchangeable, guide_only, default_duration_minutes, created_by, updated_by)
values ('e4300000-0000-4000-8000-000000000101', 'RES10 Unit Tour', 'by_unit', true, false, true, 60,
  'e4300000-0000-4000-8000-000000000001', 'e4300000-0000-4000-8000-000000000001');
insert into equipment_units(id, category_id, code, status, created_by, updated_by) values
  ('e4300000-0000-4000-8000-000000000201', 'e4300000-0000-4000-8000-000000000101', 'RES10-UNIT-BOOKED', 'available', 'e4300000-0000-4000-8000-000000000001', 'e4300000-0000-4000-8000-000000000001'),
  ('e4300000-0000-4000-8000-000000000202', 'e4300000-0000-4000-8000-000000000101', 'RES10-UNIT-FREE', 'available', 'e4300000-0000-4000-8000-000000000001', 'e4300000-0000-4000-8000-000000000001');
insert into tariffs(category_id, type, amount_usd, amount_crc, created_by, updated_by) values
  ('e4300000-0000-4000-8000-000000000101', 'tour', 80, 40000, 'e4300000-0000-4000-8000-000000000001', 'e4300000-0000-4000-8000-000000000001');
insert into reservations(id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e4300000-0000-4000-8000-000000000301', 'RES10 Prior Unit Booking', 1, 'rental', '2035-10-01 15:00:00+00', 60, 'scheduled', 'e4300000-0000-4000-8000-000000000001', 'e4300000-0000-4000-8000-000000000001');
insert into reservation_items(reservation_id, unit_id, created_by, updated_by)
values ('e4300000-0000-4000-8000-000000000301', 'e4300000-0000-4000-8000-000000000201', 'e4300000-0000-4000-8000-000000000001', 'e4300000-0000-4000-8000-000000000001');
set local role authenticated;
set local request.jwt.claims to '{"sub":"e4300000-0000-4000-8000-000000000001","role":"authenticated"}';
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object('customer_name','RES10 Conflict','people_count',1,'date','2035-10-01','time','09:30','duration_minutes',60,'items',jsonb_build_array(jsonb_build_object('unit_id','e4300000-0000-4000-8000-000000000201')))) $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'overlapping concrete unit is rejected');
select lives_ok($$ select create_custom_combo_reservation(jsonb_build_object('customer_name','RES10 Unit Combo','people_count',1,'date','2035-10-02','time','09:00','duration_minutes',60,'guide_ids',array['e4300000-0000-4000-8000-000000000002'],'items',jsonb_build_array(jsonb_build_object('unit_id','e4300000-0000-4000-8000-000000000202')))) $$,
  'a concrete guide-only unit supports a combo with a guide');
select is((select count(*)::integer from reservation_items as item join reservations as reservation on reservation.id=item.reservation_id
  where reservation.customer_name='RES10 Unit Combo' and item.unit_id='e4300000-0000-4000-8000-000000000202' and item.category_id is null and item.quantity is null), 1,
  'a concrete unit persists without category or quantity');
select is((select count(*)::integer from reservation_guides as guide join reservations as reservation on reservation.id=guide.reservation_id
  where reservation.customer_name='RES10 Unit Combo' and guide.worker_id='e4300000-0000-4000-8000-000000000002'), 1,
  'guide assignment persists for a unit-backed tour component');
select lives_ok($$ select create_custom_combo_reservation(jsonb_build_object('customer_name','RES10 Direct Unit Combo','people_count',1,'date','2035-10-03','time','09:00','duration_minutes',60,'items',jsonb_build_array(jsonb_build_object('unit_id','e4300000-0000-4000-8000-000000000202')))) $$,
  'a unit-backed guide-only combo can be created without an initial guide');
select lives_ok($$ insert into reservation_guides(reservation_id, worker_id, assigned_by)
  select reservation.id, 'e4300000-0000-4000-8000-000000000002', 'e4300000-0000-4000-8000-000000000001'
  from reservations as reservation where reservation.customer_name='RES10 Direct Unit Combo' $$,
  'direct guide writes recognize a unit-backed tour component');
select is((select count(*)::integer from reservation_items as item join reservations as reservation on reservation.id=item.reservation_id
  where reservation.customer_name='RES10 Unit Combo'), 1, 'a failed conflicting request creates no extra reservation item');
reset role;
select * from finish();
rollback;
