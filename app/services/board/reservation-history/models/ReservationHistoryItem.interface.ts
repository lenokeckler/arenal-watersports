import type { ReservationHistoryStatus } from "./ReservationHistoryStatus.type";

export interface ReservationHistoryItem {
  attendedByName: string;
  customerName: string;
  equipmentNames: readonly string[];
  guideNames: readonly string[];
  id: string;
  startsAt: string;
  status: ReservationHistoryStatus;
}
