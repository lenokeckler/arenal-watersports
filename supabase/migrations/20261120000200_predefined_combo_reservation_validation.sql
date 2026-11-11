create or replace function private.validate_predefined_combo_request(
  p_payload jsonb
) returns jsonb
language plpgsql security invoker set search_path = public, private
as $$
declare
  reservation_input record;
  authenticated_worker_id uuid;
  reservation_window tstzrange;
begin
  if jsonb_typeof(p_payload) <> 'object' then
    raise exception 'Reservation payload must be an object';
  end if;
  select * into reservation_input from jsonb_to_record(p_payload) as payload(
    combo_id uuid, customer_name text, people_count integer, date date,
    time time without time zone, duration_minutes integer
  );
  if reservation_input.combo_id is null then
    raise exception 'A predefined combo is required';
  end if;
  authenticated_worker_id := validate_reservation_customer(
    reservation_input.customer_name,
    reservation_input.people_count
  );
  reservation_window := validate_reservation_schedule(
    reservation_input.date,
    reservation_input.time,
    reservation_input.duration_minutes
  );
  return jsonb_build_object(
    'combo_id', reservation_input.combo_id,
    'customer_name', btrim(reservation_input.customer_name),
    'people_count', reservation_input.people_count,
    'duration_minutes', reservation_input.duration_minutes,
    'validated_starts_at', lower(reservation_window),
    'validated_worker_id', authenticated_worker_id
  );
end;
$$;

create or replace function private.validate_predefined_combo_reservation(
  p_payload jsonb
) returns jsonb
language plpgsql security invoker set search_path = public, private
as $$
declare
  validated_request jsonb;
  combo_snapshot jsonb;
  validated_price jsonb;
  selected_guide_ids uuid[];
begin
  validated_request := private.validate_predefined_combo_request(p_payload);
  combo_snapshot := private.get_active_predefined_combo_snapshot(
    (validated_request->>'combo_id')::uuid
  );
  if combo_snapshot is null then
    raise exception 'Predefined combo is not active';
  end if;
  perform private.validate_predefined_combo_components(
    combo_snapshot->'items'
  );
  validated_price := private.resolve_predefined_combo_price(
    (combo_snapshot->>'audience')::combo_audience,
    (combo_snapshot->>'package_price_usd')::numeric,
    (combo_snapshot->>'package_price_crc')::numeric
  );
  selected_guide_ids := validate_reservation_guide_assignments(
    p_payload,
    case when (combo_snapshot->>'has_guide_component')::boolean
      then 'tour'::reservation_type
      else 'rental'::reservation_type
    end
  );
  return validated_request || jsonb_build_object(
    'validated_items', combo_snapshot->'items',
    'validated_guide_ids', to_jsonb(selected_guide_ids)
  ) || validated_price;
end;
$$;

revoke all on function private.validate_predefined_combo_request(jsonb) from public, anon;
grant execute on function private.validate_predefined_combo_request(jsonb) to authenticated;
revoke all on function private.validate_predefined_combo_reservation(jsonb) from public, anon;
grant execute on function private.validate_predefined_combo_reservation(jsonb) to authenticated;
