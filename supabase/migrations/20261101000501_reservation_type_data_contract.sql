drop function reservable_equipment_categories();

create function reservable_equipment_categories()
returns table (
  id uuid,
  name text,
  units_are_interchangeable boolean,
  guide_only boolean
)
language sql stable security invoker set search_path = public
as $$
  select category.id, category.name,
    category.units_are_interchangeable, category.guide_only
  from equipment_categories as category
  where category.status = 'active' and category.is_reservable
    and case category.tracking_mode
      when 'by_unit' then exists (
        select 1 from equipment_units as unit
        where unit.category_id = category.id and unit.status = 'available'
      )
      when 'by_quantity' then exists (
        select 1 from equipment_stock as stock
        where stock.category_id = category.id and stock.quantity_available > 0
      )
    end
  order by category.name, category.id;
$$;

revoke all on function reservable_equipment_categories() from public, anon;
grant execute on function reservable_equipment_categories() to authenticated;

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
  return created_reservation_id;
end;
$$;

revoke all on function create_rental_reservation(jsonb) from public, anon;
grant execute on function create_rental_reservation(jsonb) to authenticated;

create function validate_reservation_guide_only_equipment()
returns trigger
language plpgsql security invoker set search_path = public
as $$
declare
  committed_category_id uuid := new.category_id;
  selected_reservation_type reservation_type;
  is_guide_only boolean;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if new.unit_id is not null then
    select unit.category_id into committed_category_id
    from equipment_units as unit
    where unit.id = new.unit_id;
  end if;
  select reservation.type, category.guide_only
  into selected_reservation_type, is_guide_only
  from reservations as reservation
  join equipment_categories as category
    on category.id = committed_category_id
  where reservation.id = new.reservation_id;
  if found and is_guide_only and selected_reservation_type <> 'tour' then
    raise exception 'Guide-only equipment requires a tour reservation';
  end if;
  return new;
end;
$$;

revoke all on function validate_reservation_guide_only_equipment() from public, anon;

create trigger reservation_items_guide_only
before insert or update of reservation_id, unit_id, category_id
on reservation_items for each row
execute function validate_reservation_guide_only_equipment();
