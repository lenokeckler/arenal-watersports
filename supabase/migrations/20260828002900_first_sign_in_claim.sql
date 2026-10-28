create or replace function public.custom_access_token_hook(event jsonb) returns jsonb
language plpgsql stable set search_path = '' as $$
declare
  worker_status public.worker_status;
  worker_blocked_reason public.worker_blocked_reason;
  worker_deleted_at timestamptz;
  pending_password_change boolean;
  rejection text;
begin
  select w.status, w.blocked_reason, w.deleted_at, w.must_change_password
    into worker_status, worker_blocked_reason, worker_deleted_at, pending_password_change
    from public.workers w
   where w.id = (event ->> 'user_id')::uuid;

  rejection := case
    when not found or worker_deleted_at is not null then 'account_unavailable'
    when worker_blocked_reason = 'failed_attempts' then 'account_blocked:failed_attempts'
    when worker_blocked_reason = 'administration' then 'account_blocked:administration'
  end;

  if rejection is null then
    return jsonb_set(event, '{claims,must_change_password}', to_jsonb(pending_password_change));
  end if;

  return jsonb_build_object(
    'error',
    jsonb_build_object('http_code', 403, 'message', rejection)
  );
end $$;

grant select (must_change_password) on table public.workers to supabase_auth_admin;
