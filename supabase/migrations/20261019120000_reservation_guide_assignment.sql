create or replace function create_rental_reservation(p_payload jsonb)
returns uuid
language plpgsql security invoker set search_path = public
as $$
declare
  reservation_input record;
  authenticated_worker_id uuid;
  created_reservation_id uuid;
  reservation_window tstzrange;
  committed_category_id uuid;
  selected_reservation_type reservation_type;
  is_guide_only boolean;
  selected_guide_ids uuid[];
begin
  if jsonb_typeof(p_payload) <> 'object' then raise exception 'Reservation payload must be an object'; end if;
  select * into reservation_input from jsonb_to_record(p_payload) as payload(
    customer_name text, people_count integer, date date, time time without time zone,
    duration_minutes integer, category_id uuid, quantity integer, unit_id uuid,
    reservation_type reservation_type
  );
  authenticated_worker_id := validate_reservation_customer(reservation_input.customer_name, reservation_input.people_count);
  reservation_window := validate_reservation_schedule(reservation_input.date, reservation_input.time, reservation_input.duration_minutes);
  committed_category_id := validate_reservation_equipment_commitment(reservation_input.category_id, reservation_input.quantity, reservation_input.unit_id);
  selected_reservation_type := coalesce(reservation_input.reservation_type, 'rental'::reservation_type);
  selected_guide_ids := validate_reservation_guide_assignments(p_payload, selected_reservation_type);
  if reservation_input.unit_id is not null and committed_category_id is null then raise exception 'Equipment unit is not available for reservation'; end if;
  if committed_category_id is not null then
    select category.guide_only into is_guide_only
    from equipment_categories as category
    where category.id = committed_category_id;
    if is_guide_only and selected_reservation_type <> 'tour' then
      raise exception 'Guide-only equipment requires a tour reservation';
    end if;
  end if;
  if reservation_input.unit_id is not null then perform assert_unit_available_for_window(reservation_input.unit_id, reservation_window); end if;
  insert into reservations (customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
  values (btrim(reservation_input.customer_name), reservation_input.people_count, selected_reservation_type, lower(reservation_window), reservation_input.duration_minutes,
          'scheduled', authenticated_worker_id, authenticated_worker_id) returning id into created_reservation_id;
  insert into reservation_items (reservation_id, unit_id, category_id, quantity, created_by, updated_by)
  values (created_reservation_id, reservation_input.unit_id, reservation_input.category_id, reservation_input.quantity,
          authenticated_worker_id, authenticated_worker_id);
  insert into reservation_guides (reservation_id, worker_id, assigned_by)
  select created_reservation_id, guide_id, authenticated_worker_id
  from unnest(selected_guide_ids) as selected(guide_id);
  return created_reservation_id;
end;
$$;

create or replace function validate_reservation_guide_assignments(
  p_payload jsonb,
  p_reservation_type reservation_type
) returns uuid[]
language plpgsql security invoker set search_path = public
as $$
declare
  selected_guide_ids uuid[];
  valid_guide_count integer;
begin
  if p_payload ? 'guide_ids' and jsonb_typeof(p_payload->'guide_ids') <> 'array' then
    raise exception 'Guide identifiers must be an array';
  end if;
  if exists (
    select 1
    from jsonb_array_elements(coalesce(p_payload->'guide_ids', '[]'::jsonb)) as input(guide_id)
    where jsonb_typeof(input.guide_id) = 'null'
  ) then
    raise exception 'Guide identifiers must be UUID values';
  end if;
  begin
    select coalesce(array_agg(distinct guide_id::uuid), '{}'::uuid[])
      into selected_guide_ids
      from jsonb_array_elements_text(coalesce(p_payload->'guide_ids', '[]'::jsonb)) as input(guide_id);
  exception when invalid_text_representation then
    raise exception 'Guide identifiers must be UUID values';
  end;
  if cardinality(selected_guide_ids) > 0 and p_reservation_type <> 'tour' then
    raise exception 'Guides can only be assigned to tour reservations';
  end if;
  if cardinality(selected_guide_ids) > 0 then
    select count(distinct worker.id)::integer into valid_guide_count
    from workers as worker
    join worker_marks as mark on mark.worker_id = worker.id and mark.mark = 'guia'
    where worker.id = any(selected_guide_ids);
    if valid_guide_count <> cardinality(selected_guide_ids) then
      raise exception 'Every assigned worker must be marked as a guide';
    end if;
  end if;
  return selected_guide_ids;
end;
$$;
revoke all on function validate_reservation_guide_assignments(jsonb, reservation_type) from public, anon;
grant execute on function validate_reservation_guide_assignments(jsonb, reservation_type) to authenticated;
create or replace function validate_reservation_guide_assignment()
returns trigger
language plpgsql security invoker set search_path = public
as $$
declare
  assigned_reservation_type reservation_type;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  select reservation.type into assigned_reservation_type
  from reservations as reservation
  where reservation.id = new.reservation_id
  for update;
  if not found or assigned_reservation_type <> 'tour' then
    raise exception 'Guides can only be assigned to tour reservations';
  end if;
  if new.assigned_by is distinct from auth.uid() then
    raise exception 'Assignment author must match the authenticated worker';
  end if;
  if not exists (
    select 1 from worker_marks as mark
    where mark.worker_id = new.worker_id and mark.mark = 'guia'
  ) then
    raise exception 'Every assigned worker must be marked as a guide';
  end if;
  return new;
end;
$$;
revoke all on function validate_reservation_guide_assignment() from public, anon;
create trigger reservation_guides_assignment_guard
before insert or update of reservation_id, worker_id, assigned_by on reservation_guides
for each row execute function validate_reservation_guide_assignment();

create or replace function validate_reservation_type_for_guides()
returns trigger
language plpgsql security invoker set search_path = public
as $$
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if new.type <> 'tour' and exists (
    select 1 from reservation_guides as assignment
    where assignment.reservation_id = new.id
  ) then
    raise exception 'Guides can only be assigned to tour reservations';
  end if;
  return new;
end;
$$;
revoke all on function validate_reservation_type_for_guides() from public, anon;
create trigger reservations_guide_assignment_type_guard
before update of type on reservations
for each row execute function validate_reservation_type_for_guides();

revoke all on function create_rental_reservation(jsonb) from public, anon;
grant execute on function create_rental_reservation(jsonb) to authenticated;
