import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";
import { useReservationGuideLoadViewModel } from "./useReservationGuideLoadViewModel";
import { useReservationGuideSelectionSyncViewModel } from "./useReservationGuideSelectionSyncViewModel";

export const useReservationGuideAssignmentState = (
  reconcileGuideSelection: (guideIds: string[]) => void,
  guideLoadResult: ReservationGuideLoadResult = EMPTY_RESERVATION_GUIDE_LOAD_RESULT
) => {
  const guideLoad =
    useReservationGuideLoadViewModel(guideLoadResult);
  useReservationGuideSelectionSyncViewModel(
    guideLoad.isLoading,
    guideLoad.result,
    reconcileGuideSelection
  );
  return guideLoad;
};
