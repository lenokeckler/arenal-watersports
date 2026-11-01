import type { ReservationHistoryFilterChangeEvent } from "./ReservationHistoryFilterChangeEvent.type";
import type { ReservationHistoryFilterValues } from "./ReservationHistoryFilterValues.interface";

export interface ReservationHistoryFiltersViewModel {
  handleChange: (
    _event: ReservationHistoryFilterChangeEvent
  ) => void;
  handleSubmit: () => void;
  isPending: boolean;
  values: ReservationHistoryFilterValues;
}
