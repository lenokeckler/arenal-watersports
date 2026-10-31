import type {
  CurrencyCode,
  DepositStatus,
} from "@/app/constants";

export interface E2eDepositSeed {
  amount: number;
  currency: CurrencyCode;
  resolvedAt?: string;
  retainedAmount?: number;
  retentionReason?: string;
  status: DepositStatus;
}
