import type { ReservationRefundReason } from "./ReservationRefundReason.type";

export interface ReservationRefundReasonOptionProps {
  id: string;
  isDisabled: boolean;
  isSelected: boolean;
  label: string;
  onSelect: (reason: ReservationRefundReason) => void;
  value: ReservationRefundReason;
}
