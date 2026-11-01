create function public.grantable_worker_areas() returns public.work_area[]
language sql immutable set search_path = '' as $$
  select array['reservas', 'operaciones']::public.work_area[];
$$;

create function public.grant_worker_area(target_worker uuid, target_area public.work_area) returns text
language plpgsql volatile security definer set search_path = '' as $$
declare
  target public.workers%rowtype;
begin
  if not public.is_admin() then
    return 'not_allowed';
  end if;

  if not (target_area = any (public.grantable_worker_areas())) then
    return 'area_not_grantable';
  end if;

  select * into target from public.workers where id = target_worker;

  if not found then
    return 'not_found';
  end if;

  if target.is_external_guide then
    return 'external_guide';
  end if;

  insert into public.worker_areas (worker_id, area, granted_by)
  values (target_worker, target_area, auth.uid())
  on conflict do nothing;

  return 'granted';
end $$;

create function public.revoke_worker_area(target_worker uuid, target_area public.work_area) returns text
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

  if target.base_role = target_area then
    return 'base_area';
  end if;

  delete from public.worker_areas
  where worker_id = target_worker and area = target_area;

  return 'revoked';
end $$;

revoke execute on function public.grantable_worker_areas() from public, anon, authenticated, service_role;
revoke execute on function public.grant_worker_area(uuid, public.work_area) from public, anon;
revoke execute on function public.revoke_worker_area(uuid, public.work_area) from public, anon;
grant execute on function public.grant_worker_area(uuid, public.work_area) to authenticated;
grant execute on function public.revoke_worker_area(uuid, public.work_area) to authenticated;
