create table public.worker_session_modes (
  session_id uuid primary key references auth.sessions (id) on delete cascade,
  worker_id uuid not null references public.workers (id) on delete cascade,
  area public.work_area,
  revision bigint not null default 0 check (revision >= 0)
);

alter table public.worker_session_modes enable row level security;
revoke all on public.worker_session_modes from public, anon, authenticated, service_role;
grant select on public.worker_session_modes to authenticated;

create function public.require_work_mode_session() returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  requested_session uuid;
  worker public.workers;
  refusal constant text := 'Work mode requires an eligible authenticated session';
  denied constant text := '42501';
begin
  begin
    requested_session := (auth.jwt() ->> 'session_id')::uuid;
  exception when invalid_text_representation then
    raise exception '%', refusal using errcode = denied;
  end;
  select * into worker from public.workers where id = auth.uid() for update;
  if not found or worker.status <> 'active' or worker.blocked_reason is not null
    or worker.deleted_at is not null or worker.must_change_password
    or worker.expires_at <= now() or requested_session is null
    or auth.jwt() -> 'must_change_password' = 'true'::jsonb then
    raise exception '%', refusal using errcode = denied;
  end if;
  perform 1 from auth.sessions s
    where s.id = requested_session and s.user_id = worker.id
      and (s.not_after is null or s.not_after > now()) for update;
  if not found then
    raise exception '%', refusal using errcode = denied;
  end if;
  return requested_session;
end $$;

revoke all on function public.require_work_mode_session() from public, anon, authenticated, service_role;

create policy worker_session_modes_read_own_session on public.worker_session_modes
  for select to authenticated
  using (worker_id = auth.uid() and session_id::text = auth.jwt() ->> 'session_id');
