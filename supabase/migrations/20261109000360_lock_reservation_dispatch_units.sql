create function private.lock_reservation_dispatch_units(p_reservation_id uuid) returns void
language plpgsql security definer set search_path = public
as $$
begin
  perform require_reservations_access();
  perform 1
    from reservation_items i
    join equipment_units u on u.id = i.unit_id
   where i.reservation_id = p_reservation_id
     and i.dispatch_id is not null
   order by u.id, i.id
     for update of i, u;
end;
$$;

revoke all on function private.lock_reservation_dispatch_units(uuid) from public, anon;
grant execute on function private.lock_reservation_dispatch_units(uuid) to authenticated;
