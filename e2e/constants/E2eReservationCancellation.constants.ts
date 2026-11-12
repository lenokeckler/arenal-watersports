import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
} from "@/app/constants";
import { E2E_CHARGE_KIND } from "./E2eDailyIncome.constants";
import { E2E_PROJECT } from "./E2eRuntime.constants";

export const E2E_RESERVATION_CANCELLATION = {
  CANCELLED_STATUS: "cancelled",
  FIELD_SEPARATOR: "|",
  FIXTURE_OPERATION: "seed a reservation to cancel",
  ID_CODE_SEPARATOR: ",",
  MISSING_SLOT:
    "no cancellation slot is configured for the project",
  READ_OPERATION: "read the cancelled reservation",
  REASON: "El cliente no llegó al muelle",
  SCREENSHOT_BASENAME: "reservation-cancellation",
  STALE_OPERATION: "touch the reservation to cancel",
  TEST_MODE: "serial",
} as const;

export const E2E_RESERVATION_CANCELLATION_SLOT_BY_PROJECT: Readonly<
  Record<string, { hour: string; unit: string }>
> = {
  [E2E_PROJECT.MOBILE]: { hour: "11", unit: "JET-01" },
  [E2E_PROJECT.DEFAULT]: { hour: "12", unit: "JET-02" },
  [E2E_PROJECT.SCREENSHOTS_MOBILE]: {
    hour: "13",
    unit: "JET-03",
  },
  [E2E_PROJECT.SCREENSHOTS]: { hour: "15", unit: "JET-04" },
};

export const E2E_RESERVATION_CANCELLATION_SEED = {
  charge_amount: "25000",
  charge_kind: E2E_CHARGE_KIND,
  currency: CURRENCY_CODE.CRC,
  deposit_amount: "100000",
  deposit_status: DEPOSIT_STATUS.HELD,
  type: "rental",
} as const;

export const E2E_RESERVATION_CANCELLATION_SCREENSHOT_STATE =
  {
    CALENDAR: "calendar",
    ERROR: "error",
    FORM: "form",
    SUCCESS: "success",
    UNAVAILABLE: "unavailable",
  } as const;

export const E2E_RESERVATION_CANCELLATION_SQL = {
  CLEANUP: `
begin;
delete from reservation_charges
where reservation_id in (select id from reservations where created_by = :'uid');
delete from deposits
where reservation_id in (select id from reservations where created_by = :'uid');
commit;`,
  READ: `
select concat_ws('|',
  reservation.status,
  coalesce(reservation.cancellation_reason, ''),
  (reservation.updated_by = :'uid')::text,
  (select count(*) from reservation_items item where item.reservation_id = reservation.id),
  (select count(*) from reservation_charges charge where charge.reservation_id = reservation.id),
  (select count(*) from deposits deposit where deposit.reservation_id = reservation.id)
)
from reservations reservation
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
