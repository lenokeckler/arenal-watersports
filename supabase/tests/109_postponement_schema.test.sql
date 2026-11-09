begin;
select plan(11);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 120, 'scheduled',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select enum_has_labels(
  'public', 'reservation_postponement_cause', array['heavy_rain', 'storm', 'other'],
  'the cause enum lists the three allowed causes'
);

select throws_ok(
  $$ insert into reservation_postponements
       (reservation_id, was_dispatched, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', false,
             '2026-09-05 10:00:00+00', '2026-09-06 10:00:00+00') $$,
  '23502', null,
  'a postponement without a cause is not saved'
);

select throws_ok(
  $$ insert into reservation_postponements
       (reservation_id, cause, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', 'storm',
             '2026-09-05 10:00:00+00', '2026-09-06 10:00:00+00') $$,
  '23502', null,
  'a postponement without the dispatched flag is not saved'
);

select throws_ok(
  $$ insert into reservation_postponements
       (reservation_id, cause, was_dispatched, reason, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', 'other', false, '   ',
             '2026-09-05 10:00:00+00', '2026-09-06 10:00:00+00') $$,
  '23514', null,
  'the cause other needs a written reason'
);

select lives_ok(
  $$ insert into reservation_postponements
       (reservation_id, cause, was_dispatched, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', 'heavy_rain', false,
             '2026-09-05 10:00:00+00', '2026-09-06 10:00:00+00') $$,
  'a weather cause is saved without a reason'
);

select lives_ok(
  $$ insert into reservation_postponements
       (reservation_id, cause, was_dispatched, reason, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', 'other', false, 'Cliente enfermo',
             '2026-09-06 10:00:00+00', '2026-09-07 10:00:00+00') $$,
  'the cause other is saved with a reason'
);

select throws_ok(
  $$ insert into reservation_postponements
       (reservation_id, cause, was_dispatched, reason, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', 'other', true, 'Cliente enfermo',
             '2026-09-07 10:00:00+00', '2026-09-08 10:00:00+00') $$,
  '23514', null,
  'a dispatched reservation cannot be postponed for the cause other'
);

select lives_ok(
  $$ insert into reservation_postponements
       (reservation_id, cause, was_dispatched, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', 'storm', true,
             '2026-09-07 10:00:00+00', '2026-09-08 10:00:00+00') $$,
  'a dispatched reservation is postponed for a weather cause'
);

select throws_ok(
  $$ insert into reservation_postponements
       (reservation_id, cause, was_dispatched, reason, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', 'storm', false, 'Lluvia',
             '2026-09-08 10:00:00+00', '2026-09-09 10:00:00+00') $$,
  '23514', null,
  'a weather cause stores no reason'
);

select throws_ok(
  $$ insert into reservation_postponements
       (reservation_id, cause, was_dispatched, reason, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', 'other', false, repeat('a', 301),
             '2026-09-08 10:00:00+00', '2026-09-09 10:00:00+00') $$,
  '23514', null,
  'a reason is at most 300 characters'
);

select is(
  (select count(*)::int from pg_constraint
   where conrelid = 'reservation_postponements'::regclass
     and conname in ('reservation_postponements_other_needs_reason',
                     'reservation_postponements_weather_has_no_reason',
                     'reservation_postponements_reason_length')
     and not convalidated),
  3,
  'the reason checks leave legacy rows alone'
);

select * from finish();
rollback;
