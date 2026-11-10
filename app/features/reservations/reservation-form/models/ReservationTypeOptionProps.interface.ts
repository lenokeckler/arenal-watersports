import type { ReservationType } from "./ReservationType.type";

export interface ReservationTypeOptionProps {
  description: string;
  id: string;
  isSelected: boolean;
  label: string;
  onSelect: (value: ReservationType) => void;
  value: ReservationType;
}
