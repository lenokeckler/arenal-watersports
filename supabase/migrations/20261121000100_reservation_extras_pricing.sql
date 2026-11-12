grant usage on schema private to authenticated, service_role;

create or replace function private.assert_reservation_extras_pricing_access()
returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if auth.uid() is null
    or not (has_area('reservas') or is_admin()) then
    raise exception 'Reservation access is required';
  end if;
end;
$$;

create or replace function private.validate_reservation_extras_pricing_input(
  p_unit_id uuid,
  p_extra_ids uuid[],
  p_duration_minutes integer,
  p_reservation_type reservation_type
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if p_unit_id is null
    or p_duration_minutes is null
    or p_duration_minutes <= 0
    or p_reservation_type is null
    or p_reservation_type not in ('rental', 'tour') then
    raise exception 'Reservation pricing input is invalid';
  end if;
  if p_extra_ids is null
    or array_position(p_extra_ids, null) is not null then
    raise exception 'Reservation extra selections are invalid';
  end if;
  if cardinality(p_extra_ids) <> (
    select count(distinct extra_id)::integer
    from unnest(p_extra_ids) as selection(extra_id)
  ) then
    raise exception 'Reservation extras cannot repeat';
  end if;
end;
$$;

create or replace function private.get_reservable_reservation_boat_category(
  p_unit_id uuid
) returns uuid
language plpgsql security invoker set search_path = public
as $$
declare
  selected_category_id uuid;
begin
  select unit.category_id into selected_category_id
  from equipment_units as unit
  join equipment_categories as category
    on category.id = unit.category_id
  where unit.id = p_unit_id
    and unit.status = 'available'
    and category.status = 'active'
    and category.is_reservable;
  if selected_category_id is null then
    raise exception 'The selected boat is not reservable';
  end if;
  return selected_category_id;
end;
$$;

create or replace function private.validate_active_compatible_reservation_extras(
  p_unit_id uuid,
  p_extra_ids uuid[]
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  selected_extra_count integer;
  compatible_extra_count integer;
begin
  select cardinality(p_extra_ids)::integer into selected_extra_count;
  select count(*)::integer into compatible_extra_count
  from unnest(p_extra_ids) as selection(extra_id)
  join extras as extra
    on extra.id = selection.extra_id
    and extra.status = 'active'
  join extra_compatibility as compatibility
    on compatibility.extra_id = extra.id
    and compatibility.unit_id = p_unit_id;
  if selected_extra_count <> compatible_extra_count then
    raise exception 'Every selected extra must be active and compatible';
  end if;
end;
$$;

create or replace function private.assert_reservation_extras_prices_nonnegative(
  p_category_id uuid,
  p_extra_ids uuid[],
  p_reservation_type reservation_type
) returns void
language plpgsql security invoker set search_path = public
as $$
begin
  if exists (
    select 1 from tariffs as tariff
    where tariff.category_id = p_category_id
      and tariff.type = p_reservation_type
      and (tariff.amount_usd < 0 or tariff.amount_crc < 0)
  ) or exists (
    select 1 from unnest(p_extra_ids) as selection(extra_id)
    join extras as extra on extra.id = selection.extra_id
    where extra.price_usd < 0 or extra.price_crc < 0
  ) then
    raise exception 'Reservation prices cannot be negative';
  end if;
end;
$$;

create or replace function private.compute_reservation_extras_currency(
  p_boat_hourly_amount numeric,
  p_extras_amount numeric,
  p_has_all_prices boolean,
  p_duration_minutes integer
) returns numeric
language plpgsql immutable security invoker set search_path = public
as $$
declare
  currency_decimal_places constant integer := 2;
  minutes_per_hour constant integer := 60;
begin
  if p_boat_hourly_amount is null or not p_has_all_prices then
    return null;
  end if;
  return round(
    p_boat_hourly_amount * p_duration_minutes / minutes_per_hour
      + p_extras_amount,
    currency_decimal_places
  );
end;
$$;

create or replace function private.get_reservation_extra_amounts(
  p_extra_ids uuid[]
) returns table (
  has_usd_prices boolean,
  has_crc_prices boolean,
  extras_amount_usd numeric,
  extras_amount_crc numeric
)
language plpgsql security invoker set search_path = public, private
as $$
begin
  perform private.assert_reservation_extras_pricing_access();
  return query select
    bool_and(extra.price_usd is not null),
    bool_and(extra.price_crc is not null),
    coalesce(sum(extra.price_usd), 0),
    coalesce(sum(extra.price_crc), 0)
  from unnest(p_extra_ids) as selection(extra_id)
  join extras as extra on extra.id = selection.extra_id;
end;
$$;

create or replace function private.compute_reservation_extras_price(
  p_category_id uuid,
  p_extra_ids uuid[],
  p_duration_minutes integer,
  p_reservation_type reservation_type
) returns table (
  has_boat_tariff boolean,
  list_amount_usd numeric,
  list_amount_crc numeric
)
language plpgsql security invoker set search_path = public, private
as $$
declare
  selected_tariff tariffs%rowtype;
  selected_extra_prices record;
begin
  select tariff.* into selected_tariff
  from tariffs as tariff
  where tariff.category_id = p_category_id
    and tariff.type = p_reservation_type;
  select * into selected_extra_prices
  from private.get_reservation_extra_amounts(p_extra_ids);
  return query select
    selected_tariff.id is not null,
    private.compute_reservation_extras_currency(
      selected_tariff.amount_usd,
      selected_extra_prices.extras_amount_usd,
      selected_extra_prices.has_usd_prices,
      p_duration_minutes
    ),
    private.compute_reservation_extras_currency(
      selected_tariff.amount_crc,
      selected_extra_prices.extras_amount_crc,
      selected_extra_prices.has_crc_prices,
      p_duration_minutes
    );
end;
$$;

create or replace function private.calculate_reservation_extras_price(
  p_unit_id uuid,
  p_extra_ids uuid[],
  p_duration_minutes integer,
  p_reservation_type reservation_type
) returns table (
  has_boat_tariff boolean,
  list_amount_usd numeric,
  list_amount_crc numeric
)
language plpgsql security invoker set search_path = public, private
as $$
declare
  selected_category_id uuid;
begin
  perform private.assert_reservation_extras_pricing_access();
  perform private.validate_reservation_extras_pricing_input(
    p_unit_id, p_extra_ids, p_duration_minutes, p_reservation_type
  );
  selected_category_id :=
    private.get_reservable_reservation_boat_category(p_unit_id);
  perform private.validate_active_compatible_reservation_extras(
    p_unit_id, p_extra_ids
  );
  perform private.assert_reservation_extras_prices_nonnegative(
    selected_category_id, p_extra_ids, p_reservation_type
  );
  return query select * from private.compute_reservation_extras_price(
    selected_category_id, p_extra_ids, p_duration_minutes,
    p_reservation_type
  );
end;
$$;

create or replace function reservation_extras_price_quote(
  p_unit_id uuid,
  p_extra_ids uuid[],
  p_duration_minutes integer,
  p_reservation_type reservation_type
) returns table (
  has_boat_tariff boolean,
  list_amount_usd numeric,
  list_amount_crc numeric
)
language sql security invoker set search_path = public
as $$
  select * from private.calculate_reservation_extras_price(
    p_unit_id, p_extra_ids, p_duration_minutes, p_reservation_type
  );
$$;

revoke all on function private.assert_reservation_extras_pricing_access()
  from public, anon;
revoke all on function private.validate_reservation_extras_pricing_input(
  uuid, uuid[], integer, reservation_type
) from public, anon;
revoke all on function private.get_reservable_reservation_boat_category(uuid)
  from public, anon;
revoke all on function private.validate_active_compatible_reservation_extras(
  uuid, uuid[]
) from public, anon;
revoke all on function private.assert_reservation_extras_prices_nonnegative(
  uuid, uuid[], reservation_type
) from public, anon;
revoke all on function private.compute_reservation_extras_price(
  uuid, uuid[], integer, reservation_type
) from public, anon;
revoke all on function private.compute_reservation_extras_currency(
  numeric, numeric, boolean, integer
) from public, anon;
revoke all on function private.get_reservation_extra_amounts(uuid[])
  from public, anon;
revoke all on function private.calculate_reservation_extras_price(
  uuid, uuid[], integer, reservation_type
) from public, anon;
grant execute on function private.assert_reservation_extras_pricing_access()
  to authenticated, service_role;
grant execute on function private.validate_reservation_extras_pricing_input(
  uuid, uuid[], integer, reservation_type
) to authenticated, service_role;
grant execute on function private.get_reservable_reservation_boat_category(uuid)
  to authenticated, service_role;
grant execute on function private.validate_active_compatible_reservation_extras(
  uuid, uuid[]
) to authenticated, service_role;
grant execute on function private.assert_reservation_extras_prices_nonnegative(
  uuid, uuid[], reservation_type
) to authenticated, service_role;
grant execute on function private.compute_reservation_extras_price(
  uuid, uuid[], integer, reservation_type
) to authenticated, service_role;
grant execute on function private.compute_reservation_extras_currency(
  numeric, numeric, boolean, integer
) to authenticated, service_role;
grant execute on function private.get_reservation_extra_amounts(uuid[])
  to authenticated, service_role;
grant execute on function private.calculate_reservation_extras_price(
  uuid, uuid[], integer, reservation_type
) to authenticated, service_role;
revoke all on function reservation_extras_price_quote(
  uuid, uuid[], integer, reservation_type
) from public, anon;
grant execute on function reservation_extras_price_quote(
  uuid, uuid[], integer, reservation_type
) to authenticated;
