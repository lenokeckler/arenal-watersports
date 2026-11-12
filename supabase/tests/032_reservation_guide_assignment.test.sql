begin;
select plan(16);

insert into auth.users (id, email) values
  ('e3200000-0000-4000-8000-000000000001', 'res12-reservas@arenal.local'),
  ('e3200000-0000-4000-8000-000000000002', 'res12-guide-one@arenal.local'),
  ('e3200000-0000-4000-8000-000000000003', 'res12-guide-two@arenal.local'),
  ('e3200000-0000-4000-8000-000000000004', 'res12-worker@arenal.local'),
  ('e3200000-0000-4000-8000-000000000005', 'res12-guide-three@arenal.local');

insert into workers (id, username, full_name, base_role, status) values
  ('e3200000-0000-4000-8000-000000000001', 'res12-reservas', 'RES12 Reservas', 'reservas', 'active'),
  ('e3200000-0000-4000-8000-000000000002', 'res12-guide-one', 'RES12 Guide One', 'operaciones', 'active'),
  ('e3200000-0000-4000-8000-000000000003', 'res12-guide-two', 'RES12 Guide Two', 'operaciones', 'active'),
  ('e3200000-0000-4000-8000-000000000004', 'res12-worker', 'RES12 Worker', 'operaciones', 'active'),
  ('e3200000-0000-4000-8000-000000000005', 'res12-guide-three', 'RES12 Guide Three', 'operaciones', 'active');

insert into worker_marks (worker_id, mark, granted_by) values
  ('e3200000-0000-4000-8000-000000000002', 'guia', 'e3200000-0000-4000-8000-000000000001'),
  ('e3200000-0000-4000-8000-000000000003', 'guia', 'e3200000-0000-4000-8000-000000000001'),
  ('e3200000-0000-4000-8000-000000000005', 'guia', 'e3200000-0000-4000-8000-000000000001');

insert into equipment_categories (id, name, tracking_mode, is_reservable,
  units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values ('e3200000-0000-4000-8000-000000000101', 'RES12 ATV', 'by_quantity', true,
  true, 60, 'e3200000-0000-4000-8000-000000000001', 'e3200000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e3200000-0000-4000-8000-000000000101', 8, 'e3200000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3200000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select workers.id, workers.full_name from workers
     join worker_marks on worker_marks.worker_id = workers.id
     where worker_marks.mark = 'guia' and workers.id::text like 'e3200000-%'
     order by workers.id $$,
  $$ values ('e3200000-0000-4000-8000-000000000002'::uuid, 'RES12 Guide One'::text),
            ('e3200000-0000-4000-8000-000000000003'::uuid, 'RES12 Guide Two'::text),
            ('e3200000-0000-4000-8000-000000000005'::uuid, 'RES12 Guide Three'::text) $$,
  'the guide directory includes marked workers only'
);
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Eight ATV tour', 'people_count', 8, 'date', '2035-12-01',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3200000-0000-4000-8000-000000000101',
  'quantity', 8, 'reservation_type', 'tour', 'guide_ids', array[
    'e3200000-0000-4000-8000-000000000002', 'e3200000-0000-4000-8000-000000000003'])) $$,
  'an eight ATV tour accepts two guides');
select is((select count(*)::integer from reservation_guides g join reservations r on r.id = g.reservation_id
  where r.customer_name = 'RES12 Eight ATV tour'), 2, 'both selected guides are stored');
select is((select count(*)::integer from reservation_guides g join reservations r on r.id = g.reservation_id
  where r.customer_name = 'RES12 Eight ATV tour' and g.assigned_by = 'e3200000-0000-4000-8000-000000000001'),
  2, 'the authenticated worker is recorded as assignment author');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Unmarked selection', 'people_count', 1, 'date', '2035-12-02',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3200000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', array['e3200000-0000-4000-8000-000000000004'])) $$,
  'P0001', 'Every assigned worker must be marked as a guide', 'unmarked workers cannot be assigned');
select is((select count(*)::integer from reservations where customer_name = 'RES12 Unmarked selection'),
  0, 'failed guide validation creates no reservation');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Rental guide', 'people_count', 1, 'date', '2035-12-03',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3200000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'rental', 'guide_ids', array['e3200000-0000-4000-8000-000000000002'])) $$,
  'P0001', 'Guides can only be assigned to tour reservations', 'guides require a tour reservation');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Null guide', 'people_count', 1, 'date', '2035-12-11',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3200000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', jsonb_build_array(null))) $$,
  'P0001', 'Guide identifiers must be UUID values', 'null guide ids are rejected');
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Mixed null guide', 'people_count', 1, 'date', '2035-12-12',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3200000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', jsonb_build_array(
    'e3200000-0000-4000-8000-000000000002', null))) $$,
  'P0001', 'Guide identifiers must be UUID values', 'mixed null guide ids are rejected');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Unassigned tour', 'people_count', 1, 'date', '2035-12-04',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3200000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour')) $$, 'tour creation permits an empty guide list');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Three guide tour', 'people_count', 8, 'date', '2035-12-10',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3200000-0000-4000-8000-000000000101',
  'quantity', 8, 'reservation_type', 'tour', 'guide_ids', array[
    'e3200000-0000-4000-8000-000000000002', 'e3200000-0000-4000-8000-000000000003',
    'e3200000-0000-4000-8000-000000000005'])) $$,
  'a tour accepts more than two distinct guides without a threshold');
select is((select count(*)::integer from reservation_guides g join reservations r on r.id = g.reservation_id
  where r.customer_name = 'RES12 Three guide tour'), 3, 'all three distinct guides are stored');
select lives_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Duplicate guide', 'people_count', 1, 'date', '2035-12-06',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3200000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', array[
    'e3200000-0000-4000-8000-000000000002', 'e3200000-0000-4000-8000-000000000002'])) $$,
  'duplicate guide identifiers are collapsed');
select is((select count(*)::integer from reservation_guides g join reservations r on r.id = g.reservation_id
  where r.customer_name = 'RES12 Duplicate guide'), 1, 'a guide is assigned at most once');

reset role;
create function public.reject_res12_guide_assignment() returns trigger
language plpgsql as $$
begin
  raise exception 'Forced guide assignment failure';
end;
$$;
create trigger reject_res12_guide_assignment
before insert on reservation_guides
for each row execute function public.reject_res12_guide_assignment();
set local role authenticated;
select throws_ok($$ select create_rental_reservation(jsonb_build_object(
  'customer_name', 'RES12 Late guide failure', 'people_count', 1, 'date', '2035-12-13',
  'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3200000-0000-4000-8000-000000000101',
  'quantity', 1, 'reservation_type', 'tour', 'guide_ids', array['e3200000-0000-4000-8000-000000000002'])) $$,
  'P0001', 'Forced guide assignment failure', 'guide insert failure aborts reservation creation');
select is((select count(*)::integer from reservations where customer_name = 'RES12 Late guide failure'),
  0, 'late guide failure rolls back the reservation and equipment commitment');
reset role;
drop trigger reject_res12_guide_assignment on reservation_guides;
drop function public.reject_res12_guide_assignment();
select * from finish();
rollback;
