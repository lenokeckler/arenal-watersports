import type { ReservationHistoryItem } from "@/app/services/board/reservation-history/models/ReservationHistoryItem.interface";
import type { ReservationHistoryLinkQuery } from "@/app/services/board/reservation-history/models/ReservationHistoryLinkQuery.type";

export interface ReservationHistoryResultsProps {
  items: readonly ReservationHistoryItem[];
  query: ReservationHistoryLinkQuery;
}
