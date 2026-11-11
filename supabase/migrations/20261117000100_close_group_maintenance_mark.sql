create or replace function close_dispatch_group(
  p_dispatch_id uuid,
  p_arrived_at timestamptz,
  p_returns jsonb default '[]'
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_returns jsonb := coalesce(p_returns, '[]'::jsonb);
  v_worker_id uuid := auth.uid();
  v_reservation_id uuid;
  v_dispatched_at timestamptz;
  v_closed_at timestamptz;
  v_unit_ids uuid[];
  v_unit_id uuid;
begin
  if not has_area('operaciones') then
    raise exception 'Operations access is required' using errcode = '42501';
  end if;

  select reservation_id, dispatched_at, closed_at
    into v_reservation_id, v_dispatched_at, v_closed_at
  from reservation_dispatches
  where id = p_dispatch_id
  for update;

  if not found then
    raise exception 'Dispatch not found' using errcode = 'P0002';
  end if;

  if v_closed_at is not null then
    raise exception 'The group already came back' using errcode = '55000';
  end if;

  if p_arrived_at is null
     or p_arrived_at < v_dispatched_at
     or p_arrived_at > now() + interval '5 minutes' then
    raise exception 'The arrival must be between the departure and now'
      using errcode = '22023';
  end if;

  if jsonb_typeof(v_returns) <> 'array' then
    raise exception 'The returns must be a list' using errcode = '23514';
  end if;

  select coalesce(array_agg(ri.unit_id order by ri.unit_id), '{}')
    into v_unit_ids
  from reservation_items ri
  where ri.dispatch_id = p_dispatch_id
    and ri.unit_id is not null;

  if jsonb_array_length(v_returns) <> cardinality(v_unit_ids)
     or (select count(distinct r ->> 'unit_id') from jsonb_array_elements(v_returns) as r)
        <> cardinality(v_unit_ids)
     or exists (
       select 1
       from jsonb_array_elements(v_returns) as r
       where not ((r ->> 'unit_id')::uuid = any (v_unit_ids))
     ) then
    raise exception 'The returns must name each unit of the group once'
      using errcode = '23514';
  end if;

  if exists (
    with ret as (
      select (r ->> 'unit_id')::uuid as unit_id,
             (r ->> 'fuel')::numeric as fuel_value,
             (r ->> 'usage')::numeric as usage_value
      from jsonb_array_elements(v_returns) as r
    )
    select 1
    from reservation_items ri
    join equipment_units eu on eu.id = ri.unit_id
    join equipment_categories ec on ec.id = eu.category_id
    join ret on ret.unit_id = ri.unit_id
    where ri.dispatch_id = p_dispatch_id
      and (
        (ec.consumes_fuel and (
          ret.fuel_value is null
          or ret.fuel_value <> trunc(ret.fuel_value)
          or ret.fuel_value < 0
          or ret.fuel_value > eu.fuel_max
        ))
        or (not ec.consumes_fuel and ret.fuel_value is not null)
        or (ec.usage_metric is not null and (
          ret.usage_value is null
          or ret.usage_value < coalesce(ri.usage_out, 0)
          or ret.usage_value > 9999999999.99
          or ret.usage_value <> round(ret.usage_value, 2)
        ))
        or (ec.usage_metric is null and ret.usage_value is not null)
      )
  ) then
    raise exception 'The readings of the return are not valid'
      using errcode = '23514';
  end if;

  if exists (
    select 1
    from jsonb_array_elements(v_returns) as r
    where r ? 'maintenance'
      and jsonb_typeof(r -> 'maintenance') not in ('boolean', 'null')
  ) then
    raise exception 'The maintenance mark must be true or false'
      using errcode = '23514';
  end if;

  if exists (
    select 1
    from jsonb_array_elements(v_returns) as r
    where jsonb_typeof(r -> 'damage') = 'object'
      and (
        (r -> 'damage' ->> 'cause') is null
        or (r -> 'damage' ->> 'cause') not in ('rollover', 'collision', 'machine_failure', 'other')
        or btrim(coalesce(r -> 'damage' ->> 'description', '')) = ''
        or coalesce((r -> 'damage' ->> 'impact_delta'), '0') !~ '^[0-9]{1,4}$'
      )
  ) then
    raise exception 'The damage report is not valid' using errcode = '23514';
  end if;

  for v_unit_id in select u from unnest(v_unit_ids) as u order by u loop
    perform pg_advisory_xact_lock(hashtextextended(v_unit_id::text, 0));
  end loop;

  perform 1
  from equipment_units
  where id = any (v_unit_ids)
  order by id
  for update;

  update reservation_items ri
     set fuel_in = (ret.r ->> 'fuel')::numeric::integer,
         usage_in = (ret.r ->> 'usage')::numeric
    from (select r from jsonb_array_elements(v_returns) as r) as ret
   where ri.dispatch_id = p_dispatch_id
     and ri.unit_id = (ret.r ->> 'unit_id')::uuid;

  update equipment_units eu
     set fuel_level = coalesce((ret.r ->> 'fuel')::numeric::integer, eu.fuel_level),
         usage_total = greatest(eu.usage_total, coalesce((ret.r ->> 'usage')::numeric, eu.usage_total))
    from (select r from jsonb_array_elements(v_returns) as r) as ret
   where eu.id = (ret.r ->> 'unit_id')::uuid;

  update reservation_dispatches
     set closed_at = p_arrived_at
   where id = p_dispatch_id;

  insert into damage_reports (unit_id, reservation_id, cause, description, impact_delta, created_by)
  select (r ->> 'unit_id')::uuid,
         v_reservation_id,
         (r -> 'damage' ->> 'cause')::damage_cause,
         btrim(r -> 'damage' ->> 'description'),
         coalesce((r -> 'damage' ->> 'impact_delta')::integer, 0),
         v_worker_id
  from jsonb_array_elements(v_returns) as r
  where jsonb_typeof(r -> 'damage') = 'object';

  update equipment_units
     set status = 'damaged'
   where id in (
     select (r ->> 'unit_id')::uuid
     from jsonb_array_elements(v_returns) as r
     where jsonb_typeof(r -> 'damage') = 'object'
   );

  update equipment_units
     set status = 'in_maintenance'
   where id in (
     select (r ->> 'unit_id')::uuid
     from jsonb_array_elements(v_returns) as r
     where r ->> 'maintenance' = 'true'
   );
end;
$$;

revoke all on function close_dispatch_group(uuid, timestamptz, jsonb) from public, anon;
grant execute on function close_dispatch_group(uuid, timestamptz, jsonb) to authenticated;
