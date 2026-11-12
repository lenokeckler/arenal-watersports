import type { ReservationChargeErrors } from "../models/ReservationChargeErrors.interface";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { resolveReservationChargeAmountError } from "./resolveReservationChargeAmountError";
import { resolveReservationChargePaymentMethodError } from "./resolveReservationChargePaymentMethodError";

export const resolveReservationChargeErrors = (
  values: ReservationChargeValues
): ReservationChargeErrors => {
  const amount = resolveReservationChargeAmountError(
    values.amountText,
    values.currency
  );
  const paymentMethod =
    resolveReservationChargePaymentMethodError(
      values.paymentMethod
    );
  return {
    ...(amount === undefined ? {} : { amount }),
    ...(paymentMethod === undefined
      ? {}
      : { paymentMethod }),
  };
};
