create or replace function private.get_reservation_extra_boat(
  p_reservation_id uuid
) returns uuid
language plpgsql security invoker set search_path = public, private
as $$
declare
  selected_unit_id uuid;
  base_unit_count integer;
begin
  select count(*)::integer, (array_agg(item.unit_id))[1]
    into base_unit_count, selected_unit_id
  from reservation_items as item
  where item.reservation_id = p_reservation_id
    and item.unit_id is not null and item.extra_id is null;
  if base_unit_count <> 1 then
    raise exception 'A reservation extra requires one committed boat unit';
  end if;
  perform unit.id
  from equipment_units as unit
  join equipment_categories as category on category.id = unit.category_id
  where unit.id = selected_unit_id and unit.status = 'available'
    and category.status = 'active' and category.is_reservable
  for share of unit, category;
  if not found then raise exception 'The selected boat is not reservable'; end if;
  return selected_unit_id;
end;
$$;

create or replace function private.lock_reservation_extra_inventory(
  p_category_id uuid
) returns void
language plpgsql security invoker set search_path = public, private
as $$
declare
  selected_tracking_mode tracking_mode;
  locked_unit_count integer;
begin
  select category.tracking_mode into selected_tracking_mode
  from equipment_categories as category
  where category.id = p_category_id and category.status = 'active'
  for share;
  if not found then raise exception 'The extra inventory category is inactive'; end if;
  if selected_tracking_mode = 'by_quantity' then
    perform stock.category_id from equipment_stock as stock
    where stock.category_id = p_category_id for update;
    if not found then raise exception 'The extra inventory stock is missing'; end if;
    return;
  end if;
  perform unit.id from equipment_units as unit
  where unit.category_id = p_category_id order by unit.id for share;
  get diagnostics locked_unit_count = row_count;
  if locked_unit_count = 0 then raise exception 'The extra inventory units are missing'; end if;
end;
$$;

revoke all on function private.get_reservation_extra_boat(uuid) from public, anon, authenticated;
revoke all on function private.lock_reservation_extra_inventory(uuid) from public, anon, authenticated;
