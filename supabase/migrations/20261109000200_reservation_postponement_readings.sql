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
  constraint reservation_postponement_readings_unique_unit unique (postponement_id, unit_id),
  constraint reservation_postponement_readings_fuel_out_range check (fuel_out is null or fuel_out >= 0),
  constraint reservation_postponement_readings_fuel_in_range check (fuel_in is null or fuel_in >= 0),
  constraint reservation_postponement_readings_usage_out_range check (usage_out is null or usage_out >= 0),
  constraint reservation_postponement_readings_usage_in_range check (usage_in is null or usage_in >= 0),
  constraint reservation_postponement_readings_usage_monotonic
    check (usage_in is null or usage_out is null or usage_in >= usage_out)
);

create index reservation_postponement_readings_postponement_idx
  on reservation_postponement_readings (postponement_id);

create function assert_postponement_reading_unit()
returns trigger
language plpgsql security invoker set search_path = public
as $$
declare
  v_fuel_max integer;
begin
  if not exists (
    select 1
      from reservation_postponements p
      join reservation_items i on i.reservation_id = p.reservation_id
     where p.id = new.postponement_id
       and i.unit_id = new.unit_id
  ) then
    raise exception 'Postponement reading unit is not on the reservation';
  end if;
  select fuel_max into v_fuel_max from equipment_units where id = new.unit_id;
  if new.fuel_in > v_fuel_max or new.fuel_out > v_fuel_max then
    raise exception 'Postponement fuel reading is out of range';
  end if;
  return new;
end;
$$;

create trigger reservation_postponement_readings_assert_unit
  before insert on reservation_postponement_readings
  for each row execute function assert_postponement_reading_unit();

create trigger reservation_postponement_readings_stamp_audit
  before insert or update on reservation_postponement_readings
  for each row execute function stamp_created_only();

alter table reservation_postponement_readings enable row level security;

create policy reservation_postponement_readings_select on reservation_postponement_readings
  for select to authenticated
  using (has_area('reservas') or has_area('operaciones') or is_admin());

create policy reservation_postponement_readings_insert on reservation_postponement_readings
  for insert to authenticated
  with check (has_area('reservas') or is_admin());

grant select, insert on reservation_postponement_readings to authenticated;
