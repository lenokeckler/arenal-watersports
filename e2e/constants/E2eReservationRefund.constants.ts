import { CURRENCY_CODE } from "@/app/constants";
import type { E2eChargeSeed } from "../support/models/E2eChargeSeed.interface";

export const E2E_RESERVATION_REFUND_CHARGES = {
  CRC: { amount: 20000, currency: CURRENCY_CODE.CRC },
  EXTRA_TIME_USD: {
    amount: 12,
    currency: CURRENCY_CODE.USD,
    kind: "extra_time",
  },
  USD: { amount: 40, currency: CURRENCY_CODE.USD },
} as const satisfies Record<string, E2eChargeSeed>;

const PARTIAL_AMOUNT_VALUE = 15.5;
const ABOVE_NET_OFFSET = 1;

export const E2E_RESERVATION_REFUND = {
  ABOVE_NET_AMOUNT: `${E2E_RESERVATION_REFUND_CHARGES.USD.amount + ABOVE_NET_OFFSET}`,
  CHARGE_PAYMENT_METHOD: "Efectivo",
  CLEANUP_OPERATION: "remove the E2E refunds",
  FIELD_SEPARATOR: "|",
  FULL_AMOUNT: `${E2E_RESERVATION_REFUND_CHARGES.USD.amount}`,
  OTHER_REASON_TEXT:
    "El cliente tuvo una emergencia familiar",
  PARTIAL_AMOUNT: `${PARTIAL_AMOUNT_VALUE}`,
  PARTIAL_AMOUNT_VALUE,
  READ_NET_OPERATION: "read the net of the reservation",
  READ_OPERATION: "read the refunds of the reservation",
  RESERVATION_ID_COLUMN: "reservation_id",
  SCREENSHOT_BASENAME: "reservation-refund",
  TEST_MODE: "serial",
  ZERO_NET: 0,
} as const;

export const E2E_RESERVATION_REFUND_SCREENSHOT_STATE = {
  DETAIL: "detail",
  ERROR: "error",
  FORM: "form",
  OTHER: "other",
  SUCCESS: "success",
  UNAVAILABLE: "unavailable",
} as const;
