drop function if exists validate_reservation_equipment_commitment(
  uuid,
  integer,
  uuid
);

create or replace function validate_reservation_equipment_commitment(
  p_category_id uuid,
  p_quantity integer,
  p_unit_id uuid,
  p_reservation_window tstzrange
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  available_quantity integer;
begin
  perform require_reservations_access();

  if p_unit_id is null then
    if p_category_id is null or p_quantity is null or p_quantity <= 0 then
      raise exception 'A category and positive equipment quantity are required';
    end if;

    perform 1
    from equipment_categories
    where id = p_category_id
    for update;

    if not found or not exists (
      select 1
      from equipment_categories
      where id = p_category_id
        and status = 'active'
        and is_reservable
        and units_are_interchangeable
    ) then
      raise exception 'Equipment category is not available for reservation';
    end if;

    perform 1
    from equipment_stock
    where category_id = p_category_id
    for update;

    select free into available_quantity
    from category_availability(
      p_category_id,
      lower(p_reservation_window),
      upper(p_reservation_window),
      null
    );

    if available_quantity < p_quantity then
      raise exception 'Insufficient equipment availability';
    end if;

    return p_category_id;
  end if;

  if p_category_id is not null or p_quantity is not null then
    raise exception 'A unit commitment cannot include a category or quantity';
  end if;

  return lock_reservable_unit(p_unit_id);
end;
$$;

revoke all on function validate_reservation_equipment_commitment(
  uuid,
  integer,
  uuid,
  tstzrange
) from public, anon;
grant execute on function validate_reservation_equipment_commitment(
  uuid,
  integer,
  uuid,
  tstzrange
) to authenticated;
