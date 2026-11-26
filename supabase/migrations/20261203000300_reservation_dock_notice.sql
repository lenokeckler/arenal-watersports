create table reservation_dock_notices (
  reservation_id uuid primary key references reservations (id) on delete cascade,
  notified_at    timestamptz not null default now(),
  notified_by    uuid not null references workers (id)
);

alter table reservation_dock_notices enable row level security;

create policy reservation_dock_notices_select on reservation_dock_notices
  for select using (public.is_active_worker());

create function set_reservation_dock_notice(
  p_reservation_id uuid,
  p_notified boolean
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_status reservation_status;
begin
  perform require_reservations_access();

  select status into v_status
  from reservations
  where id = p_reservation_id
  for update;

  if not found then
    raise exception 'Reservation not found' using errcode = 'P0002';
  end if;

  if v_status not in ('scheduled', 'dispatched') then
    raise exception 'The reservation cannot be sent to the dock' using errcode = '55000';
  end if;

  if coalesce(p_notified, false) then
    insert into reservation_dock_notices (reservation_id, notified_by)
    values (p_reservation_id, auth.uid())
    on conflict (reservation_id) do update
      set notified_at = now(), notified_by = auth.uid();
  else
    delete from reservation_dock_notices where reservation_id = p_reservation_id;
  end if;
end;
$$;

revoke all on function set_reservation_dock_notice(uuid, boolean) from public, anon;
grant execute on function set_reservation_dock_notice(uuid, boolean) to authenticated;
