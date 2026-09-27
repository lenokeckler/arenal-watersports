alter table equipment_categories
  add column group_name text;

update equipment_categories
   set group_name = 'Kayak'
 where name in ('Kayak doble', 'Kayak individual');

create function guard_group_tracking_mode() returns trigger
language plpgsql as $$
declare
  otro tracking_mode;
begin
  if new.group_name is null then
    return new;
  end if;

  select c.tracking_mode into otro
  from equipment_categories c
  where c.group_name = new.group_name
    and c.id <> new.id
  limit 1;

  if otro is not null and otro <> new.tracking_mode then
    raise exception 'Un grupo no mezcla categorias por unidad con categorias por cantidad';
  end if;

  return new;
end $$;

create trigger categories_guard_group_tracking_mode
  before insert or update on equipment_categories
  for each row execute function guard_group_tracking_mode();
