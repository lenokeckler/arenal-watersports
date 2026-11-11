begin;
select plan(6);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'no-area@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones'),
  ('44444444-4444-4444-4444-444444444444', 'no-area', 'No Area', 'reservas');
delete from worker_areas
where worker_id = '44444444-4444-4444-4444-444444444444';

insert into equipment_categories
  (id, name, tracking_mode, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Quantity gear', 'by_quantity',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Fully dispatched', 1, 'rental', '2026-09-05 06:00:00+00', 60, 'dispatched',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Pending one', 1, 'rental', '2026-09-05 07:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'Pending two', 1, 'rental', '2026-09-05 08:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'Pending three', 1, 'rental', '2026-09-05 09:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000005', 'Pending four', 1, 'rental', '2026-09-05 10:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items
  (reservation_id, category_id, quantity, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_dispatches
  (reservation_id, category_id, dispatched_at, duration_minutes, closed_at,
   created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000002',
   '2026-09-05 06:00:00+00', 60, '2026-09-05 07:00:00+00',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is(
  (select count(*)::int from pending_dispatch_reservations(
    '2026-09-05 06:00:00+00', '2026-09-06 06:00:00+00', 2, 0
  )),
  2,
  'paginates eligible reservations after excluding the already dispatched row'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    '2026-09-05 06:00:00+00', '2026-09-06 06:00:00+00', 2, 2
  )),
  2,
  'returns a full second page'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    '2026-09-05 06:00:00+00', '2026-09-06 06:00:00+00', null, null
  )),
  4,
  'uses bounded defaults when page arguments are null'
);
select is(
  (select count(*)::int from (
    select id from pending_dispatch_reservations(
      '2026-09-05 06:00:00+00', '2026-09-06 06:00:00+00', 2, 0
    )
    intersect
    select id from pending_dispatch_reservations(
      '2026-09-05 06:00:00+00', '2026-09-06 06:00:00+00', 2, 2
    )
  ) as duplicate_reservations),
  0,
  'pages do not repeat reservations'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    '2026-09-05 06:00:00+00', '2026-09-06 06:00:00+00'
  )),
  4,
  'operations can read the function result through RLS'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';
select is(
  (select count(*)::int from pending_dispatch_reservations(
    '2026-09-05 06:00:00+00', '2026-09-06 06:00:00+00'
  )),
  0,
  'workers without operations area cannot read the function result'
);

reset role;
select * from finish();
rollback;
