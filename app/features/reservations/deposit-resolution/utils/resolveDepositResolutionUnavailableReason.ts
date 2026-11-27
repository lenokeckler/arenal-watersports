import {
  DEPOSIT_STATUS,
  RESERVATION_STATUS,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { DEPOSIT_RESOLUTION_UNAVAILABLE_REASON as REASON } from "../constants/DepositResolutionUnavailableReason.constants";
import type { DepositResolution } from "../models/DepositResolution.interface";
import type { DepositResolutionUnavailableReason } from "../models/DepositResolutionUnavailableReason.type";

const ENDED_STATUSES: readonly string[] = [
  RESERVATION_STATUS.CANCELLED,
  RESERVATION_STATUS.CLOSED,
];

export const resolveDepositResolutionUnavailableReason = ({
  reservationStatus,
  status,
}: Pick<
  DepositResolution,
  "reservationStatus" | "status"
>): NullableRef<DepositResolutionUnavailableReason> => {
  if (status !== DEPOSIT_STATUS.HELD) {
    return REASON.ALREADY_RESOLVED;
  }
  return ENDED_STATUSES.includes(reservationStatus)
    ? null
    : REASON.TRIP_NOT_CLOSED;
};
