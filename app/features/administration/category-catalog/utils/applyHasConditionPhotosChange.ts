import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";
import { canTrackConditionPhotos } from "./canTrackConditionPhotos";

export const applyHasConditionPhotosChange = (
  values: CategoryBehaviorFormValues,
  hasConditionPhotos: boolean,
  trackingMode: CategoryTrackingMode
): CategoryBehaviorFormValues => {
  if (
    hasConditionPhotos &&
    !canTrackConditionPhotos(trackingMode)
  ) {
    return values;
  }

  return { ...values, hasConditionPhotos };
};
