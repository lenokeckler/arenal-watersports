import type { ReservationGuideLoadResult } from "./ReservationGuideLoadResult.type";

export interface ReservationGuideAssignmentFeedbackProps {
  isLoading: boolean;
  result: ReservationGuideLoadResult;
  retry: () => void;
}
