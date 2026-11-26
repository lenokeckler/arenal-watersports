import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";

export const collectReservationDetailWorkerIds = (
  source: ReservationDetailReservationSource
): string[] => [
  ...new Set([
    source.created_by,
    source.updated_by,
    ...source.reservation_guides.map(
      (assignment) => assignment.worker_id
    ),
    ...source.reservation_charges.map(
      (charge) => charge.created_by
    ),
    ...source.refunds.map((refund) => refund.created_by),
  ]),
];
