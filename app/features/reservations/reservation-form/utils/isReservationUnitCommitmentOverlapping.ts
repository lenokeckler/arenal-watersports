import type { ReservationUnitCommitment } from "../models/ReservationUnitCommitment.interface";

export const isReservationUnitCommitmentOverlapping = (
  commitment: ReservationUnitCommitment,
  startTime: number,
  endTime: number
): boolean => {
  const commitmentStart = new Date(
    commitment.dispatch?.dispatched_at ??
      commitment.reservation.starts_at
  ).getTime();
  const commitmentEnd = commitment.dispatch
    ? commitment.dispatch.closed_at
      ? new Date(commitment.dispatch.closed_at).getTime()
      : Number.POSITIVE_INFINITY
    : new Date(
        commitment.reservation.ends_at ??
          commitment.reservation.starts_at
      ).getTime();

  return (
    commitmentStart < endTime && commitmentEnd > startTime
  );
};
