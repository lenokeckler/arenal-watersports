create or replace function guard_group_tracking_mode() returns trigger
language plpgsql as $$
declare
  otro tracking_mode;
begin
  if new.group_name is null then
    return new;
  end if;

  select c.tracking_mode into otro
  from equipment_categories c
  where lower(c.group_name) = lower(new.group_name)
    and c.id <> new.id
  limit 1;

  if otro is not null and otro <> new.tracking_mode then
    raise exception 'Un grupo no mezcla categorias por unidad con categorias por cantidad';
  end if;

  return new;
end $$;
