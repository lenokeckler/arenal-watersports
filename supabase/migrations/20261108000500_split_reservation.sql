create function split_departure_into_reservation(
  p_original reservations,
  p_departure jsonb,
  p_date date
) returns reservations
language plpgsql security invoker set search_path = public
as $$
declare
  departure_window tstzrange;
  inserted reservations;
  item jsonb;
begin
  if jsonb_typeof(p_departure->'time') is distinct from 'string'
     or p_departure->>'time' !~ '^([01]?[0-9]|2[0-3]):[0-5][0-9]$' then
    raise exception 'A valid reservation date and time are required';
  end if;
  departure_window := validate_reservation_schedule(
    p_date, (p_departure->>'time')::time, p_original.duration_minutes
  );
  perform assert_split_departure_units_available(p_original.id, p_departure->'items', departure_window);
  inserted := insert_split_departure(p_original, p_departure, departure_window);
  for item in select value from jsonb_array_elements(p_departure->'items') loop
    perform place_split_item((item->>'item_id')::uuid, inserted.id, (item->>'quantity')::integer);
  end loop;
  return inserted;
end;
$$;

create function split_reservation(p_payload jsonb)
returns table (departure_id uuid, departure_code text)
language plpgsql security invoker set search_path = public
as $$
declare
  split_input record;
  original reservations;
  departure jsonb;
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
    inserted := split_departure_into_reservation(
      original, departure, (original.starts_at at time zone 'America/Costa_Rica')::date
    );
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
revoke all on function split_departure_into_reservation(reservations, jsonb, date) from public, anon;
grant execute on function split_departure_into_reservation(reservations, jsonb, date) to authenticated;
