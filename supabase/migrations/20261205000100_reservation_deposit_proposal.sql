create function reservation_deposit_proposal(p_reservation_id uuid)
returns table (proposal_usd numeric, proposal_crc numeric)
language plpgsql stable security invoker set search_path = public, private
as $$
begin
  perform require_reservations_access();
  if not exists (select 1 from reservations where id = p_reservation_id) then
    raise exception 'Reservation was not found';
  end if;
  return query
  select
    coalesce(sum(category.deposit_usd * coalesce(item.quantity, 1)), 0),
    coalesce(sum(category.deposit_crc * coalesce(item.quantity, 1)), 0)
  from reservation_items item
  left join equipment_units unit on unit.id = item.unit_id
  join equipment_categories category on category.id = coalesce(item.category_id, unit.category_id)
  where item.reservation_id = p_reservation_id and item.extra_id is null;
end;
$$;

revoke all on function reservation_deposit_proposal(uuid) from public, anon;
grant execute on function reservation_deposit_proposal(uuid) to authenticated;
