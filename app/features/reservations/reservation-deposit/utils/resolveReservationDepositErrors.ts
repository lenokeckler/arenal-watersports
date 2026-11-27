import { RESERVATION_DEPOSIT_NO_ERRORS } from "../constants/ReservationDepositDefaults.constants";
import type { ReservationDepositErrors } from "../models/ReservationDepositErrors.interface";
import type { ReservationDepositValues } from "../models/ReservationDepositValues.interface";
import { resolveReservationDepositAmountError } from "./resolveReservationDepositAmountError";

export const resolveReservationDepositErrors = (
  values: ReservationDepositValues
): ReservationDepositErrors => {
  if (!values.hasDeposit) {
    return RESERVATION_DEPOSIT_NO_ERRORS;
  }
  const amount = resolveReservationDepositAmountError(
    values.amountText,
    values.currency
  );
  return amount === undefined
    ? RESERVATION_DEPOSIT_NO_ERRORS
    : { amount };
};
