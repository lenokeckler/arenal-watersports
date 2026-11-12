create function public.extend_worker_expiry(target_worker uuid, new_expires_at timestamptz) returns text
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

  if not target.is_external_guide then
    return 'not_external_guide';
  end if;

  if target.deleted_at is not null then
    return 'retired';
  end if;

  if new_expires_at is null
     or new_expires_at <= greatest(now(), target.expires_at) then
    return 'invalid_date';
  end if;

  update public.workers
     set expires_at = new_expires_at
   where id = target_worker;

  return 'extended';
end $$;

revoke execute on function public.extend_worker_expiry(uuid, timestamptz) from public, anon;
grant execute on function public.extend_worker_expiry(uuid, timestamptz) to authenticated;
