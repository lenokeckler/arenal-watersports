import type { CurrencyCode } from "@/app/constants";

export interface RetainedSeed {
  currency: CurrencyCode;
  retainedAmount: number;
  retentionReason: string;
}
