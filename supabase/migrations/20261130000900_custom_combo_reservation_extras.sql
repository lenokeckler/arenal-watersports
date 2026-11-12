alter table reservation_items
  add column if not exists extra_unit_id uuid references equipment_units(id);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'reservation_items'::regclass
      and conname = 'reservation_items_extra_unit_requires_extra'
  ) then
    alter table reservation_items
      add constraint reservation_items_extra_unit_requires_extra
      check (extra_unit_id is null or extra_id is not null);
  end if;
end;
$$;

create or replace function private.assert_reservation_extra_context(
  p_item reservation_items
) returns void
language plpgsql security invoker set search_path = public, private
as $$
declare
  reservation_status reservation_status;
  reservation_kind reservation_type;
begin
  if auth.uid() is null or not (has_area('reservas') or is_admin()) then
    raise exception 'Reservation access is required';
  end if;
  if p_item.extra_id is null or p_item.unit_id is not null then
    raise exception 'Reservation extra item shape is invalid';
  end if;
  select status, type into reservation_status, reservation_kind
  from reservations where id = p_item.reservation_id;
  if reservation_status <> 'scheduled' then
    raise exception 'Extras require a scheduled reservation';
  end if;
  if reservation_kind in ('rental', 'tour') and p_item.extra_unit_id is not null then
    raise exception 'Rental and tour extras cannot select a combo source unit';
  end if;
  if reservation_kind = 'combo' and (
    p_item.extra_unit_id is null
    or not exists (
      select 1 from reservation_items as item
      where item.reservation_id = p_item.reservation_id
        and item.unit_id = p_item.extra_unit_id
        and item.extra_id is null
    )
  ) then
    raise exception 'Combo extras require a committed source unit';
  end if;
  if reservation_kind not in ('rental', 'tour', 'combo') then
    raise exception 'Extras are not supported for this reservation type';
  end if;
end;
$$;

create or replace function private.validate_reservation_extra_item(
  p_item reservation_items
) returns void
language plpgsql security definer set search_path = public, private
as $$
declare
  selected_unit_id uuid;
  selected_category_id uuid;
  selected_quantity integer;
begin
  perform private.assert_reservation_extra_context(p_item);
  selected_unit_id := coalesce(
    p_item.extra_unit_id,
    private.get_reservation_extra_boat(p_item.reservation_id)
  );
  perform 1 from extras as extra
  where extra.id = p_item.extra_id and extra.status = 'active' for share;
  if not found then raise exception 'Reservation extra is inactive'; end if;
  perform 1 from extra_compatibility as compatibility
  where compatibility.extra_id = p_item.extra_id
    and compatibility.unit_id = selected_unit_id for key share;
  if not found then raise exception 'Reservation extra is incompatible with the selected boat'; end if;
  select extra.occupies_category_id, extra.occupies_quantity
    into selected_category_id, selected_quantity
  from extras as extra where extra.id = p_item.extra_id;
  if selected_category_id is null then
    if p_item.category_id is not null or p_item.quantity is not null then
      raise exception 'Charge-only extras cannot commit inventory';
    end if;
    return;
  end if;
  if p_item.category_id is distinct from selected_category_id
    or p_item.quantity is distinct from selected_quantity then
    raise exception 'Reservation extra inventory does not match its catalog';
  end if;
  perform private.assert_reservation_extra_inventory_capacity(
    p_item.reservation_id,
    p_item.id,
    selected_category_id,
    selected_quantity
  );
end;
$$;

create or replace function validate_scheduled_item_equipment()
returns trigger
language plpgsql security invoker set search_path = public, private
as $$
declare
  excluded_item_id uuid;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if tg_op = 'UPDATE' and row(new.reservation_id, new.unit_id, new.category_id,
    new.quantity, new.extra_id, new.extra_unit_id) is not distinct from row(old.reservation_id,
    old.unit_id, old.category_id, old.quantity, old.extra_id, old.extra_unit_id) then
    return new;
  end if;
  if new.extra_id is not null
    or (tg_op = 'UPDATE' and old.extra_id is not null) then
    perform private.validate_reservation_extra_item(new);
    return new;
  end if;
  if tg_op = 'UPDATE' and private.is_reservation_item_quantity_reduction(new, old) then
    return new;
  end if;
  if new.unit_id is null and new.category_id is null then
    return new;
  end if;
  if not exists (
    select 1 from reservations where id = new.reservation_id
      and (status = 'scheduled' or (status = 'dispatched' and new.unit_id is null))
  ) then
    return new;
  end if;
  if private.validate_operations_reservation_item(new) then
    return new;
  end if;
  if not has_area('reservas') then
    raise exception 'Equipment reservation access is required';
  end if;
  if tg_op = 'UPDATE' then excluded_item_id := old.id; end if;
  perform private.assert_reservation_item_capacity(new, excluded_item_id);
  return new;
end;
$$;

drop trigger reservation_items_equipment_eligibility on reservation_items;
create trigger reservation_items_equipment_eligibility
before insert or update of reservation_id, unit_id, category_id, quantity, extra_id, extra_unit_id
on reservation_items for each row
execute function validate_scheduled_item_equipment();

create or replace function custom_combo_price(
  p_items jsonb,
  p_duration_minutes integer,
  p_extra_ids uuid[],
  p_extra_unit_id uuid
) returns table (list_amount_usd numeric, list_amount_crc numeric)
language plpgsql security invoker set search_path = public, private
as $$
declare
  base_price record;
  extra_prices record;
