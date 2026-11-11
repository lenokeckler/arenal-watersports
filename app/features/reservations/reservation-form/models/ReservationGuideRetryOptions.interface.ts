import type { Dispatch, SetStateAction } from "react";
import type { ReservationGuideLoadResult } from "./ReservationGuideLoadResult.type";
import type { ReservationGuideLoadState } from "./ReservationGuideLoadState.interface";

export interface ReservationGuideRetryOptions {
  initialResult: ReservationGuideLoadResult;
  setLocalResultState: Dispatch<
    SetStateAction<ReservationGuideLoadState>
  >;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
