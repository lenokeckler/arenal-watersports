import type { E2eReservationHistoryDetails } from "./E2eReservationHistoryDetails.interface";
import type { E2eReservationHistoryRecord } from "./E2eReservationHistoryRecord.interface";

export interface ReservationHistoryTestFixtures {
  createHistoryRecord: (
    details: E2eReservationHistoryDetails
  ) => Promise<E2eReservationHistoryRecord>;
  createHistoryRecords: (
    count: number,
    details: E2eReservationHistoryDetails
  ) => Promise<E2eReservationHistoryRecord[]>;
}
