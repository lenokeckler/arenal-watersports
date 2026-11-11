create table public.password_reset_grants (
  id uuid primary key default gen_random_uuid(),
  worker_id uuid not null references public.workers (id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz,
  constraint password_reset_grants_token_hash_format
    check (token_hash ~ '^[0-9a-f]{64}$')
);

create index password_reset_grants_worker on public.password_reset_grants (worker_id);

alter table public.password_reset_grants enable row level security;

revoke all on table public.password_reset_grants from public, anon, authenticated;

create function public.password_reset_grant_lifetime_minutes() returns smallint
language sql immutable set search_path = '' as $$
  select 10::smallint;
$$;

create function public.password_reset_grant_token_hash(p_token text) returns text
language sql immutable set search_path = '' as $$
  select case
    when p_token ~ '^[0-9a-f]{64}$'
      then encode(extensions.digest(p_token, 'sha256'), 'hex')
  end;
$$;

create function public.exchange_password_reset_pin(
  p_username text,
  p_pin text
) returns text
language plpgsql security definer set search_path = '' as $$
declare
  target_worker_id uuid := public.consume_password_reset_pin(p_username, p_pin);
  grant_token text;
begin
  if target_worker_id is null then
    return null;
  end if;

  update public.password_reset_grants
     set used_at = now()
   where worker_id = target_worker_id
     and used_at is null;

  grant_token := encode(extensions.gen_random_bytes(32), 'hex');

  insert into public.password_reset_grants (worker_id, token_hash, expires_at)
  values (
    target_worker_id,
    public.password_reset_grant_token_hash(grant_token),
    now() + make_interval(mins => public.password_reset_grant_lifetime_minutes())
  );

  return grant_token;
end $$;

create function public.password_reset_grant_is_open(p_token text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
      from public.password_reset_grants g
      join public.workers w on w.id = g.worker_id
     where g.token_hash = public.password_reset_grant_token_hash(p_token)
       and g.used_at is null
       and g.expires_at > now()
       and w.status = 'active'
       and w.deleted_at is null
       and (w.expires_at is null or w.expires_at > now())
  );
$$;

create function public.redeem_password_reset_grant(p_token text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  target_worker_id uuid;
begin
  update public.password_reset_grants g
     set used_at = now()
    from public.workers w
   where g.token_hash = public.password_reset_grant_token_hash(p_token)
     and g.used_at is null
     and g.expires_at > now()
     and w.id = g.worker_id
     and w.status = 'active'
     and w.deleted_at is null
     and (w.expires_at is null or w.expires_at > now())
  returning g.worker_id into target_worker_id;

  return target_worker_id;
end $$;

create or replace function public.finish_password_recovery(p_user_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  delete from auth.sessions
   where user_id = p_user_id;

  update public.password_reset_pins
     set used_at = now()
   where worker_id = p_user_id
     and used_at is null;

  update public.password_reset_grants
     set used_at = now()
   where worker_id = p_user_id
     and used_at is null;

  update public.workers
     set failed_attempts = 0,
         must_change_password = false
   where id = p_user_id
     and status = 'active'
     and deleted_at is null;
end $$;

create or replace function public.purge_password_reset_records() returns void
language plpgsql security definer set search_path = '' as $$
declare
  cutoff timestamptz := now() - make_interval(hours => public.password_reset_retention_hours());
begin
  delete from public.password_reset_pins where created_at < cutoff;
  delete from public.password_reset_requests where created_at < cutoff;
  delete from public.password_reset_grants where created_at < cutoff;
end $$;

revoke execute on function public.password_reset_grant_lifetime_minutes() from public, anon, authenticated, service_role;
revoke execute on function public.password_reset_grant_token_hash(text) from public, anon, authenticated, service_role;
revoke execute on function public.exchange_password_reset_pin(text, text) from public, anon, authenticated;
revoke execute on function public.password_reset_grant_is_open(text) from public, anon, authenticated;
revoke execute on function public.redeem_password_reset_grant(text) from public, anon, authenticated;
revoke execute on function public.finish_password_recovery(uuid) from public, anon, authenticated;
revoke execute on function public.purge_password_reset_records() from public, anon, authenticated, service_role;
grant execute on function public.exchange_password_reset_pin(text, text) to service_role;
grant execute on function public.password_reset_grant_is_open(text) to service_role;
grant execute on function public.redeem_password_reset_grant(text) to service_role;
grant execute on function public.finish_password_recovery(uuid) to service_role;
