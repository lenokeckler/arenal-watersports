begin;
select plan(6);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones');

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
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select dispatch_reservation_group(
  'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
  '2026-09-06 14:10:00+00', '2026-09-06 15:10:00+00',
  array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[]
);

select throws_ok(
  $$ select close_dispatch_group(
       (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
       '2026-09-06 15:20:00+00',
       '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","maintenance":"yes"},{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002"}]'::jsonb) $$,
  '23514',
  null,
  'the maintenance mark must be true or false'
);

select close_dispatch_group(
  (select id from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  '2026-09-06 15:20:00+00',
  '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","maintenance":true},{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","maintenance":false}]'::jsonb
);

select is(
  (select status::text from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'in_maintenance',
  'a unit marked at the return goes to maintenance'
);

select is(
  (select status::text from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'available',
  'a unit not marked stays available'
);

select is(
  (select effective_status from unit_current_state where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'in_maintenance',
  'the unit leaves the availability without being deleted'
);

select is(
  (select count(*)::int from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  1,
  'the unit is not deleted'
);

select is(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  'closed',
  'the group still closes with its reservation'
);

select * from finish();
rollback;
