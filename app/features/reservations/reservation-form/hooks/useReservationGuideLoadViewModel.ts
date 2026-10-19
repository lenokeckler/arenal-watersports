import { useState } from "react";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { getReservationGuidesAction } from "../actions/getReservationGuidesAction";
import { resolveReservationGuideLoadErrorCode } from "../utils/resolveReservationGuideLoadErrorCode";

export const useReservationGuideLoadViewModel = (
  initialResult: ReservationGuideLoadResult
) => {
  const [result, setResult] = useState(initialResult);
  const [isLoading, setIsLoading] = useState(false);

  const retry = async (): Promise<void> => {
    setIsLoading(true);
    try {
      setResult(await getReservationGuidesAction());
    } catch (error) {
      window.reportError(error);
      setResult({
        code: resolveReservationGuideLoadErrorCode(error),
        kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, result, retry };
};
