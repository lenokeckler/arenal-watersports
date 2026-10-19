begin;
select plan(8);

insert into auth.users (id, email) values
  ('e3300000-0000-4000-8000-000000000001', 'res12-validation@arenal.local'),
  ('e3300000-0000-4000-8000-000000000002', 'res12-validation-guide@arenal.local'),
  ('e3300000-0000-4000-8000-000000000003', 'res12-validation-worker@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e3300000-0000-4000-8000-000000000001', 'res12-validation', 'RES12 Validation', 'reservas'),
  ('e3300000-0000-4000-8000-000000000002', 'res12-validation-guide', 'RES12 Guide', 'operaciones'),
  ('e3300000-0000-4000-8000-000000000003', 'res12-validation-worker', 'RES12 Worker', 'operaciones');
insert into worker_marks (worker_id, mark, granted_by)
values ('e3300000-0000-4000-8000-000000000002', 'guia', 'e3300000-0000-4000-8000-000000000001');
insert into equipment_categories (id, name, tracking_mode, is_reservable, units_are_interchangeable,
  default_duration_minutes, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000101', 'RES12 Validation ATV', 'by_quantity', true, true,
  60, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e3300000-0000-4000-8000-000000000101', 2, 'e3300000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Invalid guide type', 'people_count', 1, 'date', '2035-12-01',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3300000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', 'not-an-array')) $$,
  'P0001', 'Guide identifiers must be an array', 'guide identifiers must be an array');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Invalid guide uuid', 'people_count', 1, 'date', '2035-12-02',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3300000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', array['not-a-uuid'])) $$,
  'P0001', 'Guide identifiers must be UUID values', 'non-UUID guide identifiers are rejected');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Null guide', 'people_count', 1, 'date', '2035-12-03',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3300000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', jsonb_build_array(null))) $$,
  'P0001', 'Guide identifiers must be UUID values', 'null guide identifiers are rejected');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Mixed null guide', 'people_count', 1, 'date', '2035-12-04',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3300000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', jsonb_build_array(
    'e3300000-0000-4000-8000-000000000002', null))) $$,
  'P0001', 'Guide identifiers must be UUID values', 'null is rejected beside a valid guide');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Unmarked guide', 'people_count', 1, 'date', '2035-12-05',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3300000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', array['e3300000-0000-4000-8000-000000000003'])) $$,
  'P0001', 'Every assigned worker must be marked as a guide', 'unmarked workers are rejected');
select is((select count(*)::integer from reservations where customer_name = 'RES12 Unmarked guide'),
  0, 'invalid guide selection creates no reservation');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Rental guide', 'people_count', 1, 'date', '2035-12-06',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3300000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'rental', 'guide_ids', array['e3300000-0000-4000-8000-000000000002'])) $$,
  'P0001', 'Guides can only be assigned to tour reservations', 'guides are only valid for tours');
select is((select count(*)::integer from reservations where customer_name = 'RES12 Mixed null guide'),
  0, 'a mixed null selection creates no reservation');

reset role;
select * from finish();
rollback;
