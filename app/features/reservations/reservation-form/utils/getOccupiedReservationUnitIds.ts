import type { ReservationUnitCommitment } from "../models/ReservationUnitCommitment.interface";
import { isReservationUnitCommitmentOverlapping } from "./isReservationUnitCommitmentOverlapping";

export const getOccupiedReservationUnitIds = (
  commitments: ReservationUnitCommitment[],
  startsAt: string,
  endsAt: string
): Set<string> => {
  const startTime = new Date(startsAt).getTime();
  const endTime = new Date(endsAt).getTime();
  return new Set(
    commitments.flatMap((commitment) => {
      if (
        commitment.unit_id === null ||
        !isReservationUnitCommitmentOverlapping(
          commitment,
          startTime,
          endTime
        )
      ) {
        return [];
      }
      return [commitment.unit_id];
    })
  );
};
