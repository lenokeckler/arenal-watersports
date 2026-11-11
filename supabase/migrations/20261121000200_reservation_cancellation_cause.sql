create type cancellation_cause as enum ('weather', 'trip_problem');

alter table reservations add column cancellation_cause cancellation_cause;

alter table reservations add constraint reservations_cancellation_cause_only_when_cancelled
  check (cancellation_cause is null or status = 'cancelled');

create function normalize_cancellation_cause(p_cause text, p_status reservation_status)
returns cancellation_cause
language plpgsql stable security invoker set search_path = public
as $$
declare
  v_cause text := btrim(coalesce(p_cause, ''));
begin
  if p_status = 'dispatched' then
    if v_cause = '' then
      raise exception 'A cancellation cause is required for a dispatched reservation';
    end if;
    begin
      return v_cause::cancellation_cause;
    exception when invalid_text_representation then
      raise exception 'Cancellation cause is invalid';
    end;
  end if;
  if v_cause <> '' then
    raise exception 'A cancellation cause only applies to a dispatched reservation';
  end if;
  return null;
end;
$$;

create or replace function assert_reservation_cancellable(
  p_reservation reservations,
  p_expected_updated_at timestamptz
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_reservation.id is null then
    raise exception 'Reservation was not found';
  end if;
  if p_reservation.status not in ('scheduled', 'dispatched') then
    raise exception 'Only scheduled or dispatched reservations can be cancelled';
  end if;
  if p_reservation.updated_at is distinct from p_expected_updated_at then
    raise exception 'Reservation changed since the form was loaded';
  end if;
end;
$$;

create or replace function cancel_reservation(p_payload jsonb)
returns uuid
language plpgsql security invoker set search_path = public
as $$
declare
  v_input record;
  v_reservation reservations;
  v_reason text;
  v_cause cancellation_cause;
begin
  perform require_reservations_access();
  if jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'Reservation payload must be an object';
  end if;
  begin
    select * into v_input from jsonb_to_record(p_payload) as payload(
      reservation_id uuid, reason text, cause text, expected_updated_at timestamptz
    );
  exception when invalid_text_representation or invalid_datetime_format or datetime_field_overflow then
    raise exception 'Reservation payload is invalid';
  end;
  select * into v_reservation from reservations where id = v_input.reservation_id for update;
  perform assert_reservation_cancellable(v_reservation, v_input.expected_updated_at);
  v_reason := normalize_cancellation_reason(v_input.reason);
  v_cause := normalize_cancellation_cause(v_input.cause, v_reservation.status);
  update reservations
  set status = 'cancelled', cancellation_reason = v_reason, cancellation_cause = v_cause
  where id = v_reservation.id;
  return v_reservation.id;
end;
$$;

revoke all on function normalize_cancellation_cause(text, reservation_status) from public, anon;
grant execute on function normalize_cancellation_cause(text, reservation_status) to authenticated;
revoke all on function assert_reservation_cancellable(reservations, timestamptz) from public, anon;
grant execute on function assert_reservation_cancellable(reservations, timestamptz) to authenticated;
revoke all on function cancel_reservation(jsonb) from public, anon;
grant execute on function cancel_reservation(jsonb) to authenticated;
