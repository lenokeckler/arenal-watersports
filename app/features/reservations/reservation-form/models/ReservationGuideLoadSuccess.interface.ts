import type { ReservationGuideOption } from "./ReservationGuideOption.interface";
import type { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";

export interface ReservationGuideLoadSuccess {
  guides: ReservationGuideOption[];
  kind: typeof RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS;
}
