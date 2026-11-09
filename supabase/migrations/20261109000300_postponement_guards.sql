create function assert_reservation_postponable(
  p_reservation reservations,
  p_expected_updated_at timestamptz,
  p_cause reservation_postponement_cause
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_reservation.id is null then
    raise exception 'Reservation was not found';
  end if;
  if p_reservation.status not in ('scheduled', 'dispatched') then
    raise exception 'Only scheduled or dispatched reservations can be postponed';
  end if;
  if p_reservation.updated_at is distinct from p_expected_updated_at then
    raise exception 'Reservation changed since the form was loaded';
  end if;
  if p_cause is null then
    raise exception 'A postponement cause is required';
  end if;
  if p_reservation.status = 'dispatched' and p_cause = 'other' then
    raise exception 'Dispatched reservations can only be postponed for weather';
  end if;
end;
$$;

create function assert_postponement_start(
  p_reservation reservations,
  p_new_start timestamptz
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_new_start is null
     or p_new_start <= p_reservation.starts_at
     or p_new_start <= now() then
    raise exception 'New start must be later than the current start and now';
  end if;
end;
$$;

create function assert_postponement_reason(
  p_cause reservation_postponement_cause,
  p_reason text
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_cause = 'other' and length(btrim(coalesce(p_reason, ''))) = 0 then
    raise exception 'Postponement reason is required';
  end if;
end;
$$;

revoke all on function assert_reservation_postponable(reservations, timestamptz, reservation_postponement_cause) from public, anon;
grant execute on function assert_reservation_postponable(reservations, timestamptz, reservation_postponement_cause) to authenticated;
revoke all on function assert_postponement_start(reservations, timestamptz) from public, anon;
grant execute on function assert_postponement_start(reservations, timestamptz) to authenticated;
revoke all on function assert_postponement_reason(reservation_postponement_cause, text) from public, anon;
grant execute on function assert_postponement_reason(reservation_postponement_cause, text) to authenticated;
