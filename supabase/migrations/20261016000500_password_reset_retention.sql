create function password_reset_retention_hours() returns smallint
language sql immutable set search_path = '' as $$
  select 24::smallint;
$$;

create function purge_password_reset_records() returns void
language plpgsql security definer set search_path = '' as $$
declare
  cutoff timestamptz := now() - make_interval(hours => public.password_reset_retention_hours());
begin
  delete from public.password_reset_pins where created_at < cutoff;
  delete from public.password_reset_requests where created_at < cutoff;
end $$;

revoke execute on function password_reset_retention_hours() from public, anon, authenticated, service_role;
revoke execute on function purge_password_reset_records() from public, anon, authenticated, service_role;

select cron.schedule(
  'purge-password-reset-records',
  '0 * * * *',
  $$ select public.purge_password_reset_records(); $$
);
