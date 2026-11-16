import { MONEY_AMOUNT_ISSUE } from "@/app/constants";
import type { ReservationRefundRefusal } from "../models/ReservationRefundRefusal.interface";
import { RESERVATION_REFUND_ERROR } from "./ReservationRefundError.constants";
import { RESERVATION_REFUND_FEEDBACK_COPY as COPY } from "./ReservationRefundFeedbackCopy.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION_COPY } from "./ReservationRefundValidationCopy.constants";

const { MESSAGE } = RESERVATION_REFUND_ERROR;

export const RESERVATION_REFUND_REFUSALS: readonly ReservationRefundRefusal[] =
  [
    {
      formError: COPY.FORBIDDEN,
      message: MESSAGE.ACCESS_REQUIRED,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.AUTHENTICATION_REQUIRED,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.PAYLOAD_NOT_OBJECT,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.PAYLOAD_INVALID,
    },
    {
      formError: COPY.NOT_FOUND,
      message: MESSAGE.NOT_FOUND,
    },
    {
      errors: {
        currency: VALIDATION_COPY.CURRENCY_INVALID,
      },
      message: MESSAGE.CURRENCY_INVALID,
    },
    {
      errors: {
        amount:
          VALIDATION_COPY.AMOUNT[MONEY_AMOUNT_ISSUE.FORMAT],
      },
      message: MESSAGE.AMOUNT_INVALID,
    },
    {
      formError: COPY.ABOVE_AVAILABLE,
      message: MESSAGE.EXCEEDS_NET,
    },
    {
      errors: { reason: VALIDATION_COPY.REASON_REQUIRED },
      message: MESSAGE.REASON_REQUIRED,
    },
    {
      errors: {
        reason:
          VALIDATION_COPY.REASON_DISALLOWED_CHARACTERS,
      },
      message: MESSAGE.REASON_INVALID,
    },
    {
      errors: { reason: VALIDATION_COPY.REASON_TOO_LONG },
      message: MESSAGE.REASON_TOO_LONG,
    },
  ];

export const RESERVATION_REFUND_OTHER_REASON_REFUSALS: readonly ReservationRefundRefusal[] =
  [
    {
      errors: {
        otherReason: VALIDATION_COPY.OTHER_REQUIRED,
      },
      message: MESSAGE.REASON_REQUIRED,
    },
    {
      errors: {
        otherReason:
          VALIDATION_COPY.REASON_DISALLOWED_CHARACTERS,
      },
      message: MESSAGE.REASON_INVALID,
    },
    {
      errors: {
        otherReason: VALIDATION_COPY.REASON_TOO_LONG,
      },
      message: MESSAGE.REASON_TOO_LONG,
    },
  ];
