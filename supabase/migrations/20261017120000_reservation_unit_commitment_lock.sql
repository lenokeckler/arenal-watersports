create or replace function lock_reservable_unit(p_unit_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  locked_unit_category_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authenticated worker is required';
  end if;

  if not (has_area('reservas') or is_admin()) then
    raise exception 'Reservations access is required';
  end if;

  select unit.category_id
    into locked_unit_category_id
    from equipment_units as unit
    join equipment_categories as category
      on category.id = unit.category_id
   where unit.id = p_unit_id
     and unit.status = 'available'
     and category.status = 'active'
     and category.is_reservable
     and not category.units_are_interchangeable
   for update of unit;

  return locked_unit_category_id;
end;
$$;

revoke all on function lock_reservable_unit(uuid) from public, anon;
grant execute on function lock_reservable_unit(uuid) to authenticated;
