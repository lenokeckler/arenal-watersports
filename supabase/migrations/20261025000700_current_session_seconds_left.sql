create function public.current_session_seconds_left() returns integer
language sql stable security definer set search_path = '' as $$
  select case
    when public.session_is_live() then (
      select greatest(
        0,
        ceil(extract(epoch from public.session_idle_deadline(public.session_last_activity(s.id, s.created_at)) - now()))
      )::integer
      from auth.sessions s
      where s.id = public.current_session_id()
        and s.user_id = auth.uid()
    )
  end;
$$;

revoke execute on function public.current_session_seconds_left() from public, anon;
grant execute on function public.current_session_seconds_left() to authenticated;
