import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ChargesTruncatedError } from "../ChargesTruncatedError";
import { RefundsTruncatedError } from "../RefundsTruncatedError";
import { fetchChargesInRange } from "../fetchChargesInRange";
import { fetchRefundsInRange } from "../fetchRefundsInRange";
import { DAY_RANGE as CHARGE_RANGE } from "./Charges.constants";
import { ChargesQueryPage } from "./ChargesQuery.page";
import {
  CAPPED_PAGE_SIZE,
  NO_ROWS_COUNT,
  ROWS_IN_RANGE,
} from "./IncomeReadEdges.constants";
import { DAY_RANGE as REFUND_RANGE } from "./Refunds.constants";
import { RefundsQueryPage } from "./RefundsQuery.page";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const cappedRows = Array.from(
  { length: CAPPED_PAGE_SIZE },
  () => ({ amount: 1, currency: "USD" })
);

describe("income reads edges", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns no charges when the range is empty and data is null", async () => {
    ChargesQueryPage.respondingWith({
      data: null,
      error: null,
      count: NO_ROWS_COUNT,
    });

    await expect(
      fetchChargesInRange(CHARGE_RANGE)
    ).resolves.toEqual([]);
  });

  it("returns no refunds when the range is empty and data is null", async () => {
    RefundsQueryPage.respondingWith({
      data: null,
      error: null,
      count: NO_ROWS_COUNT,
    });

    await expect(
      fetchRefundsInRange(REFUND_RANGE)
    ).resolves.toEqual([]);
  });

  it("flags charges as truncated when the row cap hides part of the range", async () => {
    ChargesQueryPage.respondingWith({
      data: cappedRows,
      error: null,
      count: ROWS_IN_RANGE,
    });

    await expect(
      fetchChargesInRange(CHARGE_RANGE)
    ).rejects.toBeInstanceOf(ChargesTruncatedError);
  });

  it("flags refunds as truncated when the row cap hides part of the range", async () => {
    RefundsQueryPage.respondingWith({
      data: cappedRows,
      error: null,
      count: ROWS_IN_RANGE,
    });

    await expect(
      fetchRefundsInRange(REFUND_RANGE)
    ).rejects.toBeInstanceOf(RefundsTruncatedError);
  });

  it("flags refunds as truncated when data is null but the range holds rows", async () => {
    RefundsQueryPage.respondingWith({
      data: null,
      error: null,
      count: ROWS_IN_RANGE,
    });

    await expect(
      fetchRefundsInRange(REFUND_RANGE)
    ).rejects.toBeInstanceOf(RefundsTruncatedError);
  });
});
