create or replace function has_area(target work_area) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from worker_areas wa
    join workers w on w.id = wa.worker_id
    where wa.worker_id = auth.uid()
      and wa.area = target
      and w.status = 'active'
      and w.deleted_at is null
      and (w.expires_at is null or w.expires_at > now())
      and coalesce((auth.jwt() ->> 'must_change_password')::boolean, false) = false
      and session_is_live()
      and (
        w.last_work_area = target
        or (select count(*) from worker_areas other where other.worker_id = wa.worker_id) = 1
      )
  );
$$;

create function public.current_work_area() returns public.work_area
language sql stable security definer set search_path = '' as $$
  select case
    when count(*) = 1 then min(wa.area::text)::public.work_area
    when bool_or(wa.area = w.last_work_area) then max(w.last_work_area::text)::public.work_area
  end
  from public.worker_areas wa
  join public.workers w on w.id = wa.worker_id
  where wa.worker_id = auth.uid();
$$;

create function public.choose_work_area(target public.work_area) returns text
language plpgsql volatile security definer set search_path = '' as $$
begin
  if auth.uid() is null
    or not public.session_is_live()
    or coalesce((auth.jwt() ->> 'must_change_password')::boolean, false) then
    return 'not_allowed';
  end if;

  if not exists (
    select 1
    from public.worker_areas wa
    join public.workers w on w.id = wa.worker_id
    where wa.worker_id = auth.uid()
      and wa.area = target
      and w.status = 'active'
      and w.deleted_at is null
      and (w.expires_at is null or w.expires_at > now())
  ) then
    return 'not_enabled';
  end if;

  update public.workers set last_work_area = target where id = auth.uid();

  return 'chosen';
end $$;

revoke execute on function public.current_work_area() from public, anon;
revoke execute on function public.choose_work_area(public.work_area) from public, anon;
grant execute on function public.current_work_area() to authenticated;
grant execute on function public.choose_work_area(public.work_area) to authenticated;
