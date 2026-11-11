drop function dispatch_reservation_group(
  uuid, uuid, timestamptz, timestamptz, uuid[]
);
drop function reservation_dispatch_groups(uuid);
drop function dispatch_candidate_units(uuid, uuid);

create function reservation_dispatch_groups(p_reservation_id uuid)
returns table (
  category_id uuid,
  category_name text,
  tracking_mode tracking_mode,
  has_motor boolean,
  consumes_fuel boolean,
  usage_metric usage_metric,
  required_quantity integer,
  fixed_unit_ids uuid[],
  duration_minutes integer
)
language sql
stable
security invoker
set search_path = public
as $$
  with committed as (
    select coalesce(eu.category_id, ri.category_id) as category_id,
           ri.unit_id,
           ri.quantity
    from reservation_items ri
    left join equipment_units eu on eu.id = ri.unit_id
    where ri.reservation_id = p_reservation_id
      and ri.dispatch_id is null
  )
  select ec.id,
         ec.name,
         ec.tracking_mode,
         ec.has_motor,
         ec.consumes_fuel,
         ec.usage_metric,
         coalesce(sum(c.quantity) filter (where c.unit_id is null), 0)::integer,
         coalesce(
           array_agg(c.unit_id order by c.unit_id) filter (where c.unit_id is not null),
           '{}'
         ),
         r.duration_minutes
  from committed c
  join equipment_categories ec on ec.id = c.category_id
  join reservations r on r.id = p_reservation_id
  where has_area('operaciones')
    and r.status in ('scheduled', 'dispatched')
  group by ec.id, ec.name, ec.tracking_mode, ec.has_motor,
           ec.consumes_fuel, ec.usage_metric, r.duration_minutes
  order by ec.name;
$$;

create function dispatch_candidate_units(
  p_reservation_id uuid,
  p_category_id uuid
)
returns table (
  unit_id uuid,
  code text,
  is_assigned boolean,
  fuel_max integer,
  fuel_level integer,
  usage_total numeric
)
language sql
stable
security invoker
set search_path = public
as $$
  select eu.id,
         eu.code,
         exists (
           select 1
           from reservation_items ri
           where ri.reservation_id = p_reservation_id
             and ri.unit_id = eu.id
             and ri.dispatch_id is null
         ),
         eu.fuel_max,
         eu.fuel_level,
         eu.usage_total
  from equipment_units eu
  where has_area('operaciones')
    and eu.category_id = p_category_id
    and eu.status = 'available'
    and not exists (
      select 1
      from reservation_items ri
      join reservation_dispatches rd on rd.id = ri.dispatch_id
      where ri.unit_id = eu.id
        and rd.closed_at is null
    )
  order by eu.code;
$$;

create function dispatch_reservation_group(
  p_reservation_id uuid,
  p_category_id uuid,
  p_dispatched_at timestamptz,
  p_returns_at timestamptz,
  p_unit_ids uuid[] default '{}',
  p_readings jsonb default '[]'::jsonb
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
  v_dispatch_id uuid;
  v_item record;
  v_reading jsonb;
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
      raise exception 'The readings must name each chosen unit once'
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
          (ec.consumes_fuel and (
            rd.fuel_value is null
            or rd.fuel_value <> trunc(rd.fuel_value)
            or rd.fuel_value < 0
            or rd.fuel_value > eu.fuel_max
          ))
          or (not ec.consumes_fuel and rd.fuel_value is not null)
          or (ec.usage_metric is not null and (
            rd.usage_value is null
            or rd.usage_value < eu.usage_total
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

    for v_reading in select value from jsonb_array_elements(v_readings) loop
      update reservation_items
         set fuel_out = (v_reading ->> 'fuel')::numeric::integer,
             usage_out = (v_reading ->> 'usage')::numeric,
             updated_by = v_worker_id
       where dispatch_id = v_dispatch_id
         and unit_id = (v_reading ->> 'unit_id')::uuid;

      update equipment_units
         set fuel_level = coalesce((v_reading ->> 'fuel')::numeric::integer, fuel_level),
             usage_total = coalesce((v_reading ->> 'usage')::numeric, usage_total),
             updated_by = v_worker_id
       where id = (v_reading ->> 'unit_id')::uuid;
    end loop;
  end if;

  return v_dispatch_id;
end;
$$;

revoke all on function reservation_dispatch_groups(uuid) from public, anon;
grant execute on function reservation_dispatch_groups(uuid) to authenticated;
revoke all on function dispatch_candidate_units(uuid, uuid) from public, anon;
grant execute on function dispatch_candidate_units(uuid, uuid) to authenticated;
revoke all on function dispatch_reservation_group(
  uuid, uuid, timestamptz, timestamptz, uuid[], jsonb
) from public, anon;
grant execute on function dispatch_reservation_group(
  uuid, uuid, timestamptz, timestamptz, uuid[], jsonb
) to authenticated;
