create or replace function receive_dispatch_unit(
  p_unit_id uuid,
  p_arrived_at timestamptz,
  p_return jsonb
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_dispatch_id uuid;
  v_receiving_dispatch_id uuid;
  v_other_units integer;
  v_return jsonb;
begin
  if not has_area('operaciones') then
    raise exception 'Operations access is required' using errcode = '42501';
  end if;

  if p_return is null or jsonb_typeof(p_return) <> 'object' then
    raise exception 'The return must be an object' using errcode = '23514';
  end if;

  select d.id
    into v_dispatch_id
  from reservation_items ri
  join reservation_dispatches d on d.id = ri.dispatch_id
  where ri.unit_id = p_unit_id
    and d.closed_at is null
  for update of d;

  if not found then
    raise exception 'The unit is not out on the water' using errcode = '55000';
  end if;

  select count(*)
    into v_other_units
  from reservation_items
  where dispatch_id = v_dispatch_id
    and unit_id is not null
    and unit_id <> p_unit_id;

  v_receiving_dispatch_id := v_dispatch_id;

  if v_other_units > 0 then
    insert into reservation_dispatches (
      reservation_id,
      category_id,
      dispatched_at,
      duration_minutes,
      planned_duration_minutes,
      extra_time_minutes,
      radio_channel,
      created_by,
      updated_by
    )
    select reservation_id,
           category_id,
           dispatched_at,
           duration_minutes,
           planned_duration_minutes,
           extra_time_minutes,
           radio_channel,
           created_by,
           auth.uid()
    from reservation_dispatches
    where id = v_dispatch_id
    returning id into v_receiving_dispatch_id;

    update reservation_items
       set dispatch_id = v_receiving_dispatch_id
     where dispatch_id = v_dispatch_id
       and unit_id = p_unit_id;
  end if;

  v_return := p_return || jsonb_build_object('unit_id', p_unit_id);

  perform close_dispatch_group(
    v_receiving_dispatch_id,
    p_arrived_at,
    jsonb_build_array(v_return)
  );
end;
$$;

revoke all on function receive_dispatch_unit(uuid, timestamptz, jsonb) from public, anon;
grant execute on function receive_dispatch_unit(uuid, timestamptz, jsonb) to authenticated;
