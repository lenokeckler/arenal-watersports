import { STRING } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as COPY } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { RESERVATION_CANCELLATION_LIMITS } from "../constants/ReservationCancellationLimits.constants";

export const resolveReservationCancellationReasonError = (
  reason: string
): NullableUndefined<string> => {
  const trimmed = reason.trim();
  if (trimmed === STRING.Empty) {
    return COPY.REASON_REQUIRED;
  }
  return [...trimmed].length >
    RESERVATION_CANCELLATION_LIMITS.MAX_REASON_LENGTH
    ? COPY.REASON_TOO_LONG
    : undefined;
};
