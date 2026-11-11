import type {
  DepositListItem,
  RetainedDepositItem,
} from "@/app/services/deposits";
import type { DepositsReportPages } from "./DepositsReportPages.interface";

export interface DepositsViewProps {
  currentPages: DepositsReportPages;
  pendingDeposits: DepositListItem[];
  pendingPageCount: number;
  retainedDeposits: RetainedDepositItem[];
  retainedPageCount: number;
}
