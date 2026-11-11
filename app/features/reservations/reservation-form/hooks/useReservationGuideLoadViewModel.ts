import { useState } from "react";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { useReservationGuideRetryViewModel } from "./useReservationGuideRetryViewModel";

export const useReservationGuideLoadViewModel = (
  initialResult: ReservationGuideLoadResult
) => {
  const [localResultState, setLocalResultState] = useState({
    initialResult,
    result: initialResult,
  });
  const [isLoading, setIsLoading] = useState(false);
  const result =
    localResultState.initialResult === initialResult
      ? localResultState.result
      : initialResult;
  const retry = useReservationGuideRetryViewModel({
    initialResult,
    setLocalResultState,
    setIsLoading,
  });

  return { isLoading, result, retry };
};
