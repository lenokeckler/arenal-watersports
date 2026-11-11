import { RESERVATION_CANCELLATION_UNAVAILABLE_COPY } from "../constants/ReservationCancellationUnavailableCopy.constants";
import type { ReservationCancellationBlockedStatus } from "../models/ReservationCancellationBlockedStatus.type";
import type { ReservationCancellationStatus } from "../models/ReservationCancellationStatus.type";

export const isReservationCancellationBlockedStatus = (
  status: ReservationCancellationStatus
): status is ReservationCancellationBlockedStatus =>
  Object.hasOwn(
    RESERVATION_CANCELLATION_UNAVAILABLE_COPY.BODY,
    status
  );
