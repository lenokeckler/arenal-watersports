create table deposit_declinations (
  reservation_id uuid primary key references reservations (id) on delete cascade,
  created_by     uuid not null references workers (id),
  created_at     timestamptz not null default now()
);

create trigger deposit_declinations_stamp_audit
  before insert or update on deposit_declinations
  for each row execute function stamp_created_only();

alter table deposit_declinations enable row level security;

create policy deposit_declinations_select on deposit_declinations
  for select to authenticated
  using (has_area('reservas') or is_admin());

create policy deposit_declinations_insert on deposit_declinations
  for insert to authenticated
  with check (has_area('reservas') or is_admin());

grant select, insert on deposit_declinations to authenticated;
