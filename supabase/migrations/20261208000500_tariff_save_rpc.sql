create function private.parse_tariff_amount(p_amount jsonb) returns numeric
language plpgsql immutable set search_path = '' as $$
begin
  if p_amount is null or jsonb_typeof(p_amount) = 'null' then
    return null;
  end if;

  if jsonb_typeof(p_amount) <> 'number' or (p_amount #>> '{}')::numeric <= 0 then
    raise exception 'Cada monto de la tarifa debe ser un numero mayor que cero' using errcode = '22023';
  end if;

  return (p_amount #>> '{}')::numeric;
end $$;

create function private.write_category_tariff(
  p_category_id uuid,
  p_type public.reservation_type,
  p_prices jsonb
) returns integer
language plpgsql volatile security definer set search_path = '' as $$
declare
  target_usd numeric;
  target_crc numeric;
begin
  if p_prices is null or jsonb_typeof(p_prices) = 'null' then
    if exists (select 1 from public.tariffs where category_id = p_category_id and type = p_type) then
      raise exception 'No se puede quitar una tarifa; cambie su precio' using errcode = '55006';
    end if;

    return 0;
  end if;

  if jsonb_typeof(p_prices) <> 'object' then
    raise exception 'La tarifa debe indicar sus montos en dolares y colones' using errcode = '22023';
  end if;

  target_usd := private.parse_tariff_amount(p_prices -> 'usd');
  target_crc := private.parse_tariff_amount(p_prices -> 'crc');

  if target_usd is null and target_crc is null then
    raise exception 'La tarifa necesita un precio en dolares o en colones' using errcode = '22023';
  end if;

  insert into public.tariffs (category_id, type, amount_usd, amount_crc, created_by, updated_by)
  values (p_category_id, p_type, target_usd, target_crc, auth.uid(), auth.uid())
  on conflict (category_id, type) do update
    set amount_usd = excluded.amount_usd,
        amount_crc = excluded.amount_crc,
        updated_by = auth.uid(),
        updated_at = now();

  return 1;
end $$;

create function public.save_category_tariffs(p_payload jsonb) returns integer
language plpgsql volatile security definer set search_path = '' as $$
declare
  target_category_id uuid := nullif(p_payload ->> 'category_id', '')::uuid;
begin
  if not public.is_admin() then
    raise exception 'Solo administracion guarda tarifas' using errcode = '42501';
  end if;

  if not exists (
    select 1 from public.equipment_categories
     where id = target_category_id and status = 'active'
  ) then
    raise exception 'La categoria no existe o esta inactiva' using errcode = '22023';
  end if;

  return private.write_category_tariff(target_category_id, 'rental', p_payload -> 'rental')
       + private.write_category_tariff(target_category_id, 'tour', p_payload -> 'tour');
end $$;

revoke all on function private.parse_tariff_amount(jsonb) from public, anon, authenticated;
revoke all on function private.write_category_tariff(uuid, public.reservation_type, jsonb) from public, anon, authenticated;
revoke execute on function public.save_category_tariffs(jsonb) from public, anon;
grant execute on function public.save_category_tariffs(jsonb) to authenticated;
