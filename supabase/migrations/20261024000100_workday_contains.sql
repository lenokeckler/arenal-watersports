create function public.workday_time_zone() returns text
language sql immutable set search_path = '' as $$
  select 'America/Costa_Rica';
$$;

create function public.workday_start() returns time
language sql immutable set search_path = '' as $$
  select time '07:00';
$$;

create function public.workday_end() returns time
language sql immutable set search_path = '' as $$
  select time '19:00';
$$;

create function public.workday_contains(moment timestamptz) returns boolean
language sql immutable set search_path = '' as $$
  select (moment at time zone public.workday_time_zone())::time >= public.workday_start()
     and (moment at time zone public.workday_time_zone())::time < public.workday_end();
$$;

revoke execute on function public.workday_time_zone() from public, anon, authenticated, service_role;
revoke execute on function public.workday_start() from public, anon, authenticated, service_role;
revoke execute on function public.workday_end() from public, anon, authenticated, service_role;
revoke execute on function public.workday_contains(timestamptz) from public, anon, authenticated, service_role;
