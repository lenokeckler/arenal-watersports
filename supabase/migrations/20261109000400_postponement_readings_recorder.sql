create function private.record_postponement_readings(
  p_reservation_id uuid,
  p_postponement_id uuid,
  p_readings jsonb
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  v_item_id uuid;
begin
  if jsonb_typeof(p_readings) is distinct from 'array' then
    raise exception 'Postponement readings are incomplete';
  end if;
  perform 1 from reservation_postponements
   where id = p_postponement_id and reservation_id = p_reservation_id;
  if not found then
    raise exception 'Postponement does not belong to the reservation';
  end if;
  perform private.assert_postponement_readings_match(p_reservation_id, p_readings);
  perform private.lock_reservation_dispatch_units(p_reservation_id);

  for v_item_id in
    select i.id
      from reservation_items i
      join reservation_dispatches d on d.id = i.dispatch_id
      join equipment_units u on u.id = i.unit_id
     where i.reservation_id = p_reservation_id
     order by u.id, i.id
  loop
    perform private.record_postponement_item_reading(p_postponement_id, v_item_id, p_readings);
  end loop;
end;
$$;

revoke all on function private.record_postponement_readings(uuid, uuid, jsonb) from public, anon;
grant execute on function private.record_postponement_readings(uuid, uuid, jsonb) to authenticated;
