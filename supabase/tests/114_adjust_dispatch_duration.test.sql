begin;
select plan(9);

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
  ('dddddddd-0000-0000-0000-000000000001', 'Late', 2, 'rental', '2026-09-07 15:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Early', 2, 'rental', '2026-09-07 16:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select dispatch_reservation_group(
  'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
  '2026-09-07 15:10:00+00', '2026-09-07 16:40:00+00',
  array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[]
);
select dispatch_reservation_group(
  'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002',
  '2026-09-07 16:00:00+00', '2026-09-07 16:30:00+00',
  array['bbbbbbbb-0000-0000-0000-000000000003']::uuid[]
);

select is(
  (select duration_minutes from dispatched_groups_out() where customer_name = 'Late'),
  90,
  'each group lists its current duration'
);

select throws_ok(
  $$ select adjust_dispatch_duration(
       (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'), 0) $$,
  '22023',
  null,
  'a duration under one minute is refused'
);

select adjust_dispatch_duration(
  (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'), 120);

select is(
  (select ends_at from dispatched_groups_out() where customer_name = 'Late'),
  '2026-09-07 17:10:00+00'::timestamptz,
  'extending moves the return hour of that group'
);

select is(
  (select extended_minutes from dispatched_groups_out() where customer_name = 'Late'),
  30,
  'extending leaves a mark with the minutes added over the planned duration'
);

select is(
  (select ends_at from dispatched_groups_out() where customer_name = 'Early'),
  '2026-09-07 16:30:00+00'::timestamptz,
  'the other groups of the day keep their return hour'
);

select adjust_dispatch_duration(
  (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'), 45);

select is(
  (select extended_minutes from dispatched_groups_out() where customer_name = 'Late'),
  0,
  'cutting the duration below the planned one leaves no mark and never goes negative'
);

select is(
  (select updated_by from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  '22222222-2222-2222-2222-222222222222'::uuid,
  'the adjustment is registered in the name of who made it'
);

reset role;
update reservation_dispatches set closed_at = '2026-09-07 16:20:00+00'
  where reservation_id = 'dddddddd-0000-0000-0000-000000000002';
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$ select adjust_dispatch_duration(
       (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000002'), 60) $$,
  '55000',
  null,
  'a group that already came back cannot be adjusted'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ select adjust_dispatch_duration(
       (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'), 60) $$,
  '42501',
  null,
  'a worker without the operations area cannot adjust'
);

select * from finish();
rollback;
