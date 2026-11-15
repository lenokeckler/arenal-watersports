import {
  CURRENCY_CODE,
  RESERVATION_TYPE,
} from "@/app/constants";
import { E2E_PROJECT } from "./E2eRuntime.constants";

export const E2E_RESERVATION_CHARGE = {
  ADJUSTED_AMOUNT: "17.5",
  CHARGE_KIND: "tariff",
  FIELD_SEPARATOR: "|",
  FIXTURE_OPERATION: "seed a reservation to charge",
  HIGH_AMOUNT: "99999",
  HIGH_AMOUNT_FACTOR: 10,
  ID_CODE_SEPARATOR: ",",
  MISSING_SLOT:
    "no charge slot is configured for the project",
  MIXED_AMOUNT_CRC: "7777",
  MIXED_AMOUNT_USD: "31.5",
  PART_FIELD_SEPARATOR: ",",
  PART_SEPARATOR: ";",
  PAYMENT_METHOD: "Efectivo",
  DURATION_MINUTES: "90",
  PEOPLE_COUNT: "6",
  MINUTES_PER_HOUR: 60,
  TARIFF_OPERATION: "read the seeded category tariff",
  CANCELLATION_REASON: "El cliente no llegó al muelle",
  READ_OPERATION: "read the charged reservation",
  READ_PARTS_OPERATION: "read every part of the charge",
  SCREENSHOT_BASENAME: "reservation-charge",
  STATUS_OPERATION: "change the reservation status",
  TEST_MODE: "serial",
} as const;

export const E2E_RESERVATION_CHARGE_SLOT_BY_PROJECT: Readonly<
  Record<string, { hour: string; unit: string }>
> = {
  [E2E_PROJECT.MOBILE]: { hour: "8", unit: "PB-01" },
  [E2E_PROJECT.DEFAULT]: { hour: "9", unit: "PB-02" },
  [E2E_PROJECT.SCREENSHOTS_MOBILE]: {
    hour: "10",
    unit: "PB-03",
  },
  [E2E_PROJECT.SCREENSHOTS]: { hour: "14", unit: "PB-04" },
};

export const E2E_RESERVATION_CHARGE_SEED = {
  currency: CURRENCY_CODE.USD,
  tariff_crc: "12500",
  tariff_usd: "25",
  type: RESERVATION_TYPE.RENTAL,
} as const;

export const E2E_RESERVATION_CHARGE_SCREENSHOT_STATE = {
  DETAIL: "detail",
  ERROR: "error",
  FORM: "form",
  MIXED: "mixed",
  MIXED_SUCCESS: "mixed-success",
  SUCCESS: "success",
  UNAVAILABLE: "unavailable",
} as const;
