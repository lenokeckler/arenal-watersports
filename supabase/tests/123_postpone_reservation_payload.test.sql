begin;
select plan(18);

\ir fixtures/postponement_release.sql.fixture
\ir fixtures/postpone_call.sql.fixture

create function pg_temp.payload(p_patch jsonb) returns text language sql as $$
  select postpone_reservation(jsonb_build_object(
    'reservation_id', 'e3300000-0000-4000-8000-000000000302', 'date', '2035-04-13', 'time', '09:30', 'cause', 'storm'
  ) || p_patch)::text
$$;

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok($$ select postpone_reservation('[]'::jsonb) $$, 'P0001', 'Reservation payload must be an object', 'an array payload is refused');
select throws_ok($$ select postpone_reservation('null'::jsonb) $$, 'P0001', 'Reservation payload must be an object', 'a json null payload is refused');
select throws_ok($$ select postpone_reservation(null) $$, 'P0001', 'Reservation payload must be an object', 'a missing payload is refused');
select throws_ok($$ select pg_temp.payload('{"reservation_id":"nope"}') $$, 'P0001', 'Reservation payload is invalid', 'a malformed id is a domain error');
select throws_ok($$ select pg_temp.payload('{"reservation_id":7}') $$, 'P0001', 'Reservation payload is invalid', 'a numeric id is a domain error');
select throws_ok($$ select pg_temp.payload('{"date":"2035-13-45"}') $$, 'P0001', 'Reservation payload is invalid', 'an impossible date is a domain error');
select throws_ok($$ select pg_temp.payload('{"date":"13/04/2035"}') $$, 'P0001', 'Reservation payload is invalid', 'a badly formatted date is a domain error');
select throws_ok($$ select pg_temp.payload('{"time":"25:99"}') $$, 'P0001', 'Reservation payload is invalid', 'an impossible time is a domain error');
select throws_ok($$ select pg_temp.payload('{"cause":"flood"}') $$, 'P0001', 'Reservation payload is invalid', 'an unknown cause is a domain error');
select throws_ok($$ select pg_temp.payload('{"expected_updated_at":"not-a-date"}') $$, 'P0001', 'Reservation payload is invalid', 'a malformed token is a domain error');
select throws_ok($$ select pg_temp.payload('{"expected_updated_at":"2035-01-01 00:00:00+99:99"}') $$, 'P0001', 'Reservation payload is invalid', 'an out-of-range time zone offset is a domain error');
select throws_ok($$ select pg_temp.payload('{"expected_updated_at":"2035-01-01 00:00:00 Foo/Bar"}') $$, 'P0001', 'Reservation payload is invalid', 'an unknown time zone name is a domain error');
select throws_ok($$ select pg_temp.payload('{"reason":["x"]}') $$, 'P0001', 'Reservation payload is invalid', 'a non-text reason is a domain error');
select throws_ok(
  $$ select pg_temp.payload(jsonb_build_object('cause', 'other', 'reason', repeat('x', 301))) $$,
  'P0001', 'Postponement reason is too long', 'a reason over 300 characters is a domain error'
);
select is(pg_temp.cr_start('e3300000-0000-4000-8000-000000000302'), '2035-04-12 11:00:00', 'malformed payloads change nothing');
select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-13', '09:30', 'storm', repeat('x', 301)) $$,
  'a weather cause ignores the length of its reason'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000003","role":"authenticated"}';

select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-13', '09:30', 'storm') $$,
  'P0001', 'Reservations access is required', 'an Operaciones-only worker cannot postpone'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"00000000-0000-4000-8000-000000000999","role":"authenticated"}';

select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-13', '09:30', 'storm') $$,
  'P0001', 'Reservations access is required', 'a caller with no worker row is refused'
);

reset role;
select * from finish();
rollback;
