import { MONEY_AMOUNT_ISSUE } from "@/app/constants";
import type { DepositResolutionRefusal } from "../models/DepositResolutionRefusal.interface";
import { DEPOSIT_RESOLUTION_ERROR } from "./DepositResolutionError.constants";
import { DEPOSIT_RESOLUTION_FEEDBACK_COPY as COPY } from "./DepositResolutionFeedbackCopy.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as VALIDATION } from "./DepositResolutionValidationCopy.constants";

const { MESSAGE } = DEPOSIT_RESOLUTION_ERROR;

export const DEPOSIT_RESOLUTION_REFUSALS: readonly DepositResolutionRefusal[] =
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
        returned: VALIDATION.RETURNED_ABOVE_DEPOSIT_REFUSED,
      },
      message: MESSAGE.AMOUNT_ABOVE_DEPOSIT,
    },
    {
      errors: {
        returned:
          VALIDATION.RETURNED[MONEY_AMOUNT_ISSUE.FORMAT],
      },
      message: MESSAGE.AMOUNT_INVALID,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.AUTHENTICATION_REQUIRED,
    },
    {
      formError: COPY.NOT_FOUND,
      message: MESSAGE.NOT_FOUND,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.PAYLOAD_INVALID,
    },
    {
      formError: COPY.REQUEST_REJECTED,
      message: MESSAGE.PAYLOAD_NOT_OBJECT,
    },
    {
      errors: {
        reason: VALIDATION.REASON_DISALLOWED_CHARACTERS,
      },
      message: MESSAGE.REASON_INVALID,
    },
    {
      errors: { reason: VALIDATION.REASON_REQUIRED },
      message: MESSAGE.REASON_REQUIRED,
    },
    {
      errors: { reason: VALIDATION.REASON_TOO_LONG },
      message: MESSAGE.REASON_TOO_LONG,
    },
    {
      formError: COPY.TRIP_NOT_CLOSED,
      message: MESSAGE.TRIP_NOT_CLOSED,
    },
  ];
