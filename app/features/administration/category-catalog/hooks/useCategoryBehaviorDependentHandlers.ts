"use client";

import type { CategoryBehaviorDependentHandlers } from "../models/CategoryBehaviorDependentHandlers.interface";
import type { CategoryBehaviorDependentHandlersOptions } from "../models/CategoryBehaviorDependentHandlersOptions.interface";
import type { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";
import { applyHasConditionPhotosChange } from "../utils/applyHasConditionPhotosChange";
import { applyHasMotorChange } from "../utils/applyHasMotorChange";
import { applyUsageMetricChange } from "../utils/applyUsageMetricChange";
import { readCategoryFormFieldChecked } from "../utils/readCategoryFormFieldChecked";

export const useCategoryBehaviorDependentHandlers = ({
  trackingMode,
  setValues,
}: CategoryBehaviorDependentHandlersOptions): CategoryBehaviorDependentHandlers => {
  const onHasConditionPhotosChange = (
    event: CategoryFormFieldChangeEvent
  ): void => {
    const hasConditionPhotos =
      readCategoryFormFieldChecked(event);
    setValues((currentValues) =>
      applyHasConditionPhotosChange(
        currentValues,
        hasConditionPhotos,
        trackingMode
      )
    );
  };

  const onHasMotorChange = (
    event: CategoryFormFieldChangeEvent
  ): void => {
    const hasMotor = readCategoryFormFieldChecked(event);
    setValues((currentValues) =>
      applyHasMotorChange(currentValues, hasMotor)
    );
  };

  const onUsageMetricChange = (
    event: CategoryFormFieldChangeEvent
  ): void => {
    const rawUsageMetric = event.target.value;
    setValues((currentValues) =>
      applyUsageMetricChange(currentValues, rawUsageMetric)
    );
  };

  return {
    onHasConditionPhotosChange,
    onHasMotorChange,
    onUsageMetricChange,
  };
};
