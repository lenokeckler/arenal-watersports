alter table password_reset_pins
  add column attempts smallint not null default 0,
  add column requested_ip_hash text,
  add column delivery_failed_at timestamptz,
  add constraint password_reset_pins_attempts_not_negative
    check (attempts >= 0),
  add constraint password_reset_pins_requested_ip_hash_format
    check (requested_ip_hash is null or requested_ip_hash ~ '^[0-9a-f]{64}$');

create index password_reset_pins_worker_requests
  on password_reset_pins (worker_id, created_at);

create index password_reset_pins_network_requests
  on password_reset_pins (requested_ip_hash, created_at)
  where requested_ip_hash is not null;

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

revoke execute on function password_reset_pin_lifetime_minutes() from public, anon, authenticated;
revoke execute on function password_reset_pin_attempt_limit() from public, anon, authenticated;
revoke execute on function password_reset_request_cooldown_seconds() from public, anon, authenticated;
revoke execute on function password_reset_request_hourly_limit() from public, anon, authenticated;
revoke execute on function password_reset_network_hourly_limit() from public, anon, authenticated;
