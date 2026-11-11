create function mark_password_reset_pin_undelivered(p_pin_id uuid)
returns void
language plpgsql security definer set search_path = '' as $$
begin
  update public.password_reset_pins p
     set delivery_failed_at = now(),
         used_at = coalesce(p.used_at, now())
   where p.id = p_pin_id
     and p.delivery_failed_at is null;
end $$;

revoke execute on function mark_password_reset_pin_undelivered(uuid) from public, anon, authenticated;
grant execute on function mark_password_reset_pin_undelivered(uuid) to service_role;
