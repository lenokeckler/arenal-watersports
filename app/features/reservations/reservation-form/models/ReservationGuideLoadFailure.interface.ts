import type { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";

export interface ReservationGuideLoadFailure {
  code: string;
  kind: typeof RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE;
}
