create function public.custom_access_token_hook(event jsonb) returns jsonb
language plpgsql stable set search_path = '' as $$
declare
  worker_status public.worker_status;
  worker_blocked_reason public.worker_blocked_reason;
  worker_deleted_at timestamptz;
  rejection text;
begin
  select w.status, w.blocked_reason, w.deleted_at
    into worker_status, worker_blocked_reason, worker_deleted_at
    from public.workers w
   where w.id = (event ->> 'user_id')::uuid;

  if not found then
    return event;
  end if;

  rejection := case
    when worker_deleted_at is not null then 'account_unavailable'
    when worker_blocked_reason = 'failed_attempts' then 'account_blocked:failed_attempts'
    when worker_blocked_reason = 'administration' then 'account_blocked:administration'
  end;

  if rejection is null then
    return event;
  end if;

  return jsonb_build_object(
    'error',
    jsonb_build_object('http_code', 403, 'message', rejection)
  );
end $$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook(jsonb) from authenticated, anon, public;
grant select (id, status, blocked_reason, deleted_at) on table public.workers to supabase_auth_admin;

create policy workers_select_token_hook on public.workers
  for select to supabase_auth_admin using (true);
