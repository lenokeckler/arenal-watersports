import type { NullableUndefined } from "@/app/types";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as COPY } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { isReservationCancellationCause } from "./isReservationCancellationCause";

export const resolveReservationCancellationCauseError = (
  cause: string,
  requiresCause: boolean
): NullableUndefined<string> =>
  requiresCause && !isReservationCancellationCause(cause)
    ? COPY.CAUSE_REQUIRED
    : undefined;
