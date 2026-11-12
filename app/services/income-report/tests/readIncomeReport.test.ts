import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ChargesTruncatedError } from "@/app/services/income/ChargesTruncatedError";
import { RefundsTruncatedError } from "@/app/services/income/RefundsTruncatedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { INCOME_REPORT_STATUS } from "../constants/IncomeReportStatus.constants";
import { readIncomeReport } from "../readIncomeReport";
import {
  CRC_CHARGE,
  CRC_REFUND,
  DAY_RANGE,
  EXPECTED_SUMMARIES,
  POSTGREST_ERROR,
  QUERY_OPERATION,
  USD_CHARGE,
} from "./IncomeReport.constants";
import { IncomeReadsPage } from "./IncomeReads.page";

vi.mock(
  "@/app/services/income/fetchChargesInRange",
  () => ({
    fetchChargesInRange: vi.fn(),
  })
);
vi.mock(
  "@/app/services/income/fetchRefundsInRange",
  () => ({
    fetchRefundsInRange: vi.fn(),
  })
);
vi.mock("@/app/services/observability", () => ({
  reportServerError: vi.fn(),
}));

describe("readIncomeReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads charges and refunds with the same range", async () => {
    const page = IncomeReadsPage.returning([], []);

    await readIncomeReport(DAY_RANGE);

    expect(page.charges).toHaveBeenCalledWith(DAY_RANGE);
    expect(page.refunds).toHaveBeenCalledWith(DAY_RANGE);
  });

  it("returns the summaries per currency, dollars then colones", async () => {
    IncomeReadsPage.returning(
      [CRC_CHARGE, USD_CHARGE],
      [CRC_REFUND]
    );

    await expect(
      readIncomeReport(DAY_RANGE)
    ).resolves.toEqual({
      status: INCOME_REPORT_STATUS.READY,
      summaries: EXPECTED_SUMMARIES,
    });
  });

  it("returns a failed result when the query fails", async () => {
    IncomeReadsPage.chargesFailingWith(
      new SupabaseQueryError(
        QUERY_OPERATION,
        POSTGREST_ERROR
      )
    );

    await expect(
      readIncomeReport(DAY_RANGE)
    ).resolves.toEqual({
      status: INCOME_REPORT_STATUS.FAILED,
    });
  });

  it("returns a failed result when the charges are truncated", async () => {
    IncomeReadsPage.chargesFailingWith(
      new ChargesTruncatedError()
    );

    await expect(
      readIncomeReport(DAY_RANGE)
    ).resolves.toEqual({
      status: INCOME_REPORT_STATUS.FAILED,
    });
  });

  it("returns a failed result when the refunds are truncated", async () => {
    IncomeReadsPage.refundsFailingWith(
      new RefundsTruncatedError()
    );

    await expect(
      readIncomeReport(DAY_RANGE)
    ).resolves.toEqual({
      status: INCOME_REPORT_STATUS.FAILED,
    });
  });

  it("returns a failed result when both reads fail with typed failures", async () => {
    const page = IncomeReadsPage.returning([], []);
    page.charges.mockRejectedValue(
      new ChargesTruncatedError()
    );
    page.refunds.mockRejectedValue(
      new RefundsTruncatedError()
    );

    await expect(
      readIncomeReport(DAY_RANGE)
    ).resolves.toEqual({
      status: INCOME_REPORT_STATUS.FAILED,
    });
  });
});
