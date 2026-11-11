import { STRING } from "@/app/constants";
import type { ReservationHistoryFilters } from "@/app/services/board/reservation-history/models/ReservationHistoryFilters.interface";
import type { ReservationHistoryFilterValues } from "../models/ReservationHistoryFilterValues.interface";

export const buildReservationHistoryFilterValues = ({
  categoryId,
  from,
  to,
  type,
}: ReservationHistoryFilters): ReservationHistoryFilterValues => ({
  category: categoryId ?? STRING.Empty,
  from: from ?? STRING.Empty,
  to: to ?? STRING.Empty,
  type: type ?? STRING.Empty,
});
