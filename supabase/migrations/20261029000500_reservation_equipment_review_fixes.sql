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
  if not (has_area('reservas') or has_area('operaciones')) then
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

create or replace function validate_scheduled_item_equipment()
returns trigger
language plpgsql security invoker set search_path = public
as $$
declare
  committed_category_id uuid := new.category_id;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if tg_op = 'UPDATE' then
    if row(new.reservation_id, new.unit_id, new.category_id, new.quantity)
      is not distinct from
      row(old.reservation_id, old.unit_id, old.category_id, old.quantity) then
      return new;
    end if;
    if new.unit_id is null and new.category_id is not null
      and new.quantity < old.quantity and exists (
        select 1 from reservations
        where id = new.reservation_id and status = 'scheduled'
      ) then
      if auth.uid() is null then
        raise exception 'Authenticated worker is required';
      end if;
      if not (has_area('reservas') or has_area('operaciones')) then
        raise exception 'Equipment reservation access is required';
      end if;
      return new;
    end if;
  end if;
  if new.unit_id is null and new.category_id is null then
    return new;
  end if;
  if not exists (
    select 1 from reservations
    where id = new.reservation_id and status = 'scheduled'
  ) then
    return new;
  end if;
  if new.unit_id is not null then
    select category_id into committed_category_id
    from equipment_units where id = new.unit_id;
  end if;
  perform lock_reservable_category(committed_category_id, new.unit_id);
  return new;
end;
$$;
