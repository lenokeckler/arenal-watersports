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
  );
$$;

create or replace function has_mark(target worker_mark) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from worker_marks wm
    join workers w on w.id = wm.worker_id
    where wm.worker_id = auth.uid()
      and wm.mark = target
      and w.status = 'active'
      and w.deleted_at is null
      and (w.expires_at is null or w.expires_at > now())
      and coalesce((auth.jwt() ->> 'must_change_password')::boolean, false) = false
      and session_is_live()
  );
$$;
