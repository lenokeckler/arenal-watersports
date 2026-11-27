create function apply_damage_to_unit(
  p_unit_id uuid,
  p_impact_change integer,
  p_unit_status unit_status
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_status unit_status;
begin
  select status
    into v_status
  from equipment_units
  where id = p_unit_id
  for update;

  if not found then
    raise exception 'Unit not found' using errcode = 'P0002';
  end if;

  if v_status = 'decommissioned' then
    raise exception 'The unit was decommissioned' using errcode = '55000';
  end if;

  if p_unit_status is not null
     and exists (
       select 1
       from reservation_items ri
       join reservation_dispatches d on d.id = ri.dispatch_id
       where ri.unit_id = p_unit_id
         and d.closed_at is null
     ) then
    raise exception 'The unit is out on the water' using errcode = '55000';
  end if;

  update equipment_units
     set impact_count = greatest(impact_count + p_impact_change, 0),
         status = coalesce(p_unit_status, status),
         updated_by = auth.uid()
   where id = p_unit_id;
end;
$$;

revoke all on function apply_damage_to_unit(uuid, integer, unit_status)
  from public, anon, authenticated;

create function check_damage_report_input(
  p_unit_id uuid,
  p_impact_delta integer,
  p_description text,
  p_unit_status unit_status,
  p_reservation_id uuid
)
returns void
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  if p_impact_delta is null or p_impact_delta < 0 or p_impact_delta > 9999 then
    raise exception 'The impact increase is not valid' using errcode = '23514';
  end if;

  if char_length(coalesce(p_description, '')) > 2000 then
    raise exception 'The description is too long' using errcode = '23514';
  end if;

  if p_unit_status is not null
     and p_unit_status not in ('damaged', 'in_maintenance') then
    raise exception 'A report cannot return a unit to service'
      using errcode = '23514';
  end if;

  if p_reservation_id is not null
     and not exists (
       select 1
       from reservation_items
       where reservation_id = p_reservation_id
         and unit_id = p_unit_id
     ) then
    raise exception 'The reservation did not take that unit'
      using errcode = '23514';
  end if;
end;
$$;

revoke all on function check_damage_report_input(uuid, integer, text, unit_status, uuid)
  from public, anon, authenticated;
