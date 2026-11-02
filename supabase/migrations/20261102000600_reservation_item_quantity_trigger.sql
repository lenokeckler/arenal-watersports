create or replace function validate_scheduled_item_equipment()
returns trigger
language plpgsql security invoker set search_path = public
as $$
declare
  excluded_item_id uuid;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if tg_op = 'UPDATE' and row(new.reservation_id, new.unit_id, new.category_id, new.quantity)
    is not distinct from row(old.reservation_id, old.unit_id, old.category_id, old.quantity) then
    return new;
  end if;
  if tg_op = 'UPDATE' and private.is_reservation_item_quantity_reduction(new, old) then
    return new;
  end if;
  if new.unit_id is null and new.category_id is null then
    return new;
  end if;
  if not exists (
    select 1 from reservations
    where id = new.reservation_id
      and (
        status = 'scheduled'
        or (status = 'dispatched' and new.unit_id is null)
      )
  ) then
    return new;
  end if;
  if private.validate_operations_reservation_item(new) then
    return new;
  end if;
  if not has_area('reservas') then
    raise exception 'Equipment reservation access is required';
  end if;
  if tg_op = 'UPDATE' then
    excluded_item_id := old.id;
  end if;
  perform private.assert_reservation_item_capacity(new, excluded_item_id);
  return new;
end;
$$;
