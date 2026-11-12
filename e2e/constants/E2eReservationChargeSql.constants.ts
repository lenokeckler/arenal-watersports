export const E2E_RESERVATION_CHARGE_SQL = {
  TARIFF: `
select concat_ws('|', tariff.amount_usd, tariff.amount_crc)
from reservation_items item
join equipment_units unit on unit.id = item.unit_id
join reservations reservation on reservation.id = item.reservation_id
join tariffs tariff on tariff.category_id = unit.category_id and tariff.type = reservation.type
where item.reservation_id = :'reservation';`,
  CLEANUP: `
begin;
delete from reservation_charges
where reservation_id in (select id from reservations where created_by = :'uid');
delete from reservation_pricing
where reservation_id in (select id from reservations where created_by = :'uid');
update tariffs
set created_by = case when created_by = :'uid' then keeper.id else created_by end,
  updated_by = case when updated_by = :'uid' then keeper.id else updated_by end
from (select id from workers where id <> :'uid' order by created_at limit 1) keeper
where created_by = :'uid' or updated_by = :'uid';
commit;`,
  READ: `
with first_charge as (
  select charge.kind::text as kind, charge.amount::text as amount, charge.currency::text as currency,
    charge.payment_method as method, (charge.created_by = :'uid')::text as is_author, worker.full_name
  from reservation_charges charge
  join workers worker on worker.id = charge.created_by
  where charge.reservation_id = :'reservation'
  limit 1
)
select concat_ws('|',
  (select count(*) from reservation_charges where reservation_id = :'reservation'),
  coalesce(first_charge.kind, ''),
  coalesce(first_charge.amount, ''),
  coalesce(first_charge.currency, ''),
  coalesce(first_charge.method, ''),
  coalesce(first_charge.is_author, 'false'),
  coalesce(pricing.agreed_amount_usd::text, ''),
  coalesce(pricing.agreed_amount_crc::text, ''),
  (select count(*) from reservation_pricing where reservation_id = :'reservation'),
  coalesce(first_charge.full_name, '')
)
from (select 1) base
left join first_charge on true
left join reservation_pricing pricing on pricing.reservation_id = :'reservation';`,
  SEED: `
with unit as (
  select id, category_id from equipment_units where code = :'unit'
), tariff as (
  insert into tariffs (category_id, type, amount_usd, amount_crc, created_by, updated_by)
  select category_id, :'type'::reservation_type, :'tariff_usd'::numeric, :'tariff_crc'::numeric, :'uid', :'uid'
  from unit
  on conflict (category_id, type) do update set amount_usd = excluded.amount_usd, amount_crc = excluded.amount_crc
), reservation as (
  insert into reservations (created_by, customer_name, duration_minutes, people_count, starts_at, status, type, updated_by)
  values (
    :'uid', :'customer', :'duration'::integer, :'people'::integer,
    (date_trunc('day', now() at time zone 'America/Costa_Rica') + make_interval(hours => :'hour'::integer)) at time zone 'America/Costa_Rica',
    'scheduled', :'type', :'uid'
  ) returning id, code
), unit_item as (
  insert into reservation_items (created_by, reservation_id, unit_id, updated_by)
  select :'uid', reservation.id, unit.id, :'uid'
  from reservation, unit
)
select id || ',' || code from reservation;`,
  SET_STATUS:
    "update reservations set status = :'status'::reservation_status, cancellation_reason = case when :'status' = 'cancelled' then :'reason' end, updated_by = :'uid' where id = :'reservation';",
} as const;
