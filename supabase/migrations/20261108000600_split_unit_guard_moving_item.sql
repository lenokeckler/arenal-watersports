create function private.unit_conflict_is_moving_item(
  p_conflict_reservation_id uuid,
  p_unit_id uuid,
  p_moving_item_id uuid
) returns boolean
language sql stable security invoker set search_path = public
as $$
  select exists (
    select 1 from reservation_items as moving_item
    where moving_item.id = p_moving_item_id
      and moving_item.reservation_id = p_conflict_reservation_id
  )
  and not exists (
    select 1 from reservation_items as sibling
    where sibling.reservation_id = p_conflict_reservation_id
      and sibling.unit_id = p_unit_id
      and sibling.id is distinct from p_moving_item_id
  );
$$;

create or replace function private.assert_reservation_item_capacity(
  p_item reservation_items,
  p_exclude_item_id uuid
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  committed_category_id uuid := p_item.category_id;
  reservation_starts_at timestamptz;
  reservation_ends_at timestamptz;
begin
  if p_item.unit_id is not null then
    committed_category_id := lock_reservable_unit(p_item.unit_id);
    if committed_category_id is null then
      raise exception 'Equipment category is not available for reservation';
    end if;
  else
    perform lock_reservable_category(committed_category_id, null);
  end if;
  if p_item.unit_id is null then
    perform private.assert_reservation_category_quantity_available(
      committed_category_id, p_item.quantity, p_item.reservation_id,
      p_exclude_item_id
    );
    return;
  end if;
  select reservation.starts_at, reservation.ends_at
    into reservation_starts_at, reservation_ends_at
  from reservations as reservation
  where reservation.id = p_item.reservation_id;
  if exists (
    select 1 from unit_conflicts(
      p_item.unit_id,
      reservation_starts_at,
      reservation_ends_at,
      p_item.reservation_id
    ) as conflict
    where not private.unit_conflict_is_moving_item(
      conflict.reservation_id, p_item.unit_id, p_exclude_item_id
    )
  ) then
    raise exception 'Equipment unit conflicts with another reservation';
  end if;
end;
$$;

revoke all on function private.unit_conflict_is_moving_item(
  uuid, uuid, uuid
) from public;
grant execute on function private.unit_conflict_is_moving_item(
  uuid, uuid, uuid
) to authenticated, service_role;
