create or replace function private.validate_reservation_extra_item(
  p_item reservation_items
) returns void
language plpgsql security definer set search_path = public, private
as $$
declare
  selected_unit_id uuid;
  selected_category_id uuid;
  selected_quantity integer;
begin
  perform private.assert_reservation_extra_context(p_item);
  selected_unit_id := private.get_reservation_extra_boat(p_item.reservation_id);
  perform 1 from extras as extra
  where extra.id = p_item.extra_id and extra.status = 'active' for share;
  if not found then raise exception 'Reservation extra is inactive'; end if;
  perform 1 from extra_compatibility as compatibility
  where compatibility.extra_id = p_item.extra_id
    and compatibility.unit_id = selected_unit_id for key share;
  if not found then raise exception 'Reservation extra is incompatible with the selected boat'; end if;
  select extra.occupies_category_id, extra.occupies_quantity
    into selected_category_id, selected_quantity
  from extras as extra where extra.id = p_item.extra_id;
  if selected_category_id is null then
    if p_item.category_id is not null or p_item.quantity is not null then
      raise exception 'Charge-only extras cannot commit inventory';
    end if;
    return;
  end if;
  if p_item.category_id is distinct from selected_category_id
    or p_item.quantity is distinct from selected_quantity then
    raise exception 'Reservation extra inventory does not match its catalog';
  end if;
  perform private.lock_reservation_extra_inventory(selected_category_id);
end;
$$;

create or replace function validate_scheduled_item_equipment()
returns trigger
language plpgsql security invoker set search_path = public, private
as $$
declare
  committed_category_id uuid := new.category_id;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then return new; end if;
  if tg_op = 'UPDATE' and row(new.reservation_id, new.unit_id, new.category_id,
    new.quantity, new.extra_id) is not distinct from row(old.reservation_id,
    old.unit_id, old.category_id, old.quantity, old.extra_id) then return new; end if;
  if new.extra_id is not null or (tg_op = 'UPDATE' and old.extra_id is not null) then
    perform private.validate_reservation_extra_item(new);
    return new;
  end if;
  if new.unit_id is null and new.category_id is null then return new; end if;
  if not exists (select 1 from reservations where id = new.reservation_id and status = 'scheduled') then return new; end if;
  if new.unit_id is not null then
    select category_id into committed_category_id from equipment_units where id = new.unit_id;
  end if;
  perform lock_reservable_category(committed_category_id, new.unit_id);
  return new;
end;
$$;

revoke all on function private.validate_reservation_extra_item(reservation_items) from public, anon;
grant execute on function private.validate_reservation_extra_item(reservation_items) to authenticated;
revoke all on function validate_scheduled_item_equipment() from public, anon;
drop trigger reservation_items_equipment_eligibility on reservation_items;
create trigger reservation_items_equipment_eligibility
before insert or update of reservation_id, unit_id, category_id, quantity, extra_id
on reservation_items for each row
execute function validate_scheduled_item_equipment();
