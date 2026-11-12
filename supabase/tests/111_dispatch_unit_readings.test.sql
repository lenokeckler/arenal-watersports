begin;
select plan(21);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones');

insert into equipment_categories
  (id, name, tracking_mode, has_motor, usage_metric, consumes_fuel, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Motor gear', 'by_unit', true, 'engine_hours', true,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Plain gear', 'by_unit', false, null, false,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'Quantity gear', 'by_quantity', false, null, false,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'Kilometer gear', 'by_unit', true, 'kilometers', false,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-2', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002', 'P-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000004', 'K-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update equipment_units set fuel_max = 4, fuel_level = 2, usage_total = 12.5
 where id = 'bbbbbbbb-0000-0000-0000-000000000001';
update equipment_units set fuel_max = 6
 where id = 'bbbbbbbb-0000-0000-0000-000000000002';
update equipment_units set usage_total = 100
 where id = 'bbbbbbbb-0000-0000-0000-000000000004';

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Motor', 1, 'rental', '2026-09-06 14:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Plain', 1, 'rental', '2026-09-06 15:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'Quantity', 1, 'rental', '2026-09-06 16:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'Kilometers', 1, 'rental', '2026-09-06 17:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000003', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000004', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select consumes_fuel::text || ':' || usage_metric::text
     from reservation_dispatch_groups('dddddddd-0000-0000-0000-000000000001')),
  'true:engine_hours',
  'the groups tell which readings the category takes'
);

select is(
  (select fuel_max::text || ':' || coalesce(fuel_level::text, 'none') || ':' || usage_total::text
     from dispatch_candidate_units('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001')
    where code = 'M-1'),
  '4:2:12.50',
  'the candidate units carry the gauge size and the last readings'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-06 14:00:00+00', '2026-09-06 15:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[]'::jsonb)$$,
  '23514',
  'The readings are not valid for the chosen units',
  'a motor category cannot leave without its readings'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-06 14:00:00+00', '2026-09-06 15:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":3,"usage":13},
        {"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":7,"usage":1}]'::jsonb)$$,
  '23514',
  'The readings are not valid for the chosen units',
  'fuel above the gauge of its own unit is refused'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-06 14:00:00+00', '2026-09-06 15:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":2.5,"usage":13},
        {"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":3,"usage":1}]'::jsonb)$$,
  '23514',
  'The readings are not valid for the chosen units',
  'a fraction of a line is refused'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-06 14:00:00+00', '2026-09-06 15:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":3,"usage":12},
        {"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":3,"usage":1}]'::jsonb)$$,
  '23514',
  'The readings are not valid for the chosen units',
  'hours below what the unit already has are refused'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-06 14:00:00+00', '2026-09-06 15:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":3,"usage":13},
        {"unit_id":"bbbbbbbb-0000-0000-0000-000000000009","fuel":3,"usage":1}]'::jsonb)$$,
  '23514',
  'The readings must name each chosen unit once',
  'a reading for a unit outside the dispatch is refused'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-06 14:00:00+00', '2026-09-06 15:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":3,"usage":13},
        {"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":3,"usage":14}]'::jsonb)$$,
  '23514',
  'The readings must name each chosen unit once',
  'two readings for the same unit are refused'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-06 14:00:00+00', '2026-09-06 15:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001"}'::jsonb)$$,
  '23514',
  'The readings must be a list',
  'readings that are not a list are refused'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-06 14:00:00+00', '2026-09-06 15:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":"3","usage":13}]'::jsonb)$$,
  '23514',
  'A reading is malformed',
  'a reading with text instead of a number is refused'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002',
      '2026-09-06 15:00:00+00', '2026-09-06 16:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000003']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000003","fuel":3,"usage":1}]'::jsonb)$$,
  '23514',
  'The readings are not valid for the chosen units',
  'a category without motor takes no readings'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000003',
      '2026-09-06 16:00:00+00', '2026-09-06 17:00:00+00',
      '{}'::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":3,"usage":13}]'::jsonb)$$,
  '23514',
  'A category counted by quantity takes no readings',
  'a category counted by quantity takes no readings'
);

select is(
  (select (select count(*) from reservation_dispatches)::text
          || ':' || (select fuel_level::text || '/' || usage_total::text
                       from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001')),
  '0:2/12.50',
  'a refused dispatch writes nothing on the reservation or the unit'
);

select lives_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
      '2026-09-06 14:00:00+00', '2026-09-06 15:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000001","fuel":3,"usage":13.5},
        {"unit_id":"bbbbbbbb-0000-0000-0000-000000000002","fuel":6,"usage":1.25}]'::jsonb)$$,
  'a motor category is dispatched with a reading per unit'
);

select is(
  (select fuel_out::text || ':' || usage_out::text
     from reservation_items where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  '3:13.50',
  'the departure reading is kept on the reservation item'
);

select is(
  (select fuel_level::text || ':' || usage_total::text
     from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  '3:13.50',
  'the unit shows today reading while it is out'
);

select is(
  (select fuel_level::text || ':' || usage_total::text
     from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  '6:1.25',
  'every unit of the dispatch is updated with its own gauge size'
);

select lives_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002',
      '2026-09-06 15:00:00+00', '2026-09-06 16:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000003']::uuid[])$$,
  'a category without motor still dispatches with no readings'
);

select throws_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000004',
      '2026-09-06 17:00:00+00', '2026-09-06 18:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000004']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000004","fuel":2,"usage":100}]'::jsonb)$$,
  '23514',
  'The readings are not valid for the chosen units',
  'fuel is refused for a category that does not consume it'
);

select lives_ok(
  $$select dispatch_reservation_group(
      'dddddddd-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000004',
      '2026-09-06 17:00:00+00', '2026-09-06 18:00:00+00',
      array['bbbbbbbb-0000-0000-0000-000000000004']::uuid[],
      '[{"unit_id":"bbbbbbbb-0000-0000-0000-000000000004","usage":100}]'::jsonb)$$,
  'a reading equal to what the unit already has is accepted'
);

select is(
  (select usage_out::text || ':' || (select usage_total::text from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000004')
     from reservation_items where unit_id = 'bbbbbbbb-0000-0000-0000-000000000004'),
  '100.00:100.00',
  'a kilometer category keeps only its usage reading'
);

select * from finish();
rollback;
