create function public.reservation_history_equipment_names(p_reservation_id uuid) returns text[]
language sql stable set search_path = '' as $$
  select coalesce(array_agg(names.name order by names.name), '{}'::text[])
  from (
    select distinct ec.name
    from public.reservation_items ri
    left join public.equipment_units eu on eu.id = ri.unit_id
    join public.equipment_categories ec on ec.id = coalesce(ri.category_id, eu.category_id)
    where ri.reservation_id = p_reservation_id
  ) names;
$$;

create function public.reservation_history_guide_names(p_reservation_id uuid) returns text[]
language sql stable set search_path = '' as $$
  select coalesce(array_agg(w.full_name order by rg.assigned_at, w.full_name), '{}'::text[])
  from public.reservation_guides rg
  join public.workers w on w.id = rg.worker_id
  where rg.reservation_id = p_reservation_id;
$$;

create function public.list_reservation_history(
  p_page_index  integer,
  p_page_size   integer,
  p_from        date default null,
  p_to          date default null,
  p_type        public.reservation_type default null,
  p_category_id uuid default null
) returns table (
  id              uuid,
  customer_name   text,
  starts_at       timestamptz,
  status          public.reservation_status,
  equipment_names text[],
  guide_names     text[],
  created_by_name text,
  total_count     bigint,
  page_index      integer
)
language plpgsql stable security definer set search_path = '' as $$
#variable_conflict use_column
begin
  if not (public.has_area('reservas') or public.has_area('operaciones') or public.is_admin()) then
    raise exception using errcode = '42501';
  end if;

  if p_page_index < 0 or p_page_size not between 1 and 100 or p_from > p_to then
    raise exception using errcode = '22023';
  end if;

  return query
  with filtered as (
    select r.id, r.customer_name, r.starts_at, r.status, r.created_by
    from public.reservations r
    where r.status in ('closed', 'cancelled')
      and (p_from is null or r.starts_at >= (p_from::timestamp at time zone 'America/Costa_Rica'))
      and (p_to is null or r.starts_at < ((p_to + 1)::timestamp at time zone 'America/Costa_Rica'))
      and (p_type is null or r.type = p_type)
      and (
        p_category_id is null
        or exists (
          select 1
          from public.reservation_items ri
          left join public.equipment_units eu on eu.id = ri.unit_id
          where ri.reservation_id = r.id
            and coalesce(ri.category_id, eu.category_id) = p_category_id
        )
      )
  ),
  totals as (
    select count(*) as total from filtered
  ),
  paging as (
    select
      t.total,
      least(p_page_index, greatest(ceil(t.total::numeric / p_page_size)::integer - 1, 0)) as effective_page
    from totals t
  ),
  page_rows as (
    select f.id, f.customer_name, f.starts_at, f.status, f.created_by
    from filtered f
    order by f.starts_at desc, f.id
    limit p_page_size
    offset (select pg.effective_page * p_page_size from paging pg)
  )
  select
    pr.id,
    pr.customer_name,
    pr.starts_at,
    pr.status,
    public.reservation_history_equipment_names(pr.id),
    public.reservation_history_guide_names(pr.id),
    w.full_name,
    pg.total,
    pg.effective_page
  from page_rows pr
  cross join paging pg
  left join public.workers w on w.id = pr.created_by
  order by pr.starts_at desc, pr.id;
end $$;

revoke all on function public.reservation_history_equipment_names(uuid) from public, anon, authenticated;
revoke all on function public.reservation_history_guide_names(uuid) from public, anon, authenticated;
revoke all on function public.list_reservation_history(integer, integer, date, date, public.reservation_type, uuid) from public, anon;
grant execute on function public.list_reservation_history(integer, integer, date, date, public.reservation_type, uuid) to authenticated;
