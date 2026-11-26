create function private.resolve_reservation_charge_parts(p_payload jsonb, p_currency text, p_amount numeric)
returns table (part_currency currency_code, part_amount numeric)
language plpgsql security invoker set search_path = public
as $$
declare
  c_max_parts constant integer := 2;
  v_parts jsonb := p_payload -> 'parts';
  v_currency currency_code;
begin
  if not p_payload ? 'parts' then
    v_currency := private.parse_reservation_charge_currency(p_currency);
    return query select v_currency, private.parse_reservation_charge_amount(p_amount, v_currency);
    return;
  end if;
  if jsonb_typeof(v_parts) is distinct from 'array'
     or jsonb_array_length(v_parts) not between 1 and c_max_parts
     or exists (select 1 from jsonb_array_elements(v_parts) element where jsonb_typeof(element) <> 'object') then
    raise exception 'Charge parts are invalid';
  end if;
  perform private.parse_reservation_charge_currency(element ->> 'currency')
  from jsonb_array_elements(v_parts) element;
  if (select count(distinct element ->> 'currency') from jsonb_array_elements(v_parts) element)
     <> jsonb_array_length(v_parts) then
    raise exception 'Charge parts are invalid';
  end if;
  begin
    return query
    select private.parse_reservation_charge_currency(part.element ->> 'currency'),
           private.parse_reservation_charge_amount(
             (part.element ->> 'amount')::numeric,
             private.parse_reservation_charge_currency(part.element ->> 'currency'))
    from jsonb_array_elements(v_parts) with ordinality as part(element, position)
    order by part.position;
  exception when invalid_text_representation or numeric_value_out_of_range then
    raise exception 'Reservation payload is invalid';
  end;
end;
$$;

create function private.record_reservation_charge_part(
  p_reservation_id uuid,
  p_currency currency_code,
  p_amount numeric,
  p_method text
) returns uuid
language plpgsql security invoker set search_path = public
as $$
declare
  v_proposal numeric;
  v_first_in_currency boolean;
  v_charge_id uuid;
begin
  select case when p_currency = 'USD' then proposal.proposal_usd else proposal.proposal_crc end
  into v_proposal
  from reservation_charge_proposal(p_reservation_id) proposal;
  v_first_in_currency := not exists (
    select 1 from reservation_charges existing
    where existing.reservation_id = p_reservation_id
      and existing.kind = 'tariff'
      and existing.currency = p_currency
  );
  insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
  values (p_reservation_id, 'tariff', p_amount, p_currency, p_method, auth.uid())
  returning id into v_charge_id;
  if v_first_in_currency then
    perform private.record_reservation_charge_pricing(p_reservation_id, p_currency, p_amount, v_proposal);
  end if;
  return v_charge_id;
end;
$$;

revoke all on function private.resolve_reservation_charge_parts(jsonb, text, numeric) from public, anon;
grant execute on function private.resolve_reservation_charge_parts(jsonb, text, numeric) to authenticated;
revoke all on function private.record_reservation_charge_part(uuid, currency_code, numeric, text) from public, anon;
grant execute on function private.record_reservation_charge_part(uuid, currency_code, numeric, text) to authenticated;
