create or replace function private.reservation_category_peak_commitment(
  p_category_id uuid,
  p_starts_at timestamptz,
  p_ends_at timestamptz,
  p_exclude_reservation uuid,
  p_exclude_item_id uuid,
  p_exclude_combo_reservation uuid
) returns integer
language sql stable security invoker set search_path = public
as $$
  with commitments as (
    select coalesce(item.quantity, 1) as quantity,
      case when item.unit_id is null then reservation.starts_at
        else coalesce(dispatch.dispatched_at, reservation.starts_at) end as starts_at,
      case when item.unit_id is null then reservation.ends_at
        when dispatch.id is not null and dispatch.closed_at is null then 'infinity'::timestamptz
        else coalesce(dispatch.ends_at, reservation.ends_at) end as ends_at
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
      and item.id is distinct from p_exclude_item_id
    union all
    select combo_item.quantity,
      reservation.starts_at,
      reservation.ends_at
    from reservations as reservation
    join combo_items as combo_item
      on combo_item.combo_id = reservation.combo_id
    where combo_item.category_id = p_category_id
      and reservation.status in ('scheduled', 'dispatched')
      and reservation.id is distinct from p_exclude_reservation
      and reservation.id is distinct from p_exclude_combo_reservation
  ), events as (
    select event.at, sum(event.quantity) as quantity
    from commitments as commitment
    cross join lateral (values
      (greatest(commitment.starts_at, p_starts_at), commitment.quantity),
      (least(commitment.ends_at, p_ends_at), -commitment.quantity)
    ) as event(at, quantity)
    where tstzrange(commitment.starts_at, commitment.ends_at, '[)')
      && tstzrange(p_starts_at, p_ends_at, '[)')
    group by event.at
  ), simultaneous_load as (
    select sum(event.quantity) over (order by event.at) as quantity
    from events as event
  )
  select coalesce(max(load.quantity), 0)::integer
  from simultaneous_load as load;
$$;

revoke all on function private.reservation_category_peak_commitment(uuid, timestamptz, timestamptz, uuid, uuid, uuid) from public;
grant execute on function private.reservation_category_peak_commitment(uuid, timestamptz, timestamptz, uuid, uuid, uuid) to anon, authenticated, service_role;