begin
  if auth.uid() is null or not has_area('reservas') then
    raise exception 'Reservation access is required';
  end if;
  if p_extra_ids is null or array_position(p_extra_ids, null) is not null
    or cardinality(p_extra_ids) <> (
      select count(distinct extra_id)::integer from unnest(p_extra_ids) as selection(extra_id)
    ) then
    raise exception 'Reservation extras cannot repeat';
  end if;
  select * into strict base_price from custom_combo_price(p_items, p_duration_minutes);
  if cardinality(p_extra_ids) = 0 then
    if p_extra_unit_id is not null then
      raise exception 'A source unit is only allowed when extras are selected';
    end if;
    return query select base_price.list_amount_usd, base_price.list_amount_crc;
    return;
  end if;
  if p_extra_unit_id is null or not exists (
    select 1 from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
    where input.unit_id = p_extra_unit_id
  ) then
    raise exception 'A selected combo unit is required for extras';
  end if;
  if not exists (select 1 from equipment_units as unit
  join equipment_categories as category on category.id = unit.category_id
  where unit.id = p_extra_unit_id and unit.status = 'available'
    and category.status = 'active' and category.is_reservable
    and category.guide_only and not category.units_are_interchangeable) then
    raise exception 'Extras can only be selected for a guide-only concrete unit';
  end if;
  perform unit.id from equipment_units as unit
  where unit.id = p_extra_unit_id for share;
  perform private.validate_reservation_extras_pricing_input(
    p_extra_unit_id, p_extra_ids, p_duration_minutes, 'rental'::reservation_type
  );
  perform private.validate_active_compatible_reservation_extras(p_extra_unit_id, p_extra_ids);
  perform private.assert_reservation_extras_prices_nonnegative(
    (select category_id from equipment_units where id = p_extra_unit_id),
    p_extra_ids, 'rental'::reservation_type
  );
  select * into extra_prices from private.get_reservation_extra_amounts(p_extra_ids);
  return query select
    case when base_price.list_amount_usd is not null and extra_prices.has_usd_prices
      then round(base_price.list_amount_usd + extra_prices.extras_amount_usd, 2) else null end,
    case when base_price.list_amount_crc is not null and extra_prices.has_crc_prices
      then round(base_price.list_amount_crc + extra_prices.extras_amount_crc, 2) else null end;
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
  selected_extra_ids uuid[];
  selected_extra_unit_id uuid;
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
  selected_extra_ids := private.parse_reservation_extra_ids(p_payload);
  begin
    selected_extra_unit_id := nullif(p_payload->>'extra_unit_id', '')::uuid;
  exception when invalid_text_representation then
    raise exception 'Reservation extra source unit must be a UUID';
  end;
  select * into calculated_price from custom_combo_price(
    reservation_input.items, reservation_input.duration_minutes,
    selected_extra_ids, selected_extra_unit_id
  );
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
    'validated_list_amount_crc', calculated_price.list_amount_crc, 'validated_guide_ids', to_jsonb(selected_guide_ids),
    'validated_extra_ids', to_jsonb(selected_extra_ids), 'validated_extra_unit_id', selected_extra_unit_id);
end;
$$;

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
    validated_list_amount_usd numeric, validated_list_amount_crc numeric, validated_guide_ids jsonb,
    validated_extra_ids jsonb, validated_extra_unit_id uuid);
  insert into reservations(customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
  values (btrim(reservation_input.customer_name), reservation_input.people_count, 'combo', reservation_input.validated_starts_at,
    reservation_input.duration_minutes, 'scheduled', reservation_input.validated_worker_id, reservation_input.validated_worker_id)
  returning id into created_reservation_id;
  insert into reservation_items(reservation_id, category_id, quantity, unit_id, created_by, updated_by)
  select created_reservation_id, input.category_id, input.quantity, input.unit_id,
    reservation_input.validated_worker_id, reservation_input.validated_worker_id
  from jsonb_to_recordset(reservation_input.items) as input(category_id uuid, quantity integer, unit_id uuid);
  insert into reservation_items(reservation_id, extra_id, extra_unit_id, category_id, quantity, created_by, updated_by)
  select created_reservation_id, extra.id, reservation_input.validated_extra_unit_id,
    extra.occupies_category_id, extra.occupies_quantity,
    reservation_input.validated_worker_id, reservation_input.validated_worker_id
  from jsonb_array_elements_text(coalesce(reservation_input.validated_extra_ids, '[]'::jsonb)) as selected(extra_id)
  join extras as extra on extra.id = selected.extra_id::uuid
  order by extra.id;
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

revoke all on function private.assert_reservation_extra_context(reservation_items) from public, anon, authenticated;
grant execute on function private.assert_reservation_extra_context(reservation_items) to authenticated;
revoke all on function private.validate_reservation_extra_item(reservation_items) from public, anon;
grant execute on function private.validate_reservation_extra_item(reservation_items) to authenticated;
revoke all on function custom_combo_price(jsonb, integer, uuid[], uuid) from public, anon;
grant execute on function custom_combo_price(jsonb, integer, uuid[], uuid) to authenticated;
revoke all on function private.validate_custom_combo_reservation(jsonb) from public, anon;
grant execute on function private.validate_custom_combo_reservation(jsonb) to authenticated, service_role;
revoke all on function private.persist_custom_combo_reservation(jsonb) from public, anon;
grant execute on function private.persist_custom_combo_reservation(jsonb) to authenticated, service_role;
