import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";

export const canTrackConditionPhotos = (
  trackingMode: CategoryTrackingMode
): boolean =>
  trackingMode === CATEGORY_TRACKING_MODE.BY_UNIT;
