create function private.normalize_deposit_damage_reason(p_reason text)
returns text
language plpgsql immutable security invoker set search_path = public
as $$
declare
  c_max_length constant integer := 200;
  c_invisible_characters constant text :=
    '[:space:] ­؜ ᠎ -‏ -  -⁯　﻿';
  c_edge_whitespace constant text :=
    '^[' || c_invisible_characters || ']+|[' || c_invisible_characters || ']+$';
  c_control_characters constant text := '[[:cntrl:]]';
  v_reason text := regexp_replace(coalesce(p_reason, ''), c_edge_whitespace, '', 'g');
begin
  if v_reason = '' then
    raise exception 'A damage reason is required';
  end if;
  if v_reason ~ c_control_characters then
    raise exception 'Damage reason is invalid';
  end if;
  if char_length(v_reason) > c_max_length then
    raise exception 'Damage reason is too long';
  end if;
  return v_reason;
end;
$$;

create function private.parse_deposit_returned_amount(p_returned numeric, p_deposit numeric)
returns numeric
language plpgsql immutable security invoker set search_path = public
as $$
declare
  c_decimal_places constant integer := 2;
begin
  if p_returned is null or p_returned < 0 or p_returned <> round(p_returned, c_decimal_places) then
    raise exception 'Returned amount is invalid';
  end if;
  if p_returned > p_deposit then
    raise exception 'Returned amount exceeds the deposit';
  end if;
  return p_returned;
end;
$$;

create function private.assert_deposit_resolvable(p_deposit deposits, p_reservation reservations)
returns void
language plpgsql stable security invoker set search_path = public
as $$
begin
  if p_deposit.id is null then
    raise exception 'Deposit was not found';
  end if;
  if p_deposit.status <> 'held' then
    raise exception 'Deposit was already resolved';
  end if;
  if p_reservation.status not in ('closed', 'cancelled') then
    raise exception 'Only closed or cancelled reservations can resolve a deposit';
  end if;
end;
$$;

revoke all on function private.normalize_deposit_damage_reason(text) from public, anon;
grant execute on function private.normalize_deposit_damage_reason(text) to authenticated;
revoke all on function private.parse_deposit_returned_amount(numeric, numeric) from public, anon;
grant execute on function private.parse_deposit_returned_amount(numeric, numeric) to authenticated;
revoke all on function private.assert_deposit_resolvable(deposits, reservations) from public, anon;
grant execute on function private.assert_deposit_resolvable(deposits, reservations) to authenticated;
