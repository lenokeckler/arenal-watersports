create or replace function create_rental_reservation(
  p_customer_name text,
  p_people_count integer,
  p_date date,
  p_time time without time zone,
  p_duration_minutes integer,
  p_category_id uuid,
  p_quantity integer
) returns uuid
language plpgsql
security invoker
set search_path = public
as $$
declare
  authenticated_worker_id uuid := auth.uid();
  created_reservation_id uuid;
begin
  if authenticated_worker_id is null then
    raise exception 'Authenticated worker is required';
  end if;

  if p_customer_name is null or length(btrim(p_customer_name)) = 0 then
    raise exception 'Customer name is required';
  end if;

  if p_people_count is null or p_people_count <= 0 then
    raise exception 'People count must be positive';
  end if;

  if p_date is null or p_time is null then
    raise exception 'Reservation date and time are required';
  end if;

  if p_time = time '24:00:00' then
    raise exception 'Reservation time is outside the valid range';
  end if;

  if p_duration_minutes is null or p_duration_minutes <= 0 then
    raise exception 'Duration must be positive';
  end if;

  if p_quantity is null or p_quantity <= 0 then
    raise exception 'Equipment quantity must be positive';
  end if;

  if not exists (
    select 1
    from equipment_categories
    where id = p_category_id
      and status = 'active'
      and is_reservable
      and units_are_interchangeable
  ) then
    raise exception 'Equipment category is not available for reservation';
  end if;

  insert into reservations (
    customer_name,
    people_count,
    type,
    starts_at,
    duration_minutes,
    status,
    created_by,
    updated_by
  ) values (
    btrim(p_customer_name),
    p_people_count,
    'rental',
    (p_date + p_time) at time zone 'America/Costa_Rica',
    p_duration_minutes,
    'scheduled',
    authenticated_worker_id,
    authenticated_worker_id
  ) returning id into created_reservation_id;

  insert into reservation_items (
    reservation_id,
    category_id,
    quantity,
    created_by,
    updated_by
  ) values (
    created_reservation_id,
    p_category_id,
    p_quantity,
    authenticated_worker_id,
    authenticated_worker_id
  );

  return created_reservation_id;
end;
$$;

revoke all on function create_rental_reservation(text, integer, date, time without time zone, integer, uuid, integer) from public, anon;
grant execute on function create_rental_reservation(text, integer, date, time without time zone, integer, uuid, integer) to authenticated;
