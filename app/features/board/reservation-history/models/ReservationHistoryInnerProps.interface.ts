import type { ReservationHistoryLinkQuery } from "@/app/services/board/reservation-history/models/ReservationHistoryLinkQuery.type";
import type { ReservationHistoryPage } from "@/app/services/board/reservation-history/models/ReservationHistoryPage.interface";

export interface ReservationHistoryInnerProps {
  page: ReservationHistoryPage;
  query: ReservationHistoryLinkQuery;
}
