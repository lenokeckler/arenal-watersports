create function private.release_dispatched_reservation(
  p_reservation_id uuid,
  p_postponement_id uuid,
  p_readings jsonb
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  perform 1 from reservations where id = p_reservation_id and status = 'scheduled' for update;
  if not found then
    raise exception 'Only scheduled reservations can be released';
  end if;

  perform private.record_postponement_readings(p_reservation_id, p_postponement_id, p_readings);

  update reservation_dispatches
     set closed_at = now()
   where reservation_id = p_reservation_id
     and closed_at is null;

  update reservation_items
     set dispatch_id = null,
         fuel_out = null,
         usage_out = null,
         fuel_in = null,
         usage_in = null
   where reservation_id = p_reservation_id
     and dispatch_id is not null;
end;
$$;

revoke all on function private.release_dispatched_reservation(uuid, uuid, jsonb) from public, anon;
grant execute on function private.release_dispatched_reservation(uuid, uuid, jsonb) to authenticated;
