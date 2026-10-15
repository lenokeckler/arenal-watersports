create function public.select_work_mode(target public.work_area)
returns table (allowed_areas public.work_area[], active_area public.work_area, session_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare
  context record;
  selected_revision bigint;
  refusal constant text := 'The requested work area is not enabled';
  denied constant text := '42501';
begin
  select * into context from public.resolve_work_mode();
  if target is null or not (target = any(context.allowed_areas)) then
    raise exception '%', refusal using errcode = denied;
  end if;
  update public.worker_session_modes modes set area = target, revision = modes.revision + 1
    where modes.session_id = (auth.jwt() ->> 'session_id')::uuid
    returning modes.revision into selected_revision;
  update public.workers set last_work_area = target where id = auth.uid();
  return query select context.allowed_areas, target, selected_revision;
end $$;

revoke all on function public.select_work_mode(public.work_area) from public, anon, authenticated, service_role;
grant execute on function public.select_work_mode(public.work_area) to authenticated;
