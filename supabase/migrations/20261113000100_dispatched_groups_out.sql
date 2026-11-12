create function dispatched_groups_out()
returns table (
  dispatch_id uuid,
  reservation_id uuid,
  code text,
  customer_name text,
  category_id uuid,
  category_name text,
  dispatched_at timestamptz,
  ends_at timestamptz,
  unit_codes text[],
  quantity integer
)
language sql
stable
security invoker
set search_path = public
as $$
  select rd.id,
         r.id,
         r.code,
         r.customer_name,
         c.id,
         c.name,
         rd.dispatched_at,
         rd.ends_at,
         coalesce(array_agg(eu.code order by eu.code) filter (where eu.code is not null), '{}'),
         (
           count(*) filter (where ri.unit_id is not null)
           + coalesce(sum(ri.quantity) filter (where ri.unit_id is null), 0)
         )::integer
  from reservation_dispatches rd
  join reservations r on r.id = rd.reservation_id
  join equipment_categories c on c.id = rd.category_id
  left join reservation_items ri on ri.dispatch_id = rd.id
  left join equipment_units eu on eu.id = ri.unit_id
  where has_area('operaciones')
    and rd.closed_at is null
  group by rd.id, r.id, c.id
  order by rd.ends_at, r.customer_name, c.name;
$$;

revoke all on function dispatched_groups_out() from public, anon;
grant execute on function dispatched_groups_out() to authenticated;
