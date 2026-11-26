import type { CurrencyCode } from "@/app/constants";

export interface ReservationRefundableAmount {
  amount: number;
  currency: CurrencyCode;
}
