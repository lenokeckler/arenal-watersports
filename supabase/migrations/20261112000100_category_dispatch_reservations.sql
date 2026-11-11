create function category_dispatch_reservations(
  p_category_id uuid,
  p_day_start timestamptz,
  p_day_end timestamptz
)
returns table (
  reservation_id uuid,
  code text,
  customer_name text,
  starts_at timestamptz,
  people_count integer,
  required_count integer
)
language sql
stable
security invoker
set search_path = public
as $$
  with committed as (
    select ri.reservation_id,
           (
             count(*) filter (where ri.unit_id is not null)
             + coalesce(sum(ri.quantity) filter (where ri.unit_id is null), 0)
           )::integer as required_count
    from reservation_items ri
    left join equipment_units eu on eu.id = ri.unit_id
    where ri.dispatch_id is null
      and coalesce(eu.category_id, ri.category_id) = p_category_id
    group by ri.reservation_id
  )
  select r.id,
         r.code,
         r.customer_name,
         r.starts_at,
         r.people_count,
         c.required_count
  from committed c
  join reservations r on r.id = c.reservation_id
  where has_area('operaciones')
    and r.status in ('scheduled', 'dispatched')
    and r.type <> 'combo'
    and r.starts_at >= p_day_start
    and r.starts_at < p_day_end
  order by r.starts_at, r.customer_name;
$$;

revoke all on function category_dispatch_reservations(uuid, timestamptz, timestamptz)
  from public, anon;
grant execute on function category_dispatch_reservations(uuid, timestamptz, timestamptz)
  to authenticated;
