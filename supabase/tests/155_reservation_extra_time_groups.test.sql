begin;
select plan(9);
\ir fixtures/reservation_extra_time.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3310000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select category_name, planned_returns_at, arrived_at, extended_minutes, extra_minutes
     from reservation_extra_time_groups('e3310000-0000-4000-8000-000000000301') $$,
  $$ values ('RES31 Jet ski', '2035-07-01 16:00:00+00'::timestamptz, '2035-07-01 16:35:30+00'::timestamptz, 0, 35) $$,
  'a group that came back late without notice counts the whole minutes past its planned return'
);

select results_eq(
  $$ select category_name, planned_returns_at, extended_minutes, extra_minutes
     from reservation_extra_time_groups('e3310000-0000-4000-8000-000000000302') $$,
  $$ values ('RES31 Jet ski', '2035-07-02 16:00:00+00'::timestamptz, 0, 0),
            ('RES31 Kayak', '2035-07-02 16:00:00+00'::timestamptz, 30, 30) $$,
  'an extended group counts against its planned duration and the other group stays at zero'
);

select results_eq(
  $$ select category_name, arrived_at, extra_minutes
     from reservation_extra_time_groups('e3310000-0000-4000-8000-000000000303') $$,
  $$ values ('RES31 Jet ski', '2035-07-03 16:15:00+00'::timestamptz, 15),
            ('RES31 Kayak', '2035-07-03 16:20:00+00'::timestamptz, 20) $$,
  'each group counts against its own real arrival, the last unit back closing a received group'
);

select is(
  (select sum(extra_minutes)::integer from reservation_extra_time_groups('e3310000-0000-4000-8000-000000000303')),
  35,
  'the groups add up for the reservation'
);

select results_eq(
  $$ select extra_minutes from reservation_extra_time_groups('e3310000-0000-4000-8000-000000000304') $$,
  $$ values (0) $$,
  'a group back before its planned return has no extra time'
);

select results_eq(
  $$ select arrived_at, extra_minutes from reservation_extra_time_groups('e3310000-0000-4000-8000-000000000305') $$,
  $$ values (null::timestamptz, 0) $$,
  'a group still out has no arrival and no extra time yet'
);

select results_eq(
  $$ select dispatched_at, extra_minutes from reservation_extra_time_groups('e3310000-0000-4000-8000-000000000306') $$,
  $$ values ('2035-07-06 17:00:00+00'::timestamptz, 10) $$,
  'after a postponement only the new departure counts and the interrupted trip adds nothing'
);

select results_eq(
  $$ select extra_minutes from reservation_extra_time_groups('e3310000-0000-4000-8000-000000000308') $$,
  $$ values (20) $$,
  'a split departure counts only the extra time of its own groups'
);

set local request.jwt.claims to '{"sub":"e3310000-0000-4000-8000-000000000002","role":"authenticated"}';

select is_empty(
  $$ select 1 from reservation_extra_time_resolutions $$,
  'operations does not read the extra time resolutions'
);

select * from finish();
rollback;
