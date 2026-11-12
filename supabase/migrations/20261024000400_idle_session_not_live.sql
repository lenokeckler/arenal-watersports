create function public.current_session_id() returns uuid
language sql stable set search_path = '' as $$
  select case
    when pg_catalog.pg_input_is_valid(auth.jwt() ->> 'session_id', 'uuid')
      then (auth.jwt() ->> 'session_id')::uuid
  end;
$$;

create or replace function public.session_is_live() returns boolean
language sql stable security definer set search_path = '' as $$
  select case
    when auth.jwt() ->> 'session_id' is null then true
    else exists (
      select 1
      from auth.sessions s
      where s.id = public.current_session_id()
        and s.user_id = auth.uid()
        and (s.not_after is null or s.not_after > now())
        and not public.session_idle_expired(public.session_last_activity(s.id, s.created_at), now())
    )
  end;
$$;

create function public.current_session_state() returns text
language sql stable security definer set search_path = '' as $$
  select case
    when public.session_is_live() then 'live'
    when exists (
      select 1
      from auth.sessions s
      where s.id = public.current_session_id()
        and s.user_id = auth.uid()
        and public.session_idle_expired(public.session_last_activity(s.id, s.created_at), now())
    ) then 'idle'
    else 'ended'
  end;
$$;

revoke execute on function public.current_session_id() from public, anon, authenticated, service_role;
revoke execute on function public.current_session_state() from public, anon;
grant execute on function public.current_session_state() to authenticated;
