create function custom_combo_price(
  p_items jsonb,
  p_duration_minutes integer
) returns table (list_amount_usd numeric, list_amount_crc numeric)
language plpgsql security invoker set search_path = public
as $$
declare
  selected_item record;
  selection_count integer;
  duplicate_count integer;
begin
  if auth.uid() is null or not (has_area('reservas') or is_admin()) then
    raise exception 'Reservation access is required';
  end if;
  if jsonb_typeof(p_items) is distinct from 'array'
    or jsonb_array_length(p_items) = 0 then
    raise exception 'A custom combo requires equipment selections';
  end if;
  if p_duration_minutes is null or p_duration_minutes <= 0 then
    raise exception 'Reservation duration must be positive';
  end if;
  if exists (
    select 1 from jsonb_array_elements(p_items) as selection(value)
    where jsonb_typeof(selection.value) <> 'object'
      or jsonb_typeof(selection.value->'category_id') <> 'string'
      or jsonb_typeof(selection.value->'quantity') <> 'number'
      or (selection.value->>'quantity')::numeric <= 0
      or (selection.value->>'quantity')::numeric
        <> trunc((selection.value->>'quantity')::numeric)
      or (selection.value->>'quantity')::numeric > 2147483647
  ) then
    raise exception 'Custom combo equipment selections are invalid';
  end if;
  for selected_item in
    select input.category_id, input.quantity
    from jsonb_to_recordset(p_items) as input(
      category_id uuid, quantity integer
    )
  loop
    if selected_item.category_id is null
      or selected_item.quantity is null or selected_item.quantity <= 0 then
      raise exception 'Custom combo equipment selections are invalid';
    end if;
  end loop;
  select count(*)::integer, count(distinct input.category_id)::integer
    into selection_count, duplicate_count
    from jsonb_to_recordset(p_items) as input(
      category_id uuid, quantity integer
    );
  if selection_count <> duplicate_count then
    raise exception 'Custom combo equipment categories cannot repeat';
  end if;
  if exists (
    select 1
    from jsonb_to_recordset(p_items) as input(
      category_id uuid, quantity integer
    )
    left join equipment_categories as category
      on category.id = input.category_id
    where category.id is null or category.status <> 'active'
      or not category.is_reservable
      or not category.units_are_interchangeable
  ) then
    raise exception 'Every custom combo category must be reservable';
  end if;
  select count(*)::integer into duplicate_count
  from jsonb_to_recordset(p_items) as input(
      category_id uuid, quantity integer
  )
    join equipment_categories as category
      on category.id = input.category_id
    join tariffs as tariff on tariff.category_id = category.id
      and tariff.type = case when category.guide_only
        then 'tour'::reservation_type else 'rental'::reservation_type end;
  if duplicate_count <> selection_count then
    raise exception 'An individual tariff is missing for a custom combo category';
  end if;
  if exists (
    select 1
    from jsonb_to_recordset(p_items) as input(
      category_id uuid, quantity integer
    )
    join equipment_categories as category
      on category.id = input.category_id
    join tariffs as tariff on tariff.category_id = category.id
      and tariff.type = case when category.guide_only
        then 'tour'::reservation_type else 'rental'::reservation_type end
    where tariff.amount_usd < 0 or tariff.amount_crc < 0
  ) then
    raise exception 'Individual tariffs cannot be negative';
  end if;
  return query
  select
    case when bool_and(tariff.amount_usd is not null)
      then round(sum(tariff.amount_usd * input.quantity * p_duration_minutes / 60), 2)
      else null::numeric end,
    case when bool_and(tariff.amount_crc is not null)
      then round(sum(tariff.amount_crc * input.quantity * p_duration_minutes / 60), 2)
      else null::numeric end
  from jsonb_to_recordset(p_items) as input(
    category_id uuid, quantity integer
  )
  join equipment_categories as category
    on category.id = input.category_id
  join tariffs as tariff on tariff.category_id = category.id
    and tariff.type = case when category.guide_only
      then 'tour'::reservation_type else 'rental'::reservation_type end;
end;
$$;

revoke all on function custom_combo_price(jsonb, integer) from public, anon;
grant execute on function custom_combo_price(jsonb, integer) to authenticated;
