import type { NullableRef } from "@/app/types";
import {
  RESERVATION_DETAIL_EXTRA_TIME_STATE,
  RESERVATION_DETAIL_NO_EXTRA_MINUTES,
} from "../constants/ReservationDetail.constants";
import type { ReservationDetailExtraTime } from "../models/ReservationDetailExtraTime.interface";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";

export const mapReservationDetailExtraTime = (
  resolution: ReservationDetailReservationSource["reservation_extra_time_resolutions"],
  pendingMinutes: number
): NullableRef<ReservationDetailExtraTime> => {
  if (resolution !== null) {
    return {
      minutes: resolution.extra_minutes,
      state: resolution.outcome,
    };
  }
  return pendingMinutes >
    RESERVATION_DETAIL_NO_EXTRA_MINUTES
    ? {
        minutes: pendingMinutes,
        state: RESERVATION_DETAIL_EXTRA_TIME_STATE.PENDING,
      }
    : null;
};
