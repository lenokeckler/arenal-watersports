create function public.sign_in_requires_recovery(p_user_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
      from public.workers w
     where w.id = p_user_id
       and w.base_role = 'administracion'
       and w.status = 'active'
       and w.deleted_at is null
       and w.failed_attempts >= public.sign_in_attempt_limit()
  );
$$;

revoke execute on function public.sign_in_requires_recovery(uuid) from public, anon, authenticated, service_role;
grant execute on function public.sign_in_requires_recovery(uuid) to supabase_auth_admin;
