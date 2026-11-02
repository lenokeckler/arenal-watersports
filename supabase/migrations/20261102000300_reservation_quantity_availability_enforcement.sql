create or replace function lock_reservable_category(
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
  if not has_area('reservas') then
    raise exception 'Equipment reservation access is required';
  end if;
  category_tracking_mode := private.lock_reservable_category_identity(
    p_category_id, p_unit_id
  );
  perform private.lock_reservable_category_inventory(
    p_category_id, p_unit_id, category_tracking_mode
  );
  return p_category_id;
end;
$$;

create or replace function validate_reservation_equipment_commitment(
  p_category_id uuid,
  p_quantity integer,
  p_unit_id uuid
) returns uuid
language plpgsql set search_path = public
as $$
begin
  if p_unit_id is not null then
    if p_category_id is not null or p_quantity is not null then
      raise exception 'A unit commitment cannot include a category or quantity';
    end if;
    if not exists (
      select 1 from equipment_units as unit
      join equipment_categories as category on category.id = unit.category_id
      where unit.id = p_unit_id
        and category.status = 'active'
        and category.is_reservable
        and category.tracking_mode = 'by_unit'
        and not category.units_are_interchangeable
    ) then
      raise exception 'Equipment unit is not available for reservation';
    end if;
    return lock_reservable_unit(p_unit_id);
  end if;
  if p_category_id is null or p_quantity is null or p_quantity <= 0 then
    raise exception 'A category and positive equipment quantity are required';
  end if;
  perform lock_reservable_category(p_category_id);
  if not exists (
    select 1 from equipment_categories as category
    where category.id = p_category_id
      and (category.tracking_mode = 'by_quantity'
        or category.units_are_interchangeable)
  ) then
    raise exception 'Equipment category is not available for reservation';
  end if;
  return p_category_id;
end;
$$;

create function private.lock_reservable_category_identity(
  p_category_id uuid,
  p_unit_id uuid
) returns tracking_mode
language plpgsql security invoker set search_path = public
as $$
declare
  category_tracking_mode tracking_mode;
  category_is_interchangeable boolean;
begin
  if p_unit_id is null then
    select category.tracking_mode, category.units_are_interchangeable
      into category_tracking_mode, category_is_interchangeable
    from equipment_categories as category
    where category.id = p_category_id and category.status = 'active'
      and category.is_reservable
    for update;
  else
    select category.tracking_mode, category.units_are_interchangeable
      into category_tracking_mode, category_is_interchangeable
    from equipment_categories as category
    where category.id = p_category_id and category.status = 'active'
      and category.is_reservable
    for share;
  end if;
  if not found
    or (category_tracking_mode = 'by_unit' and p_unit_id is null
      and not category_is_interchangeable)
    or (category_tracking_mode = 'by_unit' and p_unit_id is not null
      and category_is_interchangeable)
    or (category_tracking_mode = 'by_quantity' and p_unit_id is not null) then
    raise exception 'Equipment category is not available for reservation';
  end if;
  return category_tracking_mode;
end;
$$;

create function private.lock_reservable_category_inventory(
  p_category_id uuid,
  p_unit_id uuid,
  p_tracking_mode tracking_mode
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_tracking_mode = 'by_unit' then
    if p_unit_id is null then
      perform unit.id from equipment_units as unit
      where unit.category_id = p_category_id and unit.status = 'available'
      order by unit.id for share;
    else
      perform unit.id from equipment_units as unit
      where unit.category_id = p_category_id and unit.status = 'available'
        and unit.id = p_unit_id
      for share;
    end if;
  elsif p_tracking_mode = 'by_quantity' and p_unit_id is null then
    perform stock.category_id from equipment_stock as stock
    where stock.category_id = p_category_id and stock.quantity_available > 0
    for update;
  else
    raise exception 'Equipment category is not available for reservation';
  end if;
  if not found then
    raise exception 'Equipment category is not available for reservation';
  end if;
end;
$$;

revoke all on function private.lock_reservable_category_identity(uuid, uuid)
  from public, anon, authenticated;
revoke all on function private.lock_reservable_category_inventory(
  uuid, uuid, tracking_mode
)
  from public, anon, authenticated;

create or replace function lock_reservable_unit(p_unit_id uuid)
returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  locked_unit_category_id uuid;
begin
  perform require_reservations_access();
  select category.id into locked_unit_category_id
  from equipment_categories as category
  where category.status = 'active'
    and category.is_reservable
    and category.tracking_mode = 'by_unit'
    and exists (
      select 1 from equipment_units as unit
      where unit.id = p_unit_id and unit.category_id = category.id
        and unit.status = 'available'
    )
  for share;
  if not found then
    return null;
  end if;
  select unit.category_id into locked_unit_category_id
  from equipment_units as unit
  where unit.id = p_unit_id and unit.status = 'available'
  for update;
  return locked_unit_category_id;
end;
$$;
