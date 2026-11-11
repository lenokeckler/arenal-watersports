create or replace function private.validate_custom_combo_selection_shape(p_items jsonb)
returns void language plpgsql security invoker set search_path = public
as $$
begin
  if jsonb_typeof(p_items) is distinct from 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'A custom combo requires equipment selections';
  end if;
  if exists (select 1 from jsonb_array_elements(p_items) as entry(value)
    where jsonb_typeof(value) <> 'object'
      or not ((value ? 'category_id' and value ? 'quantity' and not value ? 'unit_id')
        or (value ? 'unit_id' and not value ? 'category_id' and not value ? 'quantity'))
      or (value ? 'quantity' and (jsonb_typeof(value->'quantity') <> 'number'
        or (value->>'quantity')::numeric <= 0
        or (value->>'quantity')::numeric <> trunc((value->>'quantity')::numeric)
        or (value->>'quantity')::numeric > 2147483647))) then
    raise exception 'Custom combo equipment selections are invalid';
  end if;
end;
$$;

create or replace function private.validate_custom_combo_selection_commitments(p_items jsonb)
returns void language plpgsql security invoker set search_path = public
as $$
declare
  selection_count integer;
  distinct_category_count integer;
begin
  with selection as (
    select input.category_id, input.unit_id, coalesce(input.category_id, unit.category_id) as resolved_category_id
    from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
    left join equipment_units as unit on unit.id = input.unit_id
  )
  select count(*) filter (where resolved_category_id is not null)::integer,
    count(distinct resolved_category_id)::integer into selection_count, distinct_category_count from selection;
  if selection_count <> distinct_category_count then
    raise exception 'Custom combo equipment categories cannot repeat';
  end if;
  if exists (select 1 from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
    left join equipment_units as unit on unit.id = input.unit_id
    left join equipment_categories as category on category.id = coalesce(input.category_id, unit.category_id)
    where input.unit_id is null and (category.id is null or category.status <> 'active'
      or not category.is_reservable or not category.units_are_interchangeable)) then
    raise exception 'Every custom combo category must be reservable';
  end if;
  if exists (select 1 from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
    left join equipment_units as unit on unit.id = input.unit_id
    left join equipment_categories as category on category.id = coalesce(input.category_id, unit.category_id)
    where input.unit_id is not null and (unit.id is null or unit.status <> 'available'
      or category.id is null or category.status <> 'active' or not category.is_reservable)) then
    raise exception 'Every custom combo selection must be reservable';
  end if;
end;
$$;

create or replace function private.validate_custom_combo_selection_tariffs(p_items jsonb)
returns void language plpgsql security invoker set search_path = public
as $$
declare
  selection_count integer;
  tariff_count integer;
begin
  select count(*)::integer into selection_count from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid);
  select count(*)::integer into tariff_count
  from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
  left join equipment_units as unit on unit.id = input.unit_id
  join equipment_categories as category on category.id = coalesce(input.category_id, unit.category_id)
  join tariffs as tariff on tariff.category_id = category.id
    and tariff.type = case when category.guide_only then 'tour'::reservation_type else 'rental'::reservation_type end;
  if tariff_count <> selection_count then
    raise exception 'An individual tariff is missing for a custom combo category';
  end if;
  if exists (select 1 from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
    left join equipment_units as unit on unit.id = input.unit_id
    join equipment_categories as category on category.id = coalesce(input.category_id, unit.category_id)
    join tariffs as tariff on tariff.category_id = category.id
      and tariff.type = case when category.guide_only then 'tour'::reservation_type else 'rental'::reservation_type end
    where tariff.amount_usd < 0 or tariff.amount_crc < 0) then
    raise exception 'Individual tariffs cannot be negative';
  end if;
end;
$$;

create or replace function custom_combo_price(p_items jsonb, p_duration_minutes integer)
returns table (list_amount_usd numeric, list_amount_crc numeric)
language plpgsql security invoker set search_path = public
as $$
begin
  if auth.uid() is null or not has_area('reservas') then
    raise exception 'Reservation access is required';
  end if;
  if p_duration_minutes is null or p_duration_minutes <= 0 then
    raise exception 'Reservation duration must be positive';
  end if;
  perform private.validate_custom_combo_selection_shape(p_items);
  perform private.validate_custom_combo_selection_commitments(p_items);
  perform private.validate_custom_combo_selection_tariffs(p_items);
  return query
  select case when bool_and(tariff.amount_usd is not null)
      then round(sum(tariff.amount_usd * coalesce(input.quantity, 1) * p_duration_minutes / 60), 2)
      else null::numeric end,
    case when bool_and(tariff.amount_crc is not null)
      then round(sum(tariff.amount_crc * coalesce(input.quantity, 1) * p_duration_minutes / 60), 2)
      else null::numeric end
  from jsonb_to_recordset(p_items) as input(category_id uuid, quantity integer, unit_id uuid)
  left join equipment_units as unit on unit.id = input.unit_id
  join equipment_categories as category on category.id = coalesce(input.category_id, unit.category_id)
  join tariffs as tariff on tariff.category_id = category.id
    and tariff.type = case when category.guide_only then 'tour'::reservation_type else 'rental'::reservation_type end;
end;
$$;

revoke all on function private.validate_custom_combo_selection_shape(jsonb) from public, anon;
grant execute on function private.validate_custom_combo_selection_shape(jsonb) to authenticated, service_role;
revoke all on function private.validate_custom_combo_selection_commitments(jsonb) from public, anon;
grant execute on function private.validate_custom_combo_selection_commitments(jsonb) to authenticated, service_role;
revoke all on function private.validate_custom_combo_selection_tariffs(jsonb) from public, anon;
grant execute on function private.validate_custom_combo_selection_tariffs(jsonb) to authenticated, service_role;
revoke all on function custom_combo_price(jsonb, integer) from public, anon;
grant execute on function custom_combo_price(jsonb, integer) to authenticated;
