create function private.reservation_deposit_decided(p_reservation_id uuid)
returns boolean
language sql stable security invoker set search_path = public
as $$
  select exists (select 1 from deposits where deposits.reservation_id = p_reservation_id)
      or exists (select 1 from deposit_declinations where deposit_declinations.reservation_id = p_reservation_id);
$$;

create function private.assert_reservation_deposit_recordable(p_reservation reservations)
returns void
language plpgsql security invoker set search_path = public, private
as $$
begin
  if p_reservation.id is null then
    raise exception 'Reservation was not found';
  end if;
  if p_reservation.status not in ('scheduled', 'dispatched') then
    raise exception 'Only scheduled or dispatched reservations can record a deposit';
  end if;
  if p_reservation.parent_reservation_id is not null then
    raise exception 'A split reservation keeps its deposit on the original reservation';
  end if;
  if private.reservation_deposit_decided(p_reservation.id) then
    raise exception 'A deposit decision was already recorded';
  end if;
end;
$$;

revoke all on function private.reservation_deposit_decided(uuid) from public, anon;
grant execute on function private.reservation_deposit_decided(uuid) to authenticated;
revoke all on function private.assert_reservation_deposit_recordable(reservations) from public, anon;
grant execute on function private.assert_reservation_deposit_recordable(reservations) to authenticated;
