import type { CurrencyIncomeSummary } from "@/app/utils/income-report/models/CurrencyIncomeSummary.interface";
import type { INCOME_REPORT_STATUS } from "../constants/IncomeReportStatus.constants";

export type IncomeReportResult =
  | {
      status: typeof INCOME_REPORT_STATUS.READY;
      summaries: CurrencyIncomeSummary[];
    }
  | { status: typeof INCOME_REPORT_STATUS.FAILED };
