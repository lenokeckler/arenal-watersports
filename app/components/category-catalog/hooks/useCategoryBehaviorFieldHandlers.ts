"use client";

import type { CategoryBehaviorFieldHandlers } from "../models/CategoryBehaviorFieldHandlers.interface";
import type { CategoryBehaviorFieldHandlersOptions } from "../models/CategoryBehaviorFieldHandlersOptions.interface";
import type { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";
import { applyHasConditionPhotosChange } from "../utils/applyHasConditionPhotosChange";
import { applyHasMotorChange } from "../utils/applyHasMotorChange";
import { applyUsageMetricChange } from "../utils/applyUsageMetricChange";
import { readCategoryFormFieldChecked } from "../utils/readCategoryFormFieldChecked";

export const useCategoryBehaviorFieldHandlers = ({
  trackingMode,
  setValues,
  clearDurationError,
}: CategoryBehaviorFieldHandlersOptions): CategoryBehaviorFieldHandlers => {
  const onCanBeDamagedChange = (
    event: CategoryFormFieldChangeEvent
  ): void => {
    const canBeDamaged =
      readCategoryFormFieldChecked(event);
    setValues((currentValues) => ({
      ...currentValues,
      canBeDamaged,
    }));
  };

  const onConsumesFuelChange = (
    event: CategoryFormFieldChangeEvent
  ): void => {
    const consumesFuel =
      readCategoryFormFieldChecked(event);
    setValues((currentValues) => ({
      ...currentValues,
      consumesFuel,
    }));
  };

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

  const onGuideOnlyChange = (
    event: CategoryFormFieldChangeEvent
  ): void => {
    const guideOnly = readCategoryFormFieldChecked(event);
    setValues((currentValues) => ({
      ...currentValues,
      guideOnly,
    }));
  };

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

  const onUnitsAreInterchangeableChange = (
    event: CategoryFormFieldChangeEvent
  ): void => {
    const unitsAreInterchangeable =
      readCategoryFormFieldChecked(event);
    setValues((currentValues) => ({
      ...currentValues,
      unitsAreInterchangeable,
    }));
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
    onCanBeDamagedChange,
    onConsumesFuelChange,
    onDefaultDurationMinutesChange,
    onGuideOnlyChange,
    onHasConditionPhotosChange,
    onHasMotorChange,
    onIsReservableChange,
    onUnitsAreInterchangeableChange,
    onUsageMetricChange,
  };
};
