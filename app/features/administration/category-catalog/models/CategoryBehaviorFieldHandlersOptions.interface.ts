import type { Dispatch, SetStateAction } from "react";
import { CategoryBehaviorFormValues } from "./CategoryBehaviorFormValues.interface";
import { CategoryTrackingMode } from "./CategoryTrackingMode.type";

export interface CategoryBehaviorFieldHandlersOptions {
  trackingMode: CategoryTrackingMode;
  setValues: Dispatch<
    SetStateAction<CategoryBehaviorFormValues>
  >;
  clearDurationError: () => void;
}
