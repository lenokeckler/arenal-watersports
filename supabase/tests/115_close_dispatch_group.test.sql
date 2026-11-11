begin;
select plan(16);

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
  (id, name, tracking_mode, has_motor, usage_metric, consumes_fuel, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Motor gear', 'by_unit', true, 'engine_hours', true,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Plain gear', 'by_unit', false, null, false,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-2', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-3', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', 'P-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update equipment_units set fuel_max = 4, fuel_level = 2, usage_total = 12.5
 where id = 'bbbbbbbb-0000-0000-0000-000000000001';
update equipment_units set fuel_max = 6, fuel_level = 6, usage_total = 20
 where id = 'bbbbbbbb-0000-0000-0000-000000000002';
update equipment_units set fuel_max = 4, fuel_level = 4, usage_total = 5
 where id = 'bbbbbbbb-0000-0000-0000-000000000003';

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Motor', 1, 'rental', '2026-09-06 14:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Both', 1, 'rental', '2026-09-06 14:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select dispatch_reservation_group(
  'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
  '2026-09-06 14:10:00+00', '2026-09-06 15:10:00+00',
  array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
  '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":3,"usage":13},{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":5,"usage":21}]'::jsonb
);
select dispatch_reservation_group(
  'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001',
  '2026-09-06 14:10:00+00', '2026-09-06 15:10:00+00',
  array['bbbbbbbb-0000-0000-0000-000000000003']::uuid[],
  '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000003","fuel":4,"usage":6}]'::jsonb
);
select dispatch_reservation_group(
  'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002',
  '2026-09-06 14:10:00+00', '2026-09-06 15:10:00+00',
  array['bbbbbbbb-0000-0000-0000-000000000004']::uuid[]
);

select is(
  (select string_agg(code || ':' || fuel_out || ':' || usage_out, ',' order by code)
     from dispatch_group_return_units(
       (select id from reservation_dispatches
         where reservation_id = 'dddddddd-0000-0000-0000-000000000001'))),
  'M-1:3:13.00,M-2:5:21.00',
  'the closing shows with which reading each unit went out'
);

select throws_ok(
  $$ select close_dispatch_group(
       (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
       '2026-09-06 14:00:00+00',
       '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":2,"usage":14},{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":4,"usage":22}]'::jsonb) $$,
  '22023',
  null,
  'an arrival before the departure is refused'
);

select throws_ok(
  $$ select close_dispatch_group(
       (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
       '2099-01-01 00:00:00+00',
       '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":2,"usage":14},{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":4,"usage":22}]'::jsonb) $$,
  '22023',
  null,
  'an arrival in the future is refused'
);

select throws_ok(
  $$ select close_dispatch_group(
       (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
       '2026-09-06 15:20:00+00',
       '[]'::jsonb) $$,
  '23514',
  null,
  'a motor group cannot close without the reading of each unit'
);

select throws_ok(
  $$ select close_dispatch_group(
       (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
       '2026-09-06 15:20:00+00',
       '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":2,"usage":12.5},{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":4,"usage":22}]'::jsonb) $$,
  '23514',
  null,
  'the hours at the return cannot be lower than the ones at the departure'
);

select throws_ok(
  $$ select close_dispatch_group(
       (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
       '2026-09-06 15:20:00+00',
       '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":9,"usage":14},{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":4,"usage":22}]'::jsonb) $$,
  '23514',
  null,
  'the fuel cannot be above the gauge of the unit'
);

select close_dispatch_group(
  (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  '2026-09-06 15:20:00+00',
  '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":2,"usage":14.25},{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":4,"usage":22}]'::jsonb
);

select is(
  (select closed_at from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  '2026-09-06 15:20:00+00'::timestamptz,
  'the group closes with its real arrival hour'
);

select is(
  (select string_agg(fuel_in || ':' || usage_in, ',' order by unit_id)
     from reservation_items where reservation_id = 'dddddddd-0000-0000-0000-000000000001' and unit_id is not null),
  '2:14.25,4:22.00',
  'the fuel and the hours of the return are written on each item'
);

select is(
  (select string_agg(fuel_level || ':' || usage_total, ',' order by code)
     from equipment_units where id in ('bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002')),
  '2:14.25,4:22.00',
  'the units keep the last fuel and hours'
);

select is(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  'closed',
  'the reservation closes when its only group comes back'
);

select throws_ok(
  $$ select close_dispatch_group(
       (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
       '2026-09-06 15:30:00+00', '[]'::jsonb) $$,
  '55000',
  null,
  'a group that already came back cannot close again'
);

select close_dispatch_group(
  (select id from reservation_dispatches
    where reservation_id = 'dddddddd-0000-0000-0000-000000000002'
      and category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  '2026-09-06 15:15:00+00',
  '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000003","fuel":1,"usage":7}]'::jsonb
);

select is(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000002'),
  'dispatched',
  'the reservation stays open while a group is still out'
);

select throws_ok(
  $$ select close_dispatch_group(
       (select id from reservation_dispatches
         where reservation_id = 'dddddddd-0000-0000-0000-000000000002'
           and category_id = 'aaaaaaaa-0000-0000-0000-000000000002'),
       '2026-09-06 15:20:00+00',
       '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000004","damage":{"cause":"collision","description":"  "}}]'::jsonb) $$,
  '23514',
  null,
  'a damage report without description is refused'
);

select close_dispatch_group(
  (select id from reservation_dispatches
    where reservation_id = 'dddddddd-0000-0000-0000-000000000002'
      and category_id = 'aaaaaaaa-0000-0000-0000-000000000002'),
  '2026-09-06 15:20:00+00',
  '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000004","damage":{"cause":"collision","description":"Cracked hull","impact_delta":1}}]'::jsonb
);

select is(
  (select count(*)::int || ':' || bool_and(created_by = '22222222-2222-2222-2222-222222222222')::text
     from damage_reports
    where reservation_id = 'dddddddd-0000-0000-0000-000000000002'
      and unit_id = 'bbbbbbbb-0000-0000-0000-000000000004'),
  '1:true',
  'a unit that comes back damaged leaves a damage report in the name of who closed the group'
);

select is(
  (select status::text from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000004')
  || ':' ||
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000002'),
  'damaged:closed',
  'the damaged unit changes its state and the reservation closes with its last group'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ select close_dispatch_group(gen_random_uuid(), '2026-09-06 15:20:00+00', '[]'::jsonb) $$,
  '42501',
  null,
  'a worker without the operations area cannot close a group'
);

select * from finish();
rollback;
