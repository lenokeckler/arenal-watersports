import type { ReservationHistoryCategoryOption } from "@/app/services/board/reservation-history/models/ReservationHistoryCategoryOption.interface";
import { RESERVATION_HISTORY_ALL_OPTION } from "../constants/ReservationHistoryTypeOptions.constants";
import type { ReservationHistoryFilterOption } from "../models/ReservationHistoryFilterOption.interface";

export const buildReservationHistoryCategoryFilterOptions =
  (
    categories: readonly ReservationHistoryCategoryOption[]
  ): ReservationHistoryFilterOption[] => [
    RESERVATION_HISTORY_ALL_OPTION,
    ...categories.map(({ id, name }) => ({
      key: id,
      label: name,
      value: id,
    })),
  ];
