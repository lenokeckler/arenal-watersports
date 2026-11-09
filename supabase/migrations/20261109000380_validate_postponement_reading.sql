create function private.validate_postponement_reading(
  p_item_id uuid,
  p_entry jsonb,
  p_consumes_fuel boolean,
  p_fuel_max integer,
  p_tracks_usage boolean,
  p_usage_floor numeric,
  out r_fuel_in integer,
  out r_usage_in numeric
) returns record
language plpgsql security invoker set search_path = public
as $$
declare
  v_fuel numeric;
  v_usage numeric;
begin
  if p_consumes_fuel then
    if jsonb_typeof(p_entry -> 'fuel_in') is distinct from 'number' then
      raise exception 'Postponement fuel reading is invalid' using detail = p_item_id::text;
    end if;
    v_fuel := (p_entry -> 'fuel_in')::numeric;
    if v_fuel <> trunc(v_fuel) or v_fuel not between 0 and p_fuel_max then
      raise exception 'Postponement fuel reading is invalid' using detail = p_item_id::text;
    end if;
    r_fuel_in := v_fuel::integer;
  elsif coalesce(jsonb_typeof(p_entry -> 'fuel_in'), 'null') <> 'null' then
    raise exception 'Postponement fuel reading is invalid' using detail = p_item_id::text;
  end if;

  if p_tracks_usage then
    if jsonb_typeof(p_entry -> 'usage_in') is distinct from 'number' then
      raise exception 'Postponement usage reading is invalid' using detail = p_item_id::text;
    end if;
    v_usage := (p_entry -> 'usage_in')::numeric;
    if v_usage not between 0 and 9999999999.99 then
      raise exception 'Postponement usage reading is invalid' using detail = p_item_id::text;
    end if;
    r_usage_in := round(v_usage, 2);
    if r_usage_in < p_usage_floor then
      raise exception 'Postponement usage reading cannot go below the dispatch reading'
        using detail = p_item_id::text;
    end if;
  elsif coalesce(jsonb_typeof(p_entry -> 'usage_in'), 'null') <> 'null' then
    raise exception 'Postponement usage reading is invalid' using detail = p_item_id::text;
  end if;
end;
$$;

revoke all on function private.validate_postponement_reading(uuid, jsonb, boolean, integer, boolean, numeric) from public, anon;
grant execute on function private.validate_postponement_reading(uuid, jsonb, boolean, integer, boolean, numeric) to authenticated;
