do $$
declare
  v_function record;
begin
  for v_function in
    select p.oid::regprocedure as signature
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.prosecdef
      and 'search_path=public' = any (p.proconfig)
  loop
    execute format(
      'alter function %s set search_path = public, pg_temp',
      v_function.signature
    );
  end loop;
end;
$$;
