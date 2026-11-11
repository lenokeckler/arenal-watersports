begin;
select plan(8);

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
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Gear A', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Gear B', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'A-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'A-2', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002', 'B-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   cancellation_reason, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Quantity', 2, 'rental', '2026-09-07 15:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Mixed', 3, 'rental', '2026-09-07 16:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'Combo', 1, 'combo', '2026-09-07 17:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'Cancelled', 1, 'rental', '2026-09-07 18:00:00+00', 60, 'cancelled', 'Cancelled for test',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000005', 'Tomorrow', 1, 'rental', '2026-09-08 15:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000006', 'Other category', 1, 'rental', '2026-09-07 19:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000007', 'Dispatched', 1, 'rental', '2026-09-07 20:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000008', 'Edge end', 1, 'rental', '2026-09-08 06:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000009', 'Edge start', 1, 'rental', '2026-09-07 06:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000006', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000007', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000008', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000009', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, unit_id, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000001',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select dispatch_reservation_group(
  'dddddddd-0000-0000-0000-000000000007', 'aaaaaaaa-0000-0000-0000-000000000001',
  '2026-09-07 20:00:00+00', '2026-09-07 21:00:00+00',
  array['bbbbbbbb-0000-0000-0000-000000000002']::uuid[]
);

select is(
  (select string_agg(customer_name, ',' order by starts_at)
     from category_dispatch_reservations(
       'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-07 06:00:00+00', '2026-09-08 06:00:00+00')),
  'Edge start,Quantity,Mixed',
  'the pending reservations of the category are listed by time, the start of the day included'
);

select is(
  (select string_agg(required_count::text, ',' order by starts_at)
     from category_dispatch_reservations(
       'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-07 06:00:00+00', '2026-09-08 06:00:00+00')),
  '1,2,2',
  'each reservation tells how many units of the category it commits, fixed or by quantity'
);

select is(
  (select count(*)::int from category_dispatch_reservations(
     'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-07 06:00:00+00', '2026-09-08 06:00:00+00')
    where customer_name = 'Combo'),
  0,
  'a combo is dispatched from the list of the day, never from a category'
);

select is(
  (select count(*)::int from category_dispatch_reservations(
     'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-07 06:00:00+00', '2026-09-08 06:00:00+00')
    where customer_name = 'Cancelled'),
  0,
  'a cancelled reservation is not listed'
);

select is(
  (select count(*)::int from category_dispatch_reservations(
     'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-07 06:00:00+00', '2026-09-08 06:00:00+00')
    where customer_name in ('Tomorrow', 'Edge end')),
  0,
  'a reservation outside the day is not listed, the end of the day excluded'
);

select is(
  (select count(*)::int from category_dispatch_reservations(
     'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-07 06:00:00+00', '2026-09-08 06:00:00+00')
    where customer_name = 'Dispatched'),
  0,
  'a group that is already dispatched is not listed again'
);

select is(
  (select string_agg(customer_name, ',')
     from category_dispatch_reservations(
       'aaaaaaaa-0000-0000-0000-000000000002', '2026-09-07 06:00:00+00', '2026-09-08 06:00:00+00')),
  'Other category',
  'only the reservations that commit the chosen category are listed'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from category_dispatch_reservations(
     'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-07 06:00:00+00', '2026-09-08 06:00:00+00')),
  0,
  'a worker without the operations area gets nothing'
);

select * from finish();
rollback;
