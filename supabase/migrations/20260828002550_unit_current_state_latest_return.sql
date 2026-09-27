create or replace view unit_current_state with (security_invoker = true) as
select
  u.id,
  u.code,
  u.category_id,
  u.status as recorded_status,
  case
    when u.status <> 'available' then u.status::text
    when active_trip.reservation_id is not null then 'occupied'
    else 'available'
  end as effective_status,
  active_trip.reservation_id,
  active_trip.returns_at
from equipment_units u
left join lateral (
  select rd.reservation_id, rd.ends_at as returns_at
  from reservation_items ri
  join reservation_dispatches rd on rd.id = ri.dispatch_id
  where ri.unit_id = u.id
    and rd.closed_at is null
  order by rd.ends_at desc
  limit 1
) active_trip on true;
