create function split_reservation(p_payload jsonb)
returns table (departure_id uuid, departure_code text)
language plpgsql security invoker set search_path = public
as $$
declare
  split_input record;
  original reservations;
  departure jsonb;
  item jsonb;
  departure_window tstzrange;
  inserted reservations;
begin
  perform require_reservations_access();
  if jsonb_typeof(p_payload) <> 'object' then raise exception 'Reservation payload must be an object'; end if;
  select * into split_input from jsonb_to_record(p_payload) as payload(
    reservation_id uuid, expected_updated_at timestamptz, departures jsonb
  );
  select * into original from reservations where id = split_input.reservation_id for update;
  perform assert_reservation_splittable(original, split_input.expected_updated_at);
  perform assert_split_departures_shape(split_input.departures);
  perform assert_split_allocations_valid(original.id, split_input.departures);
  perform assert_split_remainder(original, split_input.departures);
  for departure in select value from jsonb_array_elements(split_input.departures) loop
    departure_window := validate_reservation_schedule(
      (original.starts_at at time zone 'America/Costa_Rica')::date,
      (departure->>'time')::time, original.duration_minutes
    );
    perform assert_split_departure_units_available(original.id, departure->'items', departure_window);
    inserted := insert_split_departure(original, departure, departure_window);
    for item in select value from jsonb_array_elements(departure->'items') loop
      perform place_split_item((item->>'item_id')::uuid, inserted.id, (item->>'quantity')::integer);
    end loop;
    departure_id := inserted.id;
    departure_code := inserted.code;
    return next;
  end loop;
  update reservations
  set people_count = people_count - (
    select sum((moved.value->>'people_count')::integer)
    from jsonb_array_elements(split_input.departures) as moved(value)
  )
  where id = original.id;
end;
$$;

revoke all on function split_reservation(jsonb) from public, anon;
grant execute on function split_reservation(jsonb) to authenticated;
