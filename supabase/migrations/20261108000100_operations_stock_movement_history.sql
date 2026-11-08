create function public.list_operations_stock_movements(
  p_category_id uuid,
  p_page_index integer,
  p_page_size integer
) returns table (
  movement_id uuid,
  moved_at timestamptz,
  reason text,
  actor_name text,
  from_available integer,
  to_available integer,
  from_damaged integer,
  to_damaged integer,
  from_in_repair integer,
  to_in_repair integer,
  total_count bigint,
  page_index integer
)
language plpgsql stable security definer set search_path = '' as $$
declare
  movement_count bigint;
  last_page integer;
  selected_page integer;
begin
  if auth.uid() is null
    or not (public.is_admin() or public.has_area('operaciones'::public.work_area)) then
    raise exception 'Solo administracion u operaciones consultan ajustes de inventario'
      using errcode = '42501';
  end if;

  if p_page_index is null or p_page_index < 0
    or p_page_size is null or p_page_size < 1 or p_page_size > 100 then
    raise exception 'La pagina solicitada no es valida' using errcode = '22023';
  end if;

  if not exists (
    select 1 from public.equipment_categories as category
    where category.id = p_category_id and category.tracking_mode = 'by_quantity'
  ) then
    raise exception 'La categoria de conteo no existe' using errcode = 'P0002';
  end if;

  select count(*) into movement_count
  from public.equipment_stock_movements as movement
  where movement.category_id = p_category_id;

  last_page := greatest(ceil(movement_count::numeric / p_page_size)::integer - 1, 0);
  selected_page := least(p_page_index, last_page);

  return query
  select movement.id, movement.created_at, movement.reason, worker.full_name,
         movement.from_available, movement.to_available,
         movement.from_damaged, movement.to_damaged,
         movement.from_in_repair, movement.to_in_repair,
         movement_count, selected_page
  from public.equipment_stock_movements as movement
  join public.workers as worker on worker.id = movement.created_by
  where movement.category_id = p_category_id
  order by movement.created_at desc, movement.id desc
  limit p_page_size offset selected_page::bigint * p_page_size;
end $$;

revoke execute on function public.list_operations_stock_movements(uuid, integer, integer)
  from public, anon;
grant execute on function public.list_operations_stock_movements(uuid, integer, integer)
  to authenticated;
