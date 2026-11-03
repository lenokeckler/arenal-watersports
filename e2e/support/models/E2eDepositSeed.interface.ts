import type {
  CurrencyCode,
  DepositStatus,
} from "@/app/constants";

export interface E2eDepositSeed {
  amount: number;
  currency: CurrencyCode;
  status: DepositStatus;
}
