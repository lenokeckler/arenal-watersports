import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import type { ReservationRefundInput } from "../models/ReservationRefundInput.interface";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";
import { REFUND_RESERVATION_ID } from "./ReservationRefund.constants";

export const VALID_REFUND_VALUES: ReservationRefundValues =
  {
    amountText: "20.00",
    currency: CURRENCY_CODE.USD,
    otherReasonText: "",
    reason: RESERVATION_REFUND_REASON.CANCELLED_TRIP,
  };

export const VALID_REFUND_INPUT: ReservationRefundInput = {
  ...VALID_REFUND_VALUES,
  reservationId: REFUND_RESERVATION_ID,
};

export const OTHER_REASON_TEXT = "Cliente con lesión leve";

export const OTHER_REFUND_VALUES: ReservationRefundValues =
  {
    ...VALID_REFUND_VALUES,
    otherReasonText: OTHER_REASON_TEXT,
    reason: RESERVATION_REFUND_REASON.OTHER,
  };

export const NON_BREAKING_SPACE = "\u00a0";

export const AVAILABLE_USD = 30;
export const AVAILABLE_CRC = 15000;

export const ZERO_WIDTH_SPACE = "​";
export const SOFT_HYPHEN = "­";
export const BELL_CHARACTER = "";
export const TAB_CHARACTER = "	";
