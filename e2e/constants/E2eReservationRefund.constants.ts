import { CURRENCY_CODE } from "@/app/constants";
import type { E2eChargeSeed } from "../support/models/E2eChargeSeed.interface";

export const E2E_RESERVATION_REFUND = {
  ABOVE_NET_AMOUNT: "41",
  CHARGE_PAYMENT_METHOD: "Efectivo",
  CLEANUP_OPERATION: "remove the E2E refunds",
  FIELD_SEPARATOR: "|",
  FULL_AMOUNT: "40",
  OTHER_REASON_TEXT:
    "El cliente tuvo una emergencia familiar",
  PARTIAL_AMOUNT: "15.5",
  PARTIAL_AMOUNT_VALUE: 15.5,
  READ_OPERATION: "read the refunds of the reservation",
  SCREENSHOT_BASENAME: "reservation-refund",
  TEST_MODE: "serial",
} as const;

export const E2E_RESERVATION_REFUND_CHARGES = {
  CRC: { amount: 20000, currency: CURRENCY_CODE.CRC },
  USD: { amount: 40, currency: CURRENCY_CODE.USD },
} as const satisfies Record<string, E2eChargeSeed>;

export const E2E_RESERVATION_REFUND_SCREENSHOT_STATE = {
  DETAIL: "detail",
  ERROR: "error",
  FORM: "form",
  OTHER: "other",
  SUCCESS: "success",
  UNAVAILABLE: "unavailable",
} as const;
