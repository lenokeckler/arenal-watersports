import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SERVER_OPERATION } from "@/app/constants";
import { ChargesTruncatedError } from "@/app/services/income/ChargesTruncatedError";
import { RefundsTruncatedError } from "@/app/services/income/RefundsTruncatedError";
import { reportServerError } from "@/app/services/observability";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { INCOME_REPORT_STATUS } from "../constants/IncomeReportStatus.constants";
import { readIncomeReport } from "../readIncomeReport";
import {
  CRC_CHARGE,
  CRC_REFUND,
  DAY_RANGE,
  EXPECTED_SUMMARIES,
  NON_ERROR_VALUES,
  POSTGREST_ERROR,
  QUERY_OPERATION,
  UNEXPECTED_MESSAGE,
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

  it("rethrows an error that is not a read failure", async () => {
    const unexpected = new Error(UNEXPECTED_MESSAGE);
    IncomeReadsPage.refundsFailingWith(unexpected);

    await expect(readIncomeReport(DAY_RANGE)).rejects.toBe(
      unexpected
    );
  });

  it("rethrows a thrown value that is not an Error", async () => {
    IncomeReadsPage.returning(
      [],
      []
    ).charges.mockRejectedValue(NON_ERROR_VALUES[0]);

    await expect(readIncomeReport(DAY_RANGE)).rejects.toBe(
      NON_ERROR_VALUES[0]
    );
  });

  it("rethrows the unexpected error when it rejects before a typed failure", async () => {
    const unexpected = new Error(UNEXPECTED_MESSAGE);
    const page = IncomeReadsPage.returning([], []);
    page.charges.mockRejectedValue(unexpected);
    page.refunds.mockRejectedValue(
      new RefundsTruncatedError()
    );

    await expect(readIncomeReport(DAY_RANGE)).rejects.toBe(
      unexpected
    );
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

  it("rethrows the unexpected error when it rejects after a typed failure", async () => {
    const unexpected = new Error(UNEXPECTED_MESSAGE);
    const page = IncomeReadsPage.returning([], []);
    page.charges.mockRejectedValue(
      new ChargesTruncatedError()
    );
    page.refunds.mockRejectedValue(unexpected);

    await expect(readIncomeReport(DAY_RANGE)).rejects.toBe(
      unexpected
    );
  });

  it("reports the typed failure with the read operation", async () => {
    const failure = new ChargesTruncatedError();
    IncomeReadsPage.chargesFailingWith(failure);

    await readIncomeReport(DAY_RANGE);

    expect(reportServerError).toHaveBeenCalledWith(
      SERVER_OPERATION.READ_INCOME_REPORT,
      failure
    );
  });

  it("reports once with the first reason when both reads fail with typed failures", async () => {
    const chargesFailure = new ChargesTruncatedError();
    const page = IncomeReadsPage.returning([], []);
    page.charges.mockRejectedValue(chargesFailure);
    page.refunds.mockRejectedValue(
      new RefundsTruncatedError()
    );

    await readIncomeReport(DAY_RANGE);

    expect(reportServerError).toHaveBeenCalledTimes(1);
    expect(reportServerError).toHaveBeenCalledWith(
      SERVER_OPERATION.READ_INCOME_REPORT,
      chargesFailure
    );
  });

  it("does not report when an unexpected error is rethrown", async () => {
    IncomeReadsPage.refundsFailingWith(
      new Error(UNEXPECTED_MESSAGE)
    );

    await readIncomeReport(DAY_RANGE).catch(
      () => undefined
    );

    expect(reportServerError).not.toHaveBeenCalled();
  });

  it("reports nothing when both reads succeed", async () => {
    IncomeReadsPage.returning([], []);

    await readIncomeReport(DAY_RANGE);

    expect(reportServerError).not.toHaveBeenCalled();
  });
});
