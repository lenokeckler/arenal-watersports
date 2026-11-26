import type { CurrencyCode } from "@/app/constants";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";

export interface ReservationRefundCurrencyFieldProps {
  currency: CurrencyCode;
  currencyOptions: readonly CurrencyCode[];
  isPending: boolean;
  onSelect: (currency: CurrencyCode) => void;
  refundable: ReservationRefundableAmount[];
}
