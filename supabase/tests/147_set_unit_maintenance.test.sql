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
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Plain gear', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'P-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'P-2', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Plain', 1, 'rental', '2026-09-06 14:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-000000000001', true),
  'not_allowed',
  'a worker without the operations area cannot change the unit'
);

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-000000000001', true),
  'changed',
  'operations puts an available unit in maintenance'
);

select is(
  (select status::text from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'in_maintenance',
  'the unit is recorded in maintenance'
);

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-000000000001', true),
  'no_change',
  'putting it in maintenance twice changes nothing'
);

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-000000000001', false),
  'changed',
  'operations returns the unit to service'
);

select is(
  (select status::text from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'available',
  'the unit is available again'
);

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-000000000001', false),
  'no_change',
  'returning a unit that is not in maintenance changes nothing'
);

select dispatch_reservation_group(
  'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
  '2026-09-06 14:10:00+00', '2026-09-06 15:10:00+00',
  array['bbbbbbbb-0000-0000-0000-000000000002']::uuid[]
);

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-000000000002', true),
  'occupied',
  'a unit out on the water cannot go to maintenance'
);

select is(
  set_unit_maintenance('bbbbbbbb-0000-0000-0000-0000000000ff', true),
  'not_found',
  'an unknown unit is reported as not found'
);

select * from finish();
rollback;
