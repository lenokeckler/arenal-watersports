create function private.record_postponement_item_reading(
  p_postponement_id uuid,
  p_item_id uuid,
  p_readings jsonb
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  v_item record;
  v_entry jsonb;
  v_fuel_in integer;
  v_usage_in numeric;
begin
  select i.unit_id, i.fuel_out, i.fuel_in, i.usage_out, i.usage_in,
         d.closed_at is not null as group_closed,
         u.fuel_max, u.usage_total,
         c.consumes_fuel, c.usage_metric is not null as tracks_usage
    into v_item
    from reservation_items i
    join reservation_dispatches d on d.id = i.dispatch_id
    join equipment_units u on u.id = i.unit_id
    join equipment_categories c on c.id = u.category_id
   where i.id = p_item_id;
  v_fuel_in := v_item.fuel_in;
  v_usage_in := v_item.usage_in;
  if not v_item.group_closed then
    select e into v_entry from jsonb_array_elements(p_readings) e where e ->> 'item_id' = p_item_id::text;
    if v_entry is null then
      raise exception 'Postponement readings are incomplete' using detail = p_item_id::text;
    end if;
    select r.r_fuel_in, r.r_usage_in into v_fuel_in, v_usage_in
      from private.validate_postponement_reading(
        p_item_id, v_entry, v_item.consumes_fuel, v_item.fuel_max, v_item.tracks_usage,
        greatest(coalesce(v_item.usage_out, 0), v_item.usage_total)) r;
    perform private.record_unit_return_reading(v_item.unit_id, v_fuel_in, v_usage_in);
  end if;
  insert into reservation_postponement_readings
    (postponement_id, unit_id, fuel_out, fuel_in, usage_out, usage_in)
  values (p_postponement_id, v_item.unit_id, v_item.fuel_out, v_fuel_in, v_item.usage_out, v_usage_in);
end;
$$;

revoke all on function private.record_postponement_item_reading(uuid, uuid, jsonb) from public, anon;
grant execute on function private.record_postponement_item_reading(uuid, uuid, jsonb) to authenticated;
