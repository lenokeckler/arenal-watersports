import type { CurrencyCode } from "@/app/constants";

export interface ReservationDepositAmount {
  amount: number;
  currency: CurrencyCode;
}
