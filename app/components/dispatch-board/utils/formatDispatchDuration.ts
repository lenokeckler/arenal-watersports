import { STRING, TIME } from "@/app/constants";
import { DISPATCH_DURATION_COPY } from "../constants/DispatchSheetCopy.constants";

export const formatDispatchDuration = (
  totalMinutes: number
): string => {
  const hours = Math.floor(
    totalMinutes / TIME.UNITS.MINUTES_IN_HOUR
  );
  const minutes = totalMinutes % TIME.UNITS.MINUTES_IN_HOUR;
  const hoursText =
    hours > 0
      ? `${hours}${DISPATCH_DURATION_COPY.HOURS}`
      : STRING.Empty;
  const minutesText =
    minutes > 0
      ? `${minutes}${DISPATCH_DURATION_COPY.MINUTES}`
      : STRING.Empty;

  return [hoursText, minutesText]
    .filter(Boolean)
    .join(STRING.SPACE);
};
