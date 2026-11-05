import type { ReservationHistoryFilters } from "./ReservationHistoryFilters.interface";

export interface ReservationHistoryQuery {
  filters: ReservationHistoryFilters;
  hasInvertedDateRange: boolean;
  pageIndex: number;
}
