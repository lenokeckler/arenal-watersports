drop function dispatch_candidate_units(uuid, uuid);

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
  usage_total numeric,
  low_fuel_lines integer
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
         eu.usage_total,
         coalesce(eu.low_fuel_lines, ec.low_fuel_lines)::integer
  from equipment_units eu
  join equipment_categories ec on ec.id = eu.category_id
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

revoke all on function dispatch_candidate_units(uuid, uuid) from public, anon;
grant execute on function dispatch_candidate_units(uuid, uuid) to authenticated;

drop function dispatch_group_return_units(uuid);

create function dispatch_group_return_units(p_dispatch_id uuid)
returns table (
  unit_id uuid,
  code text,
  fuel_max integer,
  fuel_out integer,
  usage_out numeric,
  consumes_fuel boolean,
  usage_metric usage_metric,
  low_fuel_lines integer,
  usage_total numeric,
  impact_count integer
)
language sql
stable
security invoker
set search_path = public
as $$
  select eu.id,
         eu.code,
         eu.fuel_max,
         ri.fuel_out,
         ri.usage_out,
         ec.consumes_fuel,
         ec.usage_metric,
         coalesce(eu.low_fuel_lines, ec.low_fuel_lines)::integer,
         eu.usage_total,
         eu.impact_count
  from reservation_items ri
  join equipment_units eu on eu.id = ri.unit_id
  join equipment_categories ec on ec.id = eu.category_id
  where has_area('operaciones')
    and ri.dispatch_id = p_dispatch_id
  order by eu.code;
$$;

revoke all on function dispatch_group_return_units(uuid) from public, anon;
grant execute on function dispatch_group_return_units(uuid) to authenticated;
