create table public.session_activity (
  session_id       uuid primary key,
  user_id          uuid not null references auth.users (id) on delete cascade,
  last_activity_at timestamptz not null default now()
);

alter table public.session_activity enable row level security;

revoke all on table public.session_activity from public, anon, authenticated, service_role;

create function public.session_last_activity(target_session uuid, signed_in_at timestamptz) returns timestamptz
language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select a.last_activity_at from public.session_activity a where a.session_id = target_session),
    signed_in_at
  );
$$;

create function public.purge_ended_session_activity() returns void
language sql security definer set search_path = '' as $$
  delete from public.session_activity a
  where not exists (select 1 from auth.sessions s where s.id = a.session_id);
$$;

revoke execute on function public.session_last_activity(uuid, timestamptz) from public, anon, authenticated, service_role;
revoke execute on function public.purge_ended_session_activity() from public, anon, authenticated, service_role;

select cron.schedule(
  'purge-ended-session-activity',
  '15 * * * *',
  $$ select public.purge_ended_session_activity(); $$
);
