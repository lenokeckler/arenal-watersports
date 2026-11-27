import type { CurrencyCode } from "@/app/constants";

export interface ReservationExtraTimeCharge {
  amount: number;
  currency: CurrencyCode;
  paymentMethod: string;
}
