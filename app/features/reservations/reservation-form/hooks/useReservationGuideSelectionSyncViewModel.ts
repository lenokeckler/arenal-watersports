import { useEffect, useEffectEvent } from "react";
import type { ReservationFormFieldHandlers } from "../models/ReservationFormFieldHandlers.interface";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";

export const useReservationGuideSelectionSyncViewModel = (
  isLoading: boolean,
  result: ReservationGuideLoadResult,
  reconcileGuideSelection: ReservationFormFieldHandlers["reconcileGuideSelection"]
): void => {
  const reconcileLoadedGuideSelection = useEffectEvent(
    (guideIds: string[]) =>
      reconcileGuideSelection(guideIds)
  );

  useEffect(() => {
    if (
      isLoading ||
      result.kind !==
        RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS
    ) {
      return;
    }
    reconcileLoadedGuideSelection(
      result.guides.map((guide) => guide.id)
    );
  }, [isLoading, result]);
};
