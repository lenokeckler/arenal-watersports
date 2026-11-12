create function assert_reservation_modifiable(
  p_reservation reservations,
  p_expected_updated_at timestamptz
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_reservation.id is null then
    raise exception 'Reservation was not found';
  end if;
  if p_reservation.status <> 'scheduled' then
    raise exception 'Only scheduled reservations can be modified';
  end if;
  if p_reservation.updated_at is distinct from p_expected_updated_at then
    raise exception 'Reservation changed since the form was loaded';
  end if;
end;
$$;

create function reservation_equipment_differs(
  p_reservation_id uuid,
  p_category_id uuid,
  p_quantity integer,
  p_unit_id uuid
) returns boolean
language sql stable security invoker set search_path = public
as $$
  select not exists (
    select 1 from reservation_items as item
    where item.reservation_id = p_reservation_id
      and item.extra_id is null and item.dispatch_id is null
      and item.category_id is not distinct from p_category_id
      and item.quantity is not distinct from p_quantity
      and item.unit_id is not distinct from p_unit_id
  );
$$;

create function assert_reservation_equipment_editable(
  p_reservation_id uuid,
  p_reservation_type reservation_type
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_reservation_type = 'combo' then
    raise exception 'Combo equipment cannot be changed';
  end if;
  if (
    select count(*) from reservation_items as item
    where item.reservation_id = p_reservation_id
      and item.extra_id is null and item.dispatch_id is null
  ) <> 1 then
    raise exception 'Reservation with several equipment items cannot change equipment';
  end if;
end;
$$;

create function replace_reservation_equipment(
  p_reservation reservations,
  p_category_id uuid,
  p_quantity integer,
  p_unit_id uuid
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  is_quantity_decrease boolean;
begin
  perform assert_reservation_equipment_editable(p_reservation.id, p_reservation.type);
  is_quantity_decrease := p_unit_id is null and p_quantity > 0 and exists (
    select 1 from reservation_items as item
    where item.reservation_id = p_reservation.id
      and item.extra_id is null and item.dispatch_id is null
      and item.category_id = p_category_id and item.quantity > p_quantity
  );
  if not is_quantity_decrease then
    if validate_reservation_equipment_commitment(p_category_id, p_quantity, p_unit_id) is null then
      raise exception 'Equipment unit is not available for reservation';
    end if;
  end if;
  update reservation_items
  set unit_id = p_unit_id, category_id = p_category_id, quantity = p_quantity
  where reservation_id = p_reservation.id and extra_id is null and dispatch_id is null;
end;
$$;

create function assert_reservation_units_available(
  p_reservation_id uuid,
  p_reservation_window tstzrange
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  committed_unit_id uuid;
begin
  for committed_unit_id in
    select distinct item.unit_id from reservation_items as item
    where item.reservation_id = p_reservation_id and item.unit_id is not null
    order by item.unit_id
  loop
    if lock_reservable_unit(committed_unit_id) is null then
      raise exception 'Equipment unit is not available for reservation';
    end if;
    if exists (
      select 1 from unit_conflicts(
        committed_unit_id,
        lower(p_reservation_window),
        upper(p_reservation_window),
        p_reservation_id
      )
    ) then
      raise exception 'Equipment unit conflicts with another reservation';
    end if;
  end loop;
end;
$$;

revoke all on function assert_reservation_modifiable(reservations, timestamptz) from public, anon;
grant execute on function assert_reservation_modifiable(reservations, timestamptz) to authenticated;
revoke all on function reservation_equipment_differs(uuid, uuid, integer, uuid) from public, anon;
grant execute on function reservation_equipment_differs(uuid, uuid, integer, uuid) to authenticated;
revoke all on function assert_reservation_equipment_editable(uuid, reservation_type) from public, anon;
grant execute on function assert_reservation_equipment_editable(uuid, reservation_type) to authenticated;
revoke all on function replace_reservation_equipment(reservations, uuid, integer, uuid) from public, anon;
grant execute on function replace_reservation_equipment(reservations, uuid, integer, uuid) to authenticated;
revoke all on function assert_reservation_units_available(uuid, tstzrange) from public, anon;
grant execute on function assert_reservation_units_available(uuid, tstzrange) to authenticated;
