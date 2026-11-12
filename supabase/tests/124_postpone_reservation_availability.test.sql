begin;
select plan(8);

\ir fixtures/postponement_release.sql.fixture
\ir fixtures/postpone_call.sql.fixture
\ir fixtures/postponement_quantity.sql.fixture

insert into reservation_items
  (id, reservation_id, unit_id, category_id, quantity, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000514', 'e3300000-0000-4000-8000-000000000302', 'e3300000-0000-4000-8000-000000000201', null, null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-14', '09:00', 'storm') $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'a unit held by another reservation in the new window refuses the postponement'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-13', '09:00', 'storm') $$,
  'P0001', 'Equipment category quantity is not available for reservation', 'stock committed elsewhere in the new window refuses the postponement'
);
select is(
  (select pg_temp.cr_start('e3300000-0000-4000-8000-000000000302') || ' ' || (select count(*) from reservation_postponements where reservation_id = 'e3300000-0000-4000-8000-000000000302')),
  '2035-04-12 11:00:00 1',
  'a failed availability check leaves the old date and no new trace'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-12', '11:00', 'storm') $$,
  'P0001', 'New start must be later than the current start and now', 'the same start is refused'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-12', '10:00', 'storm') $$,
  'P0001', 'New start must be later than the current start and now', 'an earlier start is refused'
);
select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-13', '23:59', 'storm', null, null, '2035-01-01 00:00:00+00') $$,
  'P0001', 'Reservation changed since the form was loaded', 'availability is not reached with a stale token'
);
select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-12', '11:30', 'storm') $$,
  'overlapping only its own old window is allowed'
);
select is(pg_temp.cr_start('e3300000-0000-4000-8000-000000000302'), '2035-04-12 11:30:00', 'the reservation moved to the free window');

reset role;
select * from finish();
rollback;
