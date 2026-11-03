create function public.prepare_worker_temporary_password(target_worker uuid) returns text
language plpgsql volatile security definer set search_path = '' as $$
declare
  target public.workers%rowtype;
begin
  if not public.is_admin() then
    return 'not_allowed';
  end if;

  select * into target from public.workers where id = target_worker;

  if not found then
    return 'not_found';
  end if;

  if target.base_role = 'administracion' then
    return 'admin_account';
  end if;

  if target.deleted_at is not null then
    return 'retired';
  end if;

  if target.personal_email is not null then
    return 'has_personal_email';
  end if;

  update public.workers
     set must_change_password = true
   where id = target_worker;

  perform public.revoke_worker_sessions(target_worker);

  return 'ready';
end $$;

revoke execute on function public.prepare_worker_temporary_password(uuid) from public, anon;
grant execute on function public.prepare_worker_temporary_password(uuid) to authenticated;
