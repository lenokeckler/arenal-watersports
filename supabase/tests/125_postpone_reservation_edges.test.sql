begin;
select plan(14);

\ir fixtures/postponement_release.sql.fixture
\ir fixtures/postpone_call.sql.fixture

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, parent_reservation_id, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000701', 'RES20 Late', 2, 'rental', '2020-01-01 15:00:00+00', 60, 'scheduled', null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000702', 'RES20 Combo', 2, 'combo', '2035-05-01 15:00:00+00', 120, 'scheduled', null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000703', 'RES20 Parent', 2, 'rental', '2035-05-02 15:00:00+00', 60, 'scheduled', null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000704', 'RES20 Child', 2, 'rental', '2035-05-02 17:00:00+00', 60, 'scheduled', 'e3300000-0000-4000-8000-000000000703', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000708', 'RES20 Extras', 2, 'rental', '2035-09-01 15:00:00+00', 60, 'scheduled', null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into extras (id, name, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000801', 'RES20 Foto', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into reservation_items (id, reservation_id, extra_id, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000811', 'e3300000-0000-4000-8000-000000000708', 'e3300000-0000-4000-8000-000000000801', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into reservation_guides (reservation_id, worker_id, assigned_by)
values ('e3300000-0000-4000-8000-000000000702', 'e3300000-0000-4000-8000-000000000003', 'e3300000-0000-4000-8000-000000000001');

insert into reservation_items (id, reservation_id, unit_id, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000812', 'e3300000-0000-4000-8000-000000000703', 'e3300000-0000-4000-8000-000000000202', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000701', '2035-01-02', '09:00', 'other', 'Retraso') $$,
  'a late scheduled reservation is postponed to the future'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000702', '2020-01-03', '09:00', 'storm') $$,
  'P0001', 'New start must be later than the current start and now', 'a new start in the past is refused'
);

select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000702', '2035-05-01', '23:30', 'storm') $$,
  'a combo is postponed to 23:30 Costa Rica'
);
select is(
  (select starts_at::text || ' ' || ends_at::text from reservations where id = 'e3300000-0000-4000-8000-000000000702'),
  '2035-05-02 05:30:00+00 2035-05-02 07:30:00+00',
  '23:30 Costa Rica crosses midnight in UTC and the window keeps its length'
);
select is(
  (select count(*) from reservation_guides where reservation_id = 'e3300000-0000-4000-8000-000000000702'),
  1::bigint,
  'guides are still there after the postponement'
);
select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000708', '2035-09-02', '10:00', 'storm') $$,
  'a reservation with an extra is postponed'
);
select is(
  (select count(*) from reservation_items where reservation_id = 'e3300000-0000-4000-8000-000000000708' and extra_id is not null),
  1::bigint,
  'the extra is still there after the postponement'
);
select is(
  (select updated_by::text from reservations where id = 'e3300000-0000-4000-8000-000000000702'),
  'e3300000-0000-4000-8000-000000000002',
  'updated_by on the reservation becomes the caller'
);
select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000702', '2035-05-02', '00:00', 'heavy_rain') $$,
  'a second postponement in a row uses the new updated_at token'
);
select is(pg_temp.cr_start('e3300000-0000-4000-8000-000000000702'), '2035-05-02 00:00:00', 'midnight Costa Rica is stored as such');
select is(
  (select count(*) from reservation_postponements where reservation_id = 'e3300000-0000-4000-8000-000000000702'),
  2::bigint,
  'both postponements left a trace'
);

select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000703', '2035-05-02', '12:00', 'storm') $$,
  'a split parent is postponed'
);
select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000704', '2035-05-03', '12:00', 'storm') $$,
  'a split child is postponed'
);
select is(
  (select parent_reservation_id::text from reservations where id = 'e3300000-0000-4000-8000-000000000704'),
  'e3300000-0000-4000-8000-000000000703',
  'the child keeps its parent'
);

reset role;
select * from finish();
rollback;
