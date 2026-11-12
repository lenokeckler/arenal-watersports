create function public.set_unit_condition(target_unit uuid, new_status public.unit_status) returns text
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare
  target public.equipment_units%rowtype;
begin
  if auth.uid() is null
     or not (public.is_admin() or public.has_area('operaciones'::public.work_area)) then
    return 'not_allowed';
  end if;

  if new_status not in ('available', 'damaged', 'in_repair') then
    return 'invalid_status';
  end if;

  select * into target from public.equipment_units where id = target_unit for update;

  if not found then
    return 'not_found';
  end if;

  if target.status in ('in_maintenance', 'decommissioned') then
    return 'not_changeable';
  end if;

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

revoke execute on function public.set_unit_condition(uuid, public.unit_status) from public, anon;
grant execute on function public.set_unit_condition(uuid, public.unit_status) to authenticated;
