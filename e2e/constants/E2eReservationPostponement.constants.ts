import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
} from "@/app/constants";
import { E2E_CHARGE_KIND } from "./E2eDailyIncome.constants";
import { E2E_PROJECT } from "./E2eRuntime.constants";

export const E2E_RESERVATION_POSTPONEMENT = {
  CHARGE_AMOUNT: "25000",
  COSTA_RICA_LOCALE: "en-CA",
  COSTA_RICA_TIME_ZONE: "America/Costa_Rica",
  DAY_MS: 86_400_000,
  DEPOSIT_AMOUNT: "100000",
  DISPATCHED_STATUS: "dispatched",
  FIELD_SEPARATOR: "|",
  FIXTURE_OPERATION: "seed a reservation to postpone",
  FUEL_MAX: 4,
  FUEL_OUT: "4",
  ID_CODE_SEPARATOR: ",",
  MISSING_SLOT:
    "no postponement slot is configured for the project",
  OTHER_REASON: "El cliente pidió cambiar el día",
  READ_OPERATION: "read the postponed reservation",
  RETURN_FUEL: 1,
  RETURN_USAGE: "12,5",
  SCREENSHOT_BASENAME: "reservation-postponement",
  SCHEDULED_STATUS: "scheduled",
  STALE_OPERATION: "touch the reservation to postpone",
  TEST_MODE: "serial",
  UNIT_CATEGORY: "Jet Ski",
  USAGE_METRIC: "engine_hours",
  USAGE_OUT: "10",
} as const;

export const E2E_RESERVATION_POSTPONEMENT_SLOT_BY_PROJECT: Readonly<
  Record<
    string,
    { hour: string; time: string; unit: string }
  >
> = {
  [E2E_PROJECT.MOBILE]: {
    hour: "6",
    time: "06:00",
    unit: "JET-01",
  },
  [E2E_PROJECT.DEFAULT]: {
    hour: "7",
    time: "07:00",
    unit: "JET-02",
  },
  [E2E_PROJECT.SCREENSHOTS_MOBILE]: {
    hour: "8",
    time: "08:00",
    unit: "JET-03",
  },
  [E2E_PROJECT.SCREENSHOTS]: {
    hour: "9",
    time: "09:00",
    unit: "JET-04",
  },
};

export const E2E_RESERVATION_POSTPONEMENT_SEED = {
  charge_amount: E2E_RESERVATION_POSTPONEMENT.CHARGE_AMOUNT,
  charge_kind: E2E_CHARGE_KIND,
  currency: CURRENCY_CODE.CRC,
  deposit_amount:
    E2E_RESERVATION_POSTPONEMENT.DEPOSIT_AMOUNT,
  deposit_status: DEPOSIT_STATUS.HELD,
  fuel_out: E2E_RESERVATION_POSTPONEMENT.FUEL_OUT,
  type: "rental",
  usage_out: E2E_RESERVATION_POSTPONEMENT.USAGE_OUT,
} as const;

export const E2E_RESERVATION_POSTPONEMENT_SCREENSHOT_STATE =
  {
    CALENDAR: "calendar",
    DISPATCHED: "dispatched",
    ERROR: "error",
    FORM: "form",
    OTHER_REASON: "other-reason",
    READINGS_ERROR: "readings-error",
    SUCCESS: "success",
  } as const;
