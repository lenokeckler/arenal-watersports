create function private.record_postponement_readings(
  p_reservation_id uuid,
  p_postponement_id uuid,
  p_readings jsonb
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  v_payload jsonb := case when jsonb_typeof(p_readings) = 'array' then p_readings else '[]'::jsonb end;
  v_item record;
  v_entry jsonb;
  v_fuel_in integer;
  v_usage_in numeric;
begin
  for v_item in
    select i.id, i.unit_id, i.fuel_out, i.fuel_in, i.usage_out, i.usage_in,
           d.closed_at is not null as group_closed,
           u.fuel_max, u.usage_total,
           c.consumes_fuel, c.usage_metric is not null as tracks_usage
      from reservation_items i
      join reservation_dispatches d on d.id = i.dispatch_id
      join equipment_units u on u.id = i.unit_id
      join equipment_categories c on c.id = u.category_id
     where i.reservation_id = p_reservation_id
       and i.dispatch_id is not null
     order by i.id
  loop
    if v_item.group_closed then
      insert into reservation_postponement_readings
        (postponement_id, unit_id, fuel_out, fuel_in, usage_out, usage_in)
      values (p_postponement_id, v_item.unit_id, v_item.fuel_out, v_item.fuel_in,
              v_item.usage_out, v_item.usage_in);
      continue;
    end if;

    select e into v_entry
      from jsonb_array_elements(v_payload) e
     where e ->> 'item_id' = v_item.id::text
     limit 1;
    if v_entry is null then
      raise exception 'Postponement readings are incomplete';
    end if;

    v_fuel_in := null;
    if v_item.consumes_fuel then
      if jsonb_typeof(v_entry -> 'fuel_in') is distinct from 'number' then
        raise exception 'Postponement fuel reading is invalid';
      end if;
      v_fuel_in := (v_entry ->> 'fuel_in')::numeric;
      if v_fuel_in is distinct from (v_entry ->> 'fuel_in')::numeric
         or v_fuel_in not between 0 and v_item.fuel_max then
        raise exception 'Postponement fuel reading is invalid';
      end if;
    elsif coalesce(jsonb_typeof(v_entry -> 'fuel_in'), 'null') <> 'null' then
      raise exception 'Postponement fuel reading is invalid';
    end if;

    v_usage_in := null;
    if v_item.tracks_usage then
      if jsonb_typeof(v_entry -> 'usage_in') is distinct from 'number' then
        raise exception 'Postponement usage reading cannot go below the dispatch reading';
      end if;
      v_usage_in := (v_entry ->> 'usage_in')::numeric;
      if v_usage_in < greatest(coalesce(v_item.usage_out, 0), v_item.usage_total) then
        raise exception 'Postponement usage reading cannot go below the dispatch reading';
      end if;
    elsif coalesce(jsonb_typeof(v_entry -> 'usage_in'), 'null') <> 'null' then
      raise exception 'Postponement usage reading is invalid';
    end if;

    insert into reservation_postponement_readings
      (postponement_id, unit_id, fuel_out, fuel_in, usage_out, usage_in)
    values (p_postponement_id, v_item.unit_id, v_item.fuel_out, v_fuel_in,
            v_item.usage_out, v_usage_in);
    perform private.record_unit_return_reading(v_item.unit_id, v_fuel_in, v_usage_in);
  end loop;
end;
$$;

revoke all on function private.record_postponement_readings(uuid, uuid, jsonb) from public, anon;
grant execute on function private.record_postponement_readings(uuid, uuid, jsonb) to authenticated, service_role;
