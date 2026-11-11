export const E2E_RESERVATION_POSTPONEMENT_SQL = {
  CLEANUP: `
begin;
create temporary table e2e_postponement_ids on commit drop as
select id from reservations where created_by = :'uid';
delete from reservation_postponement_readings
where postponement_id in (
  select id from reservation_postponements
  where reservation_id in (select id from e2e_postponement_ids)
);
delete from reservation_postponements
where reservation_id in (select id from e2e_postponement_ids);
update reservation_items set dispatch_id = null
where reservation_id in (select id from e2e_postponement_ids);
delete from reservation_dispatches
where reservation_id in (select id from e2e_postponement_ids);
delete from reservation_charges
where reservation_id in (select id from e2e_postponement_ids);
delete from deposits
where reservation_id in (select id from e2e_postponement_ids);
update equipment_units
set fuel_level = null, usage_total = 0, updated_by = created_by
where code = :'unit';
commit;`,
  DISPATCH: `
with dispatch as (
  insert into reservation_dispatches (category_id, created_by, dispatched_at, duration_minutes, reservation_id, updated_by)
  select unit.category_id, :'uid', now() - interval '30 minutes', 60, :'reservation', :'uid'
  from equipment_units unit where unit.code = :'unit'
  returning id
)
update reservation_items item
set dispatch_id = dispatch.id, fuel_out = :'fuel_out'::integer, usage_out = :'usage_out'::numeric
from dispatch
where item.reservation_id = :'reservation'
returning item.id;`,
  READ: `
select concat_ws('|',
  reservation.status,
  to_char(reservation.starts_at at time zone 'America/Costa_Rica', 'YYYY-MM-DD HH24:MI'),
  (select count(*) from reservation_charges charge where charge.reservation_id = reservation.id),
  (select count(*) from deposits deposit where deposit.reservation_id = reservation.id),
  (select count(*) from reservation_dispatches dispatch where dispatch.reservation_id = reservation.id and dispatch.closed_at is null),
  postponement.cause,
  coalesce(postponement.reason, ''),
  (postponement.created_by = :'uid')::text,
  postponement.was_dispatched::text,
  (select count(*) from reservation_postponement_readings reading where reading.postponement_id = postponement.id)
)
from reservations reservation
left join reservation_postponements postponement on postponement.reservation_id = reservation.id
where reservation.id = :'reservation';`,
  SEED: `
with reservation as (
  insert into reservations (created_by, customer_name, duration_minutes, people_count, starts_at, status, type, updated_by)
  values (
    :'uid', :'customer', 60, 2,
    (date_trunc('day', now() at time zone 'America/Costa_Rica') + make_interval(hours => :'hour'::integer)) at time zone 'America/Costa_Rica',
    'scheduled', :'type', :'uid'
  ) returning id, code
), unit_item as (
  insert into reservation_items (created_by, reservation_id, unit_id, updated_by)
  select :'uid', reservation.id, unit.id, :'uid'
  from reservation, equipment_units unit where unit.code = :'unit'
), charge as (
  insert into reservation_charges (amount, created_by, currency, kind, payment_method, reservation_id)
  select :'charge_amount'::numeric, :'uid', :'currency'::currency_code, :'charge_kind'::charge_kind, :'customer', id from reservation
), deposit as (
  insert into deposits (amount, created_by, currency, reservation_id, status)
  select :'deposit_amount'::numeric, :'uid', :'currency'::currency_code, id, :'deposit_status'::deposit_status from reservation
)
select id || ',' || code from reservation;`,
  TOUCH:
    "update reservations set updated_by = :'uid' where id = :'reservation';",
} as const;
