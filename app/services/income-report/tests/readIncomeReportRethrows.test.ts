import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ChargesTruncatedError } from "@/app/services/income/ChargesTruncatedError";
import { RefundsTruncatedError } from "@/app/services/income/RefundsTruncatedError";
import { readIncomeReport } from "../readIncomeReport";
import {
  DAY_RANGE,
  NON_ERROR_VALUES,
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

describe("readIncomeReport rethrows", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
});
