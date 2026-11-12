import type { CategoryBehaviorFormValues } from "../../models/CategoryBehaviorFormValues.interface";
import type { CategoryTrackingMode } from "../../models/CategoryTrackingMode.type";

export type TrackingModeFormValuesAction = (
  values: CategoryBehaviorFormValues,
  trackingMode: CategoryTrackingMode
) => CategoryBehaviorFormValues;
