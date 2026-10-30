"use client";

import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { filterReservationCategoriesByType } from "../utils/filterReservationCategoriesByType";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useReservationFormViewModelDependencies } from "./useReservationFormViewModelDependencies";

export const useReservationFormViewModel = (
  initialDate: string,
  categories: ReservationCategoryOption[]
): ReservationFormViewModel => {
  const { handleSubmit, handlers, resources, router } =
    useReservationFormViewModelDependencies(
      initialDate,
      categories
    );
  const { state, eligibility } = resources;
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
    ...state.durationHandlers,
    ...handlers,
    handleBack: router.back,
    handleReservationTypeChange:
      state.fields.handleReservationTypeChange,
    handleGuideToggle: state.fields.handleGuideToggle,
    reconcileGuideSelection:
      state.fields.reconcileGuideSelection,
    handleRetryEquipmentEligibility: eligibility.retry,
    handleSubmit,
    hasEquipmentEligibilityError: eligibility.hasError,
    hasEquipmentSelectionChanged:
      resources.hasEquipmentSelectionChanged,
    isEquipmentEligibilityLoading: eligibility.isLoading,
  };
};
