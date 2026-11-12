import { OUT_ON_WATER_COPY } from "../constants/OutOnWaterCopy.constants";
import { formatDuration } from "./formatDuration";

export const formatDelay = (delayMinutes: number): string =>
  `${formatDuration(delayMinutes)}${OUT_ON_WATER_COPY.DELAY_SUFFIX}`;
