import { CURRENCY_ORDER, STRING } from "@/app/constants";
import type { ReservationExtraTimeErrors } from "../models/ReservationExtraTimeErrors.interface";
import type { ReservationExtraTimeValues } from "../models/ReservationExtraTimeValues.interface";

const [FIRST_CURRENCY] = CURRENCY_ORDER;

export const RESERVATION_EXTRA_TIME_INITIAL_VALUES: ReservationExtraTimeValues =
  {
    amountText: STRING.Empty,
    currency: FIRST_CURRENCY,
    otherPaymentMethod: STRING.Empty,
    outcome: null,
    paymentChoice: null,
  };

export const RESERVATION_EXTRA_TIME_NO_ERRORS: ReservationExtraTimeErrors =
  {};

export const RESERVATION_EXTRA_TIME_NO_FORM_ERROR: string =
  STRING.Empty;
