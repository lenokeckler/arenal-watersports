create function create_rental_reservation(
  p_customer_name text, p_people_count integer, p_date date,
  p_time time without time zone, p_duration_minutes integer,
  p_category_id uuid default null, p_quantity integer default null, p_unit_id uuid default null
) returns uuid
language plpgsql security invoker set search_path = public
as $$
declare
  created_reservation_id uuid; reservation_window tstzrange; committed_category_id uuid;
begin
  perform validate_reservation_customer(p_customer_name, p_people_count);
  reservation_window := validate_reservation_schedule(p_date, p_time, p_duration_minutes);
  committed_category_id := validate_reservation_equipment_commitment(p_category_id, p_quantity, p_unit_id);
  if p_unit_id is not null and committed_category_id is null then raise exception 'Equipment unit is not available for reservation'; end if;
  if p_unit_id is not null then perform assert_unit_available_for_window(p_unit_id, reservation_window); end if;
  insert into reservations (customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
  values (btrim(p_customer_name), p_people_count, 'rental', lower(reservation_window), p_duration_minutes,
          'scheduled', auth.uid(), auth.uid()) returning id into created_reservation_id;
  insert into reservation_items (reservation_id, unit_id, category_id, quantity, created_by, updated_by)
  values (created_reservation_id, p_unit_id, p_category_id, p_quantity, auth.uid(), auth.uid());
  return created_reservation_id;
end;
$$;

revoke all on function create_rental_reservation(
  text, integer, date, time without time zone, integer, uuid, integer, uuid
) from public, anon;
grant execute on function create_rental_reservation(
  text, integer, date, time without time zone, integer, uuid, integer, uuid
) to authenticated;
