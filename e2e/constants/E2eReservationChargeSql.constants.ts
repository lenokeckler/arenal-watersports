export const E2E_RESERVATION_CHARGE_SQL = {
  CLEANUP: `
begin;
delete from reservation_charges
where reservation_id in (select id from reservations where created_by = :'uid');
delete from reservation_pricing
where reservation_id in (select id from reservations where created_by = :'uid');
commit;`,
  PROPOSAL: `
select catalog_usd from private.reservation_catalog_amounts(:'reservation');`,
  READ: `
select concat_ws('|',
  (select count(*) from reservation_charges charge where charge.reservation_id = :'reservation'),
  coalesce((select charge.kind::text from reservation_charges charge where charge.reservation_id = :'reservation' limit 1), ''),
  coalesce((select charge.amount::text from reservation_charges charge where charge.reservation_id = :'reservation' limit 1), ''),
  coalesce((select charge.currency::text from reservation_charges charge where charge.reservation_id = :'reservation' limit 1), ''),
  coalesce((select charge.payment_method from reservation_charges charge where charge.reservation_id = :'reservation' limit 1), ''),
  coalesce((select (charge.created_by = :'uid')::text from reservation_charges charge where charge.reservation_id = :'reservation' limit 1), 'false'),
  coalesce((select pricing.agreed_amount_usd::text from reservation_pricing pricing where pricing.reservation_id = :'reservation'), ''),
  coalesce((select pricing.agreed_amount_crc::text from reservation_pricing pricing where pricing.reservation_id = :'reservation'), ''),
  (select count(*) from reservation_pricing pricing where pricing.reservation_id = :'reservation'),
  coalesce((select worker.full_name from reservation_charges charge join workers worker on worker.id = charge.created_by where charge.reservation_id = :'reservation' limit 1), '')
);`,
  SEED: `
with unit as (
  select id, category_id from equipment_units where code = :'unit'
), tariff as (
  insert into tariffs (category_id, type, amount_usd, amount_crc, created_by, updated_by)
  select category_id, :'type'::reservation_type, :'tariff_usd'::numeric, :'tariff_crc'::numeric, :'uid', :'uid'
  from unit
  on conflict (category_id, type) do nothing
), reservation as (
  insert into reservations (created_by, customer_name, duration_minutes, people_count, starts_at, status, type, updated_by)
  values (
    :'uid', :'customer', 60, :'people'::integer,
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
