import { SERVER_OPERATION } from "@/app/constants";
import { fetchChargesInRange } from "@/app/services/income/fetchChargesInRange";
import { fetchRefundsInRange } from "@/app/services/income/fetchRefundsInRange";
import { reportServerError } from "@/app/services/observability";
import type { CostaRicaDayRange } from "@/app/utils/costa-rica-day/models/CostaRicaDayRange.interface";
import { summarizeIncomeByCurrency } from "@/app/utils/income-report/summarizeIncomeByCurrency";
import { INCOME_REPORT_STATUS } from "./constants/IncomeReportStatus.constants";
import { SETTLED_STATUS } from "./constants/SettledStatus.constants";
import { isIncomeReadFailure } from "./isIncomeReadFailure";
import type { IncomeReportResult } from "./models/IncomeReportResult.type";

export const readIncomeReport = async (
  range: CostaRicaDayRange
): Promise<IncomeReportResult> => {
  const [charges, refunds] = await Promise.allSettled([
    fetchChargesInRange(range),
    fetchRefundsInRange(range),
  ]);

  if (
    charges.status === SETTLED_STATUS.FULFILLED &&
    refunds.status === SETTLED_STATUS.FULFILLED
  ) {
    return {
      status: INCOME_REPORT_STATUS.READY,
      summaries: summarizeIncomeByCurrency({
        charges: charges.value,
        refunds: refunds.value,
      }),
    };
  }

  const rejections = [charges, refunds].filter(
    (read) => read.status === SETTLED_STATUS.REJECTED
  );
  const unexpected = rejections.find(
    (read) => !isIncomeReadFailure(read.reason)
  );

  if (unexpected) {
    throw unexpected.reason;
  }

  reportServerError(
    SERVER_OPERATION.READ_INCOME_REPORT,
    rejections[0].reason
  );
  return { status: INCOME_REPORT_STATUS.FAILED };
};
