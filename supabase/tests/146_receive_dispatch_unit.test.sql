begin;
select plan(10);

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
  ('dddddddd-0000-0000-0000-000000000001', 'Plain', 2, 'rental', '2026-09-06 14:00:00+00', 60, 'scheduled',
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

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ select receive_dispatch_unit('bbbbbbbb-0000-0000-0000-000000000001', '2026-09-06 15:20:00+00', '{}'::jsonb) $$,
  '42501',
  null,
  'a worker without the operations area cannot receive a unit'
);

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select receive_dispatch_unit('bbbbbbbb-0000-0000-0000-000000000001', '2026-09-06 15:20:00+00', '{}'::jsonb);

select is(
  (select effective_status from unit_current_state where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'available',
  'the received unit is free again'
);

select is(
  (select effective_status from unit_current_state where id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'occupied',
  'the other unit of the group stays out'
);

select is(
  (select count(*)::int from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  2,
  'the received unit moves to its own closed dispatch'
);

select is(
  (select count(*)::int from reservation_dispatches where reservation_id = 'dddddddd-0000-0000-0000-000000000001' and closed_at is null),
  1,
  'the group keeps one open dispatch with the remaining unit'
);

select isnt(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  'closed',
  'the reservation stays open while a unit is still out'
);

select throws_ok(
  $$ select receive_dispatch_unit('bbbbbbbb-0000-0000-0000-000000000001', '2026-09-06 15:25:00+00', '{}'::jsonb) $$,
  '55000',
  null,
  'a unit that is not out cannot be received'
);

select receive_dispatch_unit(
  'bbbbbbbb-0000-0000-0000-000000000002',
  '2026-09-06 15:30:00+00',
  '{"maintenance":true,"damage":{"cause":"other","description":"Broken handle","impact_delta":0}}'::jsonb
);

select is(
  (select status::text from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'in_maintenance',
  'a unit received with damage goes to maintenance'
);

select is(
  (select description from damage_reports where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  'Broken handle',
  'the damage description is kept'
);

select is(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  'closed',
  'the reservation closes when its last unit is received'
);

select * from finish();
rollback;
