import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";
import type { ReservationDetailWorkerName } from "../models/ReservationDetailWorkerName.interface";
import type { ReservationDetailGuide } from "../models/ReservationDetailGuide.interface";
import { getReservationDetailWorkerName } from "./getReservationDetailWorkerName";

export const mapReservationDetailGuides = (
  source: ReservationDetailReservationSource,
  workerNames: ReservationDetailWorkerName[]
): ReservationDetailGuide[] =>
  source.reservation_guides.flatMap((assignment) => {
    const guideName = getReservationDetailWorkerName(
      workerNames,
      assignment.worker_id
    );
    return guideName
      ? [
          {
            name: guideName,
            workerId: assignment.worker_id,
          },
        ]
      : [];
  });
