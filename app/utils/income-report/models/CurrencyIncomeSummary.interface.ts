import type { CurrencyCode } from "@/app/constants";

export interface CurrencyIncomeSummary {
  currency: CurrencyCode;
  chargedCents: number;
  refundedCents: number;
  netCents: number;
}
