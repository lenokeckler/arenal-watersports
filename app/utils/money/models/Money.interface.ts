import type { CurrencyCode } from "@/app/constants";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}
