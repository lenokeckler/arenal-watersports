import { MONEY_AMOUNT_ISSUE } from "@/app/constants";
import type { ReservationChargeRefusal } from "../models/ReservationChargeRefusal.interface";
import { RESERVATION_CHARGE_ERROR } from "./ReservationChargeError.constants";
import { RESERVATION_CHARGE_FEEDBACK_COPY as COPY } from "./ReservationChargeFeedbackCopy.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION_COPY } from "./ReservationChargeValidationCopy.constants";

const { MESSAGE } = RESERVATION_CHARGE_ERROR;

export const RESERVATION_CHARGE_REFUSALS: readonly ReservationChargeRefusal[] =
  [
    {
      formError: COPY.FORBIDDEN,
      message: MESSAGE.ACCESS_REQUIRED,
    },
    {
      formError: COPY.GENERIC,
      message: MESSAGE.AUTHENTICATION_REQUIRED,
    },
    {
      formError: COPY.GENERIC,
      message: MESSAGE.PAYLOAD_NOT_OBJECT,
    },
    {
      formError: COPY.GENERIC,
      message: MESSAGE.PAYLOAD_INVALID,
    },
    {
      formError: COPY.NOT_FOUND,
      message: MESSAGE.NOT_FOUND,
    },
    {
      formError: COPY.STATUS_CHANGED,
      message: MESSAGE.NOT_CHARGEABLE,
    },
    {
      formError: COPY.GENERIC,
      message: MESSAGE.SPLIT_CHILD,
    },
    {
      formError: COPY.GENERIC,
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
      errors: {
        paymentMethod: VALIDATION_COPY.METHOD_REQUIRED,
      },
      message: MESSAGE.METHOD_REQUIRED,
    },
    {
      errors: {
        paymentMethod: VALIDATION_COPY.METHOD_TOO_LONG,
      },
      message: MESSAGE.METHOD_TOO_LONG,
    },
    {
      errors: {
        paymentMethod:
          VALIDATION_COPY.METHOD_DISALLOWED_CHARACTERS,
      },
      message: MESSAGE.METHOD_INVALID,
    },
  ];
