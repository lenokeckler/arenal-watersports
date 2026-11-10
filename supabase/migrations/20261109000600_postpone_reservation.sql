create function postpone_reservation(p_payload jsonb)
returns uuid
language plpgsql security invoker set search_path = public
as $$
declare
  postponement_input record;
  target_reservation reservations;
  new_window tstzrange;
  was_dispatched boolean;
  postponement_id uuid;
begin
  perform require_reservations_access();
  perform private.assert_postponement_payload_valid(p_payload);
  select * into postponement_input from jsonb_to_record(p_payload) as payload(
    reservation_id uuid, date date, time time without time zone, cause reservation_postponement_cause,
    reason text, expected_updated_at timestamptz, readings jsonb
  );
  select * into target_reservation from reservations where id = postponement_input.reservation_id for update;
  perform assert_reservation_postponable(target_reservation, postponement_input.expected_updated_at, postponement_input.cause);
  perform assert_postponement_reason(postponement_input.cause, postponement_input.reason);
  new_window := validate_reservation_schedule(postponement_input.date, postponement_input.time, target_reservation.duration_minutes);
  perform assert_postponement_start(target_reservation, lower(new_window));
  was_dispatched := target_reservation.status = 'dispatched';
  update reservations
  set status = 'scheduled', starts_at = lower(new_window), dispatched_at = null, closed_at = null
  where id = target_reservation.id;
  insert into reservation_postponements
    (reservation_id, cause, reason, was_dispatched, previous_starts_at, new_starts_at)
  values (
    target_reservation.id, postponement_input.cause,
    case when postponement_input.cause = 'other' then btrim(postponement_input.reason) end,
    was_dispatched, target_reservation.starts_at, lower(new_window)
  )
  returning id into postponement_id;
  if was_dispatched then
    perform private.release_dispatched_reservation(
      target_reservation.id, postponement_id, coalesce(postponement_input.readings, '[]'::jsonb)
    );
  end if;
  perform private.assert_postponed_reservation_fits(target_reservation.id, new_window);
  return target_reservation.id;
end;
$$;

revoke all on function postpone_reservation(jsonb) from public, anon;
grant execute on function postpone_reservation(jsonb) to authenticated;
