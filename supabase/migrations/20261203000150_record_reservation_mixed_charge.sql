create or replace function record_reservation_charge(p_payload jsonb)
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
  v_currencies currency_code[];
  v_amounts numeric[];
  v_method text;
  v_name text;
  v_charge_id uuid;
  v_index integer;
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
  select array_agg(part.part_currency order by part.position), array_agg(part.part_amount order by part.position)
  into v_currencies, v_amounts
  from private.resolve_reservation_charge_parts(p_payload, v_input.currency, v_input.amount)
       with ordinality as part(part_currency, part_amount, position);
  v_method := private.normalize_reservation_charge_payment_method(v_input.payment_method);
  select names.full_name into v_name from worker_display_names(array[auth.uid()]) names limit 1;
  for v_index in 1 .. cardinality(v_currencies) loop
    v_charge_id := private.record_reservation_charge_part(
      v_reservation.id, v_currencies[v_index], v_amounts[v_index], v_method
    );
    return query select v_charge_id, v_amounts[v_index], v_currencies[v_index], v_method, v_name;
  end loop;
end;
$$;

revoke all on function record_reservation_charge(jsonb) from public, anon;
grant execute on function record_reservation_charge(jsonb) to authenticated;
