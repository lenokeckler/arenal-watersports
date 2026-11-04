import type { ReservationHistoryCategoryOption } from "@/app/services/board/reservation-history/models/ReservationHistoryCategoryOption.interface";
import type { ReservationHistoryLinkQuery } from "@/app/services/board/reservation-history/models/ReservationHistoryLinkQuery.type";
import type { ReservationHistoryPage } from "@/app/services/board/reservation-history/models/ReservationHistoryPage.interface";

export interface ReservationHistoryInnerProps {
  categoryOptions: readonly ReservationHistoryCategoryOption[];
  hasInvertedDateRange: boolean;
  page: ReservationHistoryPage;
  query: ReservationHistoryLinkQuery;
}
