import { STRING } from "@/app/constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import type { ReservationRefundReason } from "../models/ReservationRefundReason.type";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";

export const resolveReservationRefundReasonSwitch = (
  values: ReservationRefundValues,
  reason: ReservationRefundReason
): ReservationRefundValues => ({
  ...values,
  otherReasonText:
    reason === RESERVATION_REFUND_REASON.OTHER
      ? values.otherReasonText
      : STRING.Empty,
  reason,
});
