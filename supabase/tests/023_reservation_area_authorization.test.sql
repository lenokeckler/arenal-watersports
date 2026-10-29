begin;
select plan(7);

insert into auth.users (id, email)
values
  ('e2600000-0000-4000-8000-000000000001', 'res07-admin-only@arenal.local'),
  ('e2600000-0000-4000-8000-000000000002', 'res07-reservations@arenal.local'),
  ('e2600000-0000-4000-8000-000000000003', 'res07-operations@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role)
values
  ('e2600000-0000-4000-8000-000000000001', 'res07-admin-only', 'RES07 Admin Only', 'res07-admin-only@correo.com', 'reservas'),
  ('e2600000-0000-4000-8000-000000000002', 'res07-reservations', 'RES07 Reservations', 'res07-reservations@correo.com', 'reservas'),
  ('e2600000-0000-4000-8000-000000000003', 'res07-operations', 'RES07 Operations', 'res07-operations@correo.com', 'operaciones');

delete from worker_areas
where worker_id = 'e2600000-0000-4000-8000-000000000001';

insert into worker_areas (worker_id, area, granted_by)
values (
  'e2600000-0000-4000-8000-000000000001',
  'administracion',
  'e2600000-0000-4000-8000-000000000002'
);

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values
  ('e2600000-0000-4000-8000-000000000101', 'RES07 Authorization Lancha', 'active', 'by_unit', true, false, 60,
   'e2600000-0000-4000-8000-000000000002', 'e2600000-0000-4000-8000-000000000002');

insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values
  ('e2600000-0000-4000-8000-000000000201', 'e2600000-0000-4000-8000-000000000101', 'RES07-AUTH-LANCHA', 'available',
   'e2600000-0000-4000-8000-000000000002', 'e2600000-0000-4000-8000-000000000002');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('e2600000-0000-4000-8000-000000000301', 'RES07 Authorization parent', 2, 'rental',
   '2035-04-12 15:00:00+00', 60, 'scheduled',
   'e2600000-0000-4000-8000-000000000002', 'e2600000-0000-4000-8000-000000000002');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2600000-0000-4000-8000-000000000001","role":"authenticated"}';

select ok(
  has_area('administracion') and not has_area('reservas'),
  'fixture has Administration access only'
);

select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Admin unit', 'people_count', 2, 'date', '2035-04-12', 'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e2600000-0000-4000-8000-000000000201')) $$,
  'P0001', 'Reservations access is required',
  'Administration-only workers cannot commit a specific unit'
);

select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Admin category', 'people_count', 2, 'date', '2035-04-12', 'time', '09:00', 'duration_minutes', 60, 'category_id', 'e2600000-0000-4000-8000-000000000101', 'quantity', 1)) $$,
  'P0001', 'Reservations access is required',
  'Administration-only workers cannot commit a category and quantity'
);

select throws_ok(
  $$ select lock_reservable_unit('e2600000-0000-4000-8000-000000000201') $$,
  'P0001', 'Reservations access is required',
  'Administration-only workers cannot bypass the unit lock access check'
);

select throws_ok(
  $$ insert into reservations (customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
     values ('RES07 Admin direct reservation', 2, 'rental', '2035-04-12 15:00:00+00', 60,
             'e2600000-0000-4000-8000-000000000001', 'e2600000-0000-4000-8000-000000000001') $$,
  '42501', null,
  'Administration-only workers cannot insert reservations directly'
);

select throws_ok(
  $$ insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
     values ('e2600000-0000-4000-8000-000000000301', 'e2600000-0000-4000-8000-000000000201',
             'e2600000-0000-4000-8000-000000000001', 'e2600000-0000-4000-8000-000000000001') $$,
  '42501', null,
  'Administration-only workers cannot insert reservation items directly'
);

reset role;
set local request.jwt.claims to '{"sub":"e2600000-0000-4000-8000-000000000003","role":"authenticated"}';
set local role authenticated;

select lives_ok(
  $$ insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by)
     values ('e2600000-0000-4000-8000-000000000301', 'e2600000-0000-4000-8000-000000000101', 1,
             'e2600000-0000-4000-8000-000000000003', 'e2600000-0000-4000-8000-000000000003') $$,
  'Operations retains direct reservation item insertion access'
);

reset role;
select * from finish();
rollback;
