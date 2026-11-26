import type { CurrencyCode } from "@/app/constants";

export interface ReservationRefundAmountFieldProps {
  amountText: string;
  available: number;
  currency: CurrencyCode;
  error?: string;
  isPending: boolean;
  onChange: (text: string) => void;
}
