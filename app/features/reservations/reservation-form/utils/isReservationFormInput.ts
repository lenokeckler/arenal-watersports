import type { ReservationFormInput } from "../models/ReservationFormInput.interface";

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
    "time" in input &&
    typeof input.time === "string"
  );
};
