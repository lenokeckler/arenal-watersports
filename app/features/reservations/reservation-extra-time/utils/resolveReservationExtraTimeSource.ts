import { RESERVATION_EXTRA_TIME_NO_MINUTES } from "../constants/ReservationExtraTimeUi.constants";
import { RESERVATION_EXTRA_TIME_SOURCE } from "../constants/ReservationExtraTimeSource.constants";
import type { ReservationExtraTimeSource } from "../models/ReservationExtraTimeSource.type";

export const resolveReservationExtraTimeSource = (
  extraMinutes: number,
  extendedMinutes: number
): ReservationExtraTimeSource => {
  if (extraMinutes <= RESERVATION_EXTRA_TIME_NO_MINUTES) {
    return RESERVATION_EXTRA_TIME_SOURCE.ON_TIME;
  }
  return extendedMinutes > RESERVATION_EXTRA_TIME_NO_MINUTES
    ? RESERVATION_EXTRA_TIME_SOURCE.EXTENDED
    : RESERVATION_EXTRA_TIME_SOURCE.OVERDUE;
};
