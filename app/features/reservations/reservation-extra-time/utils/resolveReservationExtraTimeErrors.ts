import { RESERVATION_EXTRA_TIME_OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { RESERVATION_EXTRA_TIME_VALIDATION_COPY as COPY } from "../constants/ReservationExtraTimeValidationCopy.constants";
import type { ReservationExtraTimeErrors } from "../models/ReservationExtraTimeErrors.interface";
import type { ReservationExtraTimeValues } from "../models/ReservationExtraTimeValues.interface";
import { resolveReservationExtraTimeAmountError } from "./resolveReservationExtraTimeAmountError";
import { resolveReservationExtraTimePaymentErrors } from "./resolveReservationExtraTimePaymentErrors";

export const resolveReservationExtraTimeErrors = (
  values: ReservationExtraTimeValues
): ReservationExtraTimeErrors => {
  if (values.outcome === null) {
    return { outcome: COPY.OUTCOME_REQUIRED };
  }
  if (
    values.outcome ===
    RESERVATION_EXTRA_TIME_OUTCOME.COURTESY
  ) {
    return {};
  }
  const amount = resolveReservationExtraTimeAmountError(
    values.amountText,
    values.currency
  );
  return {
    ...(amount === undefined ? {} : { amount }),
    ...resolveReservationExtraTimePaymentErrors(values),
  };
};
