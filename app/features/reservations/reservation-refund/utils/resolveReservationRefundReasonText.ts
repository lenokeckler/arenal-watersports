import { STRING } from "@/app/constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_REASON_COPY } from "../constants/ReservationRefundReasonCopy.constants";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";
import { trimReservationRefundReason } from "./trimReservationRefundReason";

export const resolveReservationRefundReasonText = ({
  otherReasonText,
  reason,
}: Pick<
  ReservationRefundValues,
  "otherReasonText" | "reason"
>): string => {
  if (reason === null) {
    return STRING.Empty;
  }
  return reason === RESERVATION_REFUND_REASON.OTHER
    ? trimReservationRefundReason(otherReasonText)
    : RESERVATION_REFUND_REASON_COPY[reason];
};
