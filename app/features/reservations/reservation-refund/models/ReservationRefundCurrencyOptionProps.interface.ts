import type { CurrencyCode } from "@/app/constants";

export interface ReservationRefundCurrencyOptionProps {
  description: string;
  id: string;
  isDisabled: boolean;
  isSelected: boolean;
  label: string;
  onSelect: (currency: CurrencyCode) => void;
  value: CurrencyCode;
}
