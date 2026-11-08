create function split_movable_items(p_reservation_id uuid)
returns setof reservation_items
language sql stable security invoker set search_path = public
as $$
  select ri.*
  from reservation_items ri
  where ri.reservation_id = p_reservation_id
    and ri.extra_id is null
    and ri.dispatch_id is null
    and (ri.unit_id is not null or ri.category_id is not null);
$$;

create function assert_reservation_splittable(
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
    raise exception 'Only scheduled reservations can be split';
  end if;
  if p_reservation.updated_at is distinct from p_expected_updated_at then
    raise exception 'Reservation changed since the form was loaded';
  end if;
end;
$$;

create function split_item_allocations(p_departures jsonb)
returns table (departure_position integer, item_id uuid, quantity integer)
language sql immutable security invoker set search_path = public
as $$
  select departure.position::integer,
         case when item.value->>'item_id' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
              then (item.value->>'item_id')::uuid end,
         case when item.value->>'quantity' ~ '^[0-9]{1,9}$'
              then (item.value->>'quantity')::integer end
  from jsonb_array_elements(p_departures) with ordinality as departure(value, position)
  cross join lateral jsonb_array_elements(
    case when jsonb_typeof(departure.value->'items') = 'array' then departure.value->'items' else '[]'::jsonb end
  ) as item(value);
$$;

create function assert_split_departures_shape(p_departures jsonb)
returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if jsonb_typeof(p_departures) is distinct from 'array' or jsonb_array_length(p_departures) = 0 then
    raise exception 'A split needs at least one new departure';
  end if;
  if exists (
    select 1 from jsonb_array_elements(p_departures) as departure(value)
    where coalesce(departure.value->>'people_count' !~ '^[1-9][0-9]{0,8}$', true)
  ) then
    raise exception 'Every departure needs at least one person';
  end if;
  if exists (
    select 1 from jsonb_array_elements(p_departures) as departure(value)
    where jsonb_typeof(departure.value->'items') is distinct from 'array'
       or jsonb_array_length(departure.value->'items') = 0
  ) then
    raise exception 'Every departure needs equipment';
  end if;
end;
$$;

create function assert_split_allocations_valid(p_reservation_id uuid, p_departures jsonb)
returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if exists (
    select 1 from split_item_allocations(p_departures) allocation
    where allocation.item_id is null
       or not exists (
         select 1 from split_movable_items(p_reservation_id) movable
         where movable.id = allocation.item_id
       )
  ) then
    raise exception 'Split equipment does not belong to the reservation';
  end if;
  if exists (
    select 1 from split_item_allocations(p_departures) allocation
    where allocation.quantity is null or allocation.quantity < 1
  ) or exists (
    select 1 from split_item_allocations(p_departures) allocation
    group by allocation.departure_position, allocation.item_id
    having count(*) > 1
  ) or exists (
    select 1
    from split_item_allocations(p_departures) allocation
    join split_movable_items(p_reservation_id) movable on movable.id = allocation.item_id
    group by movable.id, movable.quantity
    having sum(allocation.quantity) > coalesce(movable.quantity, 1)
  ) then
    raise exception 'Split equipment quantity is not valid';
  end if;
end;
$$;

create function assert_split_remainder(p_reservation reservations, p_departures jsonb)
returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_reservation.people_count - (
    select coalesce(sum((departure.value->>'people_count')::integer), 0)
    from jsonb_array_elements(p_departures) as departure(value)
  ) < 1 then
    raise exception 'Original reservation must keep at least one person';
  end if;
  if not exists (
    select 1 from split_movable_items(p_reservation.id) movable
    where coalesce(movable.quantity, 1) - coalesce((
      select sum(allocation.quantity)
      from split_item_allocations(p_departures) allocation
      where allocation.item_id = movable.id
    ), 0) > 0
  ) then
    raise exception 'Original reservation must keep equipment';
  end if;
end;
$$;

revoke all on function split_movable_items(uuid) from public, anon;
grant execute on function split_movable_items(uuid) to authenticated;
revoke all on function assert_reservation_splittable(reservations, timestamptz) from public, anon;
grant execute on function assert_reservation_splittable(reservations, timestamptz) to authenticated;
revoke all on function split_item_allocations(jsonb) from public, anon;
grant execute on function split_item_allocations(jsonb) to authenticated;
revoke all on function assert_split_departures_shape(jsonb) from public, anon;
grant execute on function assert_split_departures_shape(jsonb) to authenticated;
revoke all on function assert_split_allocations_valid(uuid, jsonb) from public, anon;
grant execute on function assert_split_allocations_valid(uuid, jsonb) to authenticated;
revoke all on function assert_split_remainder(reservations, jsonb) from public, anon;
grant execute on function assert_split_remainder(reservations, jsonb) to authenticated;
