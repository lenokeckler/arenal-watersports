create view unit_current_state as
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
  select r.id as reservation_id, r.ends_at as returns_at
  from reservation_items ri
  join reservations r on r.id = ri.reservation_id
  where ri.unit_id = u.id
    and r.status = 'dispatched'
  order by r.ends_at
  limit 1
) active_trip on true;

create function unit_conflicts(
  p_unit_id             uuid,
  p_starts_at           timestamptz,
  p_ends_at             timestamptz,
  p_exclude_reservation uuid default null
) returns table (reservation_id uuid, code text, starts_at timestamptz, ends_at timestamptz)
language sql stable as $$
  select r.id, r.code, r.starts_at, r.ends_at
  from reservation_items ri
  join reservations r on r.id = ri.reservation_id
  where ri.unit_id = p_unit_id
    and r.status in ('scheduled', 'dispatched')
    and r.id is distinct from p_exclude_reservation
    and tstzrange(r.starts_at, r.ends_at, '[)')
        && tstzrange(p_starts_at, p_ends_at, '[)');
$$;

create function category_availability(
  p_category_id         uuid,
  p_starts_at           timestamptz,
  p_ends_at             timestamptz,
  p_exclude_reservation uuid default null
) returns table (usable integer, committed integer, free integer)
language sql stable as $$
  with stock as (

    select quantity_available as usable
    from equipment_stock
    where category_id = p_category_id
  ),
  taken as (
    select coalesce(sum(ri.quantity), 0)::integer as committed
    from reservation_items ri
    join reservations r on r.id = ri.reservation_id
    where ri.category_id = p_category_id
      and r.status in ('scheduled', 'dispatched')
      and r.id is distinct from p_exclude_reservation
      and tstzrange(r.starts_at, r.ends_at, '[)')
          && tstzrange(p_starts_at, p_ends_at, '[)')
  )
  select stock.usable, taken.committed, stock.usable - taken.committed
  from stock, taken;
$$;
