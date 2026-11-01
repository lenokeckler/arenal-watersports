import type { ReservationHistoryFilterChangeEvent } from "./ReservationHistoryFilterChangeEvent.type";
import type { ReservationHistoryFilterValues } from "./ReservationHistoryFilterValues.interface";

export interface ReservationHistoryFieldsProps {
  onChange: (
    _event: ReservationHistoryFilterChangeEvent
  ) => void;
  values: ReservationHistoryFilterValues;
}
