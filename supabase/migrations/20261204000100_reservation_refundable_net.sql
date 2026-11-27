create function private.reservation_charged_amount(p_reservation_id uuid, p_currency currency_code)
returns numeric
language sql stable security invoker set search_path = public
as $$
  select coalesce(sum(charges.amount), 0) from reservation_charges charges
  where charges.reservation_id = p_reservation_id and charges.currency = p_currency;
$$;

create function private.reservation_refunded_amount(p_reservation_id uuid, p_currency currency_code)
returns numeric
language sql stable security invoker set search_path = public
as $$
  select coalesce(sum(refunds.amount), 0) from refunds
  where refunds.reservation_id = p_reservation_id and refunds.currency = p_currency;
$$;

create function private.reservation_refundable_amount(p_reservation_id uuid, p_currency currency_code)
returns numeric
language sql stable security invoker set search_path = public, private
as $$
  select private.reservation_charged_amount(p_reservation_id, p_currency)
       - private.reservation_refunded_amount(p_reservation_id, p_currency);
$$;

create function reservation_refundable_net(p_reservation_id uuid)
returns table (
  currency currency_code,
  charged_amount numeric,
  refunded_amount numeric,
  refundable_amount numeric
)
language plpgsql stable security invoker set search_path = public, private
as $$
begin
  perform require_reservations_access();
  if not exists (select 1 from reservations where reservations.id = p_reservation_id) then
    raise exception 'Reservation was not found';
  end if;
  return query
  select totals.code, totals.charged, totals.refunded, totals.charged - totals.refunded
  from (
    select
      currencies.code,
      private.reservation_charged_amount(p_reservation_id, currencies.code) as charged,
      private.reservation_refunded_amount(p_reservation_id, currencies.code) as refunded
    from unnest(enum_range(null::currency_code)) as currencies(code)
  ) totals
  order by totals.code;
end;
$$;

revoke all on function private.reservation_charged_amount(uuid, currency_code) from public, anon;
grant execute on function private.reservation_charged_amount(uuid, currency_code) to authenticated;
revoke all on function private.reservation_refunded_amount(uuid, currency_code) from public, anon;
grant execute on function private.reservation_refunded_amount(uuid, currency_code) to authenticated;
revoke all on function private.reservation_refundable_amount(uuid, currency_code) from public, anon;
grant execute on function private.reservation_refundable_amount(uuid, currency_code) to authenticated;
revoke all on function reservation_refundable_net(uuid) from public, anon;
grant execute on function reservation_refundable_net(uuid) to authenticated;
