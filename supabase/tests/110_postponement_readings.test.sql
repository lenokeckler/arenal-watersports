begin;
select plan(8);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'diego@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas'),
  ('44444444-4444-4444-4444-444444444444', 'diego', 'Diego', 'operaciones');

delete from worker_areas
 where worker_id = '44444444-4444-4444-4444-444444444444' and area = 'operaciones';

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes,
   created_by, updated_by)
values ('cccccccc-0000-0000-0000-000000000001', 'Lancha', 'active', 'by_unit', true, false, 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000001', 'LANCHA-1', 'available',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 120, 'scheduled',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

insert into reservation_postponements
  (id, reservation_id, cause, was_dispatched, previous_starts_at, new_starts_at)
values ('eeeeeeee-0000-0000-0000-000000000009', 'dddddddd-0000-0000-0000-000000000001', 'storm', true,
        '2026-09-08 10:00:00+00', '2026-09-09 10:00:00+00');

select lives_ok(
  $$ insert into reservation_postponement_readings
       (id, postponement_id, unit_id, fuel_out, fuel_in, usage_out, usage_in)
     values ('ffffffff-0000-0000-0000-000000000001', 'eeeeeeee-0000-0000-0000-000000000009',
             'bbbbbbbb-0000-0000-0000-000000000001', 4, 1, 100.5, 102.5) $$,
  'reservas records the readings of a returned unit'
);

select is(
  (select created_by from reservation_postponement_readings
   where id = 'ffffffff-0000-0000-0000-000000000001'),
  '33333333-3333-3333-3333-333333333333'::uuid,
  'the database stamps who recorded the readings'
);

select throws_ok(
  $$ insert into reservation_postponement_readings (postponement_id, unit_id)
     values ('eeeeeeee-0000-0000-0000-000000000009', 'bbbbbbbb-0000-0000-0000-000000000001') $$,
  '23505', null,
  'a unit has one reading per postponement'
);

select throws_ok(
  $$ insert into reservation_postponement_readings (postponement_id, unit_id, fuel_in)
     values ('eeeeeeee-0000-0000-0000-000000000009', 'bbbbbbbb-0000-0000-0000-000000000001', -1) $$,
  '23514', null,
  'a negative fuel reading is refused'
);

select throws_ok(
  $$ insert into reservation_postponement_readings (postponement_id, unit_id, usage_out, usage_in)
     values ('eeeeeeee-0000-0000-0000-000000000009', 'bbbbbbbb-0000-0000-0000-000000000001', 100, 99) $$,
  '23514', null,
  'the usage reading cannot go below the dispatch reading'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from reservation_postponement_readings),
  1,
  'operaciones sees the readings'
);

select throws_ok(
  $$ insert into reservation_postponement_readings (postponement_id, unit_id)
     values ('eeeeeeee-0000-0000-0000-000000000009', 'bbbbbbbb-0000-0000-0000-000000000001') $$,
  '42501', null,
  'operaciones does not record postponement readings'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';

select is(
  (select count(*)::int from reservation_postponement_readings),
  0,
  'a worker without an area does not see the readings'
);

reset role;

select * from finish();
rollback;
