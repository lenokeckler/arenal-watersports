create or replace function private.prepare_rental_reservation_payload(
  p_payload jsonb
) returns jsonb
language plpgsql security invoker set search_path = public, private
as $$
declare
  reservation_input record;
  authenticated_worker_id uuid;
  reservation_window tstzrange;
  committed_category_id uuid;
  selected_reservation_type reservation_type;
  selected_extra_ids uuid[];
begin
  if jsonb_typeof(p_payload) <> 'object' then raise exception 'Reservation payload must be an object'; end if;
  select * into reservation_input from jsonb_to_record(p_payload) as payload(
    customer_name text, people_count integer, date date, time time without time zone,
    duration_minutes integer, category_id uuid, quantity integer, unit_id uuid,
    reservation_type reservation_type
  );
  selected_extra_ids := private.parse_reservation_extra_ids(p_payload);
  if cardinality(selected_extra_ids) > 0 and reservation_input.unit_id is null then
    raise exception 'A boat unit is required when selecting reservation extras';
  end if;
  authenticated_worker_id := validate_reservation_customer(reservation_input.customer_name, reservation_input.people_count);
  reservation_window := validate_reservation_schedule(reservation_input.date, reservation_input.time, reservation_input.duration_minutes);
  committed_category_id := validate_reservation_equipment_commitment(reservation_input.category_id, reservation_input.quantity, reservation_input.unit_id);
  selected_reservation_type := coalesce(reservation_input.reservation_type, 'rental'::reservation_type);
  return p_payload || jsonb_build_object(
    'validated_worker_id', authenticated_worker_id,
    'validated_starts_at', lower(reservation_window),
    'validated_reservation_type', selected_reservation_type,
    'validated_category_id', committed_category_id,
    'validated_extra_ids', selected_extra_ids
  );
end;
$$;

create or replace function private.validate_rental_reservation_payload(
  p_payload jsonb
) returns jsonb
language plpgsql security invoker set search_path = public, private
as $$
declare
  validated_payload jsonb := private.prepare_rental_reservation_payload(p_payload);
  reservation_input record;
  selected_guide_ids uuid[];
  reservation_window tstzrange;
  is_guide_only boolean;
begin
  select * into reservation_input from jsonb_to_record(validated_payload) as payload(
    category_id uuid, unit_id uuid, duration_minutes integer,
    validated_category_id uuid, validated_reservation_type reservation_type,
    validated_starts_at timestamptz
  );
  selected_guide_ids := validate_reservation_guide_assignments(
    p_payload, reservation_input.validated_reservation_type
  );
  if reservation_input.unit_id is not null and reservation_input.validated_category_id is null then
    raise exception 'Equipment unit is not available for reservation';
  end if;
  if reservation_input.validated_category_id is not null then
    select category.guide_only into is_guide_only from equipment_categories as category
    where category.id = reservation_input.validated_category_id;
    if is_guide_only and reservation_input.validated_reservation_type <> 'tour' then
      raise exception 'Guide-only equipment requires a tour reservation';
    end if;
  end if;
  if reservation_input.unit_id is not null then
    reservation_window := tstzrange(reservation_input.validated_starts_at,
      reservation_input.validated_starts_at + make_interval(mins => reservation_input.duration_minutes), '[)');
    perform assert_unit_available_for_window(reservation_input.unit_id, reservation_window);
  end if;
  return validated_payload || jsonb_build_object('validated_guide_ids', selected_guide_ids);
end;
$$;

create or replace function private.persist_rental_reservation(
  p_payload jsonb
) returns uuid
language plpgsql security invoker set search_path = public, private
as $$
declare
  validated_payload jsonb;
  reservation_input record;
  created_reservation_id uuid;
begin
  validated_payload := private.validate_rental_reservation_payload(p_payload);
  select * into reservation_input from jsonb_to_record(validated_payload) as payload(
    customer_name text, people_count integer, duration_minutes integer,
    unit_id uuid, category_id uuid, quantity integer,
    validated_category_id uuid,
    validated_worker_id uuid, validated_starts_at timestamptz,
    validated_reservation_type reservation_type, validated_guide_ids jsonb,
    validated_extra_ids jsonb
  );
  insert into reservations (customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
  values (btrim(reservation_input.customer_name), reservation_input.people_count,
    reservation_input.validated_reservation_type, reservation_input.validated_starts_at,
    reservation_input.duration_minutes, 'scheduled', reservation_input.validated_worker_id,
    reservation_input.validated_worker_id)
  returning id into created_reservation_id;
  insert into reservation_items (reservation_id, unit_id, category_id, quantity, created_by, updated_by)
  values (created_reservation_id, reservation_input.unit_id, reservation_input.category_id,
    reservation_input.quantity, reservation_input.validated_worker_id, reservation_input.validated_worker_id);
  perform private.persist_reservation_extras(created_reservation_id,
    private.parse_reservation_extra_ids(jsonb_build_object('extra_ids', reservation_input.validated_extra_ids)));
  insert into reservation_guides (reservation_id, worker_id, assigned_by)
  select created_reservation_id, guide_id::uuid, reservation_input.validated_worker_id
  from jsonb_array_elements_text(reservation_input.validated_guide_ids) as selected(guide_id);
  return created_reservation_id;
end;
$$;

create or replace function create_rental_reservation(p_payload jsonb)
returns uuid
language sql security invoker set search_path = public, private
as $$
  select private.persist_rental_reservation(p_payload);
$$;

revoke all on function private.prepare_rental_reservation_payload(jsonb)
  from public, anon;
grant execute on function private.prepare_rental_reservation_payload(jsonb)
  to authenticated;
revoke all on function private.validate_rental_reservation_payload(jsonb)
  from public, anon;
grant execute on function private.validate_rental_reservation_payload(jsonb)
  to authenticated;
revoke all on function private.persist_rental_reservation(jsonb)
  from public, anon;
grant execute on function private.persist_rental_reservation(jsonb)
  to authenticated;
revoke all on function create_rental_reservation(jsonb) from public, anon;
grant execute on function create_rental_reservation(jsonb) to authenticated;
