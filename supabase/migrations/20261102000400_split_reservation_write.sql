create function insert_split_departure(
  p_reservation reservations,
  p_departure jsonb,
  p_window tstzrange
) returns reservations
language plpgsql security invoker set search_path = public
as $$
declare
  authenticated_worker_id uuid := authenticated_reservation_worker();
  inserted reservations;
begin
  insert into reservations (
    customer_name, people_count, type, combo_id, starts_at, duration_minutes,
    status, parent_reservation_id, created_by, updated_by
  ) values (
    p_reservation.customer_name, (p_departure->>'people_count')::integer,
    p_reservation.type, p_reservation.combo_id, lower(p_window),
    p_reservation.duration_minutes, 'scheduled',
    coalesce(p_reservation.parent_reservation_id, p_reservation.id),
    authenticated_worker_id, authenticated_worker_id
  ) returning * into inserted;
  return inserted;
end;
$$;

create function place_split_item(
  p_item_id uuid,
  p_departure_id uuid,
  p_quantity integer
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  authenticated_worker_id uuid := authenticated_reservation_worker();
  item reservation_items;
begin
  select * into item from reservation_items where id = p_item_id for update;
  if not found then
    raise exception 'Split equipment does not belong to the reservation';
  end if;
  if p_quantity = coalesce(item.quantity, 1) then
    update reservation_items
    set reservation_id = p_departure_id, updated_by = authenticated_worker_id
    where id = item.id;
    return;
  end if;
  update reservation_items
  set quantity = item.quantity - p_quantity, updated_by = authenticated_worker_id
  where id = item.id;
  insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by)
  values (p_departure_id, item.category_id, p_quantity, authenticated_worker_id, authenticated_worker_id);
end;
$$;

revoke all on function insert_split_departure(reservations, jsonb, tstzrange) from public, anon;
grant execute on function insert_split_departure(reservations, jsonb, tstzrange) to authenticated;
revoke all on function place_split_item(uuid, uuid, integer) from public, anon;
grant execute on function place_split_item(uuid, uuid, integer) to authenticated;
