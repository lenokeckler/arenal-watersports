import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
} from "@/app/constants";
import { E2E_CHARGE_KIND } from "./E2eDailyIncome.constants";
import { E2E_PROJECT } from "./E2eRuntime.constants";

export const E2E_RESERVATION_SPLIT = {
  EXACT_COUNT: "exact",
  ID_CODE_SEPARATOR: ",",
  MISSING_UNIT:
    "no split unit is configured for the project",
  PARENT_COLUMN: "parent_reservation_id",
  READ_OPERATION: "read the split reservation state",
  RESERVATION_COLUMN: "reservation_id",
  ARIA_DISABLED: "aria-disabled",
  ARIA_TRUE: "true",
  CATEGORY: "Kayak doble",
  CHARGE_AMOUNT: "25000",
  CODE_PATTERN: /^R-\d+$/,
  DEPARTURE_NUMBER: 2,
  DEPARTURE_PEOPLE_STEPS: 2,
  DEPARTURE_QUANTITY_STEPS: 2,
  DEPOSIT_AMOUNT: "100000",
  EXPECTED_DEPARTURES: 2,
  FIXTURE_OPERATION: "seed a reservation to split",
  OVER_ASSIGNMENT_STEPS: 4,
  LOCKED_STATUSES: ["dispatched", "closed"],
  UNAVAILABLE_STATUS: "dispatched",
  PEOPLE: "6",
  QUANTITY: "4",
  SCREENSHOT_BASENAME: "reservation-split",
  STALE_OPERATION: "touch the reservation to split",
  UNIT_CATEGORY: "Lancha",
} as const;

export const E2E_RESERVATION_SPLIT_SLOT_BY_PROJECT: Readonly<
  Record<string, { time: string; unit: string }>
> = {
  [E2E_PROJECT.MOBILE]: { time: "14:00", unit: "PONTOON" },
  [E2E_PROJECT.DEFAULT]: {
    time: "16:00",
    unit: "BENNINGTON",
  },
  [E2E_PROJECT.SCREENSHOTS_MOBILE]: {
    time: "18:00",
    unit: "PONTOON",
  },
  [E2E_PROJECT.SCREENSHOTS]: {
    time: "20:00",
    unit: "BENNINGTON",
  },
};

export const E2E_RESERVATION_SPLIT_SEED = {
  charge_kind: E2E_CHARGE_KIND,
  currency: CURRENCY_CODE.CRC,
  deposit_status: DEPOSIT_STATUS.HELD,
  status: "scheduled",
  type: "rental",
} as const;

export const E2E_RESERVATION_SPLIT_SQL = {
  CLEANUP: `
begin;
delete from reservation_charges
where reservation_id in (select id from reservations where created_by = :'uid');
delete from deposits
where reservation_id in (select id from reservations where created_by = :'uid');
commit;`,
  SEED: `
with reservation as (
  insert into reservations (created_by, customer_name, duration_minutes, people_count, starts_at, status, type, updated_by)
  values (
    :'uid', :'customer', 60, :'people'::integer,
    (date_trunc('day', now() at time zone 'America/Costa_Rica') + interval '10 hours') at time zone 'America/Costa_Rica',
    :'status', :'type', :'uid'
  ) returning id, code
), quantity_item as (
  insert into reservation_items (category_id, created_by, quantity, reservation_id, updated_by)
  select category.id, :'uid', :'quantity'::integer, reservation.id, :'uid'
  from reservation, equipment_categories category where category.name = :'category'
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

export const E2E_RESERVATION_SPLIT_SCREENSHOT_STATE = {
  CALENDAR: "calendar",
  ERROR: "error",
  FORM: "form",
  ORIGIN_MARKER: "origin-marker",
  SUCCESS: "success",
  TWO_DEPARTURES: "two-departures",
  UNAVAILABLE: "unavailable",
} as const;
