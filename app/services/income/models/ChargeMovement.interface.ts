import type { CurrencyCode } from "@/app/constants";

export interface ChargeMovement {
  amount: number;
  currency: CurrencyCode;
  paymentMethod: string;
}
