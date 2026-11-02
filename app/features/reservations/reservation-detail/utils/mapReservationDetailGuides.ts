import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";
import type { ReservationDetailWorkerName } from "../models/ReservationDetailWorkerName.interface";
import { RESERVATION_DETAIL_DATA_COPY } from "../constants/ReservationDetailDataCopy.constants";
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
    return [
      guideName ??
        RESERVATION_DETAIL_DATA_COPY.MISSING_RELATED_NAME,
    ];
  });
