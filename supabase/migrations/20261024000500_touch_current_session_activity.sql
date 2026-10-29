create function public.touch_current_session_activity() returns text
language plpgsql volatile security definer set search_path = '' as $$
declare
  target_session uuid := public.current_session_id();
  session_state text := public.current_session_state();
begin
  if target_session is null then
    return 'ended';
  end if;

  if session_state <> 'live' then
    return session_state;
  end if;

  insert into public.session_activity as a (session_id, user_id, last_activity_at)
  values (target_session, auth.uid(), now())
  on conflict (session_id) do update
    set last_activity_at = excluded.last_activity_at
    where a.user_id = excluded.user_id;

  return 'live';
end $$;

revoke execute on function public.touch_current_session_activity() from public, anon;
grant execute on function public.touch_current_session_activity() to authenticated;
