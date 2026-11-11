import type { NullableRef } from "@/app/types";
import { RESERVATION_POSTPONEMENT_LIMITS } from "../constants/ReservationPostponementLimits.constants";

export const parseReservationPostponementReading = (
  value: string
): NullableRef<number> => {
  const normalized = value
    .trim()
    .replace(
      RESERVATION_POSTPONEMENT_LIMITS.DECIMAL_COMMA,
      RESERVATION_POSTPONEMENT_LIMITS.DECIMAL_POINT
    );

  if (
    !RESERVATION_POSTPONEMENT_LIMITS.READING_PATTERN.test(
      normalized
    )
  ) {
    return null;
  }

  return Number(normalized);
};
