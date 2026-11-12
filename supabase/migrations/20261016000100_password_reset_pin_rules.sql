alter table password_reset_pins
  add column attempts smallint not null default 0,
  add column delivery_failed_at timestamptz,
  add constraint password_reset_pins_attempts_not_negative
    check (attempts >= 0);

create index password_reset_pins_worker_requests
  on password_reset_pins (worker_id, created_at);

create table password_reset_requests (
  id uuid primary key default gen_random_uuid(),
  network_key text not null,
  created_at timestamptz not null default now(),
  constraint password_reset_requests_network_key_format
    check (network_key ~ '^[0-9a-f]{64}$')
);

create index password_reset_requests_network_requests
  on password_reset_requests (network_key, created_at);

alter table password_reset_requests enable row level security;

revoke all on table password_reset_requests from anon, authenticated;

create function password_reset_pin_lifetime_minutes() returns smallint
language sql immutable set search_path = '' as $$
  select 10::smallint;
$$;

create function password_reset_pin_attempt_limit() returns smallint
language sql immutable set search_path = '' as $$
  select 5::smallint;
$$;

create function password_reset_request_cooldown_seconds() returns smallint
language sql immutable set search_path = '' as $$
  select 60::smallint;
$$;

create function password_reset_request_hourly_limit() returns smallint
language sql immutable set search_path = '' as $$
  select 5::smallint;
$$;

create function password_reset_network_hourly_limit() returns smallint
language sql immutable set search_path = '' as $$
  select 10::smallint;
$$;

create function password_reset_limit_window_minutes() returns smallint
language sql immutable set search_path = '' as $$
  select 60::smallint;
$$;

revoke execute on function password_reset_pin_lifetime_minutes() from public, anon, authenticated, service_role;
revoke execute on function password_reset_pin_attempt_limit() from public, anon, authenticated, service_role;
revoke execute on function password_reset_request_cooldown_seconds() from public, anon, authenticated, service_role;
revoke execute on function password_reset_request_hourly_limit() from public, anon, authenticated, service_role;
revoke execute on function password_reset_network_hourly_limit() from public, anon, authenticated, service_role;
revoke execute on function password_reset_limit_window_minutes() from public, anon, authenticated, service_role;
