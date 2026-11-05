begin;
select plan(8);

insert into auth.users (id, email) values
  ('e3700000-0000-4000-8000-000000000001', 'res13-reservas@arenal.local'),
  ('e3700000-0000-4000-8000-000000000002', 'res13-active@arenal.local'),
  ('e3700000-0000-4000-8000-000000000003', 'res13-blocked@arenal.local'),
  ('e3700000-0000-4000-8000-000000000004', 'res13-expired@arenal.local'),
  ('e3700000-0000-4000-8000-000000000005', 'res13-future-expiry@arenal.local'),
  ('e3700000-0000-4000-8000-000000000006', 'res13-deleted@arenal.local');

insert into workers (id, username, full_name, base_role, status, is_external_guide, national_id, expires_at) values
  ('e3700000-0000-4000-8000-000000000001', 'res13-reservas', 'RES13 Reservas', 'reservas', 'active', false, null, null),
  ('e3700000-0000-4000-8000-000000000002', 'res13-active', 'RES13 Active Guide', 'operaciones', 'active', false, null, null),
  ('e3700000-0000-4000-8000-000000000003', 'res13-blocked', 'RES13 Blocked Guide', 'operaciones', 'blocked', false, null, null),
  ('e3700000-0000-4000-8000-000000000004', 'res13-expired', 'RES13 Expired Guide', 'operaciones', 'active', true, 'RES13-004', now() - interval '1 day'),
  ('e3700000-0000-4000-8000-000000000005', 'res13-future-expiry', 'RES13 Future Expiry Guide', 'operaciones', 'active', true, 'RES13-005', now() + interval '1 day'),
  ('e3700000-0000-4000-8000-000000000006', 'res13-deleted', 'RES13 Deleted Guide', 'operaciones', 'active', false, null, null);
update workers set deleted_at = now()
where id = 'e3700000-0000-4000-8000-000000000006';

insert into worker_marks (worker_id, mark, granted_by) values
  ('e3700000-0000-4000-8000-000000000002', 'guia', 'e3700000-0000-4000-8000-000000000001'),
  ('e3700000-0000-4000-8000-000000000003', 'guia', 'e3700000-0000-4000-8000-000000000001'),
  ('e3700000-0000-4000-8000-000000000004', 'guia', 'e3700000-0000-4000-8000-000000000001'),
  ('e3700000-0000-4000-8000-000000000005', 'guia', 'e3700000-0000-4000-8000-000000000001'),
  ('e3700000-0000-4000-8000-000000000006', 'guia', 'e3700000-0000-4000-8000-000000000001');

insert into equipment_categories (id, name, tracking_mode, is_reservable,
  units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values ('e3700000-0000-4000-8000-000000000101', 'RES13 ATV', 'by_quantity', true,
  true, 60, 'e3700000-0000-4000-8000-000000000001', 'e3700000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e3700000-0000-4000-8000-000000000101', 8, 'e3700000-0000-4000-8000-000000000001');
insert into reservations (id, customer_name, people_count, type, starts_at,
  duration_minutes, created_by, updated_by)
values ('e3700000-0000-4000-8000-000000000201', 'RES13 Direct Assignment', 1,
  'tour', now() + interval '1 day', 60,
  'e3700000-0000-4000-8000-000000000001',
  'e3700000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3700000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select workers.id from workers join worker_marks on worker_marks.worker_id = workers.id
     where worker_marks.mark = 'guia' and workers.id::text like 'e3700000-%' order by workers.id $$,
  $$ values
    ('e3700000-0000-4000-8000-000000000002'::uuid),
    ('e3700000-0000-4000-8000-000000000005'::uuid) $$,
  'the directory exposes active guides with no expiry or future expiry'
);
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES13 Future Expiry Assignment', 'people_count', 1, 'date', '2035-12-03',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3700000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', array['e3700000-0000-4000-8000-000000000005'])) $$,
  'active external guides with a future expiry can be assigned');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES13 Blocked Assignment', 'people_count', 1, 'date', '2035-12-01',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3700000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', array['e3700000-0000-4000-8000-000000000003'])) $$,
  'P0001', 'Every assigned worker must be marked as a guide', 'blocked guides are rejected by reservation creation');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES13 Expired Assignment', 'people_count', 1, 'date', '2035-12-02',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3700000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', array['e3700000-0000-4000-8000-000000000004'])) $$,
  'P0001', 'Every assigned worker must be marked as a guide', 'expired guides are rejected by reservation creation');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES13 Deleted Assignment', 'people_count', 1, 'date', '2035-12-04',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3700000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', array['e3700000-0000-4000-8000-000000000006'])) $$,
  'P0001', 'Every assigned worker must be marked as a guide', 'deleted guides are rejected by reservation creation');
select throws_ok($$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
  values ('e3700000-0000-4000-8000-000000000201', 'e3700000-0000-4000-8000-000000000003', auth.uid()) $$,
  'P0001', 'Every assigned worker must be marked as a guide', 'blocked guides are rejected by direct assignment');
select throws_ok($$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
  values ('e3700000-0000-4000-8000-000000000201', 'e3700000-0000-4000-8000-000000000004', auth.uid()) $$,
  'P0001', 'Every assigned worker must be marked as a guide', 'expired guides are rejected by direct assignment');
select throws_ok($$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
  values ('e3700000-0000-4000-8000-000000000201', 'e3700000-0000-4000-8000-000000000006', auth.uid()) $$,
  'P0001', 'Every assigned worker must be marked as a guide', 'deleted guides are rejected by direct assignment');

reset role;
select * from finish();
rollback;
