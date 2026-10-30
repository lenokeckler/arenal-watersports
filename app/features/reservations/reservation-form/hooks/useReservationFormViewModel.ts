"use client";

import { useEffect, useEffectEvent } from "react";
import type { ReservationGuideAssignmentViewModel } from "../models/ReservationGuideAssignmentViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import {
  EMPTY_RESERVATION_GUIDE_LOAD_RESULT,
  RESERVATION_GUIDE_LOAD_RESULT_KIND,
} from "../constants/ReservationGuideLoad.constants";
import { useReservationFormViewModelDependencies } from "./useReservationFormViewModelDependencies";
import { useReservationGuideLoadViewModel } from "./useReservationGuideLoadViewModel";

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
  const reconcileLoadedGuideSelection = useEffectEvent(
    (guideIds: string[]) =>
      state.fields.reconcileGuideSelection(guideIds)
  );
  useEffect(() => {
    if (
      guideLoad.isLoading ||
      guideLoad.result.kind !==
        RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS
    ) {
      return;
    }
    reconcileLoadedGuideSelection(
      guideLoad.result.guides.map((guide) => guide.id)
    );
  }, [guideLoad.isLoading, guideLoad.result]);
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
