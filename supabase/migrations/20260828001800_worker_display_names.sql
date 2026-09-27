create function worker_display_names(p_worker_ids uuid[])
returns table (worker_id uuid, full_name text)
language sql stable security definer set search_path = public as $$
  select w.id, w.full_name
  from workers w
  where w.id = any (p_worker_ids);
$$;

revoke execute on function worker_display_names(uuid[]) from public, anon;
grant execute on function worker_display_names(uuid[]) to authenticated;
