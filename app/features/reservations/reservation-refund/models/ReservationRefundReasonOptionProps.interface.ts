import type { ReservationRefundReason } from "./ReservationRefundReason.type";

export interface ReservationRefundReasonOptionProps {
  id: string;
  isDisabled: boolean;
  isInvalid: boolean;
  isSelected: boolean;
  label: string;
  onSelect: (reason: ReservationRefundReason) => void;
  value: ReservationRefundReason;
}
