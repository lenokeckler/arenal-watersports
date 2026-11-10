begin;
select plan(17);

\ir fixtures/postponement_release.sql.fixture
\ir fixtures/postpone_call.sql.fixture

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, cancellation_reason, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000303', 'RES20 Closed', 2, 'rental', '2035-04-12 19:00:00+00', 60, 'closed', null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000304', 'RES20 Cancelled', 2, 'rental', '2035-04-12 21:00:00+00', 60, 'cancelled', 'Cliente cancelo', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

create temp table baseline_postponements as select id from reservation_postponements;
grant select on baseline_postponements to authenticated;

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select is(
  pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-13', '09:30', 'heavy_rain'),
  'e3300000-0000-4000-8000-000000000302'::uuid,
  'heavy rain postpones a scheduled reservation and returns its id'
);
select is(pg_temp.cr_start('e3300000-0000-4000-8000-000000000302'), '2035-04-13 09:30:00', 'the new start is read in Costa Rica time');
select is(
  (select status::text || ' ' || duration_minutes || ' ' || (ends_at - starts_at) from reservations where id = 'e3300000-0000-4000-8000-000000000302'),
  'scheduled 60 01:00:00',
  'the reservation stays scheduled and keeps its duration'
);
select is(
  (select concat_ws('/', cause, coalesce(reason, '-'), was_dispatched, previous_starts_at, new_starts_at, created_by)
     from reservation_postponements where reservation_id = 'e3300000-0000-4000-8000-000000000302' and cause = 'heavy_rain'),
  'heavy_rain/-/f/2035-04-12 17:00:00+00/2035-04-13 15:30:00+00/e3300000-0000-4000-8000-000000000002',
  'the trace records cause, no reason, previous and new start and the caller'
);

select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-14', '8:00', 'storm') $$,
  'a storm postpones a scheduled reservation'
);
select is(
  (select concat_ws('/', coalesce(reason, '-'), new_starts_at) from reservation_postponements where reservation_id = 'e3300000-0000-4000-8000-000000000302' and cause = 'storm' and id not in (select id from baseline_postponements)),
  '-/2035-04-14 14:00:00+00',
  'a weather cause stores no reason'
);

select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-15', '10:00', 'other', '  Cliente enfermo  ') $$,
  'another cause postpones with a reason'
);
select is(
  (select reason from reservation_postponements where reservation_id = 'e3300000-0000-4000-8000-000000000302' and cause = 'other'),
  'Cliente enfermo',
  'the trimmed reason is stored'
);

select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-16', '10:00', 'other', '   ') $$,
  'P0001', 'Postponement reason is required', 'another cause needs a reason'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-16', '10:00', 'storm', null, null, '2035-01-01 00:00:00+00') $$,
  'P0001', 'Reservation changed since the form was loaded', 'a stale token is refused'
);
select throws_ok(
  $$ select postpone_reservation('{"reservation_id":"e3300000-0000-4000-8000-0000000009ff","date":"2035-04-16","time":"10:00","cause":"storm"}'::jsonb) $$,
  'P0001', 'Reservation was not found', 'an unknown reservation is refused'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000303', '2035-04-16', '10:00', 'storm') $$,
  'P0001', 'Only scheduled or dispatched reservations can be postponed', 'a closed reservation is refused'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000304', '2035-04-16', '10:00', 'storm') $$,
  'P0001', 'Only scheduled or dispatched reservations can be postponed', 'a cancelled reservation is refused'
);
select is(
  (select string_agg(status::text, ' ' order by id) from reservations where id in ('e3300000-0000-4000-8000-000000000303', 'e3300000-0000-4000-8000-000000000304')),
  'closed cancelled',
  'refused reservations keep their status'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-15', '10:00', 'storm') $$,
  'P0001', 'New start must be later than the current start and now', 'the new start must be later than the current one'
);
select is(
  (select count(*) from reservation_postponements where reservation_id = 'e3300000-0000-4000-8000-000000000302' and id not in (select id from baseline_postponements)),
  3::bigint,
  'only the three successful postponements left a trace'
);
select is(pg_temp.cr_start('e3300000-0000-4000-8000-000000000302'), '2035-04-15 10:00:00', 'refusals leave the last start');

reset role;
select * from finish();
rollback;
