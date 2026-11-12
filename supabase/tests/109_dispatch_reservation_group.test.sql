begin;
select plan(17);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'res', 'Res', 'reservas');

insert into equipment_categories
  (id, name, tracking_mode, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Unit gear', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Quantity gear', 'by_quantity',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'U-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'U-2', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'U-3', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 'U-4', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 'U-5', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update equipment_units
   set status = 'in_maintenance'
 where id = 'bbbbbbbb-0000-0000-0000-000000000004';

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   cancellation_reason, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Quantity of units', 1, 'rental', '2026-09-05 14:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Fixed unit', 1, 'rental', '2026-09-05 15:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'By quantity', 1, 'rental', '2026-09-05 16:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'Cancelled', 1, 'rental', '2026-09-05 17:00:00+00', 60, 'cancelled', 'Cancelled for test',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000005', 'Competing', 1, 'rental', '2026-09-05 14:30:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002', 3,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, unit_id, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000005',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 14:00:00+00', '2026-09-05 15:30:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[])$$,
  '42501',
  'Operations access is required',
  'a worker without the operations area cannot dispatch'
);

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 15:00:00+00', '2026-09-05 14:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[])$$,
  '22023',
  'The return must be after the departure',
  'a return before the departure is refused'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 14:00:00+00', '2026-09-05 15:30:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001']::uuid[])$$,
  '22023',
  'Exactly 2 more units must be chosen',
  'fewer units than committed are refused'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 14:00:00+00', '2026-09-05 15:30:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001']::uuid[])$$,
  '22023',
  'A unit was chosen twice',
  'the same unit twice is refused'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 14:00:00+00', '2026-09-05 15:30:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000004']::uuid[])$$,
  '22023',
  'A chosen unit is not available in this category',
  'a unit in maintenance cannot be chosen'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 14:00:00+00', '2026-09-05 15:30:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001']::uuid[])$$,
  '55000',
  'The reservation cannot be dispatched',
  'a cancelled reservation cannot be dispatched'
);

select lives_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 14:00:00+00', '2026-09-05 15:30:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[])$$,
  'the committed quantity is dispatched with the chosen units'
);

select is(
  (select duration_minutes::text || ':' || created_by::text
     from reservation_dispatches
    where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  '90:22222222-2222-2222-2222-222222222222',
  'the dispatch keeps the real duration and the worker who made it'
);

select is(
  (select count(*)::int from reservation_items
    where reservation_id = 'dddddddd-0000-0000-0000-000000000001'
      and unit_id is not null and dispatch_id is not null
      and category_id is null and quantity is null),
  2,
  'the quantity became the two chosen units inside the dispatch'
);

select is(
  (select count(*)::int from reservation_items
    where reservation_id = 'dddddddd-0000-0000-0000-000000000001'
      and unit_id is null),
  0,
  'no quantity item is left behind'
);

select is(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  'dispatched',
  'the reservation is marked as dispatched'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 14:00:00+00', '2026-09-05 15:30:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[])$$,
  '23505',
  'This category is already dispatched',
  'a retry cannot commit the units twice'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 14:30:00+00', '2026-09-05 15:30:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001']::uuid[])$$,
  '55006',
  'A chosen unit is already out',
  'a unit that is out in another dispatch cannot be chosen'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 15:00:00+00', '2026-09-05 16:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000003']::uuid[])$$,
  '22023',
  'The units already assigned must stay in the dispatch',
  'the unit already assigned to the reservation cannot be swapped out'
);

select lives_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-05 15:00:00+00', '2026-09-05 16:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000005']::uuid[])$$,
  'a reservation with its unit already assigned dispatches it'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002',
      '2026-09-05 16:00:00+00', '2026-09-05 17:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000003']::uuid[])$$,
  '22023',
  'A category counted by quantity takes no units',
  'a category counted by quantity takes no units'
);

select lives_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002',
      '2026-09-05 16:00:00+00', '2026-09-05 17:00:00+00')$$,
  'a category counted by quantity dispatches without units'
);

select * from finish();
rollback;
