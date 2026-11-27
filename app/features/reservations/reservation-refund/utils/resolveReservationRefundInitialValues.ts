import { STRING } from "@/app/constants";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";
import { resolveReservationRefundCurrencyOptions } from "./resolveReservationRefundCurrencyOptions";

export const resolveReservationRefundInitialValues = (
  refundable: ReservationRefundableAmount[]
): ReservationRefundValues => {
  const [currency] =
    resolveReservationRefundCurrencyOptions(refundable);
  return {
    amountText: STRING.Empty,
    currency,
    otherReasonText: STRING.Empty,
    reason: null,
  };
};
