import type { ReservationHistoryFilters } from "@/app/services/board/reservation-history/models/ReservationHistoryFilters.interface";

export const hasReservationHistoryFilters = (
  filters: ReservationHistoryFilters
): boolean => Object.values(filters).some(Boolean);
