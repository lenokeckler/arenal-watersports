import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";

export type CategoryTrackingMode =
  (typeof CATEGORY_TRACKING_MODE)[keyof typeof CATEGORY_TRACKING_MODE];
