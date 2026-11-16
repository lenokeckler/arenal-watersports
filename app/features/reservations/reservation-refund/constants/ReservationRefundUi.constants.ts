import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import type { ReservationRefundReason } from "../models/ReservationRefundReason.type";
import { RESERVATION_REFUND_REASON_OPTIONS } from "./ReservationRefundReason.constants";

export const RESERVATION_REFUND_FIELD_ID = {
  ALERT: "reservation-refund-alert",
  AMOUNT: "reservation-refund-amount",
  AMOUNT_HELPER: "reservation-refund-amount-helper",
  AVAILABLE_HEADING: "reservation-refund-available-heading",
  CURRENCY: "reservation-refund-currency",
  HEADING: "reservation-refund-heading",
  OTHER_REASON: "reservation-refund-other-reason",
  OTHER_REASON_HELPER:
    "reservation-refund-other-reason-helper",
  REASON: "reservation-refund-reason",
  REASON_ERROR: "reservation-refund-reason-error",
  REASON_GROUP: "reservation-refund-reason-group",
  SUCCESS: "reservation-refund-success",
  SUMMARY_HEADING: "reservation-refund-summary-heading",
} as const;

export const RESERVATION_REFUND_CURRENCY_OPTION_ID = (
  currency: CurrencyCode
): string =>
  `${RESERVATION_REFUND_FIELD_ID.CURRENCY}-${currency.toLowerCase()}`;

const [FIRST_REASON] = RESERVATION_REFUND_REASON_OPTIONS;

export const RESERVATION_REFUND_REASON_OPTION_ID = (
  reason: ReservationRefundReason
): string =>
  reason === FIRST_REASON
    ? RESERVATION_REFUND_FIELD_ID.REASON
    : `${RESERVATION_REFUND_FIELD_ID.REASON}-${reason}`;

export const RESERVATION_REFUND_FOCUS = {
  TAB_INDEX: -1,
} as const;

export const RESERVATION_REFUND_CURRENCY_ORDER: readonly CurrencyCode[] =
  [CURRENCY_CODE.USD, CURRENCY_CODE.CRC];
