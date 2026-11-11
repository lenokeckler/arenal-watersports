import { UUID_PATTERN } from "@/app/constants";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import {
  getReservationDurationMinutes,
  isValidReservationDate,
  isValidReservationTime,
} from "./validateReservationSchedule";

const isExcludedReservationIdValid = (
  input: object
): boolean => {
  if (
    !("excludeReservationId" in input) ||
    input.excludeReservationId === undefined
  ) {
    return true;
  }

  return (
    typeof input.excludeReservationId === "string" &&
    UUID_PATTERN.test(input.excludeReservationId)
  );
};

export const isReservationUnitAvailabilityInput = (
  input: unknown
): input is ReservationUnitAvailabilityInput => {
  if (
    typeof input !== "object" ||
    input === null ||
    Array.isArray(input)
  ) {
    return false;
  }

  return (
    "categoryId" in input &&
    typeof input.categoryId === "string" &&
    input.categoryId.length > 0 &&
    "date" in input &&
    typeof input.date === "string" &&
    isValidReservationDate(input.date) &&
    "time" in input &&
    typeof input.time === "string" &&
    isValidReservationTime(input.time) &&
    "durationMinutes" in input &&
    typeof input.durationMinutes === "number" &&
    Number.isInteger(input.durationMinutes) &&
    getReservationDurationMinutes(
      input.durationMinutes /
        RESERVATION_SCHEDULE.MINUTES_PER_HOUR
    ) !== null &&
    isExcludedReservationIdValid(input)
  );
};
