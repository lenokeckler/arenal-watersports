"use client";

import type { CategoryBehaviorFieldHandlers } from "../models/CategoryBehaviorFieldHandlers.interface";
import type { CategoryBehaviorFieldHandlersOptions } from "../models/CategoryBehaviorFieldHandlersOptions.interface";
import type { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";
import { readCategoryFormFieldChecked } from "../utils/readCategoryFormFieldChecked";
import { useCategoryBehaviorDependentHandlers } from "./useCategoryBehaviorDependentHandlers";
import { useCategoryBehaviorFlagHandlers } from "./useCategoryBehaviorFlagHandlers";

export const useCategoryBehaviorFieldHandlers = ({
  trackingMode,
  setValues,
  clearDurationError,
}: CategoryBehaviorFieldHandlersOptions): CategoryBehaviorFieldHandlers => {
  const flagHandlers =
    useCategoryBehaviorFlagHandlers(setValues);
  const dependentHandlers =
    useCategoryBehaviorDependentHandlers({
      trackingMode,
      setValues,
    });

  const onDefaultDurationMinutesChange = (
    event: CategoryFormFieldChangeEvent
  ): void => {
    const defaultDurationMinutes = event.target.value;
    setValues((currentValues) => ({
      ...currentValues,
      defaultDurationMinutes,
    }));
    clearDurationError();
  };

  const onIsReservableChange = (
    event: CategoryFormFieldChangeEvent
  ): void => {
    const isReservable =
      readCategoryFormFieldChecked(event);
    setValues((currentValues) => ({
      ...currentValues,
      isReservable,
    }));
    clearDurationError();
  };

  return {
    ...flagHandlers,
    ...dependentHandlers,
    onDefaultDurationMinutesChange,
    onIsReservableChange,
  };
};
