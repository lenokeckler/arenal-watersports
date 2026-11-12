create function update_reservation(p_payload jsonb)
returns uuid
language plpgsql security invoker set search_path = public
as $$
declare
  reservation_input record;
  target_reservation reservations;
  reservation_window tstzrange;
  equipment_changed boolean;
  window_changed boolean;
begin
  perform require_reservations_access();
  if jsonb_typeof(p_payload) <> 'object' then raise exception 'Reservation payload must be an object'; end if;
  select * into reservation_input from jsonb_to_record(p_payload) as payload(
    reservation_id uuid, people_count integer, time time without time zone, duration_minutes integer,
    category_id uuid, quantity integer, unit_id uuid, expected_updated_at timestamptz
  );
  select * into target_reservation from reservations where id = reservation_input.reservation_id for update;
  perform assert_reservation_modifiable(target_reservation, reservation_input.expected_updated_at);
  if reservation_input.people_count is null or reservation_input.people_count <= 0 then raise exception 'People count must be positive'; end if;
  reservation_window := validate_reservation_schedule((target_reservation.starts_at at time zone 'America/Costa_Rica')::date, reservation_input.time, reservation_input.duration_minutes);
  equipment_changed := reservation_equipment_differs(target_reservation.id, reservation_input.category_id, reservation_input.quantity, reservation_input.unit_id);
  window_changed := lower(reservation_window) <> date_trunc('minute', target_reservation.starts_at)
    or reservation_input.duration_minutes <> target_reservation.duration_minutes;
  if not equipment_changed and not window_changed and reservation_input.people_count = target_reservation.people_count then
    return target_reservation.id;
  end if;
  if equipment_changed then
    perform replace_reservation_equipment(target_reservation, reservation_input.category_id, reservation_input.quantity, reservation_input.unit_id);
  end if;
  if equipment_changed or window_changed then
    perform assert_reservation_units_available(target_reservation.id, reservation_window);
  end if;
  update reservations
  set people_count = reservation_input.people_count, starts_at = lower(reservation_window), duration_minutes = reservation_input.duration_minutes
  where id = target_reservation.id;
  return target_reservation.id;
end;
$$;

revoke all on function update_reservation(jsonb) from public, anon;
grant execute on function update_reservation(jsonb) to authenticated;
