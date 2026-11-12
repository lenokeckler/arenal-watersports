import { OUT_ON_WATER_COPY } from "../constants/OutOnWaterCopy.constants";
import { OUT_ON_WATER_TIME } from "../constants/OutOnWater.constants";

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(
    minutes / OUT_ON_WATER_TIME.MINUTES_PER_HOUR
  );
  const restMinutes =
    minutes % OUT_ON_WATER_TIME.MINUTES_PER_HOUR;
  const parts = [
    hours > 0
      ? `${hours}${OUT_ON_WATER_COPY.HOURS_SUFFIX}`
      : "",
    restMinutes > 0 || hours === 0
      ? `${restMinutes}${OUT_ON_WATER_COPY.MINUTES_SUFFIX}`
      : "",
  ];

  return parts
    .filter(Boolean)
    .join(OUT_ON_WATER_COPY.PART_SEPARATOR);
};
