begin;
select plan(1);

select is(
  (select coalesce(string_agg(p.proname, ',' order by p.proname), '')
     from pg_proc p
     join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.prosecdef
      and not exists (
        select 1
        from unnest(coalesce(p.proconfig, '{}')) as setting
        where setting = 'search_path=""'
           or setting ~ '^search_path=.*pg_temp$'
      )),
  '',
  'every function with elevated rights searches the temporary schema last'
);

select * from finish();
rollback;
