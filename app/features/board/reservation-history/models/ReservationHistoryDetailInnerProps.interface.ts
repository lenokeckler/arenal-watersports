import type { ReservationHistoryRecord } from "@/app/services/board/reservation-history/models/ReservationHistoryRecord.interface";

export interface ReservationHistoryDetailInnerProps {
  backHref: string;
  record: ReservationHistoryRecord;
}
