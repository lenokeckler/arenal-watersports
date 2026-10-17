create or replace function validate_reservation_equipment_commitment(
  p_category_id uuid,
  p_quantity integer,
  p_unit_id uuid
) returns uuid
language plpgsql set search_path = public
as $$
begin
  if p_unit_id is not null then
    if p_category_id is not null or p_quantity is not null then
      raise exception 'A unit commitment cannot include a category or quantity';
    end if;
    return lock_reservable_unit(p_unit_id);
  end if;
  if p_category_id is null or p_quantity is null or p_quantity <= 0 then
    raise exception 'A category and positive equipment quantity are required';
  end if;
  perform lock_reservable_category(p_category_id);
  if not exists (
    select 1 from equipment_categories
    where id = p_category_id and units_are_interchangeable
  ) then
    raise exception 'Equipment category is not available for reservation';
  end if;
  return p_category_id;
end;
$$;

create function validate_scheduled_item_equipment()
returns trigger
language plpgsql security invoker set search_path = public
as $$
declare
  committed_category_id uuid := new.category_id;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if tg_op = 'UPDATE' then
    if row(new.reservation_id, new.unit_id, new.category_id, new.quantity)
      is not distinct from
      row(old.reservation_id, old.unit_id, old.category_id, old.quantity) then
      return new;
    end if;
  end if;
  if new.unit_id is null and new.category_id is null then
    return new;
  end if;
  if not exists (
    select 1 from reservations
    where id = new.reservation_id and status = 'scheduled'
  ) then
    return new;
  end if;
  if new.unit_id is not null then
    select category_id into committed_category_id
    from equipment_units where id = new.unit_id;
  end if;
  perform lock_reservable_category(committed_category_id, new.unit_id);
  return new;
end;
$$;

revoke all on function validate_scheduled_item_equipment() from public, anon;

create trigger reservation_items_equipment_eligibility
before insert or update of reservation_id, unit_id, category_id, quantity
on reservation_items for each row
execute function validate_scheduled_item_equipment();
