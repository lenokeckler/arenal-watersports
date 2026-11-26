import type { ReservationRefundErrors } from "../models/ReservationRefundErrors.interface";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";
import { resolveReservationRefundAmountError } from "./resolveReservationRefundAmountError";
import { resolveReservationRefundReasonError } from "./resolveReservationRefundReasonError";

export const resolveReservationRefundErrors = (
  values: ReservationRefundValues,
  available?: number
): ReservationRefundErrors => {
  const amount = resolveReservationRefundAmountError(
    values.amountText,
    values.currency,
    available
  );
  return {
    ...(amount === undefined ? {} : { amount }),
    ...resolveReservationRefundReasonError(values),
  };
};
