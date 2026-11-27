create function public.set_extra_compatibility(p_extra_id uuid, p_unit_ids uuid[]) returns integer
language plpgsql volatile security definer set search_path = '' as $$
declare
  linked_count integer;
begin
  if not public.is_admin() then
    raise exception 'Solo administracion define las embarcaciones de un extra' using errcode = '42501';
  end if;

  perform 1 from public.extras where id = p_extra_id for update;

  if not found then
    raise exception 'El extra no existe' using errcode = 'P0002';
  end if;

  if p_unit_ids is null or array_position(p_unit_ids, null) is not null then
    raise exception 'La lista de embarcaciones es invalida' using errcode = '22023';
  end if;

  if exists (
    select 1
      from unnest(p_unit_ids) as requested(unit_id)
     where not exists (select 1 from public.equipment_units where id = requested.unit_id)
  ) then
    raise exception 'Una de las embarcaciones no existe' using errcode = 'P0002';
  end if;

  delete from public.extra_compatibility
   where extra_id = p_extra_id and unit_id <> all (p_unit_ids);

  insert into public.extra_compatibility (extra_id, unit_id)
  select distinct p_extra_id, requested.unit_id
    from unnest(p_unit_ids) as requested(unit_id)
  on conflict do nothing;

  update public.extras
     set updated_by = auth.uid(), updated_at = now()
   where id = p_extra_id;

  select count(*) into linked_count from public.extra_compatibility where extra_id = p_extra_id;

  return linked_count;
end $$;

revoke execute on function public.set_extra_compatibility(uuid, uuid[]) from public, anon;
grant execute on function public.set_extra_compatibility(uuid, uuid[]) to authenticated;
