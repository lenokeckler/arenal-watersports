import {
  CHARGE_LIMITS,
  PAYMENT_CHOICE,
  PAYMENT_METHOD_TEXT,
  STRING,
} from "@/app/constants";
import { RESERVATION_EXTRA_TIME_VALIDATION_COPY as COPY } from "../constants/ReservationExtraTimeValidationCopy.constants";
import type { ReservationExtraTimeErrors } from "../models/ReservationExtraTimeErrors.interface";
import type { ReservationExtraTimeValues } from "../models/ReservationExtraTimeValues.interface";
import { trimReservationExtraTimePaymentMethod } from "./trimReservationExtraTimePaymentMethod";

export const resolveReservationExtraTimePaymentErrors = ({
  otherPaymentMethod,
  paymentChoice,
}: Pick<
  ReservationExtraTimeValues,
  "otherPaymentMethod" | "paymentChoice"
>): Pick<
  ReservationExtraTimeErrors,
  "otherPaymentMethod" | "paymentChoice"
> => {
  if (paymentChoice === null) {
    return { paymentChoice: COPY.CHOICE_REQUIRED };
  }
  if (paymentChoice !== PAYMENT_CHOICE.OTHER) {
    return {};
  }
  const trimmed = trimReservationExtraTimePaymentMethod(
    otherPaymentMethod
  );
  if (trimmed === STRING.Empty) {
    return { otherPaymentMethod: COPY.OTHER_REQUIRED };
  }
  if (
    PAYMENT_METHOD_TEXT.DISALLOWED_CHARACTER.test(trimmed)
  ) {
    return {
      otherPaymentMethod: COPY.METHOD_DISALLOWED_CHARACTERS,
    };
  }
  return [...trimmed].length >
    CHARGE_LIMITS.PAYMENT_METHOD_MAX_LENGTH
    ? { otherPaymentMethod: COPY.METHOD_TOO_LONG }
    : {};
};
