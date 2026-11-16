import type { CurrencyCode } from "@/app/constants";

export interface ReservationDepositValues {
  amountText: string;
  currency: CurrencyCode;
  hasDeposit: boolean;
}
