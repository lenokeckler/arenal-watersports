create or replace function lock_reservable_category(
  p_category_id uuid,
  p_unit_id uuid default null
) returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  category_tracking_mode tracking_mode;
begin
  perform require_reservations_access();

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
