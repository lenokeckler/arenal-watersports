import { RESERVATION_DEPOSIT_DECISION_KIND } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isReservationDepositRecordable } from "@/app/utils/reservations/isReservationDepositRecordable";
import { RESERVATION_DEPOSIT_UNAVAILABLE_REASON as REASON } from "../constants/ReservationDepositUnavailableReason.constants";
import type { ReservationDeposit } from "../models/ReservationDeposit.interface";
import type { ReservationDepositUnavailableReason } from "../models/ReservationDepositUnavailableReason.type";

export const resolveReservationDepositUnavailableReason = (
  deposit: ReservationDeposit
): NullableRef<ReservationDepositUnavailableReason> => {
  if (deposit.parentReservationId !== null) {
    return REASON.SPLIT_CHILD;
  }
  if (
    deposit.decision.kind !==
    RESERVATION_DEPOSIT_DECISION_KIND.UNDECIDED
  ) {
    return REASON.ALREADY_DECIDED;
  }
  return isReservationDepositRecordable(deposit)
    ? null
    : REASON.NOT_DEPOSITABLE;
};
