export const E2E_RESERVATION_DISPATCHED_CANCELLATION = {
  FIELD_SEPARATOR: "|",
  FIXED_FIELD_COUNT: 8,
  FIXTURE_OPERATION: "dispatch a reservation to cancel",
  FUEL_OUT: "4",
  READ_OPERATION: "read the dispatched cancellation",
  READ_UNIT_OPERATION: "read the unit of the dispatch",
  SCREENSHOT_BASENAME:
    "reservation-dispatched-cancellation",
  UNIT_AVAILABLE: "available",
  UNIT_OCCUPIED: "occupied",
  USAGE_OUT: "10",
} as const;

export const E2E_RESERVATION_DISPATCHED_CANCELLATION_ERROR =
  {
    FIELD_COUNT: (received: number): string =>
      `expected at least ${E2E_RESERVATION_DISPATCHED_CANCELLATION.FIXED_FIELD_COUNT + 1} fields, received ${received}`,
  } as const;

export const E2E_RESERVATION_DISPATCHED_CANCELLATION_SCREENSHOT_STATE =
  {
    CALENDAR: "calendar",
    CAUSE_ERROR: "cause-error",
    CAUSE_SELECTED: "cause-selected",
    FORM: "form",
    OUT_ON_WATER: "out-on-water",
    REASON_ERROR: "reason-error",
    SUCCESS: "success",
    UNAVAILABLE: "unavailable",
  } as const;

export const E2E_RESERVATION_DISPATCHED_CANCELLATION_SQL = {
  CLEANUP: `
begin;
update equipment_units
set fuel_level = null, usage_total = 0, updated_by = :'admin'
where id in (
  select item.unit_id from reservation_items item
  join reservations reservation on reservation.id = item.reservation_id
  where reservation.created_by = :'uid' and item.unit_id is not null
);
delete from reservation_items
where reservation_id in (select id from reservations where created_by = :'uid');
delete from reservation_dispatches
where reservation_id in (select id from reservations where created_by = :'uid');
commit;`,
  READ: `
select concat_ws('|',
  reservation.status,
  coalesce(reservation.cancellation_cause::text, ''),
  (select count(*) from reservation_dispatches dispatch where dispatch.reservation_id = reservation.id and dispatch.closed_at is null),
  (select count(*) from reservation_dispatches dispatch where dispatch.reservation_id = reservation.id and dispatch.closed_at is not null),
  coalesce((select deposit.status::text from deposits deposit where deposit.reservation_id = reservation.id), ''),
  (select count(*) from reservation_charges charge where charge.reservation_id = reservation.id),
  coalesce((select item.fuel_in::text from reservation_items item where item.reservation_id = reservation.id and item.unit_id is not null), ''),
  coalesce((select item.usage_in::text from reservation_items item where item.reservation_id = reservation.id and item.unit_id is not null), ''),
  coalesce(reservation.cancellation_reason, '')
)
from reservations reservation
where reservation.id = :'reservation';`,
  READ_UNIT: `
select effective_status from unit_current_state where code = :'unit';`,
  SEED_DISPATCH: `
with dispatch as (
  insert into reservation_dispatches (reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
  select reservation.id, unit.category_id, now() - interval '10 minutes', reservation.duration_minutes, :'uid', :'uid'
  from reservations reservation, equipment_units unit
  where reservation.id = :'reservation' and unit.code = :'unit'
  returning id
)
update reservation_items item
set dispatch_id = dispatch.id, fuel_out = :'fuel_out'::integer, usage_out = :'usage_out'::numeric
from dispatch
where item.reservation_id = :'reservation' and item.unit_id is not null;`,
} as const;
