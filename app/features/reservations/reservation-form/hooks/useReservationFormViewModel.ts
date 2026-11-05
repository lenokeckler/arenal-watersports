"use client";

import type { ReservationGuideAssignmentViewModel } from "../models/ReservationGuideAssignmentViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";
import { useReservationFormViewModelDependencies } from "./useReservationFormViewModelDependencies";
import { useReservationGuideLoadViewModel } from "./useReservationGuideLoadViewModel";
import { useReservationGuideSelectionSyncViewModel } from "./useReservationGuideSelectionSyncViewModel";

export const useReservationFormViewModel = (
  initialDate: string,
  categories: ReservationCategoryOption[],
  guideLoadResult: ReservationGuideLoadResult = EMPTY_RESERVATION_GUIDE_LOAD_RESULT
): ReservationGuideAssignmentViewModel => {
  const guideLoad =
    useReservationGuideLoadViewModel(guideLoadResult);
  const { handleSubmit, resources, router } =
    useReservationFormViewModelDependencies(
      initialDate,
      categories
    );
  const { state } = resources;
  useReservationGuideSelectionSyncViewModel(
    guideLoad.isLoading,
    guideLoad.result,
    state.fields.reconcileGuideSelection
  );
  return {
    ...state.fields,
    ...state.submission,
    ...state.duration,
    ...state.durationHandlers,
    ...resources.equipment,
    handleBack: router.back,
    handleSubmit,
    guideLoadResult: guideLoad.result,
    isGuideLoading: guideLoad.isLoading,
    handleRetryGuideLoading: guideLoad.retry,
  };
};
