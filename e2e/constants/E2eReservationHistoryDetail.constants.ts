import {
  CURRENCY_CODE,
  CURRENCY_SYMBOL,
} from "@/app/constants";

export const E2E_RESERVATION_HISTORY_DETAIL_ID = {
  MALFORMED: "not-a-reservation-id",
  UNKNOWN: "00000000-0000-4000-8000-000000000000",
} as const;

export const E2E_RESERVATION_HISTORY_MONEY_SYMBOLS = [
  CURRENCY_SYMBOL[CURRENCY_CODE.CRC],
  CURRENCY_SYMBOL[CURRENCY_CODE.USD],
] as const;

export const E2E_RESERVATION_HISTORY_TIME_PATTERN =
  /\d{1,2}:\d{2}/;

export const E2E_RESERVATION_HISTORY_MODE = {
  ADMINISTRATION: "administration",
  OPERATIONS: "operations",
  RESERVATIONS: "reservations",
} as const;

export const E2E_RESERVATION_HISTORY_SCREENSHOT = {
  DETAIL_CANCELLED: "05-history-detail-cancelled",
  DETAIL_CLOSED: "04-history-detail-closed",
  INVERTED_RANGE: "03-history-inverted-range",
  LIST: "01-history-list",
  NO_RESULTS: "02-history-no-results",
  NOT_FOUND: "06-history-not-found",
} as const;
