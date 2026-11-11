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
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_categories
  (id, name, tracking_mode, has_motor, consumes_fuel, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Paddle gear', 'by_unit', false, false,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002', 'K-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-RETIRED', 'decommissioned',
   now(), 'Sold', '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update equipment_units set fuel_max = 4, fuel_level = 1, usage_total = 100, impact_count = 2
 where id = 'bbbbbbbb-0000-0000-0000-000000000001';

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select correct_unit_readings(
  'bbbbbbbb-0000-0000-0000-000000000001', 8, 6, 120.5, 3, 'in_maintenance');

select is(
  (select fuel_max::text || ':' || fuel_level::text || ':' || usage_total::text
          || ':' || impact_count::text || ':' || status::text
     from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  '8:6:120.50:3:in_maintenance',
  'the correction sets the gauge, the hours, the impacts and the status'
);

select is(
  (select created_by from unit_corrections where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  '22222222-2222-2222-2222-222222222222'::uuid,
  'the correction is registered in the name of who made it'
);

select is(
  (select (previous ->> 'fuel_level') || ':' || (previous ->> 'fuel_max')
     from unit_corrections where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  '1:4',
  'the correction keeps what the unit had before'
);

select is(
  (select corrected ->> 'status'
     from unit_corrections where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'in_maintenance',
  'the correction keeps what the unit has now'
);

select is(
  (select count(*)::integer from unit_corrections),
  1,
  'a worker with the operations area reads the corrections'
);

select throws_ok(
  $$ select correct_unit_readings(
       'bbbbbbbb-0000-0000-0000-000000000001', 8, 6, 120.5, 3, 'in_maintenance') $$,
  '23514',
  null,
  'a correction that changes nothing is refused'
);

select throws_ok(
  $$ select correct_unit_readings(
       'bbbbbbbb-0000-0000-0000-000000000001', 4, 5, 120.5, 3, 'available') $$,
  '22023',
  null,
  'the level cannot be above the lines of the gauge'
);

select throws_ok(
  $$ select correct_unit_readings(
       'bbbbbbbb-0000-0000-0000-000000000001', 21, 1, 120.5, 3, 'available') $$,
  '22023',
  null,
  'the gauge cannot have more than twenty lines'
);

select throws_ok(
  $$ select correct_unit_readings(
       'bbbbbbbb-0000-0000-0000-000000000001', 8, 6, -1, 3, 'available') $$,
  '22023',
  null,
  'the usage cannot be negative'
);

select throws_ok(
  $$ select correct_unit_readings(
       'bbbbbbbb-0000-0000-0000-000000000001', 8, 6, 120.555, 3, 'available') $$,
  '22023',
  null,
  'the usage keeps two decimals at most'
);

select throws_ok(
  $$ select correct_unit_readings(
       'bbbbbbbb-0000-0000-0000-000000000001', 8, 6, 120.5, -1, 'available') $$,
  '22023',
  null,
  'the impacts cannot be negative'
);

select throws_ok(
  $$ select correct_unit_readings(
       'bbbbbbbb-0000-0000-0000-000000000001', 8, 6, 120.5, 3, 'decommissioned') $$,
  '22023',
  null,
  'a correction cannot decommission a unit'
);

select throws_ok(
  $$ select correct_unit_readings(
       'bbbbbbbb-0000-0000-0000-000000000002', 8, 6, 120.5, 3, 'available') $$,
  '55000',
  null,
  'a decommissioned unit takes no correction'
);

select throws_ok(
  $$ select correct_unit_readings(
       'bbbbbbbb-0000-0000-0000-000000000003', 4, 2, 10, 0, 'available') $$,
  '55000',
  null,
  'a unit without a motor is not corrected here'
);

select throws_ok(
  $$ select correct_unit_readings(
       'cccccccc-0000-0000-0000-000000000009', 4, 2, 10, 0, 'available') $$,
  'P0002',
  null,
  'a unit that does not exist is refused'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ select correct_unit_readings(
       'bbbbbbbb-0000-0000-0000-000000000001', 8, 7, 120.5, 3, 'available') $$,
  '42501',
  null,
  'a worker without the operations area cannot correct a unit'
);

select * from finish();
rollback;
