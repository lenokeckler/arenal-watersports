import { RESERVATION_CANCELLATION_CAUSE } from "../constants/ReservationCancellationCause.constants";
import type { ReservationCancellationCause } from "../models/ReservationCancellationCause.type";

export const isReservationCancellationCause = (
  value: unknown
): value is ReservationCancellationCause =>
  Object.values<unknown>(
    RESERVATION_CANCELLATION_CAUSE
  ).includes(value);
