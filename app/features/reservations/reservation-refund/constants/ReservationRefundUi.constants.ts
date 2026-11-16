import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";

export const RESERVATION_REFUND_FIELD_ID = {
  ALERT: "reservation-refund-alert",
  AMOUNT: "reservation-refund-amount",
  OTHER_REASON: "reservation-refund-other-reason",
  REASON: "reservation-refund-reason",
  SUCCESS: "reservation-refund-success",
} as const;

export const RESERVATION_REFUND_CURRENCY_ORDER: readonly CurrencyCode[] =
  [CURRENCY_CODE.USD, CURRENCY_CODE.CRC];
