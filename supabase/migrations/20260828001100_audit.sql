create function stamp_audit_fields() returns trigger
language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.created_by := coalesce(auth.uid(), new.created_by);
    new.created_at := now();
  else
    new.created_by := old.created_by;
    new.created_at := old.created_at;
  end if;
  new.updated_by := coalesce(auth.uid(), new.updated_by);
  new.updated_at := now();
  return new;
end $$;

do $$
declare
  table_name text;
begin
  for table_name in
    select c.relname
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind = 'r'
      and exists (select 1 from pg_attribute a
                  where a.attrelid = c.oid and a.attname = 'created_by' and not a.attisdropped)
      and exists (select 1 from pg_attribute a
                  where a.attrelid = c.oid and a.attname = 'updated_by' and not a.attisdropped)
  loop
    execute format(
      'create trigger %I before insert or update on public.%I
       for each row execute function stamp_audit_fields()',
      table_name || '_stamp_audit', table_name
    );
  end loop;
end $$;

create function stamp_created_only() returns trigger
language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.created_by := coalesce(auth.uid(), new.created_by);
    new.created_at := now();
  else
    new.created_by := old.created_by;
    new.created_at := old.created_at;
  end if;
  return new;
end $$;

do $$
declare
  table_name text;
begin
  for table_name in
    select c.relname
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind = 'r'
      and exists (select 1 from pg_attribute a
                  where a.attrelid = c.oid and a.attname = 'created_by' and not a.attisdropped)
      and not exists (select 1 from pg_attribute a
                       where a.attrelid = c.oid and a.attname = 'updated_by' and not a.attisdropped)
      and not exists (select 1 from pg_attribute a
                       where a.attrelid = c.oid and a.attname = 'resolved_by' and not a.attisdropped)
  loop
    execute format(
      'create trigger %I before insert or update on public.%I
       for each row execute function stamp_created_only()',
      table_name || '_stamp_audit', table_name
    );
  end loop;
end $$;

create function stamp_granted() returns trigger
language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.granted_by := coalesce(auth.uid(), new.granted_by);
    new.granted_at := now();
  else
    new.granted_by := old.granted_by;
    new.granted_at := old.granted_at;
  end if;
  return new;
end $$;

do $$
declare
  table_name text;
begin
  for table_name in
    select c.relname
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind = 'r'
      and exists (select 1 from pg_attribute a
                  where a.attrelid = c.oid and a.attname = 'granted_by' and not a.attisdropped)
  loop
    execute format(
      'create trigger %I before insert or update on public.%I
       for each row execute function stamp_granted()',
      table_name || '_stamp_audit', table_name
    );
  end loop;
end $$;

create function stamp_assigned() returns trigger
language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.assigned_by := coalesce(auth.uid(), new.assigned_by);
    new.assigned_at := now();
  else
    new.assigned_by := old.assigned_by;
    new.assigned_at := old.assigned_at;
  end if;
  return new;
end $$;

do $$
declare
  table_name text;
begin
  for table_name in
    select c.relname
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind = 'r'
      and exists (select 1 from pg_attribute a
                  where a.attrelid = c.oid and a.attname = 'assigned_by' and not a.attisdropped)
  loop
    execute format(
      'create trigger %I before insert or update on public.%I
       for each row execute function stamp_assigned()',
      table_name || '_stamp_audit', table_name
    );
  end loop;
end $$;

create function stamp_uploaded() returns trigger
language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.uploaded_by := coalesce(auth.uid(), new.uploaded_by);
    new.uploaded_at := now();
  else
    new.uploaded_by := old.uploaded_by;
    new.uploaded_at := old.uploaded_at;
  end if;
  return new;
end $$;

do $$
declare
  table_name text;
begin
  for table_name in
    select c.relname
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind = 'r'
      and exists (select 1 from pg_attribute a
                  where a.attrelid = c.oid and a.attname = 'uploaded_by' and not a.attisdropped)
  loop
    execute format(
      'create trigger %I before insert or update on public.%I
       for each row execute function stamp_uploaded()',
      table_name || '_stamp_audit', table_name
    );
  end loop;
end $$;

create function stamp_updated_only() returns trigger
language plpgsql as $$
begin
  new.updated_by := coalesce(auth.uid(), new.updated_by);
  new.updated_at := now();
  return new;
end $$;

do $$
declare
  table_name text;
begin
  for table_name in
    select c.relname
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind = 'r'
      and exists (select 1 from pg_attribute a
                  where a.attrelid = c.oid and a.attname = 'updated_by' and not a.attisdropped)
      and not exists (select 1 from pg_attribute a
                       where a.attrelid = c.oid and a.attname = 'created_by' and not a.attisdropped)
  loop
    execute format(
      'create trigger %I before insert or update on public.%I
       for each row execute function stamp_updated_only()',
      table_name || '_stamp_audit', table_name
    );
  end loop;
end $$;

create function stamp_deposit_audit() returns trigger
language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.created_by := coalesce(auth.uid(), new.created_by);
    new.created_at := now();

  else
    new.created_by := old.created_by;
    new.created_at := old.created_at;
    if old.status = 'held' and new.status <> 'held' then
      new.resolved_by := coalesce(auth.uid(), new.resolved_by);
      new.resolved_at := now();
    else
      new.resolved_by := old.resolved_by;
      new.resolved_at := old.resolved_at;
    end if;
  end if;
  return new;
end $$;

create trigger deposits_stamp_audit
  before insert or update on deposits
  for each row execute function stamp_deposit_audit();
