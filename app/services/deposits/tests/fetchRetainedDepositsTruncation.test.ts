import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DepositsTruncatedError } from "../DepositsTruncatedError";
import { fetchRetainedDeposits } from "../fetchRetainedDeposits";
import {
  TRUNCATED_ROW_COUNT,
  TRUNCATED_TOTAL_COUNT,
} from "./Deposits.constants";
import { DepositsQueryPage } from "./DepositsQuery.page";
import {
  RETAINED_USD_ITEM,
  RETAINED_USD_ROW,
} from "./RetainedDeposits.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("fetchRetainedDeposits truncation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws DepositsTruncatedError when the count exceeds the rows", async () => {
    DepositsQueryPage.respondingWith({
      data: [RETAINED_USD_ROW],
      error: null,
      count: TRUNCATED_TOTAL_COUNT,
    });

    await expect(
      fetchRetainedDeposits()
    ).rejects.toBeInstanceOf(DepositsTruncatedError);
  });

  it("throws DepositsTruncatedError when the count is null", async () => {
    DepositsQueryPage.respondingWith({
      data: [RETAINED_USD_ROW],
      error: null,
      count: null,
    });

    await expect(
      fetchRetainedDeposits()
    ).rejects.toBeInstanceOf(DepositsTruncatedError);
  });

  it("returns every row when the count equals the rows", async () => {
    DepositsQueryPage.respondingWith({
      data: [RETAINED_USD_ROW],
      error: null,
      count: TRUNCATED_ROW_COUNT,
    });

    expect(await fetchRetainedDeposits()).toEqual([
      RETAINED_USD_ITEM,
    ]);
  });
});
