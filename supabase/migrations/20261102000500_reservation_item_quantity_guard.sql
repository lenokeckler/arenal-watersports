create function private.is_reservation_item_quantity_reduction(
  p_new_item reservation_items,
  p_old_item reservation_items
) returns boolean
language plpgsql security invoker set search_path = public
as $$
begin
  if p_new_item.unit_id is not null
    or p_new_item.category_id is null
    or p_new_item.category_id is distinct from p_old_item.category_id
    or p_new_item.reservation_id is distinct from p_old_item.reservation_id
    or p_new_item.quantity >= p_old_item.quantity
    or not exists (
      select 1 from reservations
      where id = p_new_item.reservation_id and status = 'scheduled'
    ) then
    return false;
  end if;
  if auth.uid() is null then
    raise exception 'Authenticated worker is required';
  end if;
  if not has_area('reservas') then
    raise exception 'Equipment reservation access is required';
  end if;
  return true;
end;
$$;

create function private.validate_operations_reservation_item(
  p_item reservation_items
) returns boolean
language plpgsql security invoker set search_path = public
as $$
begin
  if not has_area('operaciones') or has_area('reservas') then
    return false;
  end if;
  if p_item.unit_id is null then
    return true;
  end if;
  perform unit.id
  from equipment_units as unit
  where unit.id = p_item.unit_id and unit.status = 'available';
  if not found then
    raise exception 'Equipment category is not available for reservation';
  end if;
  return true;
end;
$$;

revoke all on function private.is_reservation_item_quantity_reduction(
  reservation_items, reservation_items
) from public;
grant execute on function private.is_reservation_item_quantity_reduction(
  reservation_items, reservation_items
) to authenticated, service_role;
revoke all on function private.validate_operations_reservation_item(
  reservation_items
) from public;
grant execute on function private.validate_operations_reservation_item(
  reservation_items
) to authenticated, service_role;
create function private.assert_reservation_item_capacity(
  p_item reservation_items,
  p_exclude_item_id uuid
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  committed_category_id uuid := p_item.category_id;
begin
  if p_item.unit_id is not null then
    select category_id into committed_category_id
    from equipment_units where id = p_item.unit_id;
  end if;
  perform lock_reservable_category(committed_category_id, p_item.unit_id);
  if p_item.unit_id is null then
    perform private.assert_reservation_category_quantity_available(
      committed_category_id, p_item.quantity, p_item.reservation_id,
      p_exclude_item_id
    );
  end if;
end;
$$;

revoke all on function private.assert_reservation_item_capacity(
  reservation_items, uuid
) from public;
grant execute on function private.assert_reservation_item_capacity(
  reservation_items, uuid
) to authenticated, service_role;
