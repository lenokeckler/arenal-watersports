import type { ReservationHistoryFieldChange } from "./ReservationHistoryFieldChange.interface";
import type { ReservationHistoryFilterValues } from "./ReservationHistoryFilterValues.interface";

export interface ReservationHistoryFiltersViewModel {
  handleChange: (
    _event: ReservationHistoryFieldChange
  ) => void;
  handleSubmit: () => void;
  isPending: boolean;
  values: ReservationHistoryFilterValues;
}
