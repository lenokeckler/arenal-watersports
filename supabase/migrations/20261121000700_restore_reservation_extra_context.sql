create or replace function private.assert_reservation_extra_context(
  p_item reservation_items
) returns void
language plpgsql security invoker set search_path = public, private
as $$
declare
  reservation_status reservation_status;
  reservation_kind reservation_type;
begin
  if auth.uid() is null or not (has_area('reservas') or is_admin()) then
    raise exception 'Reservation access is required';
  end if;
  if p_item.extra_id is null or p_item.unit_id is not null then
    raise exception 'Reservation extra item shape is invalid';
  end if;
  select status, type into reservation_status, reservation_kind
  from reservations where id = p_item.reservation_id;
  if reservation_status <> 'scheduled' or reservation_kind not in ('rental', 'tour') then
    raise exception 'Extras require a scheduled rental or tour reservation';
  end if;
end;
$$;

revoke all on function private.assert_reservation_extra_context(reservation_items)
  from public, anon, authenticated;
