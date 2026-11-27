create function private.normalize_reservation_refund_reason(p_reason text)
returns text
language plpgsql immutable security invoker set search_path = public
as $$
declare
  c_max_length constant integer := 200;
  c_invisible_characters constant text :=
    '[:space:]\u00a0\u00ad\u061c\u1680\u180e\u2000-\u200f\u2028-\u202f\u205f-\u206f\u3000\ufeff';
  c_edge_whitespace constant text :=
    '^[' || c_invisible_characters || ']+|[' || c_invisible_characters || ']+$';
  c_control_characters constant text := '[[:cntrl:]]';
  v_reason text := regexp_replace(coalesce(p_reason, ''), c_edge_whitespace, '', 'g');
begin
  if v_reason = '' then
    raise exception 'A refund reason is required';
  end if;
  if v_reason ~ c_control_characters then
    raise exception 'Refund reason is invalid';
  end if;
  if char_length(v_reason) > c_max_length then
    raise exception 'Refund reason is too long';
  end if;
  return v_reason;
end;
$$;

create function record_reservation_refund(p_payload jsonb)
returns table (
  refund_id uuid,
  refunded_amount numeric,
  refunded_currency currency_code,
  refunded_reason text,
  remaining_amount numeric,
  recorded_by_name text
)
language plpgsql security invoker set search_path = public, private
as $$
declare
  c_reason_key constant text := 'reason';
  c_reason_json_types constant text[] := array['string', 'null'];
  v_input record;
  v_reservation reservations;
  v_currency currency_code;
  v_amount numeric;
  v_reason text;
  v_net numeric;
  v_refund_id uuid;
begin
  perform require_reservations_access();
  if jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'Reservation payload must be an object';
  end if;
  if jsonb_typeof(p_payload -> c_reason_key) <> all (c_reason_json_types) then
    raise exception 'Refund reason is invalid';
  end if;
  begin
    select * into v_input from jsonb_to_record(p_payload) as payload(
      reservation_id uuid, currency text, amount numeric, reason text
    );
  exception when invalid_text_representation or numeric_value_out_of_range then
    raise exception 'Reservation payload is invalid';
  end;
  select * into v_reservation from reservations where id = v_input.reservation_id for update;
  if v_reservation.id is null then
    raise exception 'Reservation was not found';
  end if;
  v_currency := private.parse_reservation_charge_currency(v_input.currency);
  v_amount := private.parse_reservation_charge_amount(v_input.amount, v_currency);
  v_reason := private.normalize_reservation_refund_reason(v_input.reason);
  v_net := private.reservation_refundable_amount(v_reservation.id, v_currency);
  if v_amount > v_net then
    raise exception 'Refund amount exceeds the refundable net';
  end if;
  insert into refunds (reservation_id, amount, currency, reason, created_by)
  values (v_reservation.id, v_amount, v_currency, v_reason, auth.uid())
  returning id into v_refund_id;
  return query
  select v_refund_id, v_amount, v_currency, v_reason, v_net - v_amount,
         (select names.full_name from worker_display_names(array[auth.uid()]) names limit 1);
end;
$$;

revoke all on function private.normalize_reservation_refund_reason(text) from public, anon;
grant execute on function private.normalize_reservation_refund_reason(text) to authenticated;
revoke all on function record_reservation_refund(jsonb) from public, anon;
grant execute on function record_reservation_refund(jsonb) to authenticated;
