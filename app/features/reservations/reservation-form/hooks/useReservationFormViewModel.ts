"use client";

import { STRING } from "@/app/constants";
import {
  startTransition,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import { useRouter } from "next/navigation";
import { useReservationFormFields } from "./useReservationFormFields";
import { useReservationFormSubmission } from "./useReservationFormSubmission";
import { useReservationDuration } from "./useReservationDuration";
import { useReservationEquipmentViewModel } from "./useReservationEquipmentViewModel";
import { useReservationFormState } from "./useReservationFormState";
import { useReservationEquipmentEligibility } from "./useReservationEquipmentEligibility";

export const useReservationFormViewModel = (
  options: ReservationFormViewModelOptions
): ReservationFormViewModel => {
  const [
    hasEquipmentSelectionChanged,
    setHasEquipmentSelectionChanged,
  ] = useState(false);
  const router = useRouter();
  const state = useReservationFormState(
    initialDate,
    STRING.Empty
  );
  const { fields } = state;
  const eligibility =
    useReservationEquipmentEligibility(categories);
  const {
    categories: eligibleCategories,
    hasError: hasEligibilityError,
    isLoading: isEligibilityLoading,
  } = eligibility;
  const resolvedDurationHours =
    state.duration.resolveDurationHours(
      state.fields.values.durationHours
    );
  const equipment = useReservationEquipmentViewModel(
    eligibleCategories,
    state.fields.values,
    resolvedDurationHours,
    eligibility.refreshKey
  );
  useEffect(() => {
    if (isEligibilityLoading || hasEligibilityError) {
      return;
    }
    const selectedCategory = eligibleCategories.find(
      (category) => category.id === fields.values.categoryId
    );
    if (!selectedCategory) {
      if (fields.values.categoryId !== STRING.Empty) {
        fields.handleCategoryChange(STRING.Empty);
        startTransition(() =>
          setHasEquipmentSelectionChanged(true)
        );
      }
      return;
    }
    if (
      selectedCategory.isInterchangeable === false &&
      fields.values.unitId !== STRING.Empty &&
      !equipment.isAvailabilityLoading &&
      !equipment.hasAvailabilityError &&
      !equipment.availableUnits.some(
        (unit) => unit.id === fields.values.unitId
      )
    ) {
      fields.handleUnitChange(STRING.Empty);
      startTransition(() =>
        setHasEquipmentSelectionChanged(true)
      );
    }
  }, [
    eligibleCategories,
    fields,
    hasEligibilityError,
    isEligibilityLoading,
    equipment.availableUnits,
    equipment.hasAvailabilityError,
    equipment.isAvailabilityLoading,
  ]);
  const handleSubmit = createReservationFormSubmitHandler({
    ...equipment,
    resolvedDurationHours,
    setFieldError: state.submission.setFieldError,
    submitReservation: state.submission.submitReservation,
    values: state.fields.values,
  });

  return {
    categories: eligibility.categories,
    ...state.fields,
    ...state.submission,
    ...state.duration,
    ...equipment,
    isSubmitDisabled,
    customDurationDraft: duration.customDurationDraft,
    handleCustomDurationSelection: () => {
      duration.selectCustomDuration();
      fields.handleUnitChange(STRING.Empty);
    },
    handleCustomDurationChange: (value: string) => {
      duration.updateCustomDurationDraft(value);
      fields.handleUnitChange(STRING.Empty);
    },
    handleDurationChange: (value: number) => {
      duration.selectPreset(value);
      fields.handleUnitChange(STRING.Empty);
    },
    handleBack: router.back,
    handleCategoryChange: (value) => {
      setHasEquipmentSelectionChanged(false);
      fields.handleCategoryChange(value);
    },
    handleUnitChange: (value) => {
      setHasEquipmentSelectionChanged(false);
      fields.handleUnitChange(value);
    },
    handleRetryEquipmentEligibility: eligibility.retry,
    handleSubmit,
    hasEquipmentEligibilityError: eligibility.hasError,
    hasEquipmentSelectionChanged,
    isEquipmentEligibilityLoading: eligibility.isLoading,
  };
};
