create or replace function create_rental_reservation(p_payload jsonb)
returns uuid
language plpgsql
security invoker
set search_path = public
as $$
declare
  reservation_input record;
  authenticated_worker_id uuid;
  created_reservation_id uuid;
  reservation_window tstzrange;
  committed_category_id uuid;
begin
  if jsonb_typeof(p_payload) <> 'object' then
    raise exception 'Reservation payload must be an object';
  end if;

  select * into reservation_input
  from jsonb_to_record(p_payload) as payload(
    customer_name text,
    people_count integer,
    date date,
    time time without time zone,
    duration_minutes integer,
    category_id uuid,
    quantity integer,
    unit_id uuid
  );

  authenticated_worker_id := validate_reservation_customer(
    reservation_input.customer_name,
    reservation_input.people_count
  );
  reservation_window := validate_reservation_schedule(
    reservation_input.date,
    reservation_input.time,
    reservation_input.duration_minutes
  );
  committed_category_id :=
    validate_reservation_equipment_commitment(
      reservation_input.category_id,
      reservation_input.quantity,
      reservation_input.unit_id,
      reservation_window
    );

  if reservation_input.unit_id is not null
    and committed_category_id is null then
    raise exception 'Equipment unit is not available for reservation';
  end if;

  if reservation_input.unit_id is not null then
    perform assert_unit_available_for_window(
      reservation_input.unit_id,
      reservation_window
    );
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
  )
  values (
    btrim(reservation_input.customer_name),
    reservation_input.people_count,
    'rental',
    lower(reservation_window),
    reservation_input.duration_minutes,
    'scheduled',
    authenticated_worker_id,
    authenticated_worker_id
  )
  returning id into created_reservation_id;

  insert into reservation_items (
    reservation_id,
    unit_id,
    category_id,
    quantity,
    created_by,
    updated_by
  )
  values (
    created_reservation_id,
    reservation_input.unit_id,
    reservation_input.category_id,
    reservation_input.quantity,
    authenticated_worker_id,
    authenticated_worker_id
  );

  return created_reservation_id;
end;
$$;

revoke all on function create_rental_reservation(jsonb) from public, anon;
grant execute on function create_rental_reservation(jsonb) to authenticated;
