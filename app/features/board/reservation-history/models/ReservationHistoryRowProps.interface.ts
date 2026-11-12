import type { ReservationHistoryItem } from "@/app/services/board/reservation-history/models/ReservationHistoryItem.interface";
import type { ReservationHistoryLinkQuery } from "@/app/services/board/reservation-history/models/ReservationHistoryLinkQuery.type";

export interface ReservationHistoryRowProps {
  item: ReservationHistoryItem;
  query: ReservationHistoryLinkQuery;
}
