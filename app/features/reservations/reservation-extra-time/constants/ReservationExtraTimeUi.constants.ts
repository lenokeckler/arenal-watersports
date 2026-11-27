import type {
  CurrencyCode,
  PaymentChoice,
} from "@/app/constants";
import type { ReservationExtraTimeOutcome } from "../models/ReservationExtraTimeOutcome.type";

export const RESERVATION_EXTRA_TIME_FIELD_ID = {
  ALERT: "reservation-extra-time-alert",
  AMOUNT: "reservation-extra-time-amount",
  AMOUNT_HELPER: "reservation-extra-time-amount-helper",
  CURRENCY: "reservation-extra-time-currency",
  GROUPS_HEADING: "reservation-extra-time-groups-heading",
  HEADING: "reservation-extra-time-heading",
  OTHER_PAYMENT_METHOD:
    "reservation-extra-time-other-payment-method",
  OUTCOME: "reservation-extra-time-outcome",
  OUTCOME_ERROR: "reservation-extra-time-outcome-error",
  PAYMENT_METHOD: "reservation-extra-time-payment-method",
  PAYMENT_METHOD_ERROR:
    "reservation-extra-time-payment-method-error",
  PAYMENT_METHOD_HELPER:
    "reservation-extra-time-payment-method-helper",
  SUCCESS: "reservation-extra-time-success",
} as const;

export const RESERVATION_EXTRA_TIME_CURRENCY_OPTION_ID = (
  currency: CurrencyCode
): string =>
  `${RESERVATION_EXTRA_TIME_FIELD_ID.CURRENCY}-${currency.toLowerCase()}`;

export const RESERVATION_EXTRA_TIME_OUTCOME_OPTION_ID = (
  outcome: ReservationExtraTimeOutcome
): string =>
  `${RESERVATION_EXTRA_TIME_FIELD_ID.OUTCOME}-${outcome}`;

export const RESERVATION_EXTRA_TIME_PAYMENT_CHOICE_OPTION_ID =
  (choice: PaymentChoice): string =>
    `${RESERVATION_EXTRA_TIME_FIELD_ID.PAYMENT_METHOD}-${choice}`;

export const RESERVATION_EXTRA_TIME_FOCUS = {
  TAB_INDEX: -1,
} as const;

export const RESERVATION_EXTRA_TIME_NO_MINUTES = 0;
