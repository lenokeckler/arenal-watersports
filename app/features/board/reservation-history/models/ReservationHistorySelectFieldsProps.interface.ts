import type { ReservationHistoryCategoryOption } from "@/app/services/board/reservation-history/models/ReservationHistoryCategoryOption.interface";
import type { ReservationHistoryFieldsProps } from "./ReservationHistoryFieldsProps.interface";

export interface ReservationHistorySelectFieldsProps extends ReservationHistoryFieldsProps {
  categoryOptions: readonly ReservationHistoryCategoryOption[];
}
