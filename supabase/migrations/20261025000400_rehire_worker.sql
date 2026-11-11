create function public.rehire_worker(target_worker uuid) returns text
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

  if target.deleted_at is null then
    return 'not_retired';
  end if;

  update public.workers
     set deleted_at = null,
         status = 'active',
         blocked_reason = null,
         failed_attempts = 0,
         must_change_password = true
   where id = target_worker;

  return 'ready';
end $$;

revoke execute on function public.rehire_worker(uuid) from public, anon;
grant execute on function public.rehire_worker(uuid) to authenticated;
