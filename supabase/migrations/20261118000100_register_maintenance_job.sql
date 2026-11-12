create function register_maintenance_job(
  p_unit_id uuid,
  p_work_type text,
  p_performed_at date,
  p_description text default null,
  p_cost_amount numeric default null,
  p_cost_currency currency_code default null,
  p_is_external boolean default false,
  p_next_oil_change_at numeric default null
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_worker_id uuid := auth.uid();
  v_status unit_status;
  v_usage_total numeric;
  v_record_id uuid;
begin
  if not has_area('operaciones') then
    raise exception 'Operations access is required' using errcode = '42501';
  end if;

  select status, usage_total into v_status, v_usage_total
  from equipment_units
  where id = p_unit_id
  for update;

  if not found then
    raise exception 'Unit not found' using errcode = 'P0002';
  end if;

  if v_status = 'decommissioned' then
    raise exception 'A decommissioned unit takes no maintenance' using errcode = '55000';
  end if;

  if p_work_type is null
     or p_work_type not in ('tire_change', 'part_change', 'oil_change', 'other') then
    raise exception 'The type of work is not valid' using errcode = '22023';
  end if;

  if p_performed_at is null or p_performed_at > current_date + 1 then
    raise exception 'The date of the work is not valid' using errcode = '22023';
  end if;

  if coalesce(p_is_external, false) is null then
    raise exception 'The external mark is not valid' using errcode = '22023';
  end if;

  if p_work_type = 'other' and btrim(coalesce(p_description, '')) = '' then
    raise exception 'A work of another type needs a description' using errcode = '23514';
  end if;

  if (p_cost_amount is null) <> (p_cost_currency is null) then
    raise exception 'The cost needs its currency' using errcode = '23514';
  end if;

  if p_cost_amount is not null
     and (p_cost_amount <= 0
          or p_cost_amount > 9999999999.99
          or p_cost_amount <> round(p_cost_amount, 2)) then
    raise exception 'The cost is not valid' using errcode = '23514';
  end if;

  if p_work_type = 'oil_change' then
    if p_next_oil_change_at is null
       or p_next_oil_change_at <= v_usage_total
       or p_next_oil_change_at > 9999999999.99
       or p_next_oil_change_at <> round(p_next_oil_change_at, 2) then
      raise exception 'The next oil change must be above the accumulated usage'
        using errcode = '23514';
    end if;
  elsif p_next_oil_change_at is not null then
    raise exception 'Only an oil change defines the next oil change'
      using errcode = '23514';
  end if;

  insert into maintenance_records
    (unit_id, work_type, description, is_external, cost_amount, cost_currency,
     performed_at, created_by)
  values
    (p_unit_id, p_work_type, nullif(btrim(coalesce(p_description, '')), ''),
     coalesce(p_is_external, false), p_cost_amount, p_cost_currency,
     p_performed_at, v_worker_id)
  returning id into v_record_id;

  if p_work_type = 'oil_change' then
    update equipment_units
       set next_oil_change_at = p_next_oil_change_at
     where id = p_unit_id;
  end if;

  return v_record_id;
end;
$$;

revoke all on function register_maintenance_job(uuid, text, date, text, numeric, currency_code, boolean, numeric)
  from public, anon;
grant execute on function register_maintenance_job(uuid, text, date, text, numeric, currency_code, boolean, numeric)
  to authenticated;
