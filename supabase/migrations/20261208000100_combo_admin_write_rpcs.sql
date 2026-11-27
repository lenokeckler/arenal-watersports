create function public.save_combo(p_payload jsonb) returns uuid
language plpgsql volatile security definer set search_path = '' as $$
declare
  target_id uuid := nullif(p_payload ->> 'combo_id', '')::uuid;
  target_name text := btrim(coalesce(p_payload ->> 'name', ''));
  target_audience public.combo_audience := (p_payload ->> 'audience')::public.combo_audience;
  target_price numeric := (p_payload ->> 'package_price')::numeric;
  target_items jsonb := p_payload -> 'items';
  current_combo public.combos%rowtype;
begin
  if not public.is_admin() then
    raise exception 'Solo administracion guarda combos' using errcode = '42501';
  end if;

  if target_name = '' then
    raise exception 'El combo necesita un nombre' using errcode = '22023';
  end if;

  if target_audience is null then
    raise exception 'El combo necesita un publico' using errcode = '22023';
  end if;

  if target_price is null or target_price <= 0 then
    raise exception 'El combo necesita un precio mayor que cero' using errcode = '22023';
  end if;

  if target_items is null
     or jsonb_typeof(target_items) <> 'array'
     or jsonb_array_length(target_items) = 0 then
    raise exception 'El combo necesita al menos un equipo' using errcode = '22023';
  end if;

  drop table if exists pg_temp.requested_items;

  create temporary table requested_items (
    category_id uuid not null,
    quantity integer not null
  ) on commit drop;

  insert into requested_items (category_id, quantity)
  select item.category_id, item.quantity
    from jsonb_to_recordset(target_items) as item(category_id uuid, quantity integer);

  if exists (select 1 from requested_items where quantity is null or quantity <= 0) then
    raise exception 'La cantidad de cada equipo debe ser mayor que cero' using errcode = '22023';
  end if;

  if (select count(distinct category_id) from requested_items) <> (select count(*) from requested_items) then
    raise exception 'Un equipo no se repite dentro del combo' using errcode = '22023';
  end if;

  if exists (
    select 1
      from requested_items as requested
     where not exists (
       select 1 from public.equipment_categories as category
        where category.id = requested.category_id and category.status = 'active'
     )
  ) then
    raise exception 'Una de las categorias no existe o esta inactiva' using errcode = 'P0002';
  end if;

  if target_id is null then
    insert into public.combos (name, audience, package_price_usd, package_price_crc, created_by, updated_by)
    values (
      target_name,
      target_audience,
      case when target_audience = 'foreign' then target_price end,
      case when target_audience = 'national' then target_price end,
      auth.uid(),
      auth.uid()
    )
    returning id into target_id;
  else
    select * into current_combo from public.combos where id = target_id for update;

    if not found then
      raise exception 'El combo no existe' using errcode = 'P0002';
    end if;

    if exists (select 1 from public.reservations where combo_id = target_id) then
      if current_combo.audience <> target_audience
         or exists (
           (select category_id, quantity from requested_items
            except
            select category_id, quantity from public.combo_items where combo_id = target_id)
           union all
           (select category_id, quantity from public.combo_items where combo_id = target_id
            except
            select category_id, quantity from requested_items)
         ) then
        raise exception 'Un combo vendido solo cambia de nombre y precio' using errcode = '55006';
      end if;
    end if;

    update public.combos
       set name = target_name,
           audience = target_audience,
           package_price_usd = case when target_audience = 'foreign' then target_price end,
           package_price_crc = case when target_audience = 'national' then target_price end,
           updated_by = auth.uid(),
           updated_at = now()
     where id = target_id;

    delete from public.combo_items where combo_id = target_id;
  end if;

  insert into public.combo_items (combo_id, category_id, quantity)
  select target_id, category_id, quantity from requested_items;

  return target_id;
end $$;

create function public.delete_or_deactivate_combo(p_combo_id uuid) returns text
language plpgsql volatile security definer set search_path = '' as $$
begin
  if not public.is_admin() then
    raise exception 'Solo administracion elimina combos' using errcode = '42501';
  end if;

  perform 1 from public.combos where id = p_combo_id for update;

  if not found then
    raise exception 'El combo no existe' using errcode = 'P0002';
  end if;

  if exists (select 1 from public.reservations where combo_id = p_combo_id) then
    update public.combos
       set status = 'inactive', updated_by = auth.uid(), updated_at = now()
     where id = p_combo_id;

    return 'deactivated';
  end if;

  delete from public.combo_items where combo_id = p_combo_id;
  delete from public.combos where id = p_combo_id;

  return 'deleted';
end $$;

create function public.set_combo_active(p_combo_id uuid, p_active boolean) returns text
language plpgsql volatile security definer set search_path = '' as $$
declare
  new_status public.category_status;
begin
  if not public.is_admin() then
    raise exception 'Solo administracion cambia el estado de un combo' using errcode = '42501';
  end if;

  if p_active is null then
    raise exception 'El estado del combo es invalido' using errcode = '22023';
  end if;

  new_status := case when p_active then 'active' else 'inactive' end;

  update public.combos
     set status = new_status, updated_by = auth.uid(), updated_at = now()
   where id = p_combo_id;

  if not found then
    raise exception 'El combo no existe' using errcode = 'P0002';
  end if;

  return new_status::text;
end $$;

revoke execute on function public.save_combo(jsonb) from public, anon;
grant execute on function public.save_combo(jsonb) to authenticated;
revoke execute on function public.delete_or_deactivate_combo(uuid) from public, anon;
grant execute on function public.delete_or_deactivate_combo(uuid) to authenticated;
revoke execute on function public.set_combo_active(uuid, boolean) from public, anon;
grant execute on function public.set_combo_active(uuid, boolean) to authenticated;
