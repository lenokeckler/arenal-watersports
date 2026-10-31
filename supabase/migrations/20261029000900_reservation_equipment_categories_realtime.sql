do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'equipment_categories'
  ) then
    alter publication supabase_realtime add table public.equipment_categories;
  end if;
end;
$$;
