import type { CurrencyCode } from "@/app/constants";
import { CURRENCY_CODE } from "@/app/constants";

export const RESERVATION_CHARGE_FIELD_ID = {
  ALERT: "reservation-charge-alert",
  AMOUNT: "reservation-charge-amount",
  HEADING: "reservation-charge-heading",
  PAYMENT_METHOD: "reservation-charge-payment-method",
  SUMMARY_HEADING: "reservation-charge-summary-heading",
} as const;

export const RESERVATION_CHARGE_FOCUS = {
  TAB_INDEX: -1,
} as const;

export const RESERVATION_CHARGE_CURRENCY_ORDER: readonly CurrencyCode[] =
  [CURRENCY_CODE.USD, CURRENCY_CODE.CRC];

export const RESERVATION_CHARGE_DATE_FORMAT = {
  LOCALE: "es-CR",
  NOON_UTC_TIME: "T12:00:00Z",
  OPTIONS: {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
  },
} as const satisfies {
  LOCALE: string;
  NOON_UTC_TIME: string;
  OPTIONS: Intl.DateTimeFormatOptions;
};

export const RESERVATION_CHARGE_DURATION = {
  ZERO_REMAINDER: 0,
} as const;
