begin;
select plan(12);

insert into auth.users (id, email)
values
  ('e2500000-0000-4000-8000-000000000001', 'res07-reservas@arenal.local'),
  ('e2500000-0000-4000-8000-000000000002', 'res07-operations@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role)
values
  ('e2500000-0000-4000-8000-000000000001', 'res07-reservas', 'RES07 Reservas', 'res07-reservas@correo.com', 'reservas'),
  ('e2500000-0000-4000-8000-000000000002', 'res07-operations', 'RES07 Operations', 'res07-operations@correo.com', 'operaciones');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values
  ('e2500000-0000-4000-8000-000000000101', 'RES07 Lancha', 'active', 'by_unit', true, false, 60,
   'e2500000-0000-4000-8000-000000000001', 'e2500000-0000-4000-8000-000000000001'),
  ('e2500000-0000-4000-8000-000000000102', 'RES07 Kayak', 'active', 'by_unit', true, true, 60,
   'e2500000-0000-4000-8000-000000000001', 'e2500000-0000-4000-8000-000000000001');

insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values
  ('e2500000-0000-4000-8000-000000000201', 'e2500000-0000-4000-8000-000000000101', 'RES07-LANCHA-1', 'available',
   'e2500000-0000-4000-8000-000000000001', 'e2500000-0000-4000-8000-000000000001'),
  ('e2500000-0000-4000-8000-000000000202', 'e2500000-0000-4000-8000-000000000102', 'RES07-KAYAK-1', 'available',
   'e2500000-0000-4000-8000-000000000001', 'e2500000-0000-4000-8000-000000000001'),
  ('e2500000-0000-4000-8000-000000000203', 'e2500000-0000-4000-8000-000000000102', 'RES07-KAYAK-2', 'available',
   'e2500000-0000-4000-8000-000000000001', 'e2500000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2500000-0000-4000-8000-000000000001","role":"authenticated"}';

select ok(has_area('reservas') and not has_area('operaciones'), 'fixture has Reservations access only');

select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Unit customer', 'people_count', 2, 'date', '2035-04-12', 'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e2500000-0000-4000-8000-000000000201')) $$,
  'Reservas can commit a specific unit'
);

select is(
  (select count(*)::integer from reservation_items ri join reservations r on r.id = ri.reservation_id
   where r.customer_name = 'RES07 Unit customer' and ri.unit_id = 'e2500000-0000-4000-8000-000000000201'
     and ri.category_id is null and ri.quantity is null),
  1,
  'the reservation item stores the committed unit only'
);

select is(
  (select u.status::text || ':' || r.status::text || ':' || count(rd.id)::text
   from equipment_units u
   join reservation_items ri on ri.unit_id = u.id
   join reservations r on r.id = ri.reservation_id
   left join reservation_dispatches rd on rd.reservation_id = r.id
   where u.id = 'e2500000-0000-4000-8000-000000000201'
   group by u.status, r.status),
  'available:scheduled:0',
  'commitment leaves the unit available and creates no dispatch'
);

select is(
  (select free from category_availability(
    'e2500000-0000-4000-8000-000000000101', '2035-04-12 15:00:00+00', '2035-04-12 16:00:00+00', null
  )),
  0,
  'the unit reservation reduces category availability for its time slot'
);

select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Quantity customer', 'people_count', 2, 'date', '2035-04-12', 'time', '09:00', 'duration_minutes', 60, 'category_id', 'e2500000-0000-4000-8000-000000000102', 'quantity', 2)) $$,
  'category and quantity commitments remain supported'
);

select is(
  (select count(*)::integer from reservation_items ri join reservations r on r.id = ri.reservation_id
   where r.customer_name = 'RES07 Quantity customer' and ri.category_id = 'e2500000-0000-4000-8000-000000000102'
     and ri.quantity = 2 and ri.unit_id is null),
  1,
  'category commitment remains category plus quantity'
);

select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Overlap customer', 'people_count', 2, 'date', '2035-04-12', 'time', '09:30', 'duration_minutes', 60, 'unit_id', 'e2500000-0000-4000-8000-000000000201')) $$,
  'P0001', null,
  'the same unit cannot be committed to an overlapping reservation'
);

reset role;
set local request.jwt.claims to '{"role":"anon"}';
set local role anon;

select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Anonymous customer', 'people_count', 2, 'date', '2035-04-12', 'time', '12:00', 'duration_minutes', 60, 'unit_id', 'e2500000-0000-4000-8000-000000000201')) $$,
  '42501', null,
  'anonymous users cannot execute a unit commitment'
);

reset role;
set local request.jwt.claims to '{"sub":"e2500000-0000-4000-8000-000000000002","role":"authenticated"}';
set local role authenticated;

select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Operations customer', 'people_count', 2, 'date', '2035-04-12', 'time', '12:00', 'duration_minutes', 60, 'unit_id', 'e2500000-0000-4000-8000-000000000201')) $$,
  'P0001', 'Reservations access is required',
  'Operations-only workers cannot commit a specific unit'
);

reset role;
set local request.jwt.claims to '{"sub":"e2500000-0000-4000-8000-000000000001","role":"authenticated"}';
set local role authenticated;

select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Mixed commitment customer', 'people_count', 2, 'date', '2035-04-12', 'time', '12:00', 'duration_minutes', 60, 'category_id', 'e2500000-0000-4000-8000-000000000102', 'quantity', 1, 'unit_id', 'e2500000-0000-4000-8000-000000000201')) $$,
  'P0001', 'A unit commitment cannot include a category or quantity',
  'a concrete unit cannot be combined with category and quantity fields'
);

select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Interchangeable unit customer', 'people_count', 2, 'date', '2035-04-12', 'time', '12:00', 'duration_minutes', 60, 'unit_id', 'e2500000-0000-4000-8000-000000000202')) $$,
  'P0001', 'Equipment unit is not available for reservation',
  'a unit from an interchangeable category cannot be committed specifically'
);

reset role;
select * from finish();
rollback;
