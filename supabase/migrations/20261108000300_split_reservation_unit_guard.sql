create function assert_split_departure_units_available(
  p_reservation_id uuid,
  p_items jsonb,
  p_window tstzrange
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  departure_unit_id uuid;
begin
  for departure_unit_id in
    select movable.unit_id
    from jsonb_array_elements(p_items) as item(value)
    join split_movable_items(p_reservation_id) movable
      on movable.id = (item.value->>'item_id')::uuid
    where movable.unit_id is not null
    order by movable.unit_id
  loop
    if validate_reservation_equipment_commitment(null, null, departure_unit_id) is null then
      raise exception 'Equipment unit is not available for reservation';
    end if;
    if exists (
      select 1 from unit_conflicts(
        departure_unit_id, lower(p_window), upper(p_window), p_reservation_id
      )
    ) then
      raise exception 'Equipment unit conflicts with another reservation';
    end if;
  end loop;
end;
$$;

revoke all on function assert_split_departure_units_available(uuid, jsonb, tstzrange) from public, anon;
grant execute on function assert_split_departure_units_available(uuid, jsonb, tstzrange) to authenticated;
