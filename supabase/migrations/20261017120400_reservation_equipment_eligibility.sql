create function reservable_equipment_categories()
returns table (id uuid, name text, units_are_interchangeable boolean)
language sql stable security invoker set search_path = public
as $$
  select category.id, category.name, category.units_are_interchangeable
  from equipment_categories as category
  where category.status = 'active' and category.is_reservable
    and case category.tracking_mode
      when 'by_unit' then exists (
        select 1 from equipment_units as unit
        where unit.category_id = category.id and unit.status = 'available'
      )
      when 'by_quantity' then exists (
        select 1 from equipment_stock as stock
        where stock.category_id = category.id and stock.quantity_available > 0
      )
    end
  order by category.name, category.id;
$$;

revoke all on function reservable_equipment_categories() from public, anon;
grant execute on function reservable_equipment_categories() to authenticated;

create function lock_reservable_category(
  p_category_id uuid,
  p_unit_id uuid default null
) returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  category_tracking_mode tracking_mode;
begin
  if auth.uid() is null then
    raise exception 'Authenticated worker is required';
  end if;
  if not (has_area('reservas') or has_area('operaciones') or is_admin()) then
    raise exception 'Equipment reservation access is required';
  end if;
  select category.tracking_mode into category_tracking_mode
  from equipment_categories as category
  where category.id = p_category_id and category.status = 'active'
    and category.is_reservable
  for share;
  if found and category_tracking_mode = 'by_unit' then
    perform unit.id from equipment_units as unit
    where unit.category_id = p_category_id and unit.status = 'available'
      and (p_unit_id is null or unit.id = p_unit_id)
    order by unit.id limit 1 for share;
  elsif found and p_unit_id is null then
    perform stock.category_id from equipment_stock as stock
    where stock.category_id = p_category_id and stock.quantity_available > 0
    for share;
  else
    raise exception 'Equipment category is not available for reservation';
  end if;
  if not found then
    raise exception 'Equipment category is not available for reservation';
  end if;
  return p_category_id;
end;
$$;

revoke all on function lock_reservable_category(uuid, uuid) from public, anon;
grant execute on function lock_reservable_category(uuid, uuid) to authenticated;
