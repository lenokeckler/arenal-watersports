import { RESERVATION_STATUS } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_EXTRA_TIME_NO_MINUTES } from "../constants/ReservationExtraTimeUi.constants";
import { RESERVATION_EXTRA_TIME_UNAVAILABLE_REASON as REASON } from "../constants/ReservationExtraTimeUnavailableReason.constants";
import type { ReservationExtraTime } from "../models/ReservationExtraTime.interface";
import type { ReservationExtraTimeUnavailableReason } from "../models/ReservationExtraTimeUnavailableReason.type";

export const resolveReservationExtraTimeUnavailableReason =
  (
    extraTime: Pick<
      ReservationExtraTime,
      "resolution" | "status" | "totalMinutes"
    >
  ): NullableRef<ReservationExtraTimeUnavailableReason> => {
    if (extraTime.status === RESERVATION_STATUS.CANCELLED) {
      return REASON.CANCELLED;
    }
    if (extraTime.status !== RESERVATION_STATUS.CLOSED) {
      return REASON.GROUPS_OUT;
    }
    if (extraTime.resolution !== null) {
      return REASON.RESOLVED;
    }
    return extraTime.totalMinutes <=
      RESERVATION_EXTRA_TIME_NO_MINUTES
      ? REASON.NO_EXTRA_TIME
      : null;
  };
