begin;
select plan(9);

select set_config('test.day_start', ((date_trunc('day', now() at time zone 'UTC') + interval '30 hours') at time zone 'UTC')::text, true);

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
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Unit gear', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Quantity gear', 'by_quantity',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units
  (id, category_id, code, created_by, updated_by)
values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'UNIT-1',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   cancellation_reason, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Scheduled', 1, 'rental', (current_setting('test.day_start')::timestamptz + interval '28800 seconds'), 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Unit pending', 1, 'rental', (current_setting('test.day_start')::timestamptz + interval '32400 seconds'), 60, 'dispatched', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'Quantity pending', 1, 'rental', (current_setting('test.day_start')::timestamptz + interval '36000 seconds'), 60, 'dispatched', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'Dispatched', 1, 'rental', (current_setting('test.day_start')::timestamptz + interval '39600 seconds'), 60, 'dispatched', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000005', 'Cancelled', 1, 'rental', (current_setting('test.day_start')::timestamptz + interval '43200 seconds'), 60, 'cancelled', 'Cancelled for test',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000006', 'Closed', 1, 'rental', (current_setting('test.day_start')::timestamptz + interval '46800 seconds'), 60, 'closed', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000007', 'Yesterday', 1, 'rental', (current_setting('test.day_start')::timestamptz + interval '-1 seconds'), 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000008', 'Tomorrow', 1, 'rental', (current_setting('test.day_start')::timestamptz + interval '86400 seconds'), 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000009', 'At midnight', 1, 'rental', (current_setting('test.day_start')::timestamptz + interval '0 seconds'), 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000010', 'Other reservation dispatch', 1, 'rental', (current_setting('test.day_start')::timestamptz + interval '50400 seconds'), 60, 'dispatched', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items
  (reservation_id, unit_id, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000001',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items
  (reservation_id, category_id, quantity, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000010', 'aaaaaaaa-0000-0000-0000-000000000002', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, closed_at,
   created_by, updated_by)
values
  ('cccccccc-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000004',
   'aaaaaaaa-0000-0000-0000-000000000002', (current_setting('test.day_start')::timestamptz + interval '39600 seconds'), 60, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update reservation_items
   set dispatch_id = 'cccccccc-0000-0000-0000-000000000001'
 where reservation_id = 'dddddddd-0000-0000-0000-000000000004';

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from pending_dispatch_reservations(
    (current_setting('test.day_start')::timestamptz + interval '0 seconds'), (current_setting('test.day_start')::timestamptz + interval '86400 seconds')
  )),
  5,
  'includes scheduled and dispatched reservations with pending unit or quantity categories'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    (current_setting('test.day_start')::timestamptz + interval '0 seconds'), (current_setting('test.day_start')::timestamptz + interval '86400 seconds')
  ) where id = 'dddddddd-0000-0000-0000-000000000009'),
  1,
  'includes a reservation at the start of the local day'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    (current_setting('test.day_start')::timestamptz + interval '0 seconds'), (current_setting('test.day_start')::timestamptz + interval '86400 seconds')
  ) where id = 'dddddddd-0000-0000-0000-000000000001'),
  1,
  'includes scheduled reservations'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    (current_setting('test.day_start')::timestamptz + interval '0 seconds'), (current_setting('test.day_start')::timestamptz + interval '86400 seconds')
  ) where id = 'dddddddd-0000-0000-0000-000000000002'),
  1,
  'includes dispatched reservations with an undispatched unit category'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    (current_setting('test.day_start')::timestamptz + interval '0 seconds'), (current_setting('test.day_start')::timestamptz + interval '86400 seconds')
  ) where id = 'dddddddd-0000-0000-0000-000000000003'),
  1,
  'includes dispatched reservations with an undispatched quantity category'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    (current_setting('test.day_start')::timestamptz + interval '0 seconds'), (current_setting('test.day_start')::timestamptz + interval '86400 seconds')
  ) where id = 'dddddddd-0000-0000-0000-000000000010'),
  1,
  'does not match a category dispatch belonging to another reservation'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    (current_setting('test.day_start')::timestamptz + interval '0 seconds'), (current_setting('test.day_start')::timestamptz + interval '86400 seconds')
  ) where id = 'dddddddd-0000-0000-0000-000000000004'),
  0,
  'excludes reservations whose dispatched category still has an open dispatch'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    (current_setting('test.day_start')::timestamptz + interval '0 seconds'), (current_setting('test.day_start')::timestamptz + interval '86400 seconds')
  ) where id in (
    'dddddddd-0000-0000-0000-000000000005',
    'dddddddd-0000-0000-0000-000000000006'
  )),
  0,
  'excludes cancelled and closed reservations'
);
select is(
  (select count(*)::int from pending_dispatch_reservations(
    (current_setting('test.day_start')::timestamptz + interval '0 seconds'), (current_setting('test.day_start')::timestamptz + interval '86400 seconds')
  ) where id in (
    'dddddddd-0000-0000-0000-000000000007',
    'dddddddd-0000-0000-0000-000000000008'
  )),
  0,
  'uses the half-open date interval'
);
reset role;
select * from finish();
rollback;
