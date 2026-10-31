create function require_reservations_access()
returns void
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authenticated worker is required';
  end if;

  if not has_area('reservas') then
    raise exception 'Reservations access is required';
  end if;
end;
$$;

revoke all on function require_reservations_access() from public, anon;
grant execute on function require_reservations_access() to authenticated;

create or replace function lock_reservable_unit(p_unit_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  locked_unit_category_id uuid;
begin
  perform require_reservations_access();

  select unit.category_id
    into locked_unit_category_id
    from equipment_units as unit
    join equipment_categories as category
      on category.id = unit.category_id
   where unit.id = p_unit_id
     and unit.status = 'available'
     and category.status = 'active'
     and category.is_reservable
     and not category.units_are_interchangeable
   for update of unit;

  return locked_unit_category_id;
end;
$$;

create or replace function validate_reservation_customer(
  p_customer_name text,
  p_people_count integer
) returns uuid
language plpgsql
set search_path = public
as $$
declare
  authenticated_worker_id uuid := auth.uid();
begin
  perform require_reservations_access();

  if p_customer_name is null or length(btrim(p_customer_name)) = 0 then
    raise exception 'Customer name is required';
  end if;

  if p_people_count is null or p_people_count <= 0 then
    raise exception 'People count must be positive';
  end if;

  return authenticated_worker_id;
end;
$$;

revoke all on function validate_reservation_customer(text, integer) from public, anon;
grant execute on function validate_reservation_customer(text, integer) to authenticated;

drop policy if exists reservations_insert on reservations;
create policy reservations_insert on reservations
  for insert to authenticated
  with check (has_area('reservas'));

drop policy if exists items_insert on reservation_items;
create policy items_insert on reservation_items
  for insert to authenticated
  with check (has_area('reservas') or has_area('operaciones'));
