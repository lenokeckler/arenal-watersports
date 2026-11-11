create function assert_reservation_cancellable(
  p_reservation reservations,
  p_expected_updated_at timestamptz
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_reservation.id is null then
    raise exception 'Reservation was not found';
  end if;
  if p_reservation.status <> 'scheduled' then
    raise exception 'Only scheduled reservations can be cancelled';
  end if;
  if p_reservation.updated_at is distinct from p_expected_updated_at then
    raise exception 'Reservation changed since the form was loaded';
  end if;
end;
$$;

create function normalize_cancellation_reason(p_reason text)
returns text
language plpgsql immutable security invoker set search_path = public
as $$
declare
  v_reason text := btrim(coalesce(p_reason, ''));
begin
  if v_reason = '' then
    raise exception 'A cancellation reason is required';
  end if;
  if char_length(v_reason) > 300 then
    raise exception 'Cancellation reason is too long';
  end if;
  return v_reason;
end;
$$;

create function cancel_reservation(p_payload jsonb)
returns uuid
language plpgsql security invoker set search_path = public
as $$
declare
  v_input record;
  v_reservation reservations;
  v_reason text;
begin
  perform require_reservations_access();
  if jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'Reservation payload must be an object';
  end if;
  begin
    select * into v_input from jsonb_to_record(p_payload) as payload(
      reservation_id uuid, reason text, expected_updated_at timestamptz
    );
  exception when invalid_text_representation or invalid_datetime_format or datetime_field_overflow then
    raise exception 'Reservation payload is invalid';
  end;
  select * into v_reservation from reservations where id = v_input.reservation_id for update;
  perform assert_reservation_cancellable(v_reservation, v_input.expected_updated_at);
  v_reason := normalize_cancellation_reason(v_input.reason);
  update reservations
  set status = 'cancelled', cancellation_reason = v_reason
  where id = v_reservation.id;
  return v_reservation.id;
end;
$$;

revoke all on function assert_reservation_cancellable(reservations, timestamptz) from public, anon;
grant execute on function assert_reservation_cancellable(reservations, timestamptz) to authenticated;
revoke all on function normalize_cancellation_reason(text) from public, anon;
grant execute on function normalize_cancellation_reason(text) to authenticated;
revoke all on function cancel_reservation(jsonb) from public, anon;
grant execute on function cancel_reservation(jsonb) to authenticated;
