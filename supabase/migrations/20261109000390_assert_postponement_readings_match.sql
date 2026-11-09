create function private.assert_postponement_readings_match(
  p_reservation_id uuid,
  p_readings jsonb
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  v_item_id text;
begin
  select e ->> 'item_id'
    into v_item_id
    from jsonb_array_elements(p_readings) e
   where not exists (
           select 1
             from reservation_items i
             join reservation_dispatches d on d.id = i.dispatch_id
            where i.id::text = e ->> 'item_id'
              and i.reservation_id = p_reservation_id
              and i.unit_id is not null
              and d.closed_at is null)
      or (select count(*) from jsonb_array_elements(p_readings) x
           where x ->> 'item_id' = e ->> 'item_id') > 1
   limit 1;
  if found then
    raise exception 'Postponement readings do not match the reservation'
      using detail = coalesce(v_item_id, '');
  end if;
end;
$$;

revoke all on function private.assert_postponement_readings_match(uuid, jsonb) from public, anon;
grant execute on function private.assert_postponement_readings_match(uuid, jsonb) to authenticated;
