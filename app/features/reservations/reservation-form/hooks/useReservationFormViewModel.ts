"use client";

import type { ReservationGuideAssignmentViewModel } from "../models/ReservationGuideAssignmentViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import { useReservationGuideLoadViewModel } from "./useReservationGuideLoadViewModel";
import { useReservationFormViewModelComposition } from "./useReservationFormViewModelComposition";
import { createReservationFormViewModel } from "../utils/createReservationFormViewModel";

export const useReservationFormViewModel = (
  initialDate: string,
  categories: ReservationCategoryOption[],
  guideLoadResult: ReservationGuideLoadResult = EMPTY_RESERVATION_GUIDE_LOAD_RESULT,
  predefinedCombos: ReservationPredefinedCombo[] = []
): ReservationGuideAssignmentViewModel => {
  const guideLoad =
    useReservationGuideLoadViewModel(guideLoadResult);
  const setup = useReservationFormViewModelComposition(
    initialDate,
    categories,
    predefinedCombos
  );

  return createReservationFormViewModel({
    ...setup,
    guideLoad,
  });
};
