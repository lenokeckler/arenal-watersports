begin;
select plan(11);

insert into auth.users (id, email)
values
  ('e2600000-0000-4000-8000-000000000001', 'res07-availability@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role)
values
  ('e2600000-0000-4000-8000-000000000001', 'res07-availability', 'RES07 Availability', 'res07-availability@correo.com', 'reservas');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values
  ('e2600000-0000-4000-8000-000000000101', 'RES07 Availability Lancha', 'active', 'by_unit', true, false, 60,
   'e2600000-0000-4000-8000-000000000001', 'e2600000-0000-4000-8000-000000000001'),
  ('e2600000-0000-4000-8000-000000000102', 'RES07 Availability Kayak', 'active', 'by_quantity', true, true, 60,
   'e2600000-0000-4000-8000-000000000001', 'e2600000-0000-4000-8000-000000000001');

insert into equipment_stock (category_id, quantity_available, updated_by)
values
  ('e2600000-0000-4000-8000-000000000102', 3, 'e2600000-0000-4000-8000-000000000001');

insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values
  ('e2600000-0000-4000-8000-000000000201', 'e2600000-0000-4000-8000-000000000101', 'RES07-AVAIL-LANCHA', 'available',
   'e2600000-0000-4000-8000-000000000001', 'e2600000-0000-4000-8000-000000000001');

set local request.jwt.claims to '{"sub":"e2600000-0000-4000-8000-000000000001","role":"authenticated"}';
set local role authenticated;

select ok(has_area('reservas'), 'the fixture worker has Reservations access');

select ok(
  exists (
    select 1
    from equipment_categories
    where id = 'e2600000-0000-4000-8000-000000000102'
      and status = 'active'
      and is_reservable
      and units_are_interchangeable
  ),
  'the quantity category is active, reservable, and interchangeable'
);

select is(
  (select free from category_availability(
    'e2600000-0000-4000-8000-000000000102', '2035-04-12 15:00:00+00', '2035-04-12 16:00:00+00', null
  )),
  3,
  'quantity availability starts from configured stock'
);

select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Quantity availability', 'people_count', 2, 'date', '2035-04-12', 'time', '09:00', 'duration_minutes', 60, 'category_id', 'e2600000-0000-4000-8000-000000000102', 'quantity', 2)) $$,
  'Reservations can commit available category quantity'
);

select is(
  (select free from category_availability(
    'e2600000-0000-4000-8000-000000000102', '2035-04-12 15:00:00+00', '2035-04-12 16:00:00+00', null
  )),
  1,
  'quantity commitments lower availability for the same interval'
);

select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Quantity overcommit', 'people_count', 2, 'date', '2035-04-12', 'time', '09:00', 'duration_minutes', 60, 'category_id', 'e2600000-0000-4000-8000-000000000102', 'quantity', 2)) $$,
  'P0001', 'Insufficient equipment availability',
  'the reservation RPC rejects a quantity greater than remaining stock'
);

select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES07 Overdue dispatch', 'people_count', 2, 'date', '2035-04-12', 'time', '09:00', 'duration_minutes', 60, 'unit_id', 'e2600000-0000-4000-8000-000000000201')) $$,
  'Reservations can commit a concrete unit'
);

update reservations
set status = 'dispatched',
    dispatched_at = '2035-04-12 15:00:00+00'
where customer_name = 'RES07 Overdue dispatch';

insert into reservation_dispatches
  (reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
select id, 'e2600000-0000-4000-8000-000000000101', '2035-04-12 15:00:00+00', 60,
       'e2600000-0000-4000-8000-000000000001', 'e2600000-0000-4000-8000-000000000001'
from reservations
where customer_name = 'RES07 Overdue dispatch';

update reservation_items ri
set dispatch_id = rd.id
from reservation_dispatches rd
where rd.reservation_id = ri.reservation_id
  and ri.unit_id = 'e2600000-0000-4000-8000-000000000201';

select is(
  (select count(*)::integer from unit_conflicts(
    'e2600000-0000-4000-8000-000000000201', '2035-04-13 15:00:00+00', '2035-04-13 16:00:00+00', null
  )),
  1,
  'an overdue open dispatch continues to conflict with future reservations'
);

select is(
  (select free from category_availability(
    'e2600000-0000-4000-8000-000000000101', '2035-04-13 15:00:00+00', '2035-04-13 16:00:00+00', null
  )),
  0,
  'category availability excludes an overdue open dispatch'
);

update reservation_dispatches
set closed_at = '2035-04-13 14:00:00+00'
where reservation_id = (
  select id from reservations
  where customer_name = 'RES07 Overdue dispatch'
);

select is(
  (select count(*)::integer from unit_conflicts(
    'e2600000-0000-4000-8000-000000000201', '2035-04-13 15:00:00+00', '2035-04-13 16:00:00+00', null
  )),
  0,
  'closing an overdue dispatch releases its unit after actual return'
);

select is(
  (select free from category_availability(
    'e2600000-0000-4000-8000-000000000101', '2035-04-13 15:00:00+00', '2035-04-13 16:00:00+00', null
  )),
  1,
  'category availability returns the unit after its actual return'
);

reset role;
select * from finish();
rollback;
