create or replace function stamp_deposit_audit() returns trigger
language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.created_by := coalesce(auth.uid(), new.created_by);
    new.created_at := now();
    if new.status <> 'held' then
      new.resolved_by := coalesce(auth.uid(), new.resolved_by);
    end if;
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
