create function public.session_idle_limit() returns interval
language sql immutable set search_path = '' as $$
  select interval '30 minutes';
$$;

create function public.session_idle_expired(last_activity timestamptz, moment timestamptz) returns boolean
language sql immutable set search_path = '' as $$
  select case
    when moment <= last_activity + public.session_idle_limit() then false
    else not (
      public.workday_contains(last_activity + public.session_idle_limit())
      and public.workday_contains(moment)
      and ((last_activity + public.session_idle_limit()) at time zone public.workday_time_zone())::date
        = (moment at time zone public.workday_time_zone())::date
    )
  end;
$$;

revoke execute on function public.session_idle_limit() from public, anon, authenticated, service_role;
revoke execute on function public.session_idle_expired(timestamptz, timestamptz) from public, anon, authenticated, service_role;
