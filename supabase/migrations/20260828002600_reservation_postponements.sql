create table reservation_postponements (
  id                 uuid primary key default gen_random_uuid(),
  reservation_id     uuid not null references reservations (id) on delete restrict,
  reason             text not null,
  previous_starts_at timestamptz not null,
  new_starts_at      timestamptz not null,
  created_by         uuid not null references workers (id),
  created_at         timestamptz not null default now()
);

create index reservation_postponements_reservation_idx
  on reservation_postponements (reservation_id, created_at desc);

create trigger reservation_postponements_stamp_audit
  before insert or update on reservation_postponements
  for each row execute function stamp_created_only();

alter table reservation_postponements enable row level security;

create policy reservation_postponements_select on reservation_postponements
  for select to authenticated
  using (has_area('reservas') or has_area('operaciones') or is_admin());

create policy reservation_postponements_insert on reservation_postponements
  for insert to authenticated
  with check (has_area('reservas') or is_admin());

grant select, insert on reservation_postponements to authenticated;
