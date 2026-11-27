begin;
select plan(1);

select ok(
  exists (
    select 1
    from pg_proc p
    cross join unnest(coalesce(p.proconfig, '{}')) as setting
    where p.oid = 'public.record_reservation_extra_time(jsonb)'::regprocedure
      and setting ~ '^search_path=.*pg_temp$'
  ),
  'recording extra time searches the temporary schema last'
);

select * from finish();
rollback;
