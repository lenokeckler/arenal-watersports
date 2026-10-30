import { DEPOSIT_STATUS } from "@/app/constants";
import { fetchDepositsByStatus } from "./fetchDepositsByStatus";
import type { DepositListItem } from "./models/DepositListItem.interface";

export const fetchPendingDeposits = (): Promise<
  DepositListItem[]
> =>
  fetchDepositsByStatus({
    statuses: [DEPOSIT_STATUS.HELD],
  });
