import { RESERVATION_DEPOSITABLE_STATUS } from "@/app/constants";
import type { ReservationDepositEligibility } from "./models/ReservationDepositEligibility.interface";

export const isReservationDepositRecordable = ({
  parentReservationId,
  status,
}: ReservationDepositEligibility): boolean =>
  parentReservationId === null &&
  Object.values<string>(
    RESERVATION_DEPOSITABLE_STATUS
  ).includes(status);
