create or replace function unit_conflicts(
  p_unit_id uuid,
  p_starts_at timestamptz,
  p_ends_at timestamptz,
  p_exclude_reservation uuid default null
) returns table (
  reservation_id uuid,
  code text,
  starts_at timestamptz,
  ends_at timestamptz
)
language sql stable
set search_path = public
as $$
  select r.id, r.code, r.starts_at, r.ends_at
  from reservation_items ri
  join reservations r on r.id = ri.reservation_id
  left join reservation_dispatches rd on rd.id = ri.dispatch_id
  where ri.unit_id = p_unit_id
    and (
      r.status in ('scheduled', 'dispatched')
      or (rd.id is not null and rd.closed_at is null)
    )
    and r.id is distinct from p_exclude_reservation
    and tstzrange(
      coalesce(rd.dispatched_at, r.starts_at),
      case
        when rd.id is not null then rd.closed_at
        else r.ends_at
      end,
      '[)'
    ) && tstzrange(p_starts_at, p_ends_at, '[)');
$$;

create or replace function reservation_category_conflicts(
  p_category_id uuid,
  p_starts_at timestamptz,
  p_ends_at timestamptz,
  p_exclude_reservation uuid default null
) returns table (
  reservation_id uuid,
  code text,
  customer_name text,
  starts_at timestamptz,
  ends_at timestamptz
)
language sql stable security invoker set search_path = public
as $$
  select distinct reservation.id, reservation.code, reservation.customer_name,
    reservation.starts_at, reservation.ends_at
  from reservation_items as item
  join reservations as reservation on reservation.id = item.reservation_id
  left join equipment_units as unit on unit.id = item.unit_id
  left join reservation_dispatches as dispatch on dispatch.id = item.dispatch_id
  where coalesce(item.category_id, unit.category_id) = p_category_id
    and (
      reservation.status in ('scheduled', 'dispatched')
      or (dispatch.id is not null and dispatch.closed_at is null)
    )
    and reservation.id is distinct from p_exclude_reservation
    and tstzrange(
      case when item.unit_id is null then reservation.starts_at
        else coalesce(dispatch.dispatched_at, reservation.starts_at) end,
      case when item.unit_id is null then reservation.ends_at
        when dispatch.id is not null and dispatch.closed_at is null then 'infinity'::timestamptz
        else coalesce(dispatch.ends_at, reservation.ends_at) end,
      '[)'
    ) && tstzrange(p_starts_at, p_ends_at, '[)')
  order by reservation.starts_at, reservation.id;
$$;

revoke all on function reservation_category_conflicts(
  uuid, timestamptz, timestamptz, uuid
) from public, anon;
grant execute on function reservation_category_conflicts(
  uuid, timestamptz, timestamptz, uuid
) to authenticated;
