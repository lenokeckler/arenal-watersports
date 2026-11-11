create table unit_corrections (
  id         uuid primary key default gen_random_uuid(),
  unit_id    uuid not null references equipment_units (id) on delete restrict,
  previous   jsonb not null,
  corrected  jsonb not null,
  created_by uuid not null references workers (id),
  created_at timestamptz not null default now()
);

create index unit_corrections_unit_idx on unit_corrections (unit_id, created_at desc);

alter table unit_corrections enable row level security;

create policy unit_corrections_select on unit_corrections
  for select using (public.is_active_worker());

create function correct_unit_readings(
  p_unit_id uuid,
  p_fuel_max integer,
  p_fuel_level integer,
  p_usage_total numeric,
  p_impact_count integer,
  p_status unit_status
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_worker_id uuid := auth.uid();
  v_unit equipment_units%rowtype;
  v_has_motor boolean;
  v_previous jsonb;
  v_corrected jsonb;
  v_correction_id uuid;
begin
  if not has_area('operaciones') then
    raise exception 'Operations access is required' using errcode = '42501';
  end if;

  select * into v_unit
  from equipment_units
  where id = p_unit_id
  for update;

  if not found then
    raise exception 'Unit not found' using errcode = 'P0002';
  end if;

  select c.has_motor into v_has_motor
  from equipment_categories c
  where c.id = v_unit.category_id;

  if not coalesce(v_has_motor, false) then
    raise exception 'Only a unit with a motor is corrected here' using errcode = '55000';
  end if;

  if v_unit.status = 'decommissioned' then
    raise exception 'A decommissioned unit takes no correction' using errcode = '55000';
  end if;

  if p_fuel_max is null or p_fuel_level is null or p_usage_total is null
     or p_impact_count is null or p_status is null
     or p_status = 'decommissioned' then
    raise exception 'The correction is not valid' using errcode = '22023';
  end if;

  if p_fuel_max not between 1 and 20
     or p_fuel_level not between 0 and p_fuel_max
     or p_usage_total < 0
     or p_usage_total > 9999999999.99
     or p_usage_total <> round(p_usage_total, 2)
     or p_impact_count not between 0 and 100000 then
    raise exception 'The correction is not valid' using errcode = '22023';
  end if;

  v_previous := jsonb_build_object(
    'fuel_max', v_unit.fuel_max,
    'fuel_level', v_unit.fuel_level,
    'usage_total', v_unit.usage_total,
    'impact_count', v_unit.impact_count,
    'status', v_unit.status
  );
  v_corrected := jsonb_build_object(
    'fuel_max', p_fuel_max,
    'fuel_level', p_fuel_level,
    'usage_total', p_usage_total,
    'impact_count', p_impact_count,
    'status', p_status
  );

  if v_previous = v_corrected then
    raise exception 'Nothing to correct' using errcode = '23514';
  end if;

  update equipment_units
     set fuel_max = p_fuel_max,
         fuel_level = p_fuel_level,
         usage_total = p_usage_total,
         impact_count = p_impact_count,
         status = p_status
   where id = p_unit_id;

  insert into unit_corrections (unit_id, previous, corrected, created_by)
  values (p_unit_id, v_previous, v_corrected, v_worker_id)
  returning id into v_correction_id;

  return v_correction_id;
end;
$$;

revoke all on function correct_unit_readings(uuid, integer, integer, numeric, integer, unit_status)
  from public, anon;
grant execute on function correct_unit_readings(uuid, integer, integer, numeric, integer, unit_status)
  to authenticated;
