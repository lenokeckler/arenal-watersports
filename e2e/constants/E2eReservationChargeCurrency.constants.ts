export const E2E_RESERVATION_CHARGE_CURRENCY = {
  CATEGORY_PREFIX: "E2E Moneda ",
  CRC_AMOUNT: "7000",
  CRC_EXTRA_AMOUNT: "500",
  CRC_TOTAL: 7500,
  FIXTURE_OPERATION:
    "seed a reservation whose catalog proposes only dollars",
  REMOVE_OPERATION:
    "remove the dollars-only category and its tariff",
  TOKEN_LENGTH: 8,
  UNIT_PREFIX: "E2E-MON-",
  USD_AMOUNT: "12.5",
  USD_TARIFF: "40",
} as const;

export const E2E_RESERVATION_CHARGE_CURRENCY_SQL = {
  REMOVE: `
begin;
delete from tariffs
where category_id in (select id from equipment_categories where name = :'category');
delete from equipment_units
where category_id in (select id from equipment_categories where name = :'category');
delete from equipment_categories where name = :'category';
commit;`,
  SEED: `
with category as (
  insert into equipment_categories (name, status, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
  values (:'category', 'active', 'by_unit', true, :'duration'::integer, :'uid', :'uid')
  returning id
), unit as (
  insert into equipment_units (category_id, code, status, created_by, updated_by)
  select id, :'unit', 'available', :'uid', :'uid' from category
  returning id, category_id
), tariff as (
  insert into tariffs (category_id, type, amount_usd, amount_crc, created_by, updated_by)
  select category_id, :'type'::reservation_type, :'tariff_usd'::numeric, null, :'uid', :'uid'
  from unit
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
} as const;
