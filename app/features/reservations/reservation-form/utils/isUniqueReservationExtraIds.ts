import { RESERVATION_EXTRA } from "../constants/ReservationExtra.constants";
import { TYPE_OF } from "@/app/constants";

export const isUniqueReservationExtraIds = (
  extraIds: unknown
): extraIds is string[] => {
  if (
    !Array.isArray(extraIds) ||
    !extraIds.every(
      (extraId) =>
        typeof extraId === TYPE_OF.STRING &&
        RESERVATION_EXTRA.UUID_PATTERN.test(extraId)
    )
  ) {
    return false;
  }
  const normalizedIds = extraIds.map((extraId) =>
    extraId.toLowerCase()
  );
  return new Set(normalizedIds).size === extraIds.length;
};
