create function public.grantable_worker_marks() returns public.worker_mark[]
language sql immutable set search_path = '' as $$
  select array['guia']::public.worker_mark[];
$$;

create function public.grant_worker_mark(target_worker uuid, target_mark public.worker_mark) returns text
language plpgsql volatile security definer set search_path = '' as $$
declare
  target public.workers%rowtype;
begin
  if not public.is_admin() then
    return 'not_allowed';
  end if;

  if not (target_mark = any (public.grantable_worker_marks())) then
    return 'mark_not_grantable';
  end if;

  select * into target from public.workers where id = target_worker;

  if not found then
    return 'not_found';
  end if;

  if target.is_external_guide then
    return 'external_guide';
  end if;

  insert into public.worker_marks (worker_id, mark, granted_by)
  values (target_worker, target_mark, auth.uid())
  on conflict do nothing;

  return 'granted';
end $$;

create function public.revoke_worker_mark(target_worker uuid, target_mark public.worker_mark) returns text
language plpgsql volatile security definer set search_path = '' as $$
begin
  if not public.is_admin() then
    return 'not_allowed';
  end if;

  if not (target_mark = any (public.grantable_worker_marks())) then
    return 'mark_not_grantable';
  end if;

  if not exists (select 1 from public.workers where id = target_worker) then
    return 'not_found';
  end if;

  delete from public.worker_marks
  where worker_id = target_worker and mark = target_mark;

  return 'revoked';
end $$;

revoke execute on function public.grantable_worker_marks() from public, anon, authenticated, service_role;
revoke execute on function public.grant_worker_mark(uuid, public.worker_mark) from public, anon;
revoke execute on function public.revoke_worker_mark(uuid, public.worker_mark) from public, anon;
grant execute on function public.grant_worker_mark(uuid, public.worker_mark) to authenticated;
grant execute on function public.revoke_worker_mark(uuid, public.worker_mark) to authenticated;
