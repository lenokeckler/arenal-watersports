create function public.list_inventory_counts(
  page_offset integer default 0,
  page_limit integer default 10,
  only_count uuid default null
)
returns table (
  count_id uuid,
  counted_at timestamptz,
  notes text,
  counted_by text,
  difference_count integer,
  total_count integer
)
language plpgsql stable security definer set search_path = public, pg_temp as $$
begin
  if auth.uid() is null
     or not (public.is_admin() or public.has_area('operaciones'::public.work_area)) then
    return;
  end if;

  return query
  select c.id,
         c.counted_at,
         c.notes,
         w.full_name,
         (select count(*)::integer
            from public.inventory_count_lines l
           where l.count_id = c.id
             and (
               (l.unit_id is not null
                and l.system_status is not null
                and l.confirmed_status is distinct from l.system_status)
               or
               (l.unit_id is null
                and l.system_quantity_available is not null
                and (l.quantity_available is distinct from l.system_quantity_available
                     or l.quantity_damaged is distinct from l.system_quantity_damaged
                     or l.quantity_in_repair is distinct from l.system_quantity_in_repair))
             )),
         (count(*) over ())::integer
    from public.inventory_counts c
    join public.workers w on w.id = c.created_by
   where c.counted_at >= now() - interval '1 year'
     and (only_count is null or c.id = only_count)
   order by c.counted_at desc
   limit greatest(least(page_limit, 100), 1)
  offset greatest(page_offset, 0);
end $$;

revoke execute on function public.list_inventory_counts(integer, integer, uuid) from public, anon;
grant execute on function public.list_inventory_counts(integer, integer, uuid) to authenticated;
