begin;
select plan(8);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'res', 'Res', 'reservas');

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Gear', 'by_quantity',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, cancellation_reason, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Early', 2, 'rental', now() + interval '1 hour', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Late', 2, 'rental', now() + interval '3 hours', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'Cancelled', 2, 'rental', now() + interval '5 hours', 60, 'cancelled', 'Cancelled for test',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$select set_reservation_dock_notice('dddddddd-0000-0000-0000-000000000002', true)$$,
  'P0001',
  'Reservations access is required',
  'operations cannot send a reservation to the dock'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select lives_ok(
  $$select set_reservation_dock_notice('dddddddd-0000-0000-0000-000000000002', true)$$,
  'reservations sends a reservation to the dock'
);

select throws_ok(
  $$select set_reservation_dock_notice('dddddddd-0000-0000-0000-000000000003', true)$$,
  '55000',
  'The reservation cannot be sent to the dock',
  'a cancelled reservation cannot be sent to the dock'
);

select throws_ok(
  $$select set_reservation_dock_notice('dddddddd-0000-0000-0000-000000000099', true)$$,
  'P0002',
  'Reservation not found',
  'an unknown reservation is refused'
);

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from pending_dispatch_reservations(now(), now() + interval '1 day')),
  2,
  'operations reads the pending list without the cancelled reservation'
);

select is(
  (select customer_name from pending_dispatch_reservations(now(), now() + interval '1 day') limit 1),
  'Late',
  'the reservation sent to the dock comes first even if it starts later'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select lives_ok(
  $$select set_reservation_dock_notice('dddddddd-0000-0000-0000-000000000002', false)$$,
  'reservations takes the notice back'
);

reset role;

select is(
  (select count(*)::int from reservation_dock_notices),
  0,
  'the notice is removed'
);

select * from finish();
rollback;
