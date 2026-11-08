import type { DepositStatus } from "@/app/constants";

export interface DepositsByStatusQuery {
  page: number;
  statuses: readonly DepositStatus[];
}
