create function pending_dispatch_equipment(p_reservation_ids uuid[])
returns table (
  reservation_id uuid,
  reservation_type reservation_type,
  category_id uuid,
  category_name text,
  quantity integer
)
language sql
stable
security invoker
set search_path = public
as $$
  with committed as (
    select ri.reservation_id,
           coalesce(eu.category_id, ri.category_id) as category_id,
           ri.unit_id,
           ri.quantity
    from reservation_items ri
    left join equipment_units eu on eu.id = ri.unit_id
    where ri.reservation_id = any(p_reservation_ids)
      and ri.dispatch_id is null
  )
  select c.reservation_id,
         r.type,
         ec.id,
         ec.name,
         (
           coalesce(sum(c.quantity) filter (where c.unit_id is null), 0)
           + count(*) filter (where c.unit_id is not null)
         )::integer
  from committed c
  join equipment_categories ec on ec.id = c.category_id
  join reservations r on r.id = c.reservation_id
  where has_area('operaciones')
    and r.status in ('scheduled', 'dispatched')
  group by c.reservation_id, r.type, ec.id, ec.name
  order by c.reservation_id, ec.name;
$$;

revoke all on function pending_dispatch_equipment(uuid[]) from public, anon;
grant execute on function pending_dispatch_equipment(uuid[]) to authenticated;
