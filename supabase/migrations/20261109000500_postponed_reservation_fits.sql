create function private.assert_postponed_reservation_fits(
  p_reservation_id uuid,
  p_reservation_window tstzrange
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  quantity_item record;
begin
  perform assert_reservation_units_available(p_reservation_id, p_reservation_window);
  for quantity_item in
    select item.id, item.category_id, item.quantity
    from reservation_items as item
    where item.reservation_id = p_reservation_id
      and item.unit_id is null
      and item.category_id is not null
    order by item.id
  loop
    perform lock_reservable_category(quantity_item.category_id, null);
    perform private.assert_reservation_category_quantity_available(
      quantity_item.category_id,
      quantity_item.quantity,
      p_reservation_id,
      quantity_item.id
    );
  end loop;
end;
$$;

revoke all on function private.assert_postponed_reservation_fits(uuid, tstzrange) from public, anon;
grant execute on function private.assert_postponed_reservation_fits(uuid, tstzrange) to authenticated;
