import { unstable_rethrow } from "next/navigation";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import type { ReservationGuideRetryOptions } from "../models/ReservationGuideRetryOptions.interface";
import { getReservationGuidesAction } from "../actions/getReservationGuidesAction";
import { resolveReservationGuideLoadErrorCode } from "../utils/resolveReservationGuideLoadErrorCode";

export const useReservationGuideRetryViewModel = (
  options: ReservationGuideRetryOptions
): (() => Promise<void>) => {
  const {
    initialResult,
    setIsLoading,
    setLocalResultState,
  } = options;
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

  return retry;
};
