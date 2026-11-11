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
    and r.status in ('scheduled', 'dispatched')
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
