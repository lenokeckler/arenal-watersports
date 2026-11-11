create function dispatch_reservation_group(
  p_reservation_id uuid,
  p_category_id uuid,
  p_dispatched_at timestamptz,
  p_returns_at timestamptz,
  p_unit_ids uuid[] default '{}'
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_worker_id uuid := auth.uid();
  v_status reservation_status;
  v_tracking tracking_mode;
  v_selected uuid[] := coalesce(p_unit_ids, '{}');
  v_fixed uuid[];
  v_picks uuid[];
  v_requested integer;
  v_dispatch_id uuid;
  v_item record;
  v_pick_index integer := 1;
  v_unit_id uuid;
begin
  if not has_area('operaciones') then
    raise exception 'Operations access is required' using errcode = '42501';
  end if;

  if p_dispatched_at is null
     or p_returns_at is null
     or p_returns_at <= p_dispatched_at then
    raise exception 'The return must be after the departure' using errcode = '22023';
  end if;

  select status into v_status
  from reservations
  where id = p_reservation_id
  for update;

  if not found then
    raise exception 'Reservation not found' using errcode = 'P0002';
  end if;

  if v_status not in ('scheduled', 'dispatched') then
    raise exception 'The reservation cannot be dispatched' using errcode = '55000';
  end if;

  select tracking_mode into v_tracking
  from equipment_categories
  where id = p_category_id;

  if not found then
    raise exception 'Equipment category not found' using errcode = 'P0002';
  end if;

  if exists (
    select 1
    from reservation_dispatches
    where reservation_id = p_reservation_id
      and category_id = p_category_id
  ) then
    raise exception 'This category is already dispatched' using errcode = '23505';
  end if;

  select coalesce(array_agg(ri.unit_id order by ri.unit_id), '{}')
    into v_fixed
  from reservation_items ri
  join equipment_units eu on eu.id = ri.unit_id
  where ri.reservation_id = p_reservation_id
    and eu.category_id = p_category_id
    and ri.dispatch_id is null;

  select coalesce(sum(quantity), 0)::integer
    into v_requested
  from reservation_items
  where reservation_id = p_reservation_id
    and category_id = p_category_id
    and unit_id is null
    and dispatch_id is null;

  if cardinality(v_fixed) = 0 and v_requested = 0 then
    raise exception 'The reservation has no equipment in this category to dispatch'
      using errcode = 'P0002';
  end if;

  if v_tracking = 'by_quantity' then
    if cardinality(v_selected) <> 0 then
      raise exception 'A category counted by quantity takes no units'
        using errcode = '22023';
    end if;
  else
    if (select count(distinct u) from unnest(v_selected) as u) <> cardinality(v_selected) then
      raise exception 'A unit was chosen twice' using errcode = '22023';
    end if;

    if not (v_fixed <@ v_selected) then
      raise exception 'The units already assigned must stay in the dispatch'
        using errcode = '22023';
    end if;

    v_picks := array(
      select u from unnest(v_selected) as u
      where not (u = any (v_fixed))
      order by u
    );

    if cardinality(v_picks) <> v_requested then
      raise exception 'Exactly % more units must be chosen', v_requested
        using errcode = '22023';
    end if;

    for v_unit_id in select u from unnest(v_selected) as u order by u loop
      perform pg_advisory_xact_lock(hashtextextended(v_unit_id::text, 0));
    end loop;

    if exists (
      select 1
      from unnest(v_selected) as u
      left join equipment_units eu on eu.id = u
      where eu.id is null
         or eu.category_id <> p_category_id
         or eu.status <> 'available'
    ) then
      raise exception 'A chosen unit is not available in this category'
        using errcode = '22023';
    end if;

    if exists (
      select 1
      from reservation_items ri
      join reservation_dispatches rd on rd.id = ri.dispatch_id
      where ri.unit_id = any (v_selected)
        and rd.closed_at is null
    ) then
      raise exception 'A chosen unit is already out' using errcode = '55006';
    end if;
  end if;

  insert into reservation_dispatches (
    reservation_id, category_id, dispatched_at, duration_minutes,
    created_by, updated_by
  ) values (
    p_reservation_id, p_category_id, p_dispatched_at,
    ceil(extract(epoch from (p_returns_at - p_dispatched_at)) / 60)::integer,
    v_worker_id, v_worker_id
  ) returning id into v_dispatch_id;

  update reservation_items
     set dispatch_id = v_dispatch_id,
         updated_by = v_worker_id
   where reservation_id = p_reservation_id
     and dispatch_id is null
     and (
       unit_id = any (v_fixed)
       or (unit_id is null and category_id = p_category_id and v_tracking = 'by_quantity')
     );

  if v_tracking = 'by_unit' then
    for v_item in
      select id, quantity
      from reservation_items
      where reservation_id = p_reservation_id
        and category_id = p_category_id
        and unit_id is null
        and dispatch_id is null
      order by created_at, id
    loop
      update reservation_items
         set unit_id = v_picks[v_pick_index],
             category_id = null,
             quantity = null,
             dispatch_id = v_dispatch_id,
             updated_by = v_worker_id
       where id = v_item.id;
      v_pick_index := v_pick_index + 1;

      for v_unit_id in
        select v_picks[i] from generate_series(v_pick_index, v_pick_index + v_item.quantity - 2) as i
      loop
        insert into reservation_items (
          reservation_id, unit_id, dispatch_id, created_by, updated_by
        ) values (
          p_reservation_id, v_unit_id, v_dispatch_id, v_worker_id, v_worker_id
        );
      end loop;
      v_pick_index := v_pick_index + v_item.quantity - 1;
    end loop;
  end if;

  return v_dispatch_id;
end;
$$;

revoke all on function dispatch_reservation_group(
  uuid, uuid, timestamptz, timestamptz, uuid[]
) from public, anon;
grant execute on function dispatch_reservation_group(
  uuid, uuid, timestamptz, timestamptz, uuid[]
) to authenticated;
