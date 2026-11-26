begin;
select plan(11);

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
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Water gear', 'active', 'by_unit', true, 60, true, 'engine_hours', true,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Land gear', 'active', 'by_unit', true, 60, true, 'kilometers', true,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'Plain gear', 'active', 'by_unit', true, 60, false, null, false,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'W-SOON', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'W-FAR', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002', 'L-SOON', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', 'L-OVER', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000003', 'P-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update equipment_units set usage_total = 95, next_oil_change_at = 100
 where id = 'bbbbbbbb-0000-0000-0000-000000000001';
update equipment_units set usage_total = 50, next_oil_change_at = 100
 where id = 'bbbbbbbb-0000-0000-0000-000000000002';
update equipment_units set usage_total = 2460, next_oil_change_at = 2500
 where id = 'bbbbbbbb-0000-0000-0000-000000000003';
update equipment_units set usage_total = 2510, next_oil_change_at = 2500
 where id = 'bbbbbbbb-0000-0000-0000-000000000004';

select is(oil_warning_margin('kilometers'), 50::numeric, 'the warning margin is 50 for kilometers');
select is(oil_warning_margin('engine_hours'), 10::numeric, 'the warning margin is 10 for engine hours');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select oil_warning from board_category_units where unit_code = 'W-SOON'),
  true,
  'a water unit 5 hours from its oil change shows the warning'
);

select is(
  (select oil_warning from board_category_units where unit_code = 'W-FAR'),
  false,
  'a water unit 50 hours away shows no warning'
);

select is(
  (select oil_warning from board_category_units where unit_code = 'L-SOON'),
  true,
  'a land unit 40 km from its oil change shows the warning'
);

select is(
  (select oil_remaining from board_category_units where unit_code = 'L-OVER'),
  -10::numeric,
  'a unit past its oil change reports a negative remaining'
);

select is(
  (select oil_warning from board_category_units where unit_code = 'P-1'),
  false,
  'a unit with no threshold shows no warning'
);

select is(
  (select string_agg(code, ',' order by oil_remaining / coalesce(oil_warning_margin(usage_metric), 1), code)
     from maintenance_units() where oil_warning),
  'L-OVER,W-SOON,L-SOON',
  'the maintenance list holds the units past or near their oil change, the most urgent first'
);

select is(
  (select count(*)::int from maintenance_units() where code = 'W-FAR'),
  0,
  'a unit far from its oil change is not listed'
);

select register_maintenance_job(
  'bbbbbbbb-0000-0000-0000-000000000004', 'oil_change', '2026-11-19',
  null, null, null, false, 2500);

select is(
  (select next_oil_change_at from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000004'),
  5010::numeric,
  'the next oil change is the accumulated usage plus the interval'
);

select is(
  (select oil_warning from board_category_units where unit_code = 'L-OVER'),
  false,
  'registering the oil change clears the warning'
);

select * from finish();
rollback;
