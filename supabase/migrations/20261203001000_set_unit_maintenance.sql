create function public.set_unit_maintenance(
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

  if not in_maintenance and target.status <> 'in_maintenance' then
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

revoke execute on function public.set_unit_maintenance(uuid, boolean) from public, anon;
grant execute on function public.set_unit_maintenance(uuid, boolean) to authenticated;
