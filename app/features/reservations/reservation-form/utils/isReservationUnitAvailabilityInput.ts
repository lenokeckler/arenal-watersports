import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import {
  isValidReservationDate,
  isValidReservationDuration,
  isValidReservationTime,
} from "./validateReservationSchedule";

export const isReservationUnitAvailabilityInput = (
  input: unknown
): input is ReservationUnitAvailabilityInput => {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  const candidate =
    input as ReservationUnitAvailabilityInput;
  return (
    typeof candidate.categoryId === "string" &&
    candidate.categoryId.length > 0 &&
    typeof candidate.date === "string" &&
    isValidReservationDate(candidate.date) &&
    typeof candidate.time === "string" &&
    isValidReservationTime(candidate.time) &&
    typeof candidate.durationMinutes === "number" &&
    Number.isInteger(candidate.durationMinutes) &&
    isValidReservationDuration(
      candidate.durationMinutes / 60
    )
  );
};
