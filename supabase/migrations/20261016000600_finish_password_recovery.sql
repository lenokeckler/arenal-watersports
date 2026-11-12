create function public.finish_password_recovery(p_user_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  delete from auth.sessions
   where user_id = p_user_id;

  update public.password_reset_pins
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

revoke execute on function public.finish_password_recovery(uuid) from public, anon, authenticated;
grant execute on function public.finish_password_recovery(uuid) to service_role;
