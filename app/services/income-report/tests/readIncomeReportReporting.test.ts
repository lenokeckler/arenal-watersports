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
import { readIncomeReport } from "../readIncomeReport";
import {
  DAY_RANGE,
  UNEXPECTED_MESSAGE,
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

describe("readIncomeReport reporting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
