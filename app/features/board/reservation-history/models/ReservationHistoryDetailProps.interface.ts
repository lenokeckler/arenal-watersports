import type { ReservationHistorySearchParams } from "@/app/services/board/reservation-history/models/ReservationHistorySearchParams.type";

export interface ReservationHistoryDetailProps {
  reservationId: string;
  searchParams: ReservationHistorySearchParams;
}
