import type { ReservationHistoryLinkQuery } from "@/app/services/board/reservation-history/models/ReservationHistoryLinkQuery.type";
import type { ReservationHistoryPage } from "@/app/services/board/reservation-history/models/ReservationHistoryPage.interface";

export interface ReservationHistoryPaginationProps {
  page: ReservationHistoryPage;
  query: ReservationHistoryLinkQuery;
}
