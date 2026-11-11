import { OUT_ON_WATER_STATE } from "../constants/OutOnWater.constants";

export const getRemainingState = (
  remainingMinutes: number
): keyof typeof OUT_ON_WATER_STATE =>
  remainingMinutes > 0
    ? OUT_ON_WATER_STATE.ON_TIME
    : OUT_ON_WATER_STATE.OVERDUE;
