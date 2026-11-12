import type { ReservationType } from "@/app/types";
import type { E2eReservationHistoryStatus } from "./E2eReservationHistoryStatus.type";

export interface E2eReservationHistorySeed {
  cancellationReason?: string;
  creatorId: string;
  customerName: string;
  guideId: string;
  startsAt?: string;
  status: E2eReservationHistoryStatus;
  type?: ReservationType;
  unitCode?: string;
  updaterId: string;
}
