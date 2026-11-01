"use client";

import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import { useRouter } from "next/navigation";
import { useReservationFormFields } from "./useReservationFormFields";
import { useReservationFormSubmission } from "./useReservationFormSubmission";
import { useReservationDuration } from "./useReservationDuration";
import { useReservationEquipmentViewModel } from "./useReservationEquipmentViewModel";
import { STRING } from "@/app/constants";
import type { ReservationFormViewModelOptions } from "../models/ReservationFormViewModelOptions.interface";
import { useReservationEquipmentEligibility } from "./useReservationEquipmentEligibility";
import { useReservationFormEquipmentSelection } from "./useReservationFormEquipmentSelection";

export const useReservationFormViewModel = (
  options: ReservationFormViewModelOptions
): ReservationFormViewModel => {
  const {
    categories,
    initialCategoryId,
    initialDate,
    unitCategories,
  } = options;
  const router = useRouter();
  const submission = useReservationFormSubmission();
  const eligibility =
    useReservationEquipmentEligibility(categories);
  const eligibleCategories = eligibility.categories.map(
    (category) =>
      unitCategories.some(
        (unitCategory) => unitCategory.id === category.id
      )
        ? { ...category, isInterchangeable: false }
        : category
  );
  const fields = useReservationFormFields(
    initialDate,
    initialCategoryId,
    submission.clearFieldError
  );
  const duration = useReservationDuration(
    fields.handleDurationChange,
    submission.clearFieldError
  );
  const equipment = useReservationEquipmentViewModel(
    eligibleCategories,
    fields.values,
    duration.resolveDurationHours(
      fields.values.durationHours
    ),
    eligibility.refreshKey
  );
  const selection = useReservationFormEquipmentSelection({
    availableUnits: equipment.availableUnits,
    categories: eligibleCategories,
    isAvailabilityResolved:
      equipment.isAvailabilityResolved,
    isEligibilityError: eligibility.hasError,
    isEligibilityLoading: eligibility.isLoading,
    selectedCategoryId: fields.values.categoryId,
    selectedUnitId: fields.values.unitId,
    onCategoryChange: fields.handleCategoryChange,
    onUnitChange: fields.handleUnitChange,
  });
  const isSubmitDisabled =
    submission.isPending ||
    submission.isSubmitted ||
    eligibleCategories.length === 0 ||
    (equipment.requiresConcreteUnit &&
      (equipment.isAvailabilityLoading ||
        equipment.hasAvailabilityError ||
        fields.values.unitId === STRING.Empty));
  const handleSubmit: ReservationFormViewModel["handleSubmit"] =
    (event) => {
      event.preventDefault();
      submission.submitReservation(
        {
          ...fields.values,
          durationHours: duration.resolveDurationHours(
            fields.values.durationHours
          ),
        },
        () => {
          fields.handleUnitChange(STRING.Empty);
          equipment.retryUnitAvailability();
        }
      );
    };
  return {
    categories: eligibleCategories,
    ...fields,
    ...submission,
    ...equipment,
    isEquipmentEligibilityLoading: eligibility.isLoading,
    hasEquipmentEligibilityError: eligibility.hasError,
    hasEquipmentSelectionChanged: selection.hasChanged,
    handleRetryEquipmentEligibility: eligibility.retry,
    handleCategoryChange: selection.handleCategoryChange,
    handleUnitChange: selection.handleUnitChange,
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
    isCustomDuration: duration.isCustomDuration,
    handleSubmit,
  };
};
