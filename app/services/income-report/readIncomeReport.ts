import { fetchChargesInRange } from "@/app/services/income/fetchChargesInRange";
import { fetchRefundsInRange } from "@/app/services/income/fetchRefundsInRange";
import type { CostaRicaDayRange } from "@/app/utils/costa-rica-day/models/CostaRicaDayRange.interface";
import { summarizeIncomeByCurrency } from "@/app/utils/income-report/summarizeIncomeByCurrency";
import { INCOME_REPORT_STATUS } from "./constants/IncomeReportStatus.constants";
import { isIncomeReadFailure } from "./isIncomeReadFailure";
import type { IncomeReportResult } from "./models/IncomeReportResult.type";

export const readIncomeReport = async (
  range: CostaRicaDayRange
): Promise<IncomeReportResult> => {
  try {
    const [charges, refunds] = await Promise.all([
      fetchChargesInRange(range),
      fetchRefundsInRange(range),
    ]);

    return {
      status: INCOME_REPORT_STATUS.READY,
      summaries: summarizeIncomeByCurrency({
        charges,
        refunds,
      }),
    };
  } catch (error) {
    if (isIncomeReadFailure(error)) {
      return { status: INCOME_REPORT_STATUS.FAILED };
    }
    throw error;
  }
};
