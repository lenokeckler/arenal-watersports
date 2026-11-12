create function adjust_equipment_stock(
  p_category_id uuid,
  p_available integer,
  p_damaged integer,
  p_in_repair integer,
  p_reason text,
  p_expiry_date date default null
) returns void
language plpgsql volatile security definer set search_path = public as $$
declare
  category_row equipment_categories%rowtype;
  current_stock equipment_stock%rowtype;
  has_history boolean;
begin
  if not is_admin() then
    raise exception 'Solo administracion ajusta el conteo' using errcode = '42501';
  end if;

  if p_available is null or p_damaged is null or p_in_repair is null
     or p_available < 0 or p_damaged < 0 or p_in_repair < 0 then
    raise exception 'Las cantidades no pueden ser negativas' using errcode = '22023';
  end if;

  if p_reason is null
     or p_reason not in ('initial_count', 'discarded', 'lost', 'count_correction') then
    raise exception 'Motivo de ajuste no valido' using errcode = '22023';
  end if;

  select * into category_row from equipment_categories where id = p_category_id;

  if not found then
    raise exception 'La categoria no existe' using errcode = 'P0002';
  end if;

  if category_row.tracking_mode <> 'by_quantity' then
    raise exception 'Una categoria identificada por unidad no lleva conteo de stock'
      using errcode = '22023';
  end if;

  if p_expiry_date is not null and category_row.alert_expiry_days is null then
    raise exception 'La categoria no tiene aviso por vencimiento' using errcode = '22023';
  end if;

  insert into equipment_stock (category_id, updated_by)
  values (p_category_id, auth.uid())
  on conflict (category_id) do nothing;

  select * into current_stock
  from equipment_stock
  where category_id = p_category_id
  for update;

  select exists (
    select 1 from equipment_stock_movements where category_id = p_category_id
  ) into has_history;

  if p_available = current_stock.quantity_available
     and p_damaged = current_stock.quantity_damaged
     and p_in_repair = current_stock.quantity_in_repair
     and p_expiry_date is not distinct from current_stock.expiry_date then
    raise exception 'El ajuste no cambia nada' using errcode = '22023';
  end if;

  if p_reason = 'initial_count' and (
       has_history
       or current_stock.quantity_available + current_stock.quantity_damaged
          + current_stock.quantity_in_repair > 0) then
    raise exception 'La categoria ya tiene un conteo registrado' using errcode = '22023';
  end if;

  if p_reason in ('discarded', 'lost')
     and p_available + p_damaged + p_in_repair
         >= current_stock.quantity_available + current_stock.quantity_damaged
            + current_stock.quantity_in_repair then
    raise exception 'Botar o perder baja la cantidad total' using errcode = '22023';
  end if;

  insert into equipment_stock_movements (
    category_id,
    from_available, to_available,
    from_damaged, to_damaged,
    from_in_repair, to_in_repair,
    reason, created_by
  ) values (
    p_category_id,
    current_stock.quantity_available, p_available,
    current_stock.quantity_damaged, p_damaged,
    current_stock.quantity_in_repair, p_in_repair,
    p_reason, auth.uid()
  );

  update equipment_stock
     set quantity_available = p_available,
         quantity_damaged = p_damaged,
         quantity_in_repair = p_in_repair,
         expiry_date = p_expiry_date,
         updated_by = auth.uid(),
         updated_at = now()
   where category_id = p_category_id;
end $$;

revoke execute on function adjust_equipment_stock(uuid, integer, integer, integer, text, date)
  from public, anon;
grant execute on function adjust_equipment_stock(uuid, integer, integer, integer, text, date)
  to authenticated;
