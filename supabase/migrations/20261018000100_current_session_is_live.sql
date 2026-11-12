create function public.current_session_is_live() returns boolean
language sql stable security definer set search_path = '' as $$
  select public.session_is_live();
$$;

revoke execute on function public.current_session_is_live() from public, anon;
grant execute on function public.current_session_is_live() to authenticated;
