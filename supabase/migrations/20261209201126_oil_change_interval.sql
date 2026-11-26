create function public.oil_warning_margin(metric public.usage_metric)
returns numeric
language sql immutable
as $$
  select case metric
    when 'kilometers' then 50::numeric
    when 'engine_hours' then 10::numeric
  end;
$$;

grant execute on function public.oil_warning_margin(public.usage_metric) to authenticated;

drop function register_maintenance_job(uuid, text, date, text, numeric, currency_code, boolean, numeric);

create function register_maintenance_job(
  p_unit_id uuid,
  p_work_type text,
  p_performed_at date,
  p_description text default null,
  p_cost_amount numeric default null,
  p_cost_currency currency_code default null,
  p_is_external boolean default false,
  p_oil_interval numeric default null
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_worker_id uuid := auth.uid();
  v_status unit_status;
  v_usage_total numeric;
  v_record_id uuid;
begin
  if not has_area('operaciones') then
    raise exception 'Operations access is required' using errcode = '42501';
  end if;

  select status, usage_total into v_status, v_usage_total
  from equipment_units
  where id = p_unit_id
  for update;

  if not found then
    raise exception 'Unit not found' using errcode = 'P0002';
  end if;

  if v_status = 'decommissioned' then
    raise exception 'A decommissioned unit takes no maintenance' using errcode = '55000';
  end if;

  if p_work_type is null
     or p_work_type not in ('tire_change', 'part_change', 'oil_change', 'other') then
    raise exception 'The type of work is not valid' using errcode = '22023';
  end if;

  if p_performed_at is null or p_performed_at > current_date + 1 then
    raise exception 'The date of the work is not valid' using errcode = '22023';
  end if;

  if coalesce(p_is_external, false) is null then
    raise exception 'The external mark is not valid' using errcode = '22023';
  end if;

  if p_work_type = 'other' and btrim(coalesce(p_description, '')) = '' then
    raise exception 'A work of another type needs a description' using errcode = '23514';
  end if;

  if (p_cost_amount is null) <> (p_cost_currency is null) then
    raise exception 'The cost needs its currency' using errcode = '23514';
  end if;

  if p_cost_amount is not null
     and (p_cost_amount <= 0
          or p_cost_amount > 9999999999.99
          or p_cost_amount <> round(p_cost_amount, 2)) then
    raise exception 'The cost is not valid' using errcode = '23514';
  end if;

  if p_work_type = 'oil_change' then
    if p_oil_interval is null
       or p_oil_interval <= 0
       or p_oil_interval <> round(p_oil_interval, 2)
       or v_usage_total + p_oil_interval > 9999999999.99 then
      raise exception 'The oil change interval must be above zero'
        using errcode = '23514';
    end if;
  elsif p_oil_interval is not null then
    raise exception 'Only an oil change defines the oil change interval'
      using errcode = '23514';
  end if;

  insert into maintenance_records
    (unit_id, work_type, description, is_external, cost_amount, cost_currency,
     performed_at, created_by)
  values
    (p_unit_id, p_work_type, nullif(btrim(coalesce(p_description, '')), ''),
     coalesce(p_is_external, false), p_cost_amount, p_cost_currency,
     p_performed_at, v_worker_id)
  returning id into v_record_id;

  if p_work_type = 'oil_change' then
    update equipment_units
       set next_oil_change_at = v_usage_total + p_oil_interval
     where id = p_unit_id;
  end if;

  return v_record_id;
end;
$$;

revoke all on function register_maintenance_job(uuid, text, date, text, numeric, currency_code, boolean, numeric)
  from public, anon;
grant execute on function register_maintenance_job(uuid, text, date, text, numeric, currency_code, boolean, numeric)
  to authenticated;

drop function maintenance_units();

create function maintenance_units()
returns table (
  unit_id uuid,
  code text,
  category_id uuid,
  category_name text,
  status unit_status,
  usage_total numeric,
  next_oil_change_at numeric,
  usage_metric usage_metric,
  oil_overage numeric,
  oil_remaining numeric,
  oil_warning boolean
)
language sql
stable
security invoker
set search_path = public
as $$
  select eu.id,
         eu.code,
         ec.id,
         ec.name,
         eu.status,
         eu.usage_total,
         eu.next_oil_change_at,
         ec.usage_metric,
         case
           when eu.next_oil_change_at is not null
                and eu.usage_total >= eu.next_oil_change_at
           then eu.usage_total - eu.next_oil_change_at
         end,
         eu.next_oil_change_at - eu.usage_total,
         coalesce(
           eu.next_oil_change_at - eu.usage_total
             <= coalesce(oil_warning_margin(ec.usage_metric), 0),
           false)
  from equipment_units eu
  join equipment_categories ec on ec.id = eu.category_id
  where has_area('operaciones')
    and eu.status <> 'decommissioned'
    and (
      coalesce(
        eu.next_oil_change_at - eu.usage_total
          <= coalesce(oil_warning_margin(ec.usage_metric), 0),
        false)
      or eu.status <> 'available'
    )
  order by (eu.next_oil_change_at - eu.usage_total)
             / coalesce(oil_warning_margin(ec.usage_metric), 1) asc nulls last,
           eu.code;
$$;

revoke all on function maintenance_units() from public, anon;
grant execute on function maintenance_units() to authenticated;

create or replace view board_category_units with (security_invoker = true) as
select
  s.id as unit_id,
  s.code as unit_code,
  s.category_id,
  s.effective_status,
  case when s.effective_status = 'occupied' then s.returns_at end as returns_at,
  r.id as reservation_id,
  r.code as reservation_code,
  r.customer_name,
  r.starts_at as reservation_starts_at,
  r.ends_at as reservation_ends_at,
  eu.fuel_level,
  eu.fuel_max,
  eu.usage_total,
  ec.has_motor,
  ec.consumes_fuel,
  ec.usage_metric,
  eu.impact_count,
  coalesce(eu.low_fuel_lines, ec.low_fuel_lines)::integer as low_fuel_lines,
  r.people_count,
  od.dispatch_id,
  od.dispatched_at,
  od.radio_channel,
  eu.next_oil_change_at - eu.usage_total as oil_remaining,
  coalesce(
    eu.next_oil_change_at - eu.usage_total
      <= coalesce(oil_warning_margin(ec.usage_metric), 0),
    false) as oil_warning
from board_category_summary b
join unit_current_state s on s.category_id = b.category_id
join equipment_units eu on eu.id = s.id
join equipment_categories ec on ec.id = s.category_id
left join reservations r
  on r.id = s.reservation_id
  and s.effective_status = 'occupied'
left join lateral (
  select rd.id as dispatch_id, rd.dispatched_at, rd.radio_channel
  from reservation_items ri
  join reservation_dispatches rd on rd.id = ri.dispatch_id
  where ri.unit_id = s.id
    and rd.closed_at is null
  order by rd.dispatched_at desc
  limit 1
) od on s.effective_status = 'occupied'
where s.recorded_status <> 'decommissioned';
