create function reservation_dispatch_groups(p_reservation_id uuid)
returns table (
  category_id uuid,
  category_name text,
  tracking_mode tracking_mode,
  has_motor boolean,
  required_quantity integer,
  fixed_unit_ids uuid[],
  duration_minutes integer
)
language sql
stable
security invoker
set search_path = public
as $$
  with committed as (
    select coalesce(eu.category_id, ri.category_id) as category_id,
           ri.unit_id,
           ri.quantity
    from reservation_items ri
    left join equipment_units eu on eu.id = ri.unit_id
    where ri.reservation_id = p_reservation_id
      and ri.dispatch_id is null
  )
  select ec.id,
         ec.name,
         ec.tracking_mode,
         ec.has_motor,
         coalesce(sum(c.quantity) filter (where c.unit_id is null), 0)::integer,
         coalesce(
           array_agg(c.unit_id order by c.unit_id) filter (where c.unit_id is not null),
           '{}'
         ),
         r.duration_minutes
  from committed c
  join equipment_categories ec on ec.id = c.category_id
  join reservations r on r.id = p_reservation_id
  where has_area('operaciones')
    and r.status in ('scheduled', 'dispatched')
  group by ec.id, ec.name, ec.tracking_mode, ec.has_motor, r.duration_minutes
  order by ec.name;
$$;

create function dispatch_candidate_units(
  p_reservation_id uuid,
  p_category_id uuid
)
returns table (
  unit_id uuid,
  code text,
  is_assigned boolean
)
language sql
stable
security invoker
set search_path = public
as $$
  select eu.id,
         eu.code,
         exists (
           select 1
           from reservation_items ri
           where ri.reservation_id = p_reservation_id
             and ri.unit_id = eu.id
             and ri.dispatch_id is null
         )
  from equipment_units eu
  where has_area('operaciones')
    and eu.category_id = p_category_id
    and eu.status = 'available'
    and not exists (
      select 1
      from reservation_items ri
      join reservation_dispatches rd on rd.id = ri.dispatch_id
      where ri.unit_id = eu.id
        and rd.closed_at is null
    )
  order by eu.code;
$$;

revoke all on function reservation_dispatch_groups(uuid) from public, anon;
grant execute on function reservation_dispatch_groups(uuid) to authenticated;
revoke all on function dispatch_candidate_units(uuid, uuid) from public, anon;
grant execute on function dispatch_candidate_units(uuid, uuid) to authenticated;
