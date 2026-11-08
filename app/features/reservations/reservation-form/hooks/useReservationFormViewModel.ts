"use client";

import type { ReservationGuideAssignmentViewModel } from "../models/ReservationGuideAssignmentViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";
import { useReservationFormViewModelDependencies } from "./useReservationFormViewModelDependencies";
import { useReservationFormViewModelComposition } from "./useReservationFormViewModelComposition";

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
  const viewModel = useReservationFormViewModelComposition({
    guideLoadResult,
    handleBack: router.back,
    resources,
  });
  return viewModel;
};
