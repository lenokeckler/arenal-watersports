import type { CurrencyCode } from "@/app/constants";

export interface ReservationChargeValues {
  amountText: string;
  currency: CurrencyCode;
  paymentMethod: string;
}
