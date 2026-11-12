begin;
select plan(10);
\ir fixtures/cancel_dispatched_reservation.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select cancel_reservation(jsonb_build_object(
  'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta', 'cause', 'weather',
  'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305')));
select cancel_reservation(jsonb_build_object(
  'reservation_id', 'e2b10000-0000-4000-8000-000000000301', 'reason', 'Cliente no viene',
  'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000301')));

select is(
  (select count(*) from unit_conflicts('e2b10000-0000-4000-8000-000000000202',
    '2035-05-16 15:10:00+00', '2035-05-16 15:50:00+00')),
  1::bigint,
  'the unit of a cancelled reservation still out is committed over the dispatch window'
);

select is(
  (select count(*) from unit_conflicts('e2b10000-0000-4000-8000-000000000202',
    '2035-06-01 15:00:00+00', '2035-06-01 16:00:00+00')),
  1::bigint,
  'the unit stays committed after the planned end while the group is open'
);

select is(
  (select count(*) from unit_conflicts('e2b10000-0000-4000-8000-000000000202',
    '2035-05-16 15:10:00+00', '2035-05-16 15:50:00+00', 'e2b10000-0000-4000-8000-000000000305')),
  0::bigint,
  'the excluded reservation is not reported'
);

select is(
  (select count(*) from unit_conflicts('e2b10000-0000-4000-8000-000000000201',
    '2035-05-12 15:10:00+00', '2035-05-12 15:50:00+00')),
  0::bigint,
  'a cancelled reservation without a dispatch frees its unit'
);

select is(
  (select committed from category_availability('e2b10000-0000-4000-8000-000000000101',
    '2035-05-16 15:10:00+00', '2035-05-16 15:50:00+00')),
  1,
  'the category counts the unit still out'
);

select is(
  (select committed from category_availability('e2b10000-0000-4000-8000-000000000101',
    '2035-05-12 15:10:00+00', '2035-05-12 15:50:00+00')),
  0,
  'the category does not count a cancelled reservation without a dispatch'
);

select is(
  (select committed from category_availability('e2b10000-0000-4000-8000-000000000101',
    '2035-06-01 15:00:00+00', '2035-06-01 16:00:00+00')),
  1,
  'the category keeps counting an overdue unit while the group is open'
);

select results_eq(
  $$ select reservation_id from reservation_category_conflicts('e2b10000-0000-4000-8000-000000000101',
       '2035-06-01 15:00:00+00', '2035-06-01 16:00:00+00') $$,
  $$ values ('e2b10000-0000-4000-8000-000000000305'::uuid) $$,
  'an overdue open dispatch is still a category conflict'
);

select results_eq(
  $$ select reservation_id from reservation_category_conflicts('e2b10000-0000-4000-8000-000000000101',
       '2035-05-16 15:10:00+00', '2035-05-16 15:50:00+00') $$,
  $$ values ('e2b10000-0000-4000-8000-000000000305'::uuid) $$,
  'the cancelled reservation still out is listed as a category conflict'
);

select is(
  (select count(*) from reservation_category_conflicts('e2b10000-0000-4000-8000-000000000101',
    '2035-05-12 15:10:00+00', '2035-05-12 15:50:00+00')),
  0::bigint,
  'a cancelled reservation without a dispatch is not a category conflict'
);

select * from finish();
rollback;
