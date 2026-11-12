create or replace function validate_reservation_schedule(
  p_date date,
  p_time time without time zone,
  p_duration_minutes integer
) returns tstzrange
language plpgsql
set search_path = public
as $$
declare
  reservation_start timestamptz;
begin
  if p_date is null or p_time is null or p_time = time '24:00:00' then
    raise exception 'A valid reservation date and time are required';
  end if;

  if p_duration_minutes is null or p_duration_minutes <= 0 then
    raise exception 'Duration must be positive';
  end if;

  reservation_start :=
    (p_date + p_time) at time zone 'America/Costa_Rica';

  return tstzrange(
    reservation_start,
    reservation_start + make_interval(mins => p_duration_minutes),
    '[)'
  );
end;
$$;

create or replace function validate_reservation_equipment_commitment(
  p_category_id uuid,
  p_quantity integer,
  p_unit_id uuid
) returns uuid
language plpgsql
set search_path = public
as $$
begin
  if p_unit_id is null then
    if p_category_id is null or p_quantity is null or p_quantity <= 0 then
      raise exception 'A category and positive equipment quantity are required';
    end if;

    if not exists (
      select 1 from equipment_categories
       where id = p_category_id
         and status = 'active'
         and is_reservable
         and units_are_interchangeable
    ) then
      raise exception 'Equipment category is not available for reservation';
    end if;

    return p_category_id;
  end if;

  if p_category_id is not null or p_quantity is not null then
    raise exception 'A unit commitment cannot include a category or quantity';
  end if;

  return lock_reservable_unit(p_unit_id);
end;
$$;

revoke all on function validate_reservation_schedule(date, time without time zone, integer) from public, anon;
grant execute on function validate_reservation_schedule(date, time without time zone, integer) to authenticated;
revoke all on function validate_reservation_equipment_commitment(uuid, integer, uuid) from public, anon;
grant execute on function validate_reservation_equipment_commitment(uuid, integer, uuid) to authenticated;

drop function if exists create_rental_reservation(
  text, integer, date, time without time zone, integer, uuid, integer, uuid
);

drop function if exists create_rental_reservation(
  text, integer, date, time without time zone, integer, uuid, integer
);

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
  if authenticated_worker_id is null then raise exception 'Authenticated worker is required'; end if;
  if p_customer_name is null or length(btrim(p_customer_name)) = 0 then raise exception 'Customer name is required'; end if;
  if p_people_count is null or p_people_count <= 0 then raise exception 'People count must be positive'; end if;
  return authenticated_worker_id;
end;
$$;

create or replace function assert_unit_available_for_window(
  p_unit_id uuid,
  p_reservation_window tstzrange
) returns void
language plpgsql
set search_path = public
as $$
begin
  if exists (select 1 from unit_conflicts(p_unit_id, lower(p_reservation_window), upper(p_reservation_window), null)) then
    raise exception 'Equipment unit conflicts with another reservation';
  end if;
end;
$$;

revoke all on function validate_reservation_customer(text, integer) from public, anon;
grant execute on function validate_reservation_customer(text, integer) to authenticated;
revoke all on function assert_unit_available_for_window(uuid, tstzrange) from public, anon;
grant execute on function assert_unit_available_for_window(uuid, tstzrange) to authenticated;
