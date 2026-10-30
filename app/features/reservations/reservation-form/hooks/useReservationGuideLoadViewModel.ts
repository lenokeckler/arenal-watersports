import { useState } from "react";
import { unstable_rethrow } from "next/navigation";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { getReservationGuidesAction } from "../actions/getReservationGuidesAction";
import { resolveReservationGuideLoadErrorCode } from "../utils/resolveReservationGuideLoadErrorCode";

export const useReservationGuideLoadViewModel = (
  initialResult: ReservationGuideLoadResult
) => {
  const [localResultState, setLocalResultState] = useState({
    initialResult,
    result: initialResult,
  });
  const [isLoading, setIsLoading] = useState(false);
  if (localResultState.initialResult !== initialResult) {
    setLocalResultState({
      initialResult,
      result: initialResult,
    });
  }
  const result =
    localResultState.initialResult === initialResult
      ? localResultState.result
      : initialResult;

  const retry = async (): Promise<void> => {
    setIsLoading(true);
    try {
      setLocalResultState({
        initialResult,
        result: await getReservationGuidesAction(),
      });
    } catch (error) {
      unstable_rethrow(error);
      window.reportError(error);
      setLocalResultState({
        initialResult,
        result: {
          code: resolveReservationGuideLoadErrorCode(error),
          kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, result, retry };
};
