import type { ADJUST_DURATION_STATUS } from "../constants/OutOnWater.constants";

export interface AdjustDurationResult {
  status: (typeof ADJUST_DURATION_STATUS)[keyof typeof ADJUST_DURATION_STATUS];
}
