import type { ReservationDetailMoneyMovement } from "../models/ReservationDetailMoneyMovement.interface";
import { parseReservationDetailTimestampMicroseconds } from "./parseReservationDetailTimestampMicroseconds";

const compareIds = (
  first: string,
  second: string
): number => {
  if (first === second) {
    return 0;
  }

  return first < second ? -1 : 1;
};

export const compareReservationDetailMoneyMovements = (
  first: ReservationDetailMoneyMovement,
  second: ReservationDetailMoneyMovement
): number =>
  parseReservationDetailTimestampMicroseconds(
    second.createdAt
  ) -
    parseReservationDetailTimestampMicroseconds(
      first.createdAt
    ) || compareIds(second.id, first.id);
