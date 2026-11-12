create function private.postponement_payload_is_valid(p_payload jsonb)
returns boolean
language plpgsql security invoker set search_path = public
as $$
begin
  if jsonb_typeof(p_payload->'reservation_id') is distinct from 'string'
     or p_payload->>'reservation_id' !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
     or jsonb_typeof(p_payload->'date') is distinct from 'string'
     or p_payload->>'date' !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
     or jsonb_typeof(p_payload->'time') is distinct from 'string'
     or p_payload->>'time' !~ '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
     or jsonb_typeof(p_payload->'cause') is distinct from 'string'
     or p_payload->>'cause' not in ('heavy_rain', 'storm', 'other')
     or coalesce(jsonb_typeof(p_payload->'reason'), 'null') not in ('null', 'string')
     or coalesce(jsonb_typeof(p_payload->'expected_updated_at'), 'null') not in ('null', 'string') then
    return false;
  end if;
  perform (p_payload->>'date')::date, (p_payload->>'expected_updated_at')::timestamptz;
  return true;
exception
  when invalid_datetime_format or datetime_field_overflow or invalid_text_representation
    or invalid_time_zone_displacement_value or invalid_parameter_value then
    return false;
end;
$$;

create function private.assert_postponement_payload_valid(p_payload jsonb)
returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'Reservation payload must be an object';
  end if;
  if not private.postponement_payload_is_valid(p_payload) then
    raise exception 'Reservation payload is invalid';
  end if;
  if p_payload->>'cause' = 'other'
     and char_length(btrim(coalesce(p_payload->>'reason', ''))) > 300 then
    raise exception 'Postponement reason is too long';
  end if;
end;
$$;

revoke all on function private.postponement_payload_is_valid(jsonb) from public, anon;
grant execute on function private.postponement_payload_is_valid(jsonb) to authenticated;
revoke all on function private.assert_postponement_payload_valid(jsonb) from public, anon;
grant execute on function private.assert_postponement_payload_valid(jsonb) to authenticated;
