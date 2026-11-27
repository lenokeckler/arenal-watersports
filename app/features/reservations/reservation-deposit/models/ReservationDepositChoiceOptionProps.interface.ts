import type { ReservationDepositOptionClassState } from "./ReservationDepositOptionClassState.interface";

export interface ReservationDepositChoiceOptionProps extends ReservationDepositOptionClassState {
  className: string;
  description?: string;
  id: string;
  label: string;
  name: string;
  onSelect: () => void;
}
