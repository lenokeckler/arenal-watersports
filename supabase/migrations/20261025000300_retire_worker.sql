create function public.retire_worker(target_worker uuid) returns text
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

  if target.deleted_at is null then
    update public.workers
       set deleted_at = now(), status = 'blocked', blocked_reason = 'administration'
     where id = target_worker;
  end if;

  perform public.revoke_worker_sessions(target_worker);

  update public.password_reset_pins
     set used_at = now()
   where worker_id = target_worker
     and used_at is null;

  return 'retired';
end $$;

revoke execute on function public.retire_worker(uuid) from public, anon;
grant execute on function public.retire_worker(uuid) to authenticated;
