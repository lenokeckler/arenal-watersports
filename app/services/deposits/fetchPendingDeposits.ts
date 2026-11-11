import { DEPOSIT_STATUS } from "@/app/constants";
import { fetchDepositsByStatus } from "./fetchDepositsByStatus";
import type { DepositListItem } from "./models/DepositListItem.interface";
import type { DepositsPage } from "./models/DepositsPage.interface";

export const fetchPendingDeposits = (
  page: number
): Promise<DepositsPage<DepositListItem>> =>
  fetchDepositsByStatus({
    page,
    statuses: [DEPOSIT_STATUS.HELD],
  });
