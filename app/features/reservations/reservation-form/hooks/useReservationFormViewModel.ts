"use client";

import type { ReservationGuideAssignmentViewModel } from "../models/ReservationGuideAssignmentViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useReservationFormViewModelDependencies } from "./useReservationFormViewModelDependencies";
import { useReservationFormCustomComboViewModel } from "./useReservationFormCustomComboViewModel";
import { useReservationGuideAssignmentState } from "./useReservationGuideAssignmentState";

export const useReservationFormViewModel = (
  initialDate: string,
  categories: ReservationCategoryOption[],
  guideLoadResult: ReservationGuideLoadResult = EMPTY_RESERVATION_GUIDE_LOAD_RESULT
): ReservationGuideAssignmentViewModel => {
  const { resources, router } =
    useReservationFormViewModelDependencies(
      initialDate,
      categories
    );
  const { state, equipment } = resources;
  const guideLoad = useReservationGuideAssignmentState(
    state.fields.reconcileGuideSelection,
    guideLoadResult
  );
  const { customCombo, handleSubmit } =
    useReservationFormCustomComboViewModel({
      categories: equipment.categories,
      clearFieldError: state.submission.clearFieldError,
      durationHours: resources.resolvedDurationHours,
      onGuideIdsChange: state.fields.handleGuideIdsChange,
      reservationType:
        state.fields.values.reservationType ??
        RESERVATION_TYPE.RENTAL,
      requiresConcreteUnit: equipment.requiresConcreteUnit,
      setFieldError: state.submission.setFieldError,
      submitCustomComboReservation:
        state.submission.submitCustomComboReservation,
      submitReservation: state.submission.submitReservation,
      values: state.fields.values,
    });
  return {
    ...state.fields,
    ...state.submission,
    ...state.duration,
    ...state.durationHandlers,
    ...equipment,
    customCombo,
    handleBack: router.back,
    handleSubmit,
    guideLoadResult: guideLoad.result,
    isGuideLoading: guideLoad.isLoading,
    handleRetryGuideLoading: guideLoad.retry,
  };
};
