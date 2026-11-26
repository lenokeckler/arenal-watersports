begin;
select plan(33);

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
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Motor gear', 'active', 'by_unit', true, 60, true, 'engine_hours', true,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Plain gear', 'active', 'by_unit', true, 60, false, null, false,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-2', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-3', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', 'P-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000002', 'P-2', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000006', 'aaaaaaaa-0000-0000-0000-000000000002', 'P-3', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update equipment_units set fuel_max = 4, fuel_level = 2, usage_total = 12.5
 where id = 'bbbbbbbb-0000-0000-0000-000000000001';
update equipment_units set fuel_max = 4
 where id = 'bbbbbbbb-0000-0000-0000-000000000002';
update equipment_units set fuel_max = 4, fuel_level = 3, usage_total = 20
 where id = 'bbbbbbbb-0000-0000-0000-000000000003';

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Split group', 4, 'rental', now() - interval '20 minutes', 120, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'No gauge', 2, 'rental', now() - interval '20 minutes', 120, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'Expired remainder', 2, 'rental', now() - interval '5 hours', 60, 'dispatched',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'Window over', 2, 'rental', now() - interval '3 hours', 60, 'dispatched',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000005', 'Window open', 2, 'rental', now() - interval '30 minutes', 120, 'dispatched',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, closed_at, created_by, updated_by)
values
  ('cccccccc-0000-0000-0000-000000000003', 'dddddddd-0000-0000-0000-000000000003',
   'aaaaaaaa-0000-0000-0000-000000000002', now() - interval '5 hours', 30, now() - interval '4 hours',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('cccccccc-0000-0000-0000-000000000004', 'dddddddd-0000-0000-0000-000000000004',
   'aaaaaaaa-0000-0000-0000-000000000002', now() - interval '3 hours', 30, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('cccccccc-0000-0000-0000-000000000005', 'dddddddd-0000-0000-0000-000000000005',
   'aaaaaaaa-0000-0000-0000-000000000002', now() - interval '30 minutes', 30, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, unit_id, dispatch_id, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000004', 'bbbbbbbb-0000-0000-0000-000000000005',
   'cccccccc-0000-0000-0000-000000000004',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000005', 'bbbbbbbb-0000-0000-0000-000000000006',
   'cccccccc-0000-0000-0000-000000000005',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      now() - interval '15 minutes', now() + interval '45 minutes',
      array['bbbbbbbb-0000-0000-0000-000000000001']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":3}]'::jsonb,
      7::smallint)$$,
  'one of two committed units can leave now'
);

select is(
  (select radio_channel::int from reservation_dispatches
    where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  7,
  'the dispatch keeps the radio channel'
);

select is(
  (select count(*)::int from reservation_items
    where reservation_id = 'dddddddd-0000-0000-0000-000000000001'
      and unit_id is null and dispatch_id is null and quantity = 1),
  1,
  'the unit that did not leave stays committed as a pending quantity'
);

select is(
  (select fuel_out from reservation_items
    where reservation_id = 'dddddddd-0000-0000-0000-000000000001'
      and unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  3,
  'the departure fuel is the marked level'
);

select is(
  (select fuel_level from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  3,
  'the unit keeps the departure level'
);

select is(
  (select radio_channel::text || ':' || people_count::text || ':' || (dispatch_id is not null)::text
     from board_category_units where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  '7:4:true',
  'the board tells who has the unit out, with how many people and on which channel'
);

select is(
  (select quantity::text || ':' || total_quantity::text
     from pending_dispatch_equipment(array['dddddddd-0000-0000-0000-000000000001']::uuid[])),
  '1:2',
  'the pending equipment says how many are left out of the committed total'
);

select is(
  (select count(*)::int from pending_dispatch_reservations(
    now() - interval '1 day', now() + interval '1 day'
  ) where id = 'dddddddd-0000-0000-0000-000000000001'),
  1,
  'a partly dispatched reservation stays pending while its window lasts'
);

select lives_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      now() - interval '5 minutes', now() + interval '55 minutes',
      array['bbbbbbbb-0000-0000-0000-000000000003']::uuid[])$$,
  'the rest leaves later in its own dispatch while the first group is still out'
);

select is(
  (select fuel_out from reservation_items
    where reservation_id = 'dddddddd-0000-0000-0000-000000000001'
      and unit_id = 'bbbbbbbb-0000-0000-0000-000000000003'),
  3,
  'without a reading the unit leaves with its last known level'
);

select is(
  (select count(*)::int from reservation_dispatches
    where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  2,
  'the reservation has two dispatches of the same category'
);

select is(
  (select count(*)::int from pending_dispatch_reservations(
    now() - interval '1 day', now() + interval '1 day'
  ) where id = 'dddddddd-0000-0000-0000-000000000001'),
  0,
  'once everything left the reservation is no longer pending'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      now(), now() + interval '1 hour',
      array['bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":3}]'::jsonb)$$,
  'P0002',
  'The reservation has no equipment in this category to dispatch',
  'nothing is left to dispatch after both units left'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001',
      now(), now() + interval '1 hour',
      array['bbbbbbbb-0000-0000-0000-000000000002']::uuid[])$$,
  '23514',
  'The readings are not valid for the chosen units',
  'a unit without any known level cannot leave without a marked level'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001',
      now(), now() + interval '1 hour',
      array['bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":2}]'::jsonb,
      100::smallint)$$,
  '22023',
  'The radio channel must be between 1 and 99',
  'a radio channel above 99 is refused'
);

select lives_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001',
      now(), now() + interval '1 hour',
      array['bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":2}]'::jsonb)$$,
  'a unit without a previous level leaves once the level is marked'
);

select is(
  (select radio_channel from reservation_dispatches
    where reservation_id = 'dddddddd-0000-0000-0000-000000000002'),
  null,
  'the radio channel is optional'
);

select lives_ok(
  $$select update_open_dispatch(
      (select id from reservation_dispatches
        where reservation_id = 'dddddddd-0000-0000-0000-000000000002'),
      now() - interval '10 minutes', now() + interval '80 minutes', 12::smallint)$$,
  'an open dispatch can be corrected'
);

select is(
  (select duration_minutes::text || ':' || radio_channel::text
     from reservation_dispatches
    where reservation_id = 'dddddddd-0000-0000-0000-000000000002'),
  '90:12',
  'the correction moves the return with the new times and keeps the new channel'
);

select throws_ok(
  $$select update_open_dispatch(
      (select id from reservation_dispatches
        where reservation_id = 'dddddddd-0000-0000-0000-000000000002'),
      now() + interval '1 hour', now() + interval '2 hours', 12::smallint)$$,
  '22023',
  'The times are not valid',
  'a departure in the future is refused'
);

select throws_ok(
  $$select update_open_dispatch(
      'cccccccc-0000-0000-0000-000000000003',
      now() - interval '6 hours', now() - interval '5 hours', 3::smallint)$$,
  '55000',
  'The group already came back',
  'a dispatch that already came back is not corrected'
);

select throws_ok(
  $$select close_dispatch_group(
      (select id from reservation_dispatches
        where reservation_id = 'dddddddd-0000-0000-0000-000000000001' and radio_channel = 7),
      now(),
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":1,"usage":14,
         "damage":{"cause":"collision","description":"Golpe","impact_delta":1},"impact_count":4}]'::jsonb)$$,
  '23514',
  'The impact count is not valid',
  'a damage report and a new impact count cannot come together'
);

select throws_ok(
  $$select close_dispatch_group(
      (select id from reservation_dispatches
        where reservation_id = 'dddddddd-0000-0000-0000-000000000001' and radio_channel = 7),
      now(),
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":1,"usage":10}]'::jsonb)$$,
  '23514',
  'The readings of the return are not valid',
  'the return reading cannot be below the last known hours'
);

select lives_ok(
  $$select close_dispatch_group(
      (select id from reservation_dispatches
        where reservation_id = 'dddddddd-0000-0000-0000-000000000001' and radio_channel = 7),
      now(),
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":1,"usage":14.5,"impact_count":9}]'::jsonb)$$,
  'a group closes with its fuel, hours and impact count'
);

select is(
  (select fuel_level::text || ':' || usage_total::text || ':' || impact_count::text
     from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  '1:14.50:9',
  'the unit keeps what the closing recorded'
);

select is(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  'dispatched',
  'the reservation stays open while the second group is still out'
);

select lives_ok(
  $$select close_dispatch_group(
      'cccccccc-0000-0000-0000-000000000004', now() - interval '2 hours 30 minutes',
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000005"}]'::jsonb)$$,
  'the last group of a reservation whose window ended closes'
);

select is(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000004'),
  'closed',
  'the pending equipment that never came does not keep an expired reservation open'
);

select lives_ok(
  $$select close_dispatch_group(
      'cccccccc-0000-0000-0000-000000000005', now() - interval '10 minutes',
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000006"}]'::jsonb)$$,
  'the last group closes while its reservation window is still open'
);

select is(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000005'),
  'dispatched',
  'the pending equipment can still arrive, so the reservation stays open'
);

reset role;

select lives_ok(
  $$select close_expired_dispatch_remainders()$$,
  'the sweep runs'
);

select is(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000003'),
  'closed',
  'the sweep closes a reservation whose pending equipment expired and whose groups all came back'
);

select is(
  (select status::text from reservations where id = 'dddddddd-0000-0000-0000-000000000005'),
  'dispatched',
  'the sweep leaves a reservation whose window is still open'
);

select * from finish();
rollback;
