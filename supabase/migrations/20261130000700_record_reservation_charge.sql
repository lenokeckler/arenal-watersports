create function private.record_reservation_charge_pricing(
  p_reservation_id uuid,
  p_currency currency_code,
  p_amount numeric,
  p_proposal numeric
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  v_differs boolean := p_amount is distinct from p_proposal;
begin
  insert into reservation_pricing
    (reservation_id, list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc)
  values (
    p_reservation_id,
    case when p_currency = 'USD' then p_proposal end,
    case when p_currency = 'CRC' then p_proposal end,
    case when p_currency = 'USD' and v_differs then p_amount end,
    case when p_currency = 'CRC' and v_differs then p_amount end
  )
  on conflict (reservation_id) do update
  set list_amount_usd = case when p_currency = 'USD'
        then coalesce(reservation_pricing.list_amount_usd, p_proposal) else reservation_pricing.list_amount_usd end,
      list_amount_crc = case when p_currency = 'CRC'
        then coalesce(reservation_pricing.list_amount_crc, p_proposal) else reservation_pricing.list_amount_crc end,
      agreed_amount_usd = case when p_currency = 'USD' and v_differs
        then p_amount else reservation_pricing.agreed_amount_usd end,
      agreed_amount_crc = case when p_currency = 'CRC' and v_differs
        then p_amount else reservation_pricing.agreed_amount_crc end;
end;
$$;

create function record_reservation_charge(p_payload jsonb)
returns table (
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
  v_currency currency_code;
  v_amount numeric;
  v_method text;
  v_proposal numeric;
  v_first_in_currency boolean;
  v_charge_id uuid;
begin
  perform require_reservations_access();
  if jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'Reservation payload must be an object';
  end if;
  begin
    select * into v_input from jsonb_to_record(p_payload) as payload(
      reservation_id uuid, currency text, amount numeric, payment_method text
    );
  exception when invalid_text_representation or numeric_value_out_of_range then
    raise exception 'Reservation payload is invalid';
  end;
  select * into v_reservation from reservations where id = v_input.reservation_id for update;
  perform private.assert_reservation_chargeable(v_reservation);
  v_currency := private.parse_reservation_charge_currency(v_input.currency);
  v_amount := private.parse_reservation_charge_amount(v_input.amount, v_currency);
  v_method := private.normalize_reservation_charge_payment_method(v_input.payment_method);
  select case when v_currency = 'USD' then proposal.proposal_usd else proposal.proposal_crc end
  into v_proposal
  from reservation_charge_proposal(v_reservation.id) proposal;
  v_first_in_currency := not exists (
    select 1 from reservation_charges existing
    where existing.reservation_id = v_reservation.id
      and existing.kind = 'tariff'
      and existing.currency = v_currency
  );
  insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
  values (v_reservation.id, 'tariff', v_amount, v_currency, v_method, auth.uid())
  returning id into v_charge_id;
  if v_first_in_currency then
    perform private.record_reservation_charge_pricing(v_reservation.id, v_currency, v_amount, v_proposal);
  end if;
  return query
  select v_charge_id, v_amount, v_currency, v_method,
         (select names.full_name from worker_display_names(array[auth.uid()]) names limit 1);
end;
$$;

revoke all on function private.record_reservation_charge_pricing(uuid, currency_code, numeric, numeric) from public, anon;
grant execute on function private.record_reservation_charge_pricing(uuid, currency_code, numeric, numeric) to authenticated;
revoke all on function record_reservation_charge(jsonb) from public, anon;
grant execute on function record_reservation_charge(jsonb) to authenticated;
