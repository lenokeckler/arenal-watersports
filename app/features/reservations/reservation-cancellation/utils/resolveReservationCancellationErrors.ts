import type { ReservationCancellationErrors } from "../models/ReservationCancellationErrors.interface";
import { resolveReservationCancellationCauseError } from "./resolveReservationCancellationCauseError";
import { resolveReservationCancellationReasonError } from "./resolveReservationCancellationReasonError";

export const resolveReservationCancellationErrors = (
  cause: string,
  reason: string,
  requiresCause: boolean
): ReservationCancellationErrors => {
  const causeError =
    resolveReservationCancellationCauseError(
      cause,
      requiresCause
    );
  const reasonError =
    resolveReservationCancellationReasonError(reason);

  return {
    ...(causeError && { cause: causeError }),
    ...(reasonError && { reason: reasonError }),
  };
};
