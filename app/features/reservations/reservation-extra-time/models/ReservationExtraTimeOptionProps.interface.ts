import type { ReservationExtraTimeOptionClassState } from "./ReservationExtraTimeOptionClassState.interface";

export interface ReservationExtraTimeOptionProps<
  Value extends string,
> extends ReservationExtraTimeOptionClassState {
  description?: string;
  id: string;
  label: string;
  name: string;
  onSelect: (value: Value) => void;
  value: Value;
}
