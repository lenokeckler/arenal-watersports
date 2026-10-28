"use client";

import { useState } from "react";
import type { CategoryBehaviorFormErrors } from "../models/CategoryBehaviorFormErrors.interface";
import type { CategoryBehaviorFormFieldsViewModel } from "../models/CategoryBehaviorFormFieldsViewModel.interface";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import type { CategoryBehaviorFormViewModelProps } from "../models/CategoryBehaviorFormViewModelProps.interface";
import { canEditUnitsAreInterchangeable } from "../utils/canEditUnitsAreInterchangeable";
import { canTrackConditionPhotos } from "../utils/canTrackConditionPhotos";
import { mapCategoryBehaviorToFormValues } from "../utils/mapCategoryBehaviorToFormValues";
import { useCategoryBehaviorFieldHandlers } from "./useCategoryBehaviorFieldHandlers";

export const useCategoryBehaviorFormFields = ({
  behavior,
}: CategoryBehaviorFormViewModelProps): CategoryBehaviorFormFieldsViewModel => {
  const [values, setValues] =
    useState<CategoryBehaviorFormValues>(() =>
      mapCategoryBehaviorToFormValues(behavior)
    );
  const [errors, setErrors] =
    useState<CategoryBehaviorFormErrors>({});

  const clearDurationError = (): void => {
    setErrors((currentErrors) =>
      currentErrors.defaultDurationMinutes === undefined
        ? currentErrors
        : {}
    );
  };

  const handlers = useCategoryBehaviorFieldHandlers({
    trackingMode: behavior.trackingMode,
    setValues,
    clearDurationError,
  });

  return {
    ...handlers,
    values,
    errors,
    availability: {
      isConditionPhotosEnabled: canTrackConditionPhotos(
        behavior.trackingMode
      ),
      isUnitsAreInterchangeableEnabled:
        canEditUnitsAreInterchangeable(
          behavior.trackingMode
        ),
      isUsageMetricEnabled: values.hasMotor,
    },
    showValidationErrors: setErrors,
  };
};
