create or replace function public.set_unit_maintenance(
  target_unit uuid,
  in_maintenance boolean
) returns text
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare
  target public.equipment_units%rowtype;
  new_status public.unit_status;
begin
  if auth.uid() is null
     or not (public.is_admin() or public.has_area('operaciones'::public.work_area)) then
    return 'not_allowed';
  end if;

  if in_maintenance is null then
    return 'invalid_status';
  end if;

  select * into target from public.equipment_units where id = target_unit for update;

  if not found then
    return 'not_found';
  end if;

  if target.status = 'decommissioned' then
    return 'not_changeable';
  end if;

  new_status := case when in_maintenance then 'in_maintenance' else 'available' end;

  if target.status = new_status then
    return 'no_change';
  end if;

  begin
    update public.equipment_units
       set status = new_status,
           updated_by = auth.uid()
     where id = target_unit;
  exception
    when raise_exception then
      if sqlerrm = 'La unidad esta ocupada en un despacho abierto' then
        return 'occupied';
      end if;
      raise;
  end;

  return 'changed';
end $$;

create or replace view board_category_summary with (security_invoker = true) as
select
  c.id as category_id,
  c.name as category_name,
  c.group_name,
  coalesce(counts.free_count, 0)::integer as free_count,
  coalesce(counts.in_use_count, 0)::integer as in_use_count,
  coalesce(counts.total_count, 0)::integer as total_count,
  c.image_path as image_path,
  coalesce(counts.maintenance_count, 0)::integer as maintenance_count,
  coalesce(counts.damaged_count, 0)::integer as damaged_count
from equipment_categories c
left join lateral (
  select
    count(*) filter (where s.effective_status = 'available') as free_count,
    count(*) filter (where s.effective_status = 'occupied') as in_use_count,
    count(*) as total_count,
    count(*) filter (where s.effective_status in ('in_maintenance', 'in_repair')) as maintenance_count,
    count(*) filter (where s.effective_status = 'damaged') as damaged_count
  from unit_current_state s
  where s.category_id = c.id
    and s.recorded_status <> 'decommissioned'
) counts on true
where c.is_reservable
  and c.status = 'active'
  and c.tracking_mode = 'by_unit';
