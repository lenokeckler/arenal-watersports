import type { ReservationChargePaymentChoice } from "./ReservationChargePaymentChoice.type";

export interface ReservationChargePaymentChoiceOptionProps {
  choice: ReservationChargePaymentChoice;
  id: string;
  isDisabled: boolean;
  isInvalid: boolean;
  isSelected: boolean;
  label: string;
  name: string;
  onSelect: (
    choice: ReservationChargePaymentChoice
  ) => void;
}
