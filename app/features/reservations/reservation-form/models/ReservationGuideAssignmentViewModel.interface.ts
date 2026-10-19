import type { ReservationFormViewModel } from "./ReservationFormViewModel.interface";
import type { ReservationGuideLoadResult } from "./ReservationGuideLoadResult.type";

export interface ReservationGuideAssignmentViewModel extends ReservationFormViewModel {
  guideLoadResult: ReservationGuideLoadResult;
  isGuideLoading: boolean;
  handleRetryGuideLoading: () => void;
}
