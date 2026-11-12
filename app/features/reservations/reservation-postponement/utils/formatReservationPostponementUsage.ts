import { STRING } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_READINGS_COPY } from "../constants/ReservationPostponementReadingsCopy.constants";
import type { ReservationPostponementUsageMetric } from "../models/ReservationPostponementUsageMetric.type";

export const formatReservationPostponementUsage = (
  value: number,
  metric: ReservationPostponementUsageMetric
): string =>
  [
    String(value),
    RESERVATION_POSTPONEMENT_READINGS_COPY.USAGE_SUFFIX[
      metric
    ],
  ].join(STRING.SPACE);
