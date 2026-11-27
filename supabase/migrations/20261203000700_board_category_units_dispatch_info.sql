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
  od.radio_channel
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
