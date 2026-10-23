import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";
import type { ReservationDetailWorkerName } from "../models/ReservationDetailWorkerName.interface";
import { getReservationDetailWorkerName } from "./getReservationDetailWorkerName";

export const mapReservationDetailGuides = (
  source: ReservationDetailReservationSource,
  workerNames: ReservationDetailWorkerName[]
): string[] =>
  source.reservation_guides.flatMap((assignment) => {
    const guideName = getReservationDetailWorkerName(
      workerNames,
      assignment.worker_id
    );
    return guideName ? [guideName] : [];
  });
