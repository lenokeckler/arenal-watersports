create function private.record_unit_return_reading(
  p_unit_id uuid,
  p_fuel_level integer,
  p_usage_total numeric
) returns void
language plpgsql security definer set search_path = public
as $$
begin
  perform require_reservations_access();
  update equipment_units
     set fuel_level = coalesce(p_fuel_level, fuel_level),
         usage_total = coalesce(p_usage_total, usage_total)
   where id = p_unit_id;
  if not found then
    raise exception 'Equipment unit was not found';
  end if;
end;
$$;

revoke all on function private.record_unit_return_reading(uuid, integer, numeric) from public, anon;
grant execute on function private.record_unit_return_reading(uuid, integer, numeric) to authenticated;
