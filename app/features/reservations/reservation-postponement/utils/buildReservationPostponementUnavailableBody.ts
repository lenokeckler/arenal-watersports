import { STRING } from "@/app/constants";
import {
  RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY,
  RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY,
} from "../constants/ReservationPostponementUnavailableCopy.constants";
import type { ReservationPostponementBlockedStatus } from "../models/ReservationPostponementBlockedStatus.type";

export const buildReservationPostponementUnavailableBody = (
  status: ReservationPostponementBlockedStatus
): string =>
  [
    RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY[
      status
    ],
    RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY.RULE,
  ].join(STRING.SPACE);
