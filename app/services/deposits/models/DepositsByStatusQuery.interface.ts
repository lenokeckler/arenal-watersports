import type { DepositStatus } from "@/app/constants";

export interface DepositsByStatusQuery {
  statuses: readonly DepositStatus[];
}
