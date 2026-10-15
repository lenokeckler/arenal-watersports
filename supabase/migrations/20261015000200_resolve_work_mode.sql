create function public.resolve_session_work_area(current_area public.work_area, granted public.work_area[])
returns public.work_area
language sql immutable set search_path = '' as $$
  select case when cardinality(granted) = 1 then granted[1]
    when current_area = any(granted) then current_area end;
$$;

revoke all on function public.resolve_session_work_area(public.work_area, public.work_area[])
  from public, anon, authenticated, service_role;

create function public.resolve_work_mode()
returns table (allowed_areas public.work_area[], active_area public.work_area, session_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare
  current_session uuid := public.require_work_mode_session();
  granted public.work_area[];
  remembered public.work_area;
begin
  perform 1 from public.worker_areas wa where wa.worker_id = auth.uid() for share;
  select coalesce(array_agg(wa.area order by wa.area), '{}'::public.work_area[])
    into granted from public.worker_areas wa where wa.worker_id = auth.uid();
  select w.last_work_area into remembered from public.workers w where w.id = auth.uid();
  insert into public.worker_session_modes as modes (session_id, worker_id, area)
    values (current_session, auth.uid(), public.resolve_session_work_area(remembered, granted))
    on conflict (session_id) do update set
      area = public.resolve_session_work_area(modes.area, granted),
      revision = modes.revision + case when modes.area is distinct from
        public.resolve_session_work_area(modes.area, granted) then 1 else 0 end;
  return query select granted, modes.area, modes.revision
    from public.worker_session_modes modes where modes.session_id = current_session;
end $$;

revoke all on function public.resolve_work_mode() from public, anon, authenticated, service_role;
grant execute on function public.resolve_work_mode() to authenticated;
