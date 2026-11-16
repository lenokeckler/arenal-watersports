import { STRING } from "@/app/constants";
import { RESERVATION_REFUND_LIMITS } from "../constants/ReservationRefundLimits.constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as COPY } from "../constants/ReservationRefundValidationCopy.constants";
import type { ReservationRefundErrors } from "../models/ReservationRefundErrors.interface";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";

export const resolveReservationRefundReasonError = ({
  otherReasonText,
  reason,
}: Pick<
  ReservationRefundValues,
  "otherReasonText" | "reason"
>): ReservationRefundErrors => {
  if (reason === null) {
    return { reason: COPY.REASON_REQUIRED };
  }
  if (reason !== RESERVATION_REFUND_REASON.OTHER) {
    return {};
  }
  const trimmed = otherReasonText.trim();
  if (trimmed === STRING.Empty) {
    return { otherReason: COPY.OTHER_REQUIRED };
  }
  return [...trimmed].length >
    RESERVATION_REFUND_LIMITS.REASON_MAX_LENGTH
    ? { otherReason: COPY.REASON_TOO_LONG }
    : {};
};
