create or replace function private.get_active_predefined_combo_snapshot(
  p_combo_id uuid
) returns jsonb
language sql security invoker set search_path = public, private
as $$
  select case when combo.id is null then null else jsonb_build_object(
    'combo_id', combo.id,
    'audience', combo.audience,
    'package_price_usd', combo.package_price_usd,
    'package_price_crc', combo.package_price_crc,
    'has_guide_component', coalesce(bool_or(category.guide_only), false),
    'items', coalesce(jsonb_agg(jsonb_build_object(
      'category_id', item.category_id,
      'quantity', item.quantity
    ) order by item.category_id)
      filter (where item.category_id is not null), '[]'::jsonb)
  ) end
  from combos as combo
  left join combo_items as item on item.combo_id = combo.id
  left join equipment_categories as category
    on category.id = item.category_id
  where combo.id = p_combo_id and combo.status = 'active'
  group by combo.id, combo.audience, combo.package_price_usd,
    combo.package_price_crc;
$$;

create or replace function private.resolve_predefined_combo_price(
  p_audience combo_audience,
  p_price_usd numeric,
  p_price_crc numeric
) returns jsonb
language plpgsql security invoker set search_path = public, private
as $$
begin
  if p_audience = 'national' and p_price_crc > 0
    and p_price_usd is null then
    return jsonb_build_object(
      'validated_package_price_usd', null,
      'validated_package_price_crc', p_price_crc
    );
  end if;
  if p_audience = 'foreign' and p_price_usd > 0
    and p_price_crc is null then
    return jsonb_build_object(
      'validated_package_price_usd', p_price_usd,
      'validated_package_price_crc', null
    );
  end if;
  raise exception 'Predefined combo package price is invalid';
end;
$$;

create or replace function private.validate_predefined_combo_components(
  p_items jsonb
) returns void
language plpgsql security invoker set search_path = public, private
as $$
declare
  selected_item record;
begin
  if jsonb_array_length(p_items) = 0 then
    raise exception 'Predefined combo has no equipment components';
  end if;
  for selected_item in
    select item.category_id, item.quantity
    from jsonb_to_recordset(p_items)
      as item(category_id uuid, quantity integer)
    order by item.category_id
  loop
    perform validate_reservation_equipment_commitment(
      selected_item.category_id,
      selected_item.quantity,
      null
    );
  end loop;
end;
$$;

revoke all on function private.get_active_predefined_combo_snapshot(uuid) from public, anon;
grant execute on function private.get_active_predefined_combo_snapshot(uuid) to authenticated;
revoke all on function private.resolve_predefined_combo_price(combo_audience, numeric, numeric) from public, anon;
grant execute on function private.resolve_predefined_combo_price(combo_audience, numeric, numeric) to authenticated;
revoke all on function private.validate_predefined_combo_components(jsonb) from public, anon;
grant execute on function private.validate_predefined_combo_components(jsonb) to authenticated;
