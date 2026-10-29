create or replace function private.assert_reservation_extra_inventory_capacity(
  p_reservation_id uuid,
  p_reservation_item_id uuid,
  p_category_id uuid,
  p_quantity integer
) returns void
language plpgsql security definer set search_path = public, private
as $$
declare
  selected_tracking_mode tracking_mode;
  selected_start timestamptz;
  selected_end timestamptz;
  available_quantity integer;
  reservation_quantity integer;
begin
  select category.tracking_mode into selected_tracking_mode
  from equipment_categories as category
  where category.id = p_category_id and category.status = 'active'
  for share;
  if not found then
    raise exception 'The extra inventory category is inactive';
  end if;

  if selected_tracking_mode = 'by_quantity' then
    perform stock.category_id
    from equipment_stock as stock
    where stock.category_id = p_category_id
    for update;
    if not found then
      raise exception 'The extra inventory stock is missing';
    end if;
  else
    perform unit.id
    from equipment_units as unit
    where unit.category_id = p_category_id
    order by unit.id
    for update;
    if not found then
      raise exception 'The extra inventory units are missing';
    end if;
  end if;

  select reservation.starts_at, reservation.ends_at
  into strict selected_start, selected_end
  from reservations as reservation
  where reservation.id = p_reservation_id;

  select availability.free
  into available_quantity
  from category_availability(
    p_category_id,
    selected_start,
    selected_end,
    p_reservation_id
  ) as availability;

  select coalesce(sum(coalesce(item.quantity, 1)), 0)::integer
  into reservation_quantity
  from reservation_items as item
  left join equipment_units as unit on unit.id = item.unit_id
  where item.reservation_id = p_reservation_id
    and item.id is distinct from p_reservation_item_id
    and coalesce(item.category_id, unit.category_id) = p_category_id;

  if available_quantity is null
    or available_quantity < reservation_quantity + p_quantity then
    raise exception 'Reservation extra exceeds available inventory capacity';
  end if;
end;
$$;

revoke all on function private.assert_reservation_extra_inventory_capacity(uuid, uuid, uuid, integer) from public, anon, authenticated;

create or replace function private.validate_reservation_extra_item(
  p_item reservation_items
) returns void
language plpgsql security definer set search_path = public, private
as $$
declare
  selected_unit_id uuid;
  selected_category_id uuid;
  selected_quantity integer;
begin
  perform private.assert_reservation_extra_context(p_item);
  selected_unit_id := private.get_reservation_extra_boat(p_item.reservation_id);
  perform 1 from extras as extra
  where extra.id = p_item.extra_id and extra.status = 'active' for share;
  if not found then raise exception 'Reservation extra is inactive'; end if;
  perform 1 from extra_compatibility as compatibility
  where compatibility.extra_id = p_item.extra_id
    and compatibility.unit_id = selected_unit_id for key share;
  if not found then raise exception 'Reservation extra is incompatible with the selected boat'; end if;
  select extra.occupies_category_id, extra.occupies_quantity
    into selected_category_id, selected_quantity
  from extras as extra where extra.id = p_item.extra_id;
  if selected_category_id is null then
    if p_item.category_id is not null or p_item.quantity is not null then
      raise exception 'Charge-only extras cannot commit inventory';
    end if;
    return;
  end if;
  if p_item.category_id is distinct from selected_category_id
    or p_item.quantity is distinct from selected_quantity then
    raise exception 'Reservation extra inventory does not match its catalog';
  end if;
  perform private.assert_reservation_extra_inventory_capacity(
    p_item.reservation_id,
    p_item.id,
    selected_category_id,
    selected_quantity
  );
end;
$$;

revoke all on function private.validate_reservation_extra_item(reservation_items) from public, anon;
grant execute on function private.validate_reservation_extra_item(reservation_items) to authenticated;
