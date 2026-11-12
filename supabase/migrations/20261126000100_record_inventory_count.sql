alter table public.inventory_count_lines
  add column system_status public.unit_status;

create function public.record_inventory_count(count_notes text, count_lines jsonb)
returns table (outcome text, new_count_id uuid)
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare
  new_count uuid;
  line jsonb;
  line_category uuid;
  line_unit uuid;
  line_status public.unit_status;
  expected_units uuid[];
  counted_units uuid[] := '{}';
  expected_categories uuid[];
  counted_categories uuid[] := '{}';
  stock public.equipment_stock%rowtype;
  available_count integer;
  damaged_count integer;
  in_repair_count integer;
  unit_row public.equipment_units%rowtype;
begin
  if auth.uid() is null
     or not (public.is_admin() or public.has_area('operaciones'::public.work_area)) then
    return query select 'not_allowed'::text, null::uuid;
    return;
  end if;

  if count_lines is null or jsonb_typeof(count_lines) <> 'array'
     or jsonb_array_length(count_lines) = 0 then
    return query select 'invalid'::text, null::uuid;
    return;
  end if;

  select coalesce(array_agg(u.id), '{}') into expected_units
    from public.equipment_units u
    join public.equipment_categories c on c.id = u.category_id
   where c.status = 'active'
     and c.tracking_mode = 'by_unit'
     and u.status <> 'decommissioned';

  select coalesce(array_agg(c.id), '{}') into expected_categories
    from public.equipment_categories c
   where c.status = 'active'
     and c.tracking_mode = 'by_quantity';

  insert into public.inventory_counts (notes, created_by)
  values (nullif(btrim(count_notes), ''), auth.uid())
  returning id into new_count;

  for line in select * from jsonb_array_elements(count_lines) loop
    begin
      line_category := (line ->> 'category_id')::uuid;
    exception when others then
      raise exception 'invalid_line' using errcode = 'P0001';
    end;

    if line ? 'unit_id' then
      begin
        line_unit := (line ->> 'unit_id')::uuid;
        line_status := (line ->> 'confirmed_status')::public.unit_status;
      exception when others then
        raise exception 'invalid_line' using errcode = 'P0001';
      end;

      if line_status = 'decommissioned' then
        raise exception 'invalid_line' using errcode = 'P0001';
      end if;

      select * into unit_row from public.equipment_units
       where id = line_unit and category_id = line_category;

      if not found or not (line_unit = any(expected_units)) or line_unit = any(counted_units) then
        raise exception 'invalid_line' using errcode = 'P0001';
      end if;

      counted_units := counted_units || line_unit;

      insert into public.inventory_count_lines
        (count_id, category_id, unit_id, confirmed_status, system_status)
      values (new_count, line_category, line_unit, line_status, unit_row.status);
    else
      if not (line_category = any(expected_categories)) or line_category = any(counted_categories) then
        raise exception 'invalid_line' using errcode = 'P0001';
      end if;

      begin
        available_count := (line ->> 'quantity_available')::integer;
        damaged_count := (line ->> 'quantity_damaged')::integer;
        in_repair_count := (line ->> 'quantity_in_repair')::integer;
      exception when others then
        raise exception 'invalid_line' using errcode = 'P0001';
      end;

      if available_count is null or damaged_count is null or in_repair_count is null
         or available_count < 0 or damaged_count < 0 or in_repair_count < 0 then
        raise exception 'invalid_line' using errcode = 'P0001';
      end if;

      counted_categories := counted_categories || line_category;
      select * into stock from public.equipment_stock where category_id = line_category;

      insert into public.inventory_count_lines
        (count_id, category_id, quantity_available, quantity_damaged, quantity_in_repair,
         system_quantity_available, system_quantity_damaged, system_quantity_in_repair)
      values (new_count, line_category, available_count, damaged_count, in_repair_count,
              coalesce(stock.quantity_available, 0), coalesce(stock.quantity_damaged, 0),
              coalesce(stock.quantity_in_repair, 0));
    end if;
  end loop;

  if (select count(*) from unnest(expected_units) e where not (e = any(counted_units))) > 0
     or (select count(*) from unnest(expected_categories) e where not (e = any(counted_categories))) > 0 then
    raise exception 'incomplete' using errcode = 'P0001';
  end if;

  return query select 'recorded'::text, new_count;
exception
  when raise_exception then
    if sqlerrm = 'invalid_line' then
      return query select 'invalid'::text, null::uuid;
      return;
    elsif sqlerrm = 'incomplete' then
      return query select 'incomplete'::text, null::uuid;
      return;
    end if;
    raise;
end $$;

revoke execute on function public.record_inventory_count(text, jsonb) from public, anon;
grant execute on function public.record_inventory_count(text, jsonb) to authenticated;
