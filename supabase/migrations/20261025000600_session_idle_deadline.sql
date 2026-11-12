create function public.session_idle_deadline(last_activity timestamptz) returns timestamptz
language sql immutable set search_path = '' as $$
  with local_moment as (
    select (last_activity at time zone public.workday_time_zone()) as moment
  ),
  night_start as (
    select case
      when moment::time >= public.workday_end() then moment
      when moment::time < public.workday_start()
        and moment + public.session_idle_limit() <= moment::date + public.workday_start() then moment
      else moment::date + public.workday_end()
    end as moment
    from local_moment
  )
  select (moment + public.session_idle_limit()) at time zone public.workday_time_zone()
  from night_start;
$$;

create or replace function public.session_idle_expired(last_activity timestamptz, moment timestamptz) returns boolean
language sql immutable set search_path = '' as $$
  select moment > public.session_idle_deadline(last_activity);
$$;

revoke execute on function public.session_idle_deadline(timestamptz) from public, anon, authenticated, service_role;
revoke execute on function public.session_idle_expired(timestamptz, timestamptz) from public, anon, authenticated, service_role;
