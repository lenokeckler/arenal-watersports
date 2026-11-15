import type { ReservationChargeErrors } from "../models/ReservationChargeErrors.interface";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { resolveReservationChargeAmountError } from "./resolveReservationChargeAmountError";
import { resolveReservationChargePaymentMethodError } from "./resolveReservationChargePaymentMethodError";
import { resolveReservationChargeSecondCurrency } from "./resolveReservationChargeSecondCurrency";

export const resolveReservationChargeErrors = (
  values: ReservationChargeValues
): ReservationChargeErrors => {
  const amount = resolveReservationChargeAmountError(
    values.amountText,
    values.currency
  );
  const secondAmount =
    values.secondAmountText === null
      ? undefined
      : resolveReservationChargeAmountError(
          values.secondAmountText,
          resolveReservationChargeSecondCurrency(
            values.currency
          )
        );
  const paymentMethod =
    resolveReservationChargePaymentMethodError(
      values.paymentMethod
    );
  return {
    ...(amount === undefined ? {} : { amount }),
    ...(secondAmount === undefined ? {} : { secondAmount }),
    ...(paymentMethod === undefined
      ? {}
      : { paymentMethod }),
  };
};
