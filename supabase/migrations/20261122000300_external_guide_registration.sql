create function public.can_register_external_guide() returns boolean
language sql stable security definer set search_path = '' as $$
  select public.has_area('reservas')
    and public.has_mark('registro_guias_externos');
$$;

create function public.register_external_guide(
  guide_id uuid,
  guide_full_name text,
  guide_national_id text,
  guide_expires_on date,
  guide_personal_email text default null
) returns text
language plpgsql volatile security definer set search_path = '' as $$
declare
  normalized_name text := btrim(guide_full_name);
  normalized_national_id text := lower(btrim(guide_national_id));
  expiry timestamptz;
begin
  if not public.can_register_external_guide() then
    return 'not_allowed';
  end if;

  if guide_id is null
    or normalized_name is null
    or normalized_name = ''
    or normalized_national_id is null
    or length(normalized_national_id) not between 3 and 40
    or guide_expires_on is null
    or guide_expires_on < (now() at time zone 'America/Costa_Rica')::date then
    return 'invalid_input';
  end if;

  expiry := (guide_expires_on + 1)::timestamp at time zone 'America/Costa_Rica';

  insert into public.workers (
    id, username, full_name, personal_email, base_role,
    is_external_guide, national_id, expires_at,
    must_change_password, created_by, updated_by
  ) values (
    guide_id, normalized_national_id, normalized_name,
    nullif(btrim(guide_personal_email), ''), 'operaciones',
    true, normalized_national_id, expiry,
    true, auth.uid(), auth.uid()
  );

  insert into public.worker_marks (worker_id, mark, granted_by)
  values (guide_id, 'guia', auth.uid());

  return 'created';
exception
  when unique_violation then
    return 'national_id_taken';
end $$;

revoke all on function public.can_register_external_guide() from public, anon, authenticated;
revoke all on function public.register_external_guide(uuid, text, text, date, text)
  from public, anon, authenticated;
grant execute on function public.can_register_external_guide() to authenticated;
grant execute on function public.register_external_guide(uuid, text, text, date, text)
  to authenticated;

create or replace function public.custom_access_token_hook(event jsonb) returns jsonb
language plpgsql stable set search_path = '' as $$
declare
  worker_id uuid;
  worker_status public.worker_status;
  worker_blocked_reason public.worker_blocked_reason;
  worker_deleted_at timestamptz;
  worker_expires_at timestamptz;
  pending_password_change boolean;
  rejection text;
begin
  select w.id, w.status, w.blocked_reason, w.deleted_at,
         w.expires_at, w.must_change_password
    into worker_id, worker_status, worker_blocked_reason,
         worker_deleted_at, worker_expires_at, pending_password_change
    from public.workers w
   where w.id = (event ->> 'user_id')::uuid;

  rejection := case
    when not found or worker_deleted_at is not null then 'account_unavailable'
    when worker_expires_at <= now() then 'account_expired'
    when worker_blocked_reason = 'failed_attempts' then 'account_blocked:failed_attempts'
    when worker_blocked_reason = 'administration' then 'account_blocked:administration'
    when coalesce(event ->> 'authentication_method', '') <> 'token_refresh'
      and public.sign_in_requires_recovery(worker_id) then 'account_recovery_required'
  end;

  if rejection is null then
    return jsonb_set(event, '{claims,must_change_password}', to_jsonb(pending_password_change));
  end if;

  return jsonb_build_object(
    'error',
    jsonb_build_object('http_code', 403, 'message', rejection)
  );
end $$;

grant select (expires_at) on table public.workers to supabase_auth_admin;
