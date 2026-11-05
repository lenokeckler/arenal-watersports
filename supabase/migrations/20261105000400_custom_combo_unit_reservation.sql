create or replace function private.validate_custom_combo_unit_commitments(
  p_items jsonb,
  p_reservation_window tstzrange
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  selected_item record;
begin
  for selected_item in select input.category_id, input.quantity, input.unit_id
    from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
    order by coalesce(input.category_id, input.unit_id)
  loop
    perform validate_reservation_equipment_commitment(selected_item.category_id, selected_item.quantity, selected_item.unit_id);
    if selected_item.unit_id is not null then
      perform assert_unit_available_for_window(selected_item.unit_id, p_reservation_window);
    end if;
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
  if jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'Reservation payload must be an object';
  end if;
  select * into reservation_input from jsonb_to_record(p_payload) as payload(
    customer_name text, people_count integer, date date, time time without time zone,
    duration_minutes integer, items jsonb, agreed_amount_usd numeric, agreed_amount_crc numeric);
  authenticated_worker_id := validate_reservation_customer(reservation_input.customer_name, reservation_input.people_count);
  reservation_window := validate_reservation_schedule(reservation_input.date, reservation_input.time, reservation_input.duration_minutes);
  select * into calculated_price from custom_combo_price(reservation_input.items, reservation_input.duration_minutes);
  select coalesce(bool_or(category.guide_only), false) into has_tour_component
  from jsonb_to_recordset(reservation_input.items) as input(category_id uuid, quantity integer, unit_id uuid)
  left join equipment_units as unit on unit.id = input.unit_id
  join equipment_categories as category on category.id = coalesce(input.category_id, unit.category_id);
  selected_guide_ids := validate_reservation_guide_assignments(p_payload,
    case when has_tour_component then 'tour'::reservation_type else 'rental'::reservation_type end);
  if reservation_input.agreed_amount_usd < 0 then
    raise exception 'Agreed USD amount is invalid for the available tariff';
  end if;
  if reservation_input.agreed_amount_crc < 0 then
    raise exception 'Agreed CRC amount is invalid for the available tariff';
  end if;
  perform private.validate_custom_combo_unit_commitments(reservation_input.items, reservation_window);
  return p_payload || jsonb_build_object('validated_worker_id', authenticated_worker_id,
    'validated_starts_at', lower(reservation_window), 'validated_list_amount_usd', calculated_price.list_amount_usd,
    'validated_list_amount_crc', calculated_price.list_amount_crc, 'validated_guide_ids', to_jsonb(selected_guide_ids));
end;
$$;

revoke all on function private.validate_custom_combo_unit_commitments(jsonb, tstzrange) from public, anon;
grant execute on function private.validate_custom_combo_unit_commitments(jsonb, tstzrange) to authenticated, service_role;

create or replace function private.persist_custom_combo_reservation(p_payload jsonb)
returns uuid language plpgsql security invoker set search_path = public, private
as $$
declare
  reservation_input record;
  created_reservation_id uuid;
begin
  select * into reservation_input from jsonb_to_record(private.validate_custom_combo_reservation(p_payload)) as payload(
    customer_name text, people_count integer, duration_minutes integer, items jsonb,
    agreed_amount_usd numeric, agreed_amount_crc numeric, validated_worker_id uuid, validated_starts_at timestamptz,
    validated_list_amount_usd numeric, validated_list_amount_crc numeric, validated_guide_ids jsonb);
  insert into reservations(customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
  values (btrim(reservation_input.customer_name), reservation_input.people_count, 'combo', reservation_input.validated_starts_at,
    reservation_input.duration_minutes, 'scheduled', reservation_input.validated_worker_id, reservation_input.validated_worker_id)
  returning id into created_reservation_id;
  insert into reservation_items(reservation_id, category_id, quantity, unit_id, created_by, updated_by)
  select created_reservation_id, input.category_id, input.quantity, input.unit_id,
    reservation_input.validated_worker_id, reservation_input.validated_worker_id
  from jsonb_to_recordset(reservation_input.items) as input(category_id uuid, quantity integer, unit_id uuid);
  insert into reservation_guides(reservation_id, worker_id, assigned_by)
  select created_reservation_id, guide.worker_id::uuid, reservation_input.validated_worker_id
  from jsonb_array_elements_text(reservation_input.validated_guide_ids) as guide(worker_id);
  insert into reservation_pricing(reservation_id, list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc, created_by, updated_by)
  values (created_reservation_id, reservation_input.validated_list_amount_usd, reservation_input.validated_list_amount_crc,
    reservation_input.agreed_amount_usd, reservation_input.agreed_amount_crc,
    reservation_input.validated_worker_id, reservation_input.validated_worker_id);
  return created_reservation_id;
end;
$$;

create or replace function private.has_custom_combo_tour_component(target_reservation_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$
  select auth.uid() is not null and has_area('reservas') and exists (
    select 1 from reservations as reservation
    join reservation_items as item on item.reservation_id = reservation.id
    left join equipment_units as unit on unit.id = item.unit_id
    join equipment_categories as category on category.id = coalesce(item.category_id, unit.category_id)
    where reservation.id = target_reservation_id and reservation.type = 'combo'
      and reservation.combo_id is null and category.guide_only);
$$;

revoke all on function private.validate_custom_combo_reservation(jsonb) from public, anon;
grant execute on function private.validate_custom_combo_reservation(jsonb) to authenticated, service_role;
revoke all on function private.persist_custom_combo_reservation(jsonb) from public, anon;
grant execute on function private.persist_custom_combo_reservation(jsonb) to authenticated, service_role;
revoke all on function private.has_custom_combo_tour_component(uuid) from public, anon;
grant execute on function private.has_custom_combo_tour_component(uuid) to authenticated;
