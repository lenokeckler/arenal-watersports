create function password_reset_pin_length() returns smallint
language sql immutable set search_path = '' as $$
  select 6::smallint;
$$;

create function password_reset_pin_hash_cost() returns smallint
language sql immutable set search_path = '' as $$
  select 10::smallint;
$$;

create function issue_password_reset_pin(
  p_username text,
  p_pin text,
  p_ip_hash text
) returns table (pin_id uuid, personal_email text, lifetime_minutes integer)
language plpgsql security definer set search_path = '' as $$
declare
  pin_hash_value text;
  target_worker_id uuid;
  target_personal_email text;
  new_pin_id uuid;
begin
  if p_pin is null
     or p_pin !~ format('^[0-9]{%s}$', public.password_reset_pin_length()) then
    raise exception 'El PIN debe tener % digitos', public.password_reset_pin_length()
      using errcode = '22023';
  end if;

  pin_hash_value := extensions.crypt(
    p_pin,
    extensions.gen_salt('bf', public.password_reset_pin_hash_cost())
  );

  select w.id, w.personal_email
    into target_worker_id, target_personal_email
    from public.workers w
   where w.username = lower(btrim(p_username))
     and w.status = 'active'
     and w.deleted_at is null
     and w.personal_email is not null
     and (w.expires_at is null or w.expires_at > now())
     for update;

  if not found then
    return;
  end if;

  if exists (
    select 1
      from public.password_reset_pins p
     where p.worker_id = target_worker_id
       and p.delivery_failed_at is null
       and p.created_at > now() - make_interval(
         secs => public.password_reset_request_cooldown_seconds()
       )
  ) then
    return;
  end if;

  if (
    select count(*)
      from public.password_reset_pins p
     where p.worker_id = target_worker_id
       and p.created_at > now() - interval '1 hour'
  ) >= public.password_reset_request_hourly_limit() then
    return;
  end if;

  if p_ip_hash is not null then
    perform pg_advisory_xact_lock(hashtextextended(p_ip_hash, 0));

    if (
      select count(*)
        from public.password_reset_pins p
       where p.requested_ip_hash = p_ip_hash
         and p.created_at > now() - interval '1 hour'
    ) >= public.password_reset_network_hourly_limit() then
      return;
    end if;
  end if;

  update public.password_reset_pins p
     set used_at = now()
   where p.worker_id = target_worker_id
     and p.used_at is null;

  insert into public.password_reset_pins (
    worker_id, pin_hash, expires_at, requested_ip_hash
  ) values (
    target_worker_id,
    pin_hash_value,
    now() + make_interval(mins => public.password_reset_pin_lifetime_minutes()),
    p_ip_hash
  ) returning id into new_pin_id;

  return query select
    new_pin_id,
    target_personal_email,
    public.password_reset_pin_lifetime_minutes()::integer;
end $$;

revoke execute on function password_reset_pin_length() from public, anon, authenticated, service_role;
revoke execute on function password_reset_pin_hash_cost() from public, anon, authenticated, service_role;
revoke execute on function issue_password_reset_pin(text, text, text) from public, anon, authenticated;
grant execute on function issue_password_reset_pin(text, text, text) to service_role;
