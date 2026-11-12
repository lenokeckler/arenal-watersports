import { STRING } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import type { ReservationPostponementReadingDraft } from "../models/ReservationPostponementReadingDraft.interface";
import type { ReservationPostponementReadingErrors } from "../models/ReservationPostponementReadingErrors.interface";
import type { ReservationPostponementReadingUnit } from "../models/ReservationPostponementReadingUnit.interface";
import { parseReservationPostponementReading } from "./parseReservationPostponementReading";

const resolveUsageError = (
  unit: ReservationPostponementReadingUnit,
  value: string
): string | undefined => {
  if (unit.usageMetric === null) {
    return undefined;
  }
  if (value.trim() === STRING.Empty) {
    return COPY.READING_USAGE_REQUIRED;
  }
  const usage = parseReservationPostponementReading(value);
  if (usage === null) {
    return COPY.READING_USAGE_INVALID;
  }
  return usage < (unit.usageFloor ?? 0)
    ? COPY.READING_USAGE_BELOW_DEPARTURE
    : undefined;
};

export const resolveReservationPostponementReadingErrors = (
  unit: ReservationPostponementReadingUnit,
  reading: ReservationPostponementReadingDraft
): ReservationPostponementReadingErrors => {
  const fuelIn =
    unit.fuelMax !== null && reading.fuelIn === STRING.Empty
      ? COPY.READING_FUEL_REQUIRED
      : undefined;
  const usageIn = resolveUsageError(unit, reading.usageIn);

  return {
    ...(fuelIn && { fuelIn }),
    ...(usageIn && { usageIn }),
  };
};
