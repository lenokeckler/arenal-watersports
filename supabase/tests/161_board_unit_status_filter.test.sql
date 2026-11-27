begin;
select plan(8);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Plain gear', 'active', 'by_unit', true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'P-1', 'in_repair',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'P-2', 'damaged',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'P-3', 'in_maintenance',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 'P-4', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select maintenance_count from board_category_summary where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  2,
  'maintenance count adds the units in maintenance and in repair'
);

select is(
  (select damaged_count from board_category_summary where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  1,
  'damaged count counts the damaged units'
);

select is(
  (select free_count from board_category_summary where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  1,
  'free count stays the available units'
);

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-000000000001', false),
  'changed',
  'a unit in repair returns to service'
);

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-000000000002', false),
  'changed',
  'a damaged unit returns to service'
);

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-000000000003', false),
  'changed',
  'a unit in maintenance still returns to service'
);

select is(
  (select count(*)::integer from equipment_units where status = 'available'),
  4,
  'the four units are available again'
);

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-000000000002', true),
  'changed',
  'a returned unit can go back to maintenance'
);

select * from finish();
rollback;
