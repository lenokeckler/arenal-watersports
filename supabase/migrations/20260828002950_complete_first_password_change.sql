create function public.complete_first_password_change(p_user_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  update public.workers
     set must_change_password = false
   where id = p_user_id
     and status = 'active'
     and deleted_at is null
     and must_change_password;
end $$;

revoke execute on function public.complete_first_password_change(uuid) from public, anon, authenticated;
grant execute on function public.complete_first_password_change(uuid) to service_role;
