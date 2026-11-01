import {
  RESERVATION_HISTORY_ERROR,
  RESERVATION_HISTORY_STATUS,
} from "@/app/constants";
import type { ReservationHistoryStatus } from "./models/ReservationHistoryStatus.type";

export const resolveReservationHistoryStatus = (
  status: string
): ReservationHistoryStatus => {
  const resolved = Object.values(
    RESERVATION_HISTORY_STATUS
  ).find((candidate) => candidate === status);
  if (resolved === undefined) {
    throw new Error(
      RESERVATION_HISTORY_ERROR.UNEXPECTED_STATUS
    );
  }
  return resolved;
};
