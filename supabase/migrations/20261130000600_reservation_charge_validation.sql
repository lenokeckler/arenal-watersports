create function private.parse_reservation_charge_currency(p_currency text)
returns currency_code
language plpgsql immutable security invoker set search_path = public
as $$
begin
  if p_currency is null or p_currency not in ('USD', 'CRC') then
    raise exception 'Charge currency is invalid';
  end if;
  return p_currency::currency_code;
end;
$$;

create function private.parse_reservation_charge_amount(p_amount numeric, p_currency currency_code)
returns numeric
language plpgsql immutable security invoker set search_path = public
as $$
declare
  c_decimal_places constant integer := 2;
  c_usd_ceiling constant numeric := 10000000000;
  c_crc_ceiling constant numeric := 1000000000000;
  v_ceiling numeric := case p_currency when 'USD' then c_usd_ceiling else c_crc_ceiling end;
begin
  if p_amount is null or p_amount <= 0 or p_amount <> round(p_amount, c_decimal_places) or p_amount >= v_ceiling then
    raise exception 'Charge amount is invalid';
  end if;
  return p_amount;
end;
$$;

create function private.normalize_reservation_charge_payment_method(p_method text)
returns text
language plpgsql immutable security invoker set search_path = public
as $$
declare
  c_max_length constant integer := 60;
  c_edge_whitespace constant text := '^[[:space:]]+|[[:space:]]+$';
  v_method text := regexp_replace(coalesce(p_method, ''), c_edge_whitespace, '', 'g');
begin
  if v_method = '' then
    raise exception 'A payment method is required';
  end if;
  if v_method ~ '[[:cntrl:]]' then
    raise exception 'Payment method is invalid';
  end if;
  if char_length(v_method) > c_max_length then
    raise exception 'Payment method is too long';
  end if;
  return v_method;
end;
$$;

create function private.assert_reservation_chargeable(p_reservation reservations)
returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_reservation.id is null then
    raise exception 'Reservation was not found';
  end if;
  if p_reservation.status = 'cancelled' then
    raise exception 'Only scheduled, dispatched or closed reservations can be charged';
  end if;
  if p_reservation.parent_reservation_id is not null then
    raise exception 'A split reservation is charged on the original reservation';
  end if;
end;
$$;

revoke all on function private.parse_reservation_charge_currency(text) from public, anon;
grant execute on function private.parse_reservation_charge_currency(text) to authenticated;
revoke all on function private.parse_reservation_charge_amount(numeric, currency_code) from public, anon;
grant execute on function private.parse_reservation_charge_amount(numeric, currency_code) to authenticated;
revoke all on function private.normalize_reservation_charge_payment_method(text) from public, anon;
grant execute on function private.normalize_reservation_charge_payment_method(text) to authenticated;
revoke all on function private.assert_reservation_chargeable(reservations) from public, anon;
grant execute on function private.assert_reservation_chargeable(reservations) to authenticated;
