import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import { isReservationType } from "./isReservationType";

export const isReservationFormInput = (
  input: unknown
): input is ReservationFormInput => {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  return (
    "categoryId" in input &&
    typeof input.categoryId === "string" &&
    "customerName" in input &&
    typeof input.customerName === "string" &&
    "date" in input &&
    typeof input.date === "string" &&
    "durationHours" in input &&
    typeof input.durationHours === "number" &&
    "peopleCount" in input &&
    typeof input.peopleCount === "number" &&
    "quantity" in input &&
    typeof input.quantity === "number" &&
    (!("reservationType" in input) ||
      isReservationType(input.reservationType)) &&
    "time" in input &&
    typeof input.time === "string" &&
    "unitId" in input &&
    typeof input.unitId === "string"
  );
};
