create or replace function lock_reservable_unit(p_unit_id uuid)
returns uuid language plpgsql security definer set search_path = public
as $$
declare
  locked_unit_category_id uuid;
begin
  if auth.uid() is null then raise exception 'Authenticated worker is required'; end if;
  if not has_area('reservas') then raise exception 'Reservations access is required'; end if;
  select unit.category_id into locked_unit_category_id from equipment_units as unit where unit.id = p_unit_id;
  if not found then return null; end if;
  perform category.id from equipment_categories as category
  where category.id = locked_unit_category_id and category.status = 'active' and category.is_reservable
    and not category.units_are_interchangeable for share;
  if not found then return null; end if;
  select unit.category_id into locked_unit_category_id from equipment_units as unit
  join equipment_categories as category on category.id = unit.category_id
  where unit.id = p_unit_id and unit.status = 'available' and category.status = 'active'
    and category.is_reservable and not category.units_are_interchangeable for update of unit;
  return locked_unit_category_id;
end;
$$;

create or replace function private.lock_custom_combo_commitment_rows(p_items jsonb)
returns void language plpgsql security definer set search_path = public
as $$
declare
  selected_commitment record;
begin
  if auth.uid() is null or not has_area('reservas') then raise exception 'Reservation access is required'; end if;
  for selected_commitment in
    select distinct coalesce(input.category_id, unit.category_id) as category_id
    from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
    left join equipment_units as unit on unit.id = input.unit_id
    where coalesce(input.category_id, unit.category_id) is not null order by category_id
  loop
    perform category.id from equipment_categories as category where category.id = selected_commitment.category_id for update;
  end loop;
  for selected_commitment in
    select distinct input.unit_id from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
    where input.unit_id is not null order by input.unit_id
  loop
    perform unit.id from equipment_units as unit where unit.id = selected_commitment.unit_id for update;
  end loop;
end;
$$;

create or replace function private.assert_custom_combo_availability(p_items jsonb, p_reservation_window tstzrange)
returns void language plpgsql security invoker set search_path = public
as $$
declare
  selected_category record;
  available_quantity integer;
  selected_unit record;
begin
  for selected_category in
    select input.category_id, sum(input.quantity)::integer as requested_quantity
    from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
    join equipment_categories as category on category.id = input.category_id and category.tracking_mode = 'by_quantity'
    group by input.category_id order by input.category_id
  loop
    select availability.free into available_quantity
    from category_availability(selected_category.category_id, lower(p_reservation_window), upper(p_reservation_window), null) as availability;
    if available_quantity < selected_category.requested_quantity then
      raise exception 'Equipment category has insufficient availability';
    end if;
  end loop;
  for selected_unit in
    select input.unit_id from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
    where input.unit_id is not null order by input.unit_id
  loop
    perform assert_unit_available_for_window(selected_unit.unit_id, p_reservation_window);
  end loop;
end;
$$;

create or replace function private.validate_custom_combo_reservation(p_payload jsonb)
returns jsonb language plpgsql security invoker set search_path = public, private
as $$
declare
  reservation_input record;
  reservation_window tstzrange;
  authenticated_worker_id uuid;
  calculated_price record;
  has_tour_component boolean;
  selected_guide_ids uuid[];
begin
  if jsonb_typeof(p_payload) is distinct from 'object' then raise exception 'Reservation payload must be an object'; end if;
  if auth.uid() is null then raise exception 'Authenticated worker is required'; end if;
  if not has_area('reservas') then raise exception 'Reservation access is required'; end if;
  select * into reservation_input from jsonb_to_record(p_payload) as payload(customer_name text, people_count integer, date date, time time without time zone,
    duration_minutes integer, items jsonb, agreed_amount_usd numeric, agreed_amount_crc numeric);
  authenticated_worker_id := validate_reservation_customer(reservation_input.customer_name, reservation_input.people_count);
  reservation_window := validate_reservation_schedule(reservation_input.date, reservation_input.time, reservation_input.duration_minutes);
  perform private.validate_custom_combo_selection_shape(reservation_input.items);
  perform private.validate_custom_combo_selection_commitments(reservation_input.items);
  perform private.lock_custom_combo_commitment_rows(reservation_input.items);
  perform private.assert_custom_combo_availability(reservation_input.items, reservation_window);
  select * into calculated_price from custom_combo_price(reservation_input.items, reservation_input.duration_minutes);
  select coalesce(bool_or(category.guide_only), false) into has_tour_component
  from jsonb_to_recordset(reservation_input.items) as input(category_id uuid, quantity integer, unit_id uuid)
  left join equipment_units as unit on unit.id = input.unit_id
  join equipment_categories as category on category.id = coalesce(input.category_id, unit.category_id);
  selected_guide_ids := validate_reservation_guide_assignments(p_payload,
    case when has_tour_component then 'tour'::reservation_type else 'rental'::reservation_type end);
  if reservation_input.agreed_amount_usd < 0 or reservation_input.agreed_amount_usd > 9999999999.99 then
    raise exception 'Agreed USD amount is invalid for the available tariff';
  end if;
  if reservation_input.agreed_amount_crc < 0 or reservation_input.agreed_amount_crc > 999999999999.99 then
    raise exception 'Agreed CRC amount is invalid for the available tariff';
  end if;
  return p_payload || jsonb_build_object('validated_worker_id', authenticated_worker_id,
    'validated_starts_at', lower(reservation_window), 'validated_list_amount_usd', calculated_price.list_amount_usd,
    'validated_list_amount_crc', calculated_price.list_amount_crc, 'validated_guide_ids', to_jsonb(selected_guide_ids));
end;
$$;

revoke all on function private.lock_custom_combo_commitment_rows(jsonb) from public, anon;
grant execute on function private.lock_custom_combo_commitment_rows(jsonb) to authenticated, service_role;
revoke all on function private.assert_custom_combo_availability(jsonb, tstzrange) from public, anon;
grant execute on function private.assert_custom_combo_availability(jsonb, tstzrange) to authenticated, service_role;
revoke all on function private.validate_custom_combo_reservation(jsonb) from public, anon;
grant execute on function private.validate_custom_combo_reservation(jsonb) to authenticated, service_role;
revoke all on function lock_reservable_unit(uuid) from public, anon;
grant execute on function lock_reservable_unit(uuid) to authenticated;
