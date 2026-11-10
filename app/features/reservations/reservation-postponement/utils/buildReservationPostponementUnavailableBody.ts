import { STRING } from "@/app/constants";
import {
  RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY,
  RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY,
} from "../constants/ReservationPostponementUnavailableCopy.constants";
import type { ReservationPostponementStatus } from "../models/ReservationPostponementStatus.type";

export const buildReservationPostponementUnavailableBody = (
  status: ReservationPostponementStatus
): string =>
  [
    RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY[
      status
    ],
    RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY.RULE,
  ]
    .filter(Boolean)
    .join(STRING.SPACE);
