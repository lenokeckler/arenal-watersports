create type worker_blocked_reason as enum ('failed_attempts', 'administration');

alter table workers add column blocked_reason worker_blocked_reason;

update workers set blocked_reason = 'administration' where status = 'blocked';

alter table workers add constraint workers_blocked_reason_matches_status
  check ((status = 'blocked') = (blocked_reason is not null));

create function guard_lockout_fields() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (new.status, new.failed_attempts, new.blocked_reason)
       is distinct from (old.status, old.failed_attempts, old.blocked_reason)
     and auth.uid() is not null
     and not is_admin() then
    raise exception 'Solo administracion cambia el bloqueo de una cuenta'
      using errcode = '42501';
  end if;

  return new;
end $$;

create trigger workers_guard_lockout_fields
  before update on workers
  for each row execute function guard_lockout_fields();
