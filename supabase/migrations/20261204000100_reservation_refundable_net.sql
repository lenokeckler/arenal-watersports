create function private.reservation_refundable_amount(p_reservation_id uuid, p_currency currency_code)
returns numeric
language sql stable security invoker set search_path = public
as $$
  select
    coalesce((
      select sum(charges.amount) from reservation_charges charges
      where charges.reservation_id = p_reservation_id and charges.currency = p_currency
    ), 0)
    - coalesce((
      select sum(refunds.amount) from refunds
      where refunds.reservation_id = p_reservation_id and refunds.currency = p_currency
    ), 0);
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
  return query
  select
    currencies.code,
    coalesce((
      select sum(charges.amount) from reservation_charges charges
      where charges.reservation_id = p_reservation_id and charges.currency = currencies.code
    ), 0),
    coalesce((
      select sum(refunds.amount) from refunds
      where refunds.reservation_id = p_reservation_id and refunds.currency = currencies.code
    ), 0),
    private.reservation_refundable_amount(p_reservation_id, currencies.code)
  from unnest(enum_range(null::currency_code)) as currencies(code)
  order by currencies.code desc;
end;
$$;

revoke all on function private.reservation_refundable_amount(uuid, currency_code) from public, anon;
grant execute on function private.reservation_refundable_amount(uuid, currency_code) to authenticated;
revoke all on function reservation_refundable_net(uuid) from public, anon;
grant execute on function reservation_refundable_net(uuid) to authenticated;
