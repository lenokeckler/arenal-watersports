import { OUT_ON_WATER_TIME } from "../constants/OutOnWater.constants";

export const getRemainingMinutes = (
  endsAt: string,
  now: Date
): number =>
  Math.ceil(
    (new Date(endsAt).getTime() - now.getTime()) /
      OUT_ON_WATER_TIME.MS_PER_MINUTE
  );
