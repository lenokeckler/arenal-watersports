create function private.record_unit_return_reading(
  p_unit_id uuid,
  p_fuel_level integer,
  p_usage_total numeric
) returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_usage_total numeric;
  v_consumes_fuel boolean;
begin
  perform require_reservations_access();
  select u.usage_total, c.consumes_fuel
    into v_usage_total, v_consumes_fuel
    from equipment_units u
    join equipment_categories c on c.id = u.category_id
   where u.id = p_unit_id
     for update of u;
  if not found then
    raise exception 'Equipment unit was not found';
  end if;
  if p_usage_total is not null and p_usage_total < v_usage_total then
    raise exception 'Unit usage reading cannot go backwards';
  end if;
  if p_fuel_level is not null and not v_consumes_fuel then
    raise exception 'Equipment unit does not consume fuel';
  end if;
  update equipment_units
     set fuel_level = coalesce(p_fuel_level, fuel_level),
         usage_total = coalesce(p_usage_total, usage_total)
   where id = p_unit_id;
end;
$$;

revoke all on function private.record_unit_return_reading(uuid, integer, numeric) from public, anon;
grant execute on function private.record_unit_return_reading(uuid, integer, numeric) to authenticated;
