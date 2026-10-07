create function sign_in_attempt_limit() returns smallint
language sql immutable as $$
  select 10::smallint;
$$;

create function record_failed_sign_in(p_username text) returns void
language plpgsql security definer set search_path = public as $$
begin
  update workers
     set failed_attempts = least(failed_attempts + 1, sign_in_attempt_limit()),
         status = case when base_role <> 'administracion'
                        and failed_attempts + 1 >= sign_in_attempt_limit()
                       then 'blocked'::worker_status else status end,
         blocked_reason = case when base_role <> 'administracion'
                                and failed_attempts + 1 >= sign_in_attempt_limit()
                               then 'failed_attempts'::worker_blocked_reason
                               else blocked_reason end
   where username = lower(btrim(p_username))
     and status = 'active'
     and deleted_at is null;
end $$;

create function record_successful_sign_in(p_user_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  update workers
     set failed_attempts = 0
   where id = p_user_id
     and status = 'active'
     and failed_attempts <> 0;
end $$;

revoke execute on function record_failed_sign_in(text) from public, anon, authenticated;
revoke execute on function record_successful_sign_in(uuid) from public, anon, authenticated;
grant execute on function record_failed_sign_in(text) to service_role;
grant execute on function record_successful_sign_in(uuid) to service_role;
