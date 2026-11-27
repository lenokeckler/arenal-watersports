import { MONEY_AMOUNT_ISSUE } from "@/app/constants";
import type { ReservationExtraTimeRefusal } from "../models/ReservationExtraTimeRefusal.interface";
import { RESERVATION_EXTRA_TIME_ERROR } from "./ReservationExtraTimeError.constants";
import { RESERVATION_EXTRA_TIME_FEEDBACK_COPY as COPY } from "./ReservationExtraTimeFeedbackCopy.constants";
import { RESERVATION_EXTRA_TIME_VALIDATION_COPY as VALIDATION } from "./ReservationExtraTimeValidationCopy.constants";

const { MESSAGE } = RESERVATION_EXTRA_TIME_ERROR;

export const RESERVATION_EXTRA_TIME_REFUSALS: readonly ReservationExtraTimeRefusal[] =
  [
    {
      formError: COPY.FORBIDDEN,
      message: MESSAGE.ACCESS_REQUIRED,
    },
    {
      formError: COPY.ALREADY_RESOLVED,
      message: MESSAGE.ALREADY_RESOLVED,
    },
    {
      errors: {
        amount:
          VALIDATION.AMOUNT[MONEY_AMOUNT_ISSUE.FORMAT],
      },
      message: MESSAGE.AMOUNT_INVALID,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.AUTHENTICATION_REQUIRED,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.COURTESY_WITH_CHARGE,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.CURRENCY_INVALID,
    },
    {
      formError: COPY.GROUPS_OUT,
      message: MESSAGE.GROUPS_OUT,
    },
    {
      errors: {
        otherPaymentMethod:
          VALIDATION.METHOD_DISALLOWED_CHARACTERS,
      },
      message: MESSAGE.METHOD_INVALID,
    },
    {
      errors: { paymentChoice: VALIDATION.CHOICE_REQUIRED },
      message: MESSAGE.METHOD_REQUIRED,
    },
    {
      errors: {
        otherPaymentMethod: VALIDATION.METHOD_TOO_LONG,
      },
      message: MESSAGE.METHOD_TOO_LONG,
    },
    {
      formError: COPY.NO_EXTRA_TIME,
      message: MESSAGE.NO_EXTRA_TIME,
    },
    {
      formError: COPY.NOT_FOUND,
      message: MESSAGE.NOT_FOUND,
    },
    {
      errors: { outcome: VALIDATION.OUTCOME_REQUIRED },
      message: MESSAGE.OUTCOME_INVALID,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.PAYLOAD_INVALID,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.PAYLOAD_NOT_OBJECT,
    },
  ];
