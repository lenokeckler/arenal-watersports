import { TYPE_OF } from "@/app/constants";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import { isReservationType } from "./isReservationType";
import { isUniqueReservationExtraIds } from "./isUniqueReservationExtraIds";

export const isReservationFormInput = (
  input: unknown
): input is ReservationFormInput => {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  return (
    "categoryId" in input &&
    typeof input.categoryId === TYPE_OF.STRING &&
    "customerName" in input &&
    typeof input.customerName === TYPE_OF.STRING &&
    "date" in input &&
    typeof input.date === TYPE_OF.STRING &&
    "durationHours" in input &&
    typeof input.durationHours === TYPE_OF.NUMBER &&
    (!("extraIds" in input) ||
      isUniqueReservationExtraIds(input.extraIds)) &&
    (!("guideIds" in input) ||
      (Array.isArray(input.guideIds) &&
        input.guideIds.every(
          (guideId) => typeof guideId === TYPE_OF.STRING
        ))) &&
    "peopleCount" in input &&
    typeof input.peopleCount === TYPE_OF.NUMBER &&
    "quantity" in input &&
    typeof input.quantity === TYPE_OF.NUMBER &&
    (!("reservationType" in input) ||
      isReservationType(input.reservationType)) &&
    "time" in input &&
    typeof input.time === TYPE_OF.STRING &&
    "unitId" in input &&
    typeof input.unitId === TYPE_OF.STRING
  );
};
