import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";
import { canEditUnitsAreInterchangeable } from "./canEditUnitsAreInterchangeable";

export const applyUnitsAreInterchangeableChange = (
  values: CategoryBehaviorFormValues,
  unitsAreInterchangeable: boolean,
  trackingMode: CategoryTrackingMode
): CategoryBehaviorFormValues => {
  if (!canEditUnitsAreInterchangeable(trackingMode)) {
    return { ...values, unitsAreInterchangeable: true };
  }

  return { ...values, unitsAreInterchangeable };
};
