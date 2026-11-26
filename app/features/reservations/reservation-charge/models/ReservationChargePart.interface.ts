import type { CurrencyCode } from "@/app/constants";

export interface ReservationChargePart {
  amount: number;
  currency: CurrencyCode;
}
