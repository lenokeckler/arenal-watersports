create function consume_password_reset_pin(
  p_username text,
  p_pin text
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  target_worker_id uuid;
  target_pin_id uuid;
  target_pin_hash text;
  target_pin_attempts smallint;
begin
  if p_pin is not null
     and p_pin ~ format('^[0-9]{%s}$', public.password_reset_pin_length()) then
    select w.id, p.id, p.pin_hash, p.attempts
      into target_worker_id, target_pin_id, target_pin_hash,
           target_pin_attempts
      from public.workers w
      join public.password_reset_pins p on p.worker_id = w.id
     where w.username = lower(btrim(p_username))
       and w.status = 'active'
       and w.deleted_at is null
       and (w.expires_at is null or w.expires_at > now())
       and p.used_at is null
       and p.expires_at > now()
     order by p.created_at desc
     limit 1
       for update;

    if target_pin_attempts >= public.password_reset_pin_attempt_limit() then
      target_pin_id := null;
    end if;
  end if;

  if target_pin_id is null then
    perform extensions.crypt(
      coalesce(p_pin, ''),
      extensions.gen_salt('bf', public.password_reset_pin_hash_cost())
    );
    return null;
  end if;

  if extensions.crypt(p_pin, target_pin_hash) = target_pin_hash then
    update public.password_reset_pins p
       set used_at = now()
     where p.id = target_pin_id;
    return target_worker_id;
  end if;

  update public.password_reset_pins p
     set attempts = least(
           p.attempts + 1,
           public.password_reset_pin_attempt_limit()
         ),
         used_at = case
           when p.attempts + 1 >= public.password_reset_pin_attempt_limit()
             then now()
         end
   where p.id = target_pin_id;

  return null;
end $$;

revoke execute on function consume_password_reset_pin(text, text) from public, anon, authenticated;
grant execute on function consume_password_reset_pin(text, text) to service_role;
