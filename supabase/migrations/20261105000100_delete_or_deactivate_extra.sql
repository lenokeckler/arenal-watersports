create function public.delete_or_deactivate_extra(p_extra_id uuid) returns text
language plpgsql volatile security definer set search_path = '' as $$
declare
  target_extra public.extras%rowtype;
begin
  if not public.is_admin() then
    raise exception 'Solo administracion elimina extras' using errcode = '42501';
  end if;

  select * into target_extra from public.extras where id = p_extra_id for update;

  if not found then
    raise exception 'El extra no existe' using errcode = 'P0002';
  end if;

  if exists (select 1 from public.reservation_items where extra_id = p_extra_id) then
    update public.extras
       set status = 'inactive', updated_by = auth.uid(), updated_at = now()
     where id = p_extra_id;

    return 'deactivated';
  end if;

  delete from public.extra_compatibility where extra_id = p_extra_id;
  delete from public.extras where id = p_extra_id;

  return 'deleted';
end $$;

revoke execute on function public.delete_or_deactivate_extra(uuid) from public, anon;
grant execute on function public.delete_or_deactivate_extra(uuid) to authenticated;
