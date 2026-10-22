"use client";

import type { ReservationGuideAssignmentViewModel } from "../models/ReservationGuideAssignmentViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";
import { filterReservationCategoriesByType } from "../utils/filterReservationCategoriesByType";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useReservationFormViewModelDependencies } from "./useReservationFormViewModelDependencies";
import { useReservationGuideLoadViewModel } from "./useReservationGuideLoadViewModel";
import { useCustomComboForm } from "./useCustomComboForm";
import { createReservationFormSubmitHandler } from "../utils/createReservationFormSubmitHandler";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import { usePredefinedComboForm } from "./usePredefinedComboForm";

export const useReservationFormViewModel = (
  initialDate: string,
  categories: ReservationCategoryOption[],
  guideLoadResult: ReservationGuideLoadResult = EMPTY_RESERVATION_GUIDE_LOAD_RESULT,
  predefinedCombos: ReservationPredefinedCombo[] = []
): ReservationGuideAssignmentViewModel => {
  const guideLoad =
    useReservationGuideLoadViewModel(guideLoadResult);
  const { handlers, resources, router } =
    useReservationFormViewModelDependencies(
      initialDate,
      categories
    );
  const { state, eligibility } = resources;
  const customCombo = useCustomComboForm(
    eligibility.categories,
    resources.resolvedDurationHours,
    state.fields.handleGuideIdsChange,
    state.submission.clearFieldError
  );
  const isComboReservation =
    state.fields.values.reservationType ===
    RESERVATION_TYPE.COMBO;
  const predefinedCombo = usePredefinedComboForm(
    predefinedCombos,
    isComboReservation,
    state.fields.handleGuideIdsChange
  );
  const handleSubmit = createReservationFormSubmitHandler({
    ...resources.equipment,
    customCombo: {
      draft: customCombo.draft,
      hasGuideOnlyItem: customCombo.hasGuideOnlyItem,
    },
    resolvedDurationHours: resources.resolvedDurationHours,
    setFieldError: state.submission.setFieldError,
    submitCustomComboReservation:
      state.submission.submitCustomComboReservation,
    submitReservation: state.submission.submitReservation,
    values: state.fields.values,
  });
  return {
    categories: filterReservationCategoriesByType(
      eligibility.categories,
      state.fields.values.reservationType ??
        RESERVATION_TYPE.RENTAL
    ),
    ...state.fields,
    ...state.submission,
    ...state.duration,
    ...resources.equipment,
    customCombo,
    predefinedCombo,
    ...state.durationHandlers,
    ...handlers,
    handleBack: router.back,
    handleReservationTypeChange: (value) => {
      if (value !== RESERVATION_TYPE.COMBO) {
        predefinedCombo.reset();
      }
      state.fields.handleReservationTypeChange(value);
    },
    handleGuideToggle: state.fields.handleGuideToggle,
    handleRetryEquipmentEligibility: eligibility.retry,
    handleSubmit,
    hasEquipmentEligibilityError: eligibility.hasError,
    hasEquipmentSelectionChanged:
      resources.hasEquipmentSelectionChanged,
    isEquipmentEligibilityLoading: eligibility.isLoading,
    guideLoadResult: guideLoad.result,
    isGuideLoading: guideLoad.isLoading,
    handleRetryGuideLoading: guideLoad.retry,
  };
};
