begin;
select plan(9);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, default_duration_minutes, has_motor, usage_metric, consumes_fuel, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Fuel gear', 'active', 'by_unit', true, 60, true, 'engine_hours', true,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, fuel_max, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'F-4', 'available', 4,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'F-6', 'available', 6,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select is(
  (select low_fuel_lines::int from equipment_categories where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  1,
  'a category warns at one line by default'
);

select lives_ok(
  $$update equipment_categories set low_fuel_lines = 4 where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  'the category warning can reach the lines of its smallest gauge'
);

select throws_ok(
  $$update equipment_categories set low_fuel_lines = 5 where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  'The low fuel warning cannot exceed the lines of the gauge',
  'the category warning cannot exceed a unit gauge without its own warning'
);

select throws_ok(
  $$update equipment_categories set low_fuel_lines = 0 where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'the category warning is at least one line'
);

select throws_ok(
  $$update equipment_units set low_fuel_lines = 5 where id = 'bbbbbbbb-0000-0000-0000-000000000001'$$,
  '23514',
  'The low fuel warning cannot exceed the lines of the gauge',
  'a unit warning cannot exceed its own gauge'
);

update equipment_units set low_fuel_lines = 3 where id = 'bbbbbbbb-0000-0000-0000-000000000001';

select lives_ok(
  $$update equipment_categories set low_fuel_lines = 5 where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  'a unit with its own warning does not limit the category warning'
);

select throws_ok(
  $$update equipment_units set fuel_max = 4 where id = 'bbbbbbbb-0000-0000-0000-000000000002'$$,
  '23514',
  'The low fuel warning cannot exceed the lines of the gauge',
  'a gauge cannot shrink below the warning it inherits'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select low_fuel_lines::int from board_category_units where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  3,
  'the board shows the unit warning when it has one'
);

select is(
  (select low_fuel_lines::int from board_category_units where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  5,
  'the board shows the category warning when the unit has none'
);

select * from finish();
rollback;
