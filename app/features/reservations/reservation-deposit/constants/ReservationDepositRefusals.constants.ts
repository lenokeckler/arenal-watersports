import { MONEY_AMOUNT_ISSUE } from "@/app/constants";
import type { ReservationDepositRefusal } from "../models/ReservationDepositRefusal.interface";
import { RESERVATION_DEPOSIT_ERROR } from "./ReservationDepositError.constants";
import { RESERVATION_DEPOSIT_FEEDBACK_COPY as COPY } from "./ReservationDepositFeedbackCopy.constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY as VALIDATION_COPY } from "./ReservationDepositValidationCopy.constants";

const { MESSAGE } = RESERVATION_DEPOSIT_ERROR;

export const RESERVATION_DEPOSIT_REFUSALS: readonly ReservationDepositRefusal[] =
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
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.DECISION_REQUIRED,
    },
    {
      formError: COPY.NOT_FOUND,
      message: MESSAGE.NOT_FOUND,
    },
    {
      formError: COPY.NOT_DEPOSITABLE,
      message: MESSAGE.NOT_DEPOSITABLE,
    },
    {
      formError: COPY.SPLIT_CHILD,
      message: MESSAGE.SPLIT_CHILD,
    },
    {
      formError: COPY.ALREADY_DECIDED,
      message: MESSAGE.ALREADY_DECIDED,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.CURRENCY_INVALID,
    },
    {
      errors: {
        amount:
          VALIDATION_COPY.AMOUNT[MONEY_AMOUNT_ISSUE.FORMAT],
      },
      message: MESSAGE.AMOUNT_INVALID,
    },
  ];
