begin;
select plan(1);

select ok(
  exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and tablename = 'reservation_dispatches'
  ),
  'reservation dispatches are published for calendar invalidation'
);

select * from finish();
rollback;
