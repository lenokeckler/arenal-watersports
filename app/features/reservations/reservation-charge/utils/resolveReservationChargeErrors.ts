import type { ReservationChargeErrors } from "../models/ReservationChargeErrors.interface";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { resolveReservationChargeAmountError } from "./resolveReservationChargeAmountError";
import { resolveReservationChargePaymentErrors } from "./resolveReservationChargePaymentErrors";
import { resolveReservationChargeSecondAmountError } from "./resolveReservationChargeSecondAmountError";

export const resolveReservationChargeErrors = (
  values: ReservationChargeValues
): ReservationChargeErrors => {
  const amount = resolveReservationChargeAmountError(
    values.amountText,
    values.currency
  );
  const secondAmount =
    resolveReservationChargeSecondAmountError(values);
  return {
    ...(amount === undefined ? {} : { amount }),
    ...(secondAmount === undefined ? {} : { secondAmount }),
    ...resolveReservationChargePaymentErrors(values),
  };
};
