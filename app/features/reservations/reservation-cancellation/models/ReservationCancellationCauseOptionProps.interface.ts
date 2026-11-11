import type { ReservationCancellationCause } from "./ReservationCancellationCause.type";

export interface ReservationCancellationCauseOptionProps {
  description: string;
  hasError: boolean;
  id: string;
  isDisabled: boolean;
  isSelected: boolean;
  label: string;
  onSelect: (value: ReservationCancellationCause) => void;
  value: ReservationCancellationCause;
}
