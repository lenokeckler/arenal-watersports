create function private.reservation_catalog_amounts(p_reservation_id uuid)
returns table (catalog_usd numeric, catalog_crc numeric)
language plpgsql stable security invoker set search_path = public
as $$
declare
  c_minutes_per_hour constant integer := 60;
begin
  return query
  select
    case
      when count(*) > 0 and count(tariff.amount_usd) = count(*)
        then round(
          sum(tariff.amount_usd * coalesce(item.quantity, 1)) * reservation.duration_minutes / c_minutes_per_hour,
          2
        )
    end as catalog_usd,
    case
      when count(*) > 0 and count(tariff.amount_crc) = count(*)
        then round(
          sum(tariff.amount_crc * coalesce(item.quantity, 1)) * reservation.duration_minutes / c_minutes_per_hour,
          2
        )
    end as catalog_crc
  from reservations reservation
  join reservation_items item on item.reservation_id = reservation.id and item.extra_id is null
  left join equipment_units unit on unit.id = item.unit_id
  left join tariffs tariff
    on tariff.category_id = coalesce(item.category_id, unit.category_id)
   and tariff.type = reservation.type
  where reservation.id = p_reservation_id
  group by reservation.duration_minutes;
  if not found then
    return query select null::numeric, null::numeric;
  end if;
end;
$$;

create function reservation_charge_proposal(p_reservation_id uuid)
returns table (proposal_usd numeric, proposal_crc numeric)
language plpgsql stable security invoker set search_path = public, private
as $$
begin
  perform require_reservations_access();
  if not exists (select 1 from reservations where id = p_reservation_id) then
    raise exception 'Reservation was not found';
  end if;
  return query
  select
    coalesce(pricing.agreed_amount_usd, pricing.list_amount_usd, catalog.catalog_usd),
    coalesce(pricing.agreed_amount_crc, pricing.list_amount_crc, catalog.catalog_crc)
  from private.reservation_catalog_amounts(p_reservation_id) catalog
  left join reservation_pricing pricing on pricing.reservation_id = p_reservation_id;
end;
$$;

revoke all on function private.reservation_catalog_amounts(uuid) from public, anon;
grant execute on function private.reservation_catalog_amounts(uuid) to authenticated;
revoke all on function reservation_charge_proposal(uuid) from public, anon;
grant execute on function reservation_charge_proposal(uuid) to authenticated;
