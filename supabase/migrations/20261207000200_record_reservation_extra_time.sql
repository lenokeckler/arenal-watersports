create function private.parse_extra_time_outcome(p_outcome text)
returns extra_time_outcome
language plpgsql immutable security invoker set search_path = public
as $$
begin
  if p_outcome is null or p_outcome not in ('charged', 'courtesy') then
    raise exception 'Extra time outcome is invalid';
  end if;
  return p_outcome::extra_time_outcome;
end;
$$;

create function private.assert_extra_time_resolvable(p_reservation reservations)
returns integer
language plpgsql stable security invoker set search_path = public
as $$
declare
  v_minutes integer;
begin
  if p_reservation.id is null then
    raise exception 'Reservation was not found';
  end if;
  if p_reservation.status <> 'closed' then
    raise exception 'Extra time is resolved once every group is back';
  end if;
  if exists (
    select 1 from reservation_extra_time_resolutions r where r.reservation_id = p_reservation.id
  ) then
    raise exception 'Extra time was already resolved';
  end if;
  select coalesce(sum(g.extra_minutes), 0)::integer into v_minutes
  from reservation_extra_time_groups(p_reservation.id) g;
  if v_minutes = 0 then
    raise exception 'The reservation has no extra time';
  end if;
  return v_minutes;
end;
$$;

create function record_reservation_extra_time(p_payload jsonb)
returns table (
  outcome extra_time_outcome,
  extra_minutes integer,
  charge_id uuid,
  charged_amount numeric,
  charged_currency currency_code,
  charged_payment_method text,
  recorded_by_name text
)
language plpgsql security invoker set search_path = public, private
as $$
declare
  v_input record;
  v_reservation reservations;
  v_outcome extra_time_outcome;
  v_minutes integer;
  v_currency currency_code;
  v_amount numeric;
  v_method text;
  v_charge_id uuid;
  v_name text;
begin
  perform require_reservations_access();
  if jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'Reservation payload must be an object';
  end if;
  begin
    select * into v_input from jsonb_to_record(p_payload) as payload(
      reservation_id uuid, outcome text, currency text, amount numeric, payment_method text
    );
  exception when invalid_text_representation or numeric_value_out_of_range then
    raise exception 'Reservation payload is invalid';
  end;
  v_outcome := private.parse_extra_time_outcome(v_input.outcome);
  select * into v_reservation from reservations where id = v_input.reservation_id for update;
  v_minutes := private.assert_extra_time_resolvable(v_reservation);
  if v_outcome = 'charged' then
    v_currency := private.parse_reservation_charge_currency(v_input.currency);
    v_amount := private.parse_reservation_charge_amount(v_input.amount, v_currency);
    v_method := private.normalize_reservation_charge_payment_method(v_input.payment_method);
    insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
    values (v_reservation.id, 'extra_time', v_amount, v_currency, v_method, auth.uid())
    returning id into v_charge_id;
  elsif v_input.amount is not null or v_input.currency is not null or v_input.payment_method is not null then
    raise exception 'A courtesy carries no charge';
  end if;
  insert into reservation_extra_time_resolutions (reservation_id, outcome, extra_minutes, charge_id, created_by)
  values (v_reservation.id, v_outcome, v_minutes, v_charge_id, auth.uid());
  select names.full_name into v_name from worker_display_names(array[auth.uid()]) names limit 1;
  return query select v_outcome, v_minutes, v_charge_id, v_amount, v_currency, v_method, v_name;
end;
$$;

revoke all on function private.parse_extra_time_outcome(text) from public, anon;
grant execute on function private.parse_extra_time_outcome(text) to authenticated;
revoke all on function private.assert_extra_time_resolvable(reservations) from public, anon;
grant execute on function private.assert_extra_time_resolvable(reservations) to authenticated;
revoke all on function record_reservation_extra_time(jsonb) from public, anon;
grant execute on function record_reservation_extra_time(jsonb) to authenticated;
