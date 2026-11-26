create function record_reservation_deposit(p_payload jsonb)
returns table (
  recorded_deposit_id uuid,
  recorded_has_deposit boolean,
  recorded_amount numeric,
  recorded_currency currency_code,
  recorded_by_name text
)
language plpgsql security invoker set search_path = public, private
as $$
declare
  v_input record;
  v_reservation reservations;
  v_currency currency_code;
  v_amount numeric;
  v_deposit_id uuid;
begin
  perform require_reservations_access();
  if jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'Reservation payload must be an object';
  end if;
  begin
    select * into v_input from jsonb_to_record(p_payload) as payload(
      reservation_id uuid, has_deposit boolean, currency text, amount numeric
    );
  exception when invalid_text_representation or numeric_value_out_of_range then
    raise exception 'Reservation payload is invalid';
  end;
  select * into v_reservation from reservations where id = v_input.reservation_id for update;
  perform private.assert_reservation_deposit_recordable(v_reservation);
  if v_input.has_deposit is null then
    raise exception 'A deposit decision is required';
  end if;
  if v_input.has_deposit then
    v_currency := private.parse_reservation_charge_currency(v_input.currency);
    v_amount := private.parse_reservation_charge_amount(v_input.amount, v_currency);
    insert into deposits (reservation_id, amount, currency, created_by)
    values (v_reservation.id, v_amount, v_currency, auth.uid())
    returning id into v_deposit_id;
  else
    insert into deposit_declinations (reservation_id, created_by)
    values (v_reservation.id, auth.uid());
  end if;
  return query
  select v_deposit_id, v_input.has_deposit, v_amount, v_currency,
         (select names.full_name from worker_display_names(array[auth.uid()]) names limit 1);
end;
$$;

revoke all on function record_reservation_deposit(jsonb) from public, anon;
grant execute on function record_reservation_deposit(jsonb) to authenticated;
