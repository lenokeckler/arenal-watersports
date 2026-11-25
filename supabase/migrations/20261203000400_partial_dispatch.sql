drop index reservation_dispatches_one_open_group_per_category;

drop function dispatch_reservation_group(
  uuid, uuid, timestamptz, timestamptz, uuid[], jsonb
);

create function dispatch_reservation_group(
  p_reservation_id uuid,
  p_category_id uuid,
  p_dispatched_at timestamptz,
  p_returns_at timestamptz,
  p_unit_ids uuid[] default '{}',
  p_readings jsonb default '[]'::jsonb,
  p_radio_channel smallint default null
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
  v_readings jsonb := coalesce(p_readings, '[]'::jsonb);
  v_fixed uuid[];
  v_picks uuid[];
  v_requested integer;
  v_minimum_picks integer;
  v_pick_count integer;
  v_pick_index integer := 1;
  v_take integer;
  v_first_new integer;
  v_dispatch_id uuid;
  v_item record;
  v_reading jsonb;
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

  if p_radio_channel is not null and p_radio_channel not between 1 and 99 then
    raise exception 'The radio channel must be between 1 and 99' using errcode = '22023';
  end if;

  if jsonb_typeof(v_readings) <> 'array' then
    raise exception 'The readings must be a list' using errcode = '23514';
  end if;

  for v_reading in select value from jsonb_array_elements(v_readings) loop
    if jsonb_typeof(v_reading) <> 'object'
       or jsonb_typeof(v_reading -> 'unit_id') is distinct from 'string'
       or (v_reading ->> 'unit_id') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
       or coalesce(jsonb_typeof(v_reading -> 'fuel'), 'null') not in ('number', 'null')
       or coalesce(jsonb_typeof(v_reading -> 'usage'), 'null') not in ('number', 'null') then
      raise exception 'A reading is malformed' using errcode = '23514';
    end if;
  end loop;

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

    if jsonb_array_length(v_readings) <> 0 then
      raise exception 'A category counted by quantity takes no readings'
        using errcode = '23514';
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
    v_pick_count := cardinality(v_picks);
    v_minimum_picks := case when cardinality(v_fixed) > 0 then v_requested else 1 end;

    if v_pick_count < v_minimum_picks or v_pick_count > v_requested then
      raise exception 'Between % and % more units must be chosen', v_minimum_picks, v_requested
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

    perform 1
    from equipment_units
    where id = any (v_selected)
    order by id
    for update;

    if (select count(*) from jsonb_array_elements(v_readings))
       <> (select count(distinct r ->> 'unit_id') from jsonb_array_elements(v_readings) as r)
       or exists (
         select 1
         from jsonb_array_elements(v_readings) as r
         where not ((r ->> 'unit_id')::uuid = any (v_selected))
       ) then
      raise exception 'The readings must name each chosen unit at most once'
        using errcode = '23514';
    end if;

    if exists (
      with reading as (
        select (r ->> 'unit_id')::uuid as unit_id,
               (r ->> 'fuel')::numeric as fuel_value,
               (r ->> 'usage')::numeric as usage_value
        from jsonb_array_elements(v_readings) as r
      )
      select 1
      from equipment_units eu
      join equipment_categories ec on ec.id = eu.category_id
      left join reading rd on rd.unit_id = eu.id
      where eu.id = any (v_selected)
        and (
          (ec.consumes_fuel and rd.fuel_value is null and eu.fuel_level is null)
          or (ec.consumes_fuel and rd.fuel_value is not null and (
            rd.fuel_value <> trunc(rd.fuel_value)
            or rd.fuel_value < 0
            or rd.fuel_value > eu.fuel_max
          ))
          or (not ec.consumes_fuel and rd.fuel_value is not null)
          or (ec.usage_metric is not null and rd.usage_value is not null and (
            rd.usage_value < eu.usage_total
            or rd.usage_value > 9999999999.99
            or rd.usage_value <> round(rd.usage_value, 2)
          ))
          or (ec.usage_metric is null and rd.usage_value is not null)
          or (not ec.consumes_fuel and ec.usage_metric is null and rd.unit_id is not null)
        )
    ) then
      raise exception 'The readings are not valid for the chosen units'
        using errcode = '23514';
    end if;
  end if;

  insert into reservation_dispatches (
    reservation_id, category_id, dispatched_at, duration_minutes,
    radio_channel, created_by, updated_by
  ) values (
    p_reservation_id, p_category_id, p_dispatched_at,
    ceil(extract(epoch from (p_returns_at - p_dispatched_at)) / 60)::integer,
    p_radio_channel, v_worker_id, v_worker_id
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
      exit when v_pick_index > v_pick_count;
      v_take := least(v_item.quantity, v_pick_count - v_pick_index + 1);

      if v_take = v_item.quantity then
        update reservation_items
           set unit_id = v_picks[v_pick_index],
               category_id = null,
               quantity = null,
               dispatch_id = v_dispatch_id,
               updated_by = v_worker_id
         where id = v_item.id;
        v_first_new := v_pick_index + 1;
      else
        update reservation_items
           set quantity = v_item.quantity - v_take,
               updated_by = v_worker_id
         where id = v_item.id;
        v_first_new := v_pick_index;
      end if;

      for v_unit_id in
        select v_picks[i] from generate_series(v_first_new, v_pick_index + v_take - 1) as i
      loop
        insert into reservation_items (
          reservation_id, unit_id, dispatch_id, created_by, updated_by
        ) values (
          p_reservation_id, v_unit_id, v_dispatch_id, v_worker_id, v_worker_id
        );
      end loop;
      v_pick_index := v_pick_index + v_take;
    end loop;

    for v_unit_id in select u from unnest(v_selected) as u order by u loop
      select r into v_reading
      from jsonb_array_elements(v_readings) as r
      where (r ->> 'unit_id')::uuid = v_unit_id;

      update reservation_items ri
         set fuel_out = case when ec.consumes_fuel
               then coalesce((v_reading ->> 'fuel')::numeric::integer, eu.fuel_level) end,
             usage_out = case when ec.usage_metric is not null
               then coalesce((v_reading ->> 'usage')::numeric, eu.usage_total) end,
             updated_by = v_worker_id
        from equipment_units eu
        join equipment_categories ec on ec.id = eu.category_id
       where ri.dispatch_id = v_dispatch_id
         and ri.unit_id = v_unit_id
         and eu.id = v_unit_id;

      if v_reading is not null then
        update equipment_units
           set fuel_level = coalesce((v_reading ->> 'fuel')::numeric::integer, fuel_level),
               usage_total = coalesce((v_reading ->> 'usage')::numeric, usage_total),
               updated_by = v_worker_id
         where id = v_unit_id;
      end if;
    end loop;
  end if;

  return v_dispatch_id;
end;
$$;

revoke all on function dispatch_reservation_group(
  uuid, uuid, timestamptz, timestamptz, uuid[], jsonb, smallint
) from public, anon;
grant execute on function dispatch_reservation_group(
  uuid, uuid, timestamptz, timestamptz, uuid[], jsonb, smallint
) to authenticated;

drop function pending_dispatch_reservations(timestamptz, timestamptz, integer, integer);

create function pending_dispatch_reservations(
  p_starts_at timestamptz,
  p_ends_at timestamptz,
  p_limit integer default null,
  p_offset integer default 0
) returns table (
  id uuid,
  code text,
  customer_name text,
  starts_at timestamptz,
  ends_at timestamptz,
  status reservation_status,
  dock_notified_at timestamptz
)
language plpgsql
stable
security invoker
set search_path = public
as $$
declare
  maximum_result_count constant integer := 51;
begin
  return query
    select
      r.id,
      r.code,
      r.customer_name,
      r.starts_at,
      r.ends_at,
      r.status,
      n.notified_at
    from reservations r
    left join reservation_dock_notices n on n.reservation_id = r.id
    where has_area('operaciones')
      and r.starts_at >= p_starts_at
      and r.starts_at < p_ends_at
      and r.status in ('scheduled', 'dispatched')
      and (
        r.status = 'scheduled'
        or (
          r.ends_at > now()
          and exists (
            select 1
            from reservation_items ri
            left join equipment_units eu on eu.id = ri.unit_id
            where ri.reservation_id = r.id
              and ri.dispatch_id is null
              and coalesce(ri.category_id, eu.category_id) is not null
          )
        )
      )
    order by (n.notified_at is null), r.starts_at, r.id
    limit least(
      greatest(coalesce(p_limit, maximum_result_count), 1),
      maximum_result_count
    )
    offset greatest(coalesce(p_offset, 0), 0);
end;
$$;

revoke all on function pending_dispatch_reservations(
  timestamptz, timestamptz, integer, integer
) from public, anon;
grant execute on function pending_dispatch_reservations(
  timestamptz, timestamptz, integer, integer
) to authenticated;

drop function pending_dispatch_equipment(uuid[]);

create function pending_dispatch_equipment(p_reservation_ids uuid[])
returns table (
  reservation_id uuid,
  reservation_type reservation_type,
  category_id uuid,
  category_name text,
  quantity integer,
  total_quantity integer
)
language sql
stable
security invoker
set search_path = public
as $$
  with committed as (
    select ri.reservation_id,
           coalesce(eu.category_id, ri.category_id) as category_id,
           ri.unit_id,
           ri.quantity,
           ri.dispatch_id
    from reservation_items ri
    left join equipment_units eu on eu.id = ri.unit_id
    where ri.reservation_id = any(p_reservation_ids)
  ), grouped as (
    select c.reservation_id,
           c.category_id,
           (
             coalesce(sum(c.quantity) filter (where c.unit_id is null and c.dispatch_id is null), 0)
             + count(*) filter (where c.unit_id is not null and c.dispatch_id is null)
           )::integer as pending_quantity,
           (
             coalesce(sum(c.quantity) filter (where c.unit_id is null), 0)
             + count(*) filter (where c.unit_id is not null)
           )::integer as all_quantity
    from committed c
    group by c.reservation_id, c.category_id
  )
  select g.reservation_id,
         r.type,
         ec.id,
         ec.name,
         g.pending_quantity,
         g.all_quantity
  from grouped g
  join equipment_categories ec on ec.id = g.category_id
  join reservations r on r.id = g.reservation_id
  where has_area('operaciones')
    and r.status in ('scheduled', 'dispatched')
    and g.pending_quantity > 0
  order by g.reservation_id, ec.name;
$$;

revoke all on function pending_dispatch_equipment(uuid[]) from public, anon;
grant execute on function pending_dispatch_equipment(uuid[]) to authenticated;

create or replace function sync_reservation_status_from_dispatches() returns trigger
language plpgsql as $$
declare
  v_reservation_id uuid := coalesce(new.reservation_id, old.reservation_id);
  v_all_groups_closed boolean;
  v_has_undispatched_by_unit_item boolean;
  v_window_ended boolean;
  v_closed_at timestamptz;
begin
  if tg_op = 'INSERT' then
    update reservations
       set status = 'dispatched',
           dispatched_at = coalesce(dispatched_at, new.dispatched_at),
           updated_by = new.created_by
     where id = v_reservation_id
       and status = 'scheduled';
  end if;

  if tg_op = 'UPDATE' and new.closed_at is not null and old.closed_at is null then
    select bool_and(closed_at is not null) into v_all_groups_closed
    from reservation_dispatches
    where reservation_id = v_reservation_id;

    select exists (
      select 1
      from reservation_items ri
      left join equipment_units u on u.id = ri.unit_id
      join equipment_categories ec on ec.id = coalesce(u.category_id, ri.category_id)
      where ri.reservation_id = v_reservation_id
        and ec.tracking_mode = 'by_unit'
        and ri.dispatch_id is null
    ) into v_has_undispatched_by_unit_item;

    select ends_at <= now() into v_window_ended
    from reservations
    where id = v_reservation_id;

    if v_all_groups_closed and (not v_has_undispatched_by_unit_item or v_window_ended) then
      select max(closed_at) into v_closed_at
      from reservation_dispatches
      where reservation_id = v_reservation_id;

      update reservations
         set status = 'closed',
             closed_at = v_closed_at,
             updated_by = new.updated_by
       where id = v_reservation_id
         and status = 'dispatched';
    end if;
  end if;

  update reservations r
     set extra_time_minutes = (
           select coalesce(sum(rd.extra_time_minutes), 0)::integer
           from reservation_dispatches rd
           where rd.reservation_id = v_reservation_id
         )
   where r.id = v_reservation_id;

  return new;
end;
$$;

create function close_expired_dispatch_remainders() returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update reservations r
     set status = 'closed',
         closed_at = (
           select max(rd.closed_at)
           from reservation_dispatches rd
           where rd.reservation_id = r.id
         )
   where r.status = 'dispatched'
     and r.ends_at <= now()
     and exists (
       select 1 from reservation_dispatches rd where rd.reservation_id = r.id
     )
     and not exists (
       select 1
       from reservation_dispatches rd
       where rd.reservation_id = r.id
         and rd.closed_at is null
     );
end;
$$;

revoke all on function close_expired_dispatch_remainders() from public, anon, authenticated;

select cron.schedule(
  'close-expired-dispatch-remainders',
  '*/5 * * * *',
  $$ select close_expired_dispatch_remainders(); $$
);
