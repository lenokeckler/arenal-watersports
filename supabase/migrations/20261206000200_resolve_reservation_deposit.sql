create function resolve_reservation_deposit(p_payload jsonb)
returns table (
  resolved_deposit_id uuid,
  resolved_status deposit_status,
  deposit_amount numeric,
  returned_amount numeric,
  kept_amount numeric,
  resolved_currency currency_code,
  resolved_reason text,
  resolved_by_name text
)
language plpgsql security invoker set search_path = public, private
as $$
declare
  c_reason_key constant text := 'reason';
  c_reason_json_types constant text[] := array['string', 'null'];
  v_input record;
  v_deposit deposits;
  v_reservation reservations;
  v_returned numeric;
  v_kept numeric;
  v_reason text;
  v_status deposit_status;
begin
  perform require_reservations_access();
  if jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'Deposit payload must be an object';
  end if;
  if jsonb_typeof(p_payload -> c_reason_key) <> all (c_reason_json_types) then
    raise exception 'Damage reason is invalid';
  end if;
  begin
    select * into v_input from jsonb_to_record(p_payload) as payload(
      deposit_id uuid, returned_amount numeric, reason text
    );
  exception when invalid_text_representation or numeric_value_out_of_range then
    raise exception 'Deposit payload is invalid';
  end;
  select * into v_deposit from deposits where id = v_input.deposit_id for update;
  select * into v_reservation from reservations where id = v_deposit.reservation_id;
  perform private.assert_deposit_resolvable(v_deposit, v_reservation);
  v_returned := private.parse_deposit_returned_amount(v_input.returned_amount, v_deposit.amount);
  v_kept := v_deposit.amount - v_returned;
  if v_kept = 0 then
    v_status := 'returned';
  else
    v_reason := private.normalize_deposit_damage_reason(v_input.reason);
    v_status := case when v_returned = 0 then 'retained' else 'partially_retained' end;
  end if;
  update deposits
  set status = v_status,
      retained_amount = nullif(v_kept, 0),
      retention_reason = v_reason,
      resolved_by = auth.uid(),
      resolved_at = now()
  where id = v_deposit.id;
  return query
  select v_deposit.id, v_status, v_deposit.amount, v_returned, v_kept, v_deposit.currency, v_reason,
         (select names.full_name from worker_display_names(array[auth.uid()]) names limit 1);
end;
$$;

revoke all on function resolve_reservation_deposit(jsonb) from public, anon;
grant execute on function resolve_reservation_deposit(jsonb) to authenticated;
