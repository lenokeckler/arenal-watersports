create function public.revoke_worker_sessions(target_worker uuid) returns void
language sql volatile security definer set search_path = '' as $$
  delete from auth.sessions where user_id = target_worker;
$$;

create function public.block_worker(target_worker uuid) returns text
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

  if target.status = 'active' then
    update public.workers
       set status = 'blocked', blocked_reason = 'administration'
     where id = target_worker;
  end if;

  perform public.revoke_worker_sessions(target_worker);

  return 'blocked';
end $$;

create function public.unlock_worker(target_worker uuid) returns text
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

  if target.deleted_at is not null then
    return 'retired';
  end if;

  update public.workers
     set status = 'active', blocked_reason = null, failed_attempts = 0
   where id = target_worker;

  return 'unlocked';
end $$;

revoke execute on function public.revoke_worker_sessions(uuid) from public, anon, authenticated, service_role;
revoke execute on function public.block_worker(uuid) from public, anon;
revoke execute on function public.unlock_worker(uuid) from public, anon;
grant execute on function public.block_worker(uuid) to authenticated;
grant execute on function public.unlock_worker(uuid) to authenticated;
