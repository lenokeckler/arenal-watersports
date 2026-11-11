create or replace function private.parse_reservation_extra_ids(
  p_payload jsonb
) returns uuid[]
language plpgsql security invoker set search_path = public, private
as $$
declare
  selected_extra_ids uuid[];
begin
  if not (p_payload ? 'extra_ids')
    or jsonb_typeof(p_payload->'extra_ids') = 'null' then
    return '{}'::uuid[];
  end if;
  if jsonb_typeof(p_payload->'extra_ids') <> 'array'
    or exists (
      select 1 from jsonb_array_elements(p_payload->'extra_ids') as extra(value)
      where jsonb_typeof(extra.value) <> 'string'
    ) then
    raise exception 'Reservation extra identifiers must be UUID values';
  end if;
  begin
    select coalesce(array_agg(extra.value::uuid), '{}'::uuid[])
      into selected_extra_ids
    from jsonb_array_elements_text(p_payload->'extra_ids') as extra(value);
  exception when invalid_text_representation then
    raise exception 'Reservation extra identifiers must be UUID values';
  end;
  if cardinality(selected_extra_ids) <> (
    select count(distinct extra_id)::integer
    from unnest(selected_extra_ids) as selected(extra_id)
  ) then
    raise exception 'Reservation extras cannot repeat';
  end if;
  return selected_extra_ids;
end;
$$;

create or replace function private.persist_reservation_extras(
  p_reservation_id uuid,
  p_extra_ids uuid[]
) returns void
language plpgsql security invoker set search_path = public, private
as $$
declare
  reservation_record reservations%rowtype;
  selected_unit_id uuid;
  price_quote record;
begin
  if cardinality(p_extra_ids) = 0 then return; end if;
  select * into strict reservation_record from reservations
  where id = p_reservation_id;
  select unit_id into strict selected_unit_id from reservation_items
  where reservation_id = p_reservation_id and unit_id is not null;
  select * into price_quote from private.calculate_reservation_extras_price(
    selected_unit_id, p_extra_ids, reservation_record.duration_minutes,
    reservation_record.type
  );
  if not price_quote.has_boat_tariff then
    raise exception 'A boat tariff is required to create a reservation with extras';
  end if;
  insert into reservation_items (
    reservation_id, category_id, quantity, extra_id, created_by, updated_by
  )
  select p_reservation_id, extra.occupies_category_id,
    extra.occupies_quantity, extra.id, auth.uid(), auth.uid()
  from unnest(p_extra_ids) as selected(extra_id)
  join extras as extra on extra.id = selected.extra_id
  order by extra.id;
  insert into reservation_pricing (
    reservation_id, list_amount_usd, list_amount_crc, created_by, updated_by
  ) values (
    p_reservation_id, price_quote.list_amount_usd,
    price_quote.list_amount_crc, auth.uid(), auth.uid()
  );
end;
$$;

revoke all on function private.parse_reservation_extra_ids(jsonb) from public, anon;
grant execute on function private.parse_reservation_extra_ids(jsonb) to authenticated;
revoke all on function private.persist_reservation_extras(uuid, uuid[]) from public, anon;
grant execute on function private.persist_reservation_extras(uuid, uuid[]) to authenticated;