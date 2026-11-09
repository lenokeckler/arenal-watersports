import type { ReservationHistoryCategoryOption } from "@/app/services/board/reservation-history/models/ReservationHistoryCategoryOption.interface";
import type { ReservationHistoryFilters } from "@/app/services/board/reservation-history/models/ReservationHistoryFilters.interface";

export interface ReservationHistoryFiltersProps {
  categoryOptions: readonly ReservationHistoryCategoryOption[];
  filters: ReservationHistoryFilters;
  hasInvertedDateRange: boolean;
}
