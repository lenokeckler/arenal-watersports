import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";

export const RESERVATION_DEPOSIT_FIELD_ID = {
  ALERT: "reservation-deposit-alert",
  AMOUNT: "reservation-deposit-amount",
  AMOUNT_HELPER: "reservation-deposit-amount-helper",
  CURRENCY: "reservation-deposit-currency",
  DECISION: "reservation-deposit-decision",
  DECISION_DECLINED: "reservation-deposit-decision-no",
  DECISION_RECEIVED: "reservation-deposit-decision-yes",
  HEADING: "reservation-deposit-heading",
  SUCCESS: "reservation-deposit-success",
  SUMMARY_HEADING: "reservation-deposit-summary-heading",
} as const;

export const RESERVATION_DEPOSIT_CURRENCY_OPTION_ID = (
  currency: CurrencyCode
): string =>
  `${RESERVATION_DEPOSIT_FIELD_ID.CURRENCY}-${currency.toLowerCase()}`;

export const RESERVATION_DEPOSIT_FOCUS = {
  TAB_INDEX: -1,
} as const;

export const RESERVATION_DEPOSIT_CURRENCY_ORDER: readonly CurrencyCode[] =
  [CURRENCY_CODE.USD, CURRENCY_CODE.CRC];

export const RESERVATION_DEPOSIT_DATE_FORMAT = {
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
