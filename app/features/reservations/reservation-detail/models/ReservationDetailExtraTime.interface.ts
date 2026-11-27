import type { ReservationDetailExtraTimeState } from "../constants/ReservationDetail.constants";

export interface ReservationDetailExtraTime {
  minutes: number;
  state: ReservationDetailExtraTimeState;
}
