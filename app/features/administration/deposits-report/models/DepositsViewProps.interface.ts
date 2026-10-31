import type {
  DepositListItem,
  RetainedDepositItem,
} from "@/app/services/deposits";

export interface DepositsViewProps {
  pendingDeposits: DepositListItem[];
  retainedDeposits: RetainedDepositItem[];
}
