create table reservation_postponement_readings (
  id              uuid primary key default gen_random_uuid(),
  postponement_id uuid not null references reservation_postponements (id) on delete restrict,
  unit_id         uuid not null references equipment_units (id),
  fuel_out        integer,
  fuel_in         integer,
  usage_out       numeric(12,2),
  usage_in        numeric(12,2),
  created_by      uuid not null references workers (id),
  created_at      timestamptz not null default now(),
  constraint postponement_readings_unique_unit unique (postponement_id, unit_id),
  constraint postponement_readings_fuel_out_range check (fuel_out is null or fuel_out >= 0),
  constraint postponement_readings_fuel_in_range check (fuel_in is null or fuel_in >= 0),
  constraint postponement_readings_usage_out_range check (usage_out is null or usage_out >= 0),
  constraint postponement_readings_usage_in_range check (usage_in is null or usage_in >= 0),
  constraint postponement_readings_usage_monotonic
    check (usage_in is null or usage_out is null or usage_in >= usage_out)
);

create index postponement_readings_postponement_idx
  on reservation_postponement_readings (postponement_id);

create trigger reservation_postponement_readings_stamp_audit
  before insert or update on reservation_postponement_readings
  for each row execute function stamp_created_only();

alter table reservation_postponement_readings enable row level security;

create policy postponement_readings_select on reservation_postponement_readings
  for select to authenticated
  using (has_area('reservas') or has_area('operaciones') or is_admin());

create policy postponement_readings_insert on reservation_postponement_readings
  for insert to authenticated
  with check (has_area('reservas') or is_admin());

grant select, insert on reservation_postponement_readings to authenticated;
