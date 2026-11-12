create function pending_dispatch_reservations(
  p_starts_at timestamptz,
  p_ends_at timestamptz,
  p_limit integer default null,
  p_offset integer default 0
) returns table (
  id uuid,
  code text,
  customer_name text,
  starts_at timestamptz,
  status reservation_status
)
language plpgsql
stable
security invoker
set search_path = public
as $$
declare
  maximum_result_count constant integer := 51;
begin
  return query
    select
      r.id,
      r.code,
      r.customer_name,
      r.starts_at,
      r.status
    from reservations r
    where has_area('operaciones')
      and r.starts_at >= p_starts_at
      and r.starts_at < p_ends_at
      and r.status in ('scheduled', 'dispatched')
      and (
        r.status = 'scheduled'
        or exists (
          select 1
          from reservation_items ri
          left join equipment_units eu on eu.id = ri.unit_id
          where ri.reservation_id = r.id
            and coalesce(ri.category_id, eu.category_id) is not null
            and not exists (
              select 1
              from reservation_dispatches rd
              where rd.reservation_id = ri.reservation_id
                and rd.category_id = coalesce(
                  ri.category_id,
                  eu.category_id
                )
            )
        )
      )
    order by r.starts_at, r.id
    limit least(
      greatest(coalesce(p_limit, maximum_result_count), 1),
      maximum_result_count
    )
    offset greatest(coalesce(p_offset, 0), 0);
end;
$$;

revoke all on function pending_dispatch_reservations(
  timestamptz,
  timestamptz,
  integer,
  integer
) from public, anon;
grant execute on function pending_dispatch_reservations(
  timestamptz,
  timestamptz,
  integer,
  integer
) to authenticated;
