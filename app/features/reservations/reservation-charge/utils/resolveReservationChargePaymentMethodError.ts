import { STRING } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { RESERVATION_CHARGE_LIMITS } from "../constants/ReservationChargeLimits.constants";
import {
  RESERVATION_CHARGE_DISALLOWED_CHARACTER_PATTERN,
  RESERVATION_CHARGE_EDGE_WHITESPACE_PATTERN,
} from "../constants/ReservationChargePaymentMethodPatterns.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";

export const resolveReservationChargePaymentMethodError = (
  paymentMethod: string
): NullableUndefined<string> => {
  const trimmed = paymentMethod.replace(
    RESERVATION_CHARGE_EDGE_WHITESPACE_PATTERN,
    STRING.Empty
  );
  if (trimmed === STRING.Empty) {
    return COPY.METHOD_REQUIRED;
  }
  if (
    RESERVATION_CHARGE_DISALLOWED_CHARACTER_PATTERN.test(
      trimmed
    )
  ) {
    return COPY.METHOD_DISALLOWED_CHARACTERS;
  }
  return [...trimmed].length >
    RESERVATION_CHARGE_LIMITS.PAYMENT_METHOD_MAX_LENGTH
    ? COPY.METHOD_TOO_LONG
    : undefined;
};
