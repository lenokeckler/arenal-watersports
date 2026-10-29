import { TIME } from "@/app/constants";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import {
  isValidReservationDate,
  isValidReservationDuration,
  isValidReservationTime,
} from "./validateReservationSchedule";

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
    isValidReservationDuration(
      input.durationMinutes / TIME.UNITS.MINUTES_IN_HOUR
    ) &&
    "quantity" in input &&
    typeof input.quantity === "number" &&
    Number.isInteger(input.quantity) &&
    input.quantity > 0
  );
};
